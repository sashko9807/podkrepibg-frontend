import IrisElements from 'components/client/iris-pay/IRISPayContext'
import { PaymentDataElement } from 'components/client/iris-pay/IRISPaySDK'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

type DonationData = {
  wishId: string
  isAnonymous: string
  code: string
  type: string
}

type IRISPayCreateCustomerReq = {
  companyName?: string
  uic?: string
  name?: string
  middleName?: string
  family?: string
  identityHash?: string
  email: string
  webhookUrl?: string
}

type IRISPayCreateWebhookReq = {
  state?: string
  successUrl?: string
  errorUrl?: string
}

type CreateIrisCustomerResponse = {
  userHash: string
  idUrl: string | null
  identifyStatusUrl: string | null
  identifyToken: string | null
  identified: boolean
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { wish_id, is_anonymous, code, billingEmail, amount, userHash, hookHash, type } = ctx.query
  if (!is_anonymous || !code || !billingEmail || !amount)
    throw new Error(
      'Missing Payment Data.\n Please check if code,is_anonymous and email are set within the URL ',
    )
  const donationData: DonationData = {
    wishId: wish_id as string,
    isAnonymous: is_anonymous as string,
    code: code as string,
    type: type as string,
  }

  return {
    props: {
      paymentData: donationData,
      userHash,
      hookHash,
      amount: amount as string,
    },
  }
}

type IRISCheckoutPageProps = InferGetServerSidePropsType<typeof getServerSideProps>
export default function IRISCheckoutPage(props: IRISCheckoutPageProps) {
  return (
    <IrisElements
      backend="development"
      userhash={props.userHash}
      hookhash={props.hookHash}
      publicHash="f75fa38d-ca1b-4241-a01a-58965d444aba
">
      <PaymentDataElement
        payment_data={{
          sum: Number(props.amount),
          description: `${JSON.stringify(props.paymentData)}`,
          toIban: 'BG85IORT80947826532954',
        }}
      />
    </IrisElements>
  )
}
