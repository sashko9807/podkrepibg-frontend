import React, { forwardRef } from 'react'

export type SupportedCurrencies = 'BGN' | 'EUR' | 'RON'

export type PaymentData = {
  sum: number
  publicHash?: string
  description: string
  currency?: string
  toIban: string
  merchant: string
  useOnlySelectedBankHashes?: string | null
}

type BudgetPayment = {
  identifierType: string
  identifier: 'EIK' | 'EGN' | 'LNC'
  ultimateDebtor: string
}

type IRISPaymentData = {
  type: 'payment-data'
  payment_data?: PaymentData
  show_bank_selector?: boolean
}

type IRISAddIbanWithBank = { type: 'add-iban-with-bank'; ibanhookhash?: string; bankhash: string }
type IrisAddIban = { type: 'add-iban'; show_bank_selector?: boolean; ibanhookhash?: string }
type IrisBudgetPayment = { type: 'budget-payment'; payment_data: PaymentData & BudgetPayment }
type IRISPaymentElement = { type: 'payment'; payment_data: PaymentData & BudgetPayment }
type IRISPayWithCodeElement = { type: 'pay-with-code'; code: string }

type IRISPayTypes =
  | IRISPaymentElement
  | IrisBudgetPayment
  | IrisAddIban
  | IRISAddIbanWithBank
  | IRISPaymentData
  | IRISPayWithCodeElement

export type IRISSupportedLangs = 'bg' | 'en' | 'ro' | 'el' | 'hr' | 'cy'
export type IRISSupportedCountries = 'bulgaria' | 'romania' | 'greece' | 'croatia' | 'cyprus'
export type IRISBackend = 'https://developer.sandbox.irispay.bg/' | 'https://developer.irispay.bg/'
type IrisPayComponentCommon = {
  userhash: string
  lang?: IRISSupportedLangs
  backend: IRISBackend
  country?: IRISSupportedCountries
  show_bank_selector?: boolean
  bankhash?: string
  hookhash: string
  ibanhookhash?: string
  redirect_url?: string
  redirect_timeout?: string
  pagination_options?: {
    start_page_items: number
    increase_per_click: number
  }
  header_options?: string
}

type IRISPaySDK = Omit<IrisPayComponentCommon, 'userhash' | 'backend' | 'hookhash'>
export type IRISPayCommonProps = IRISPaySDK & IRISPayTypes

export type IRISBudgetPaymentElementProps = IRISPaySDK & Omit<IrisBudgetPayment, 'type'>
export type IRISAddIbanElementProps = IRISPaySDK & Omit<IrisAddIban, 'type'>
export type IRISAddIbanWithBankElementProps = IRISPaySDK & Omit<IRISAddIbanWithBank, 'type'>
export type IRISPaymentDataElementProps = IRISPaySDK & Omit<IRISPaymentData, 'type'>
export type IRISPayWithCodeElementProps = IRISPaySDK & Omit<IRISPayWithCodeElement, 'type'>

export type IrisPayComponentProps = IrisPayComponentCommon & IRISPayTypes
export type IrisWithRefProp = {
  [key in keyof IrisPayComponentProps]: string
}

export type BankList = {
  bankHash: string
  name: string
  fullName: string
  bic: string
  services: string
  country: IRISSupportedCountries
}

export interface IrisHookHash {
  date: Date
  payeeName: string
  payerName: string
  payerBank: PayeBank
  payeeBank: PayeBank
  description: string
  sum: string
  payerIban: string
  payeeIban: string
  id: string
  currency: string
  status: string
  reasonForFail: string
}

export interface PayeBank {
  bankHash: string
  name: string
  country: string
}

const IrisPayComponent = forwardRef((props: IrisWithRefProp, headingRef) => {
  return React.createElement('irispay-component', { ref: headingRef, ...props })
})

export default IrisPayComponent
