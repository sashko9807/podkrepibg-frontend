import Stripe from 'stripe'
import { useViewCampaign } from 'common/hooks/campaigns'

import { DonationFlowForm } from './DonationFlowForm'
import { DonationFlowProvider } from './contexts/DonationFlowProvider'
import { StripeElementsProvider } from './contexts/StripeElementsProvider'
import DonationFlowLayout from './DonationFlowLayout'
import { CampaignResponse } from 'gql/campaigns'
import IrisElements from '../iris-pay/IRISPayContext'

export default function DonationFlowPage({
  slug,
  setupIntent,
}: {
  slug: string
  setupIntent: Stripe.SetupIntent
}) {
  const { data } = useViewCampaign(slug)
  //This query needs to be prefetched in the pages folder
  //otherwise on the first render the data will be undefined
  const campaign = data?.campaign as CampaignResponse
  return (
    <DonationFlowProvider campaign={campaign} setupIntent={setupIntent}>
      <IrisElements
        backend="development"
        country="bulgaria"
        publicHash="f75fa38d-ca1b-4241-a01a-58965d444aba"
        currency="BGN">
        <StripeElementsProvider>
          <DonationFlowLayout campaign={campaign}>
            <DonationFlowForm />
          </DonationFlowLayout>
        </StripeElementsProvider>
      </IrisElements>
    </DonationFlowProvider>
  )
}
