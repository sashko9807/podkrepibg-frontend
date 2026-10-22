import { DonationFormData, DonationFormPaymentStatus, PaymentMode } from './types'
import { createDonationPayment } from 'service/donation'
import { CampaignResponse } from 'gql/campaigns'
import { CreateDonationPaymentInput, DonationPaymentResponse } from 'gql/donations'
import { Stripe, StripeElements } from '@stripe/stripe-js'
import { Session } from 'next-auth'
import { stripeElementsOptions } from '../contexts/StripeElementsProvider'

export async function confirmStripePayment(
  elements: StripeElements,
  stripe: Stripe,
  campaign: CampaignResponse,
  values: DonationFormData,
  donation: Pick<CreateDonationPaymentInput, 'type' | 'personId'>,
  session: Session | null,
): Promise<Pick<DonationPaymentResponse, 'id' | 'status'>> {
  // Make sure the wallet sheets (Apple Pay, Google Pay) show the final amount
  elements.update(stripeElementsOptions(values))

  // Validate the payment form before creating anything in Stripe
  const { error: submitError } = await elements.submit()
  if (submitError) throw submitError

  const { error: tokenError, confirmationToken } = await stripe.createConfirmationToken({
    elements,
    params: {
      payment_method_data: {
        billing_details: { name: values.billingName, email: values.billingEmail },
      },
    },
  })
  if (tokenError) throw tokenError

  // The API charges the amount from this request, validated against the campaign
  const { data: payment } = await createDonationPayment(
    values.mode as PaymentMode,
    {
      confirmationTokenId: confirmationToken.id,
      campaignId: campaign.id,
      amount: Math.round(values.finalAmount as number),
      type: donation.type,
      isAnonymous: values.isAnonymous,
      personId: donation.personId,
    },
    session,
  )

  if (payment.status === DonationFormPaymentStatus.REQUIRES_ACTION) {
    // e.g. 3D Secure
    const { error: actionError, paymentIntent } = await stripe.handleNextAction({
      clientSecret: payment.client_secret as string,
    })
    if (actionError) throw actionError
    if (!paymentIntent) throw new Error(`Payment ${payment.id} could not be completed`)
    return { id: paymentIntent.id, status: paymentIntent.status }
  }
  return payment
}
