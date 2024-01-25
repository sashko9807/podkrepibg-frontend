import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { dehydrate, QueryClient } from '@tanstack/react-query'

import CampaignsPage from 'components/client/campaigns/CampaignsPage'
import { campaignListReOrderedQueryFn, TCampaignList } from 'common/hooks/campaigns'
import { prefetchCampaignTypesList } from 'service/campaignTypes'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps: GetServerSideProps = async (params) => {
  const client = new QueryClient()
  await Promise.all([
    prefetchCampaignTypesList(client),
    client.prefetchQuery<TCampaignList>(
      [endpoints.campaign.listCampaigns.url, 'campaignPage'],
      campaignListReOrderedQueryFn,
    ),
  ])
  return {
    props: {
      ...(await serverSideTranslations(params.locale ?? 'bg', [
        'common',
        'auth',
        'validation',
        'campaigns',
      ])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default CampaignsPage
