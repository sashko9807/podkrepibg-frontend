import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import Stripe from 'stripe'

import { endpoints } from 'service/apiEndpoints'
import { queryFnFactory } from 'service/restRequests'
import { CampaignResponse } from 'gql/campaigns'
import DonationFlowPage from 'components/client/donation-flow/DonationFlowPage'

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { slug } = ctx.query
  const client = new QueryClient()
  await client.prefetchQuery<CampaignResponse>(
    [endpoints.campaign.viewCampaign(String(slug)).url],
    queryFnFactory<CampaignResponse>(),
  )
  await client.prefetchQuery(
    [endpoints.donation.singlePrices.url],
    queryFnFactory<Stripe.Price[]>(),
  )

  return {
    props: {
      slug,
      dehydratedState: dehydrate(client),
      ...(await serverSideTranslations(ctx.locale ?? 'bg', [
        'common',
        'auth',
        'validation',
        'campaigns',
        'donation-flow',
      ])),
    },
  }
}

export default DonationFlowPage
