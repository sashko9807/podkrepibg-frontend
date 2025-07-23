import { useRef } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { FormikProps } from 'formik'
import { StripeError } from '@stripe/stripe-js'

import { routes } from 'common/routes'
import { useCompletePayment } from 'service/irisPayment'
import { useCurrentPerson } from 'common/util/useCurrentPerson'
import { useIrisElements } from 'components/client/iris-pay/irisContextHooks'
import { useDonationFlow } from '../contexts/DonationFlowProvider'
import { DonationFormData } from '../helpers/types'

interface UseIrisPaymentProps {
  formikRef: React.RefObject<FormikProps<DonationFormData> | null>
  setShowPaymentElement: (show: boolean) => void
  setPaymentError: (error: StripeError | null) => void
}

export function useIrisPayment({
  formikRef,
  setShowPaymentElement,
  setPaymentError,
}: UseIrisPaymentProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const { campaign } = useDonationFlow()
  const iris = useIrisElements()
  const completePaymentMutation = useCompletePayment()
  const { data: { user: person } = { user: null } } = useCurrentPerson()

  const handleOnPaymentElementLoad = (data: CustomEvent) => {
    console.log('Payment element loaded successfully:', data.detail)
    // Element is already shown, this confirms it loaded properly
    setShowPaymentElement(true)
  }

  const handleOnPaymentSuccess = async (data: CustomEvent) => {
    console.log('Payment successful:', data.detail)

    // Get current form values
    const currentValues = formikRef.current?.values
    if (!currentValues || !iris?.paymentSession?.hookHash) {
      console.error('Missing form values or payment session data')
      setPaymentError({
        type: 'invalid_request_error',
        message: 'Payment completion failed. Missing required data.',
      })
      return
    }

    try {
      // Prepare payment completion data
      const completionData = {
        hookHash: iris.paymentSession.hookHash,
        status: 'succeeded',
        amount: currentValues.finalAmount || 0,
        billingName: currentValues.billingName,
        billingEmail: currentValues.billingEmail,
        metadata: {
          campaignId: campaign.id,
          personId: !currentValues.isAnonymous && session?.user && person?.id ? person.id : null,
          isAnonymous: currentValues.isAnonymous.toString() as 'true' | 'false',
          type: person?.company ? 'corporate' : 'donation',
        },
      }

      console.log('Completing payment with data:', completionData)

      // Call the complete payment API
      const payment = await completePaymentMutation.mutateAsync(completionData)
      console.log('Payment completion response:', payment)

      // Navigate to success page
      router.push(
        `${window.location.origin}${routes.campaigns.donationStatus(campaign.slug)}?p_status=${
          payment.status
        }&payment_intent=${payment.id}`,
      )
    } catch (error) {
      console.error('Payment completion failed:', error)
      setPaymentError({
        type: 'invalid_request_error',
        message: 'Payment completion failed. Please contact support.',
      })
    }
  }

  const handleOnPaymentError = (data: CustomEvent) => {
    console.log('Payment error:', data.detail)
    setPaymentError({
      type: 'invalid_request_error',
      message: 'Payment failed. Please try again.',
    })
    setShowPaymentElement(false)
  }

  return {
    handleOnPaymentElementLoad,
    handleOnPaymentSuccess,
    handleOnPaymentError,
    isCompleting: completePaymentMutation.isLoading,
  }
}
