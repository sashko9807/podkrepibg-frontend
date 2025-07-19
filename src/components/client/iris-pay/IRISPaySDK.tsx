import React, { useContext, useEffect, useRef, useState } from 'react'
import IrisPayComponent, {
  IRISAddIbanElementProps,
  IRISAddIbanWithBankElementProps,
  IRISBackend,
  IRISBudgetPaymentElementProps,
  IRISPayCommonProps,
  IRISPayWithCodeElementProps,
  IRISPaymentDataElementProps,
} from './IRISPayComponent'
import loadIrisSdk from './loadIrisScript'
import { StringifyIrisProps } from './objectToString'
import { IRISPayContext } from './IRISPayContext'

type OnPaymentEvent = {
  type: 'loaded' | 'lastStep' | 'error' | 'languageChanged' | 'closeClicked'
}

type IRISListenerProps = {
  isMounted?: boolean
  onLoad?: (data: CustomEvent<OnPaymentEvent>) => void
  onSuccess?: (data: CustomEvent<OnPaymentEvent>) => void
  onError?: (data: CustomEvent<OnPaymentEvent>) => void
}

type ElementWithListener<T> = T & IRISListenerProps
export type IRISPaySDKProps = ElementWithListener<IRISPayCommonProps>

export default function IRISPaySDK(props: IRISPaySDKProps) {
  const context = React.useContext(IRISPayContext)
  if (!context) {
    throw new Error('IRISPay must be a child of IrisSdkElement')
  }

  console.log('IRISPaySDK render:', {
    paymentSession: context.paymentSession,
    hookHash: context.paymentSession?.hookHash,
    userhash: context.paymentSession?.userhash,
  })

  const irisComponentRef = useRef<HTMLIFrameElement | null>(null)
  const { onLoad, onSuccess, onError, ...restProps } = props
  const stringifiedProps = StringifyIrisProps(restProps)

  const environment: IRISBackend =
    context.backend === 'production'
      ? 'https://developer.irispay.bg/'
      : 'https://developer.sandbox.irispay.bg/'

  useEffect(() => {
    console.log('Loading Iris SDK...')
    loadIrisSdk()

    const eventListener = ((data: CustomEvent<OnPaymentEvent>) => {
      console.log('Iris payment event:', data.detail)
      switch (data.detail.type) {
        case 'loaded':
          onLoad?.(data)
          break
        case 'lastStep':
          onSuccess?.(data)
          break
        case 'error':
          onError?.(data)
          break
      }
    }) as EventListener

    irisComponentRef.current?.addEventListener('on_payment_event', eventListener)

    return () => {
      irisComponentRef.current?.removeEventListener('on_payment_event', eventListener)
    }
  }, [])

  if (!context.paymentSession?.hookHash || !context.paymentSession?.userhash) {
    console.log('Missing payment session data:', {
      hookHash: context.paymentSession?.hookHash,
      userhash: context.paymentSession?.userhash,
    })
    return null
  }

  console.log('Rendering IrisPayComponent with:', {
    backend: environment,
    hookhash: context.paymentSession?.hookHash,
    userhash: context.paymentSession?.userhash,
    stringifiedProps,
  })

  return (
    <>
      <IrisPayComponent
        ref={irisComponentRef}
        {...stringifiedProps}
        backend={environment}
        hookhash={context.paymentSession?.hookHash}
        userhash={context.paymentSession?.userhash}
      />
    </>
  )
}

export function PaymentDataElement(props: ElementWithListener<IRISPaymentDataElementProps>) {
  const context = useContext(IRISPayContext)

  console.log('PaymentDataElement render:', {
    context: !!context,
    paymentData: context?.paymentData,
    propsPaymentData: props.payment_data,
    publicHash: context?.publicHash,
    currency: context?.currency,
  })

  const paymentData = context?.paymentData || props.payment_data

  if (!paymentData) {
    console.log('No payment data available')
    return null
  }

  if (!context?.publicHash) {
    console.error('publicHash must be set for payment-data or budged-payment types')
    throw new Error('publicHash must be set for payment-data or budged-payment types')
  }

  if (!context?.currency || (context?.currency !== 'BGN' && context?.currency !== 'EUR')) {
    console.error('Currency missing or invalid:', context?.currency)
    throw new Error(
      'Currency missing from context or has invalid values.\n Supported currencies are: EUR, BGN',
    )
  }

  paymentData['publicHash'] = context.publicHash
  paymentData['currency'] = context.currency

  console.log('Final payment data:', paymentData)

  return <IRISPaySDK {...props} payment_data={paymentData} type="payment-data" />
}

export function BudgetPaymentElement(props: ElementWithListener<IRISBudgetPaymentElementProps>) {
  const context = useContext(IRISPayContext)
  if (!context?.publicHash)
    throw new Error('publicHash must be set for payment-data or budged-payment types')
  if (!context?.currency || (context?.currency !== 'BGN' && context?.currency !== 'EUR')) {
    throw new Error(
      'Currency missing from context or has invalid values.\n Supported currencies are: EUR, BGN',
    )
  }
  props.payment_data['publicHash'] = context.publicHash
  props.payment_data['currency'] = context.currency
  return <IRISPaySDK {...props} type="budget-payment" />
}

export function AddIbanElement(props: ElementWithListener<IRISAddIbanElementProps>) {
  return <IRISPaySDK {...props} type="add-iban" />
}

export function AddIbanWithBankElement(
  props: ElementWithListener<IRISAddIbanWithBankElementProps>,
) {
  return <IRISPaySDK {...props} type="add-iban-with-bank" />
}

export function PaymentWithCodeElement(props: ElementWithListener<IRISPayWithCodeElementProps>) {
  return <IRISPaySDK {...props} type="pay-with-code" />
}
