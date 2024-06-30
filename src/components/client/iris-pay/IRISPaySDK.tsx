import React, { useEffect, useRef, useState } from 'react'
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
  onLoad?: () => void
  onSuccess?: () => void
  onError?: () => void
}

type ElementWithListener<T> = T & IRISListenerProps
export type IRISPayPropsTest = ElementWithListener<IRISPayCommonProps>

export default function IRISPaySDK(props: IRISPayPropsTest) {
  const context = React.useContext(IRISPayContext)
  const [mount] = useState(props.isMounted ?? true)
  if (!context) {
    throw new Error('IRISPay must be a child of IrisSdkElement')
  }
  if (props.type === 'payment-data') {
    if (!context.publicHash)
      throw new Error('publicHash must be set for payment-data or budged-payment types')
    props.payment_data['publicHash'] = context.publicHash
  }
  const irisComponentRef = useRef<HTMLIFrameElement | null>(null)
  const { onLoad, onSuccess, onError } = props
  const stringifiedProps = StringifyIrisProps(props)
  const environment: IRISBackend =
    context.backend === 'production'
      ? 'https://developer.irispay.bg/'
      : 'https://developer.sandbox.irispay.bg/'
  useEffect(() => {
    loadIrisSdk()
    irisComponentRef.current?.addEventListener('on_payment_event', ((
      data: CustomEvent<OnPaymentEvent>,
    ) => {
      switch (data.detail.type) {
        case 'loaded':
          onLoad && onLoad()
          break
        case 'lastStep':
          onSuccess && onSuccess()
          break
        case 'error':
          onError && onError()
          break
      }
    }) as EventListener)

    return () => {
      irisComponentRef.current?.removeEventListener('on_payment_event', (data) => {
        console.log(`Cleaning up iris-component listener`)
        console.log(data)
      })
    }
  }, [])

  if (!mount) return null
  return (
    <>
      <IrisPayComponent
        ref={irisComponentRef}
        {...stringifiedProps}
        backend={environment}
        hookhash={context.hookhash}
        userhash={context.userhash}
      />
    </>
  )
}

export function PaymentDataElement(props: ElementWithListener<IRISPaymentDataElementProps>) {
  return <IRISPaySDK {...props} type="payment-data" />
}

export function BudgetPaymentElement(props: ElementWithListener<IRISBudgetPaymentElementProps>) {
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
