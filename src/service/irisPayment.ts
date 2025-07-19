import { useMutation } from '@tanstack/react-query'
import { appClient } from 'service/apiClient'

export type PaymentSessionResponse = {
  hookHash: string
  userHash: string
}

export type IrisCreateCustomerDto = {
  companyName?: string
  uic?: string
  name?: string
  middleName?: string
  family?: string
  identityHash?: string
  email: string
  webhookUrl?: string
  campaignId: string
  successUrl?: string
  errorUrl?: string
}

export function useStartPaymentSession() {
  return useMutation({
    mutationFn: async () => {
      return await appClient.post('/api/payments/start')
    },
  })
}

export function useCreatePaymentSession() {
  return useMutation({
    mutationFn: async (data: IrisCreateCustomerDto) => {
      const response = await appClient.post<PaymentSessionResponse>(
        '/api/payments/create-payment-session',
        data,
        { withCredentials: true },
      )
      return response.data
    },
  })
}

export type FinishPaymentMetadataDto = {
  campaignId: string
  personId: string | null
  isAnonymous: 'true' | 'false'
  type: string
}

export type FinishPaymentDto = {
  hookHash: string
  status: string
  amount: number
  billingName?: string
  billingEmail?: string
  metadata: FinishPaymentMetadataDto
}

export function useCompletePayment() {
  return useMutation({
    mutationFn: async (data: FinishPaymentDto) => {
      const response = await appClient.post('/api/payments/complete', data, {
        withCredentials: true,
      })
      return response.data
    },
  })
}
