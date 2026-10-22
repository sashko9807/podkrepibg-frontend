import React, { PropsWithChildren, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { useFormikContext } from 'formik'
import { Appearance, StripeElementLocale } from '@stripe/stripe-js'
import { Elements, useElements } from '@stripe/react-stripe-js'

import theme from 'common/theme'

import { DonationFormData } from '../helpers/types'
import { useDonationFlow } from './DonationFlowProvider'

// Stripe Elements need an amount before the donor picks one. It is never charged - the API
// charges the amount from the donation request - and is replaced as soon as an amount is picked.
const PLACEHOLDER_AMOUNT = 100

/**
 * Elements mode and amount for the current form values. The amount is what Apple Pay and
 * Google Pay show to the donor, so it has to follow the amount picked in the form.
 */
export function stripeElementsOptions(values: Pick<DonationFormData, 'mode' | 'finalAmount'>) {
  return {
    mode: values.mode === 'subscription' ? ('subscription' as const) : ('payment' as const),
    amount: values.finalAmount ? Math.round(values.finalAmount) : PLACEHOLDER_AMOUNT,
  }
}

/** Keeps the Stripe Elements in sync with the donation form. Render inside the form. */
export function StripeElementsSync() {
  const elements = useElements()
  const { values } = useFormikContext<DonationFormData>()

  useEffect(() => {
    elements?.update(stripeElementsOptions(values))
  }, [elements, values.mode, values.finalAmount])

  return null
}

const appearance: Appearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: theme.palette.primary.main,
    colorBackground: theme.palette.background.paper,
    // colorText: theme.palette.text.primary resolves to rgba(0, 0, 0, 0.87) and Stripe doesn't accept rgba values
    colorText: 'rgb(0, 0, 0)',
    colorDanger: theme.palette.error.main,
    fontFamily: "Montserrat, 'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontSizeSm: theme.typography.pxToRem(14),
    fontSizeBase: theme.typography.pxToRem(14),
    fontSizeLg: theme.typography.pxToRem(18),
    fontSizeXl: theme.typography.pxToRem(20),
    spacingUnit: theme.spacing(0),
    borderRadius: theme.borders.round,
    focusBoxShadow: 'none',
    focusOutline: `2px solid ${theme.palette.primary.main}`,
  },
  rules: {
    '.Input': {
      boxShadow: 'none',
      border: `1px solid ${theme.palette.grey[300]}`,
    },
    '.Input:focus': {
      border: 'none',
      boxShadow: 'none',
    },
  },
}

export function StripeElementsProvider({ children }: PropsWithChildren) {
  const { i18n } = useTranslation()

  const { stripe, campaign } = useDonationFlow()
  return (
    <>
      {/* No intent is created up front: on submit the form is turned into a ConfirmationToken
          and the API charges it. paymentMethodTypes must match the payment_method_types used by
          the API. Card covers Apple Pay and Google Pay too. */}
      <Elements
        stripe={stripe}
        options={{
          ...stripeElementsOptions({ mode: null, finalAmount: undefined }),
          currency: campaign.currency.toLowerCase(),
          paymentMethodTypes: ['card', 'link'],
          appearance,
          locale: i18n.language as StripeElementLocale,
        }}>
        {children}
      </Elements>
    </>
  )
}
