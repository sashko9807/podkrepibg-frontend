import { Session, getServerSession } from 'next-auth'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { QueryClient, dehydrate } from '@tanstack/react-query'

import IndexPage from 'components/client/index/IndexPage'
import { TCampaignList, campaignListReOrderedQueryFn } from 'common/hooks/campaigns'

import { endpoints } from 'service/apiEndpoints'

import { authOptions } from './api/auth/[...nextauth]'

export const getServerSideProps: GetServerSideProps<{
  session: Session | null
}> = async (ctx) => {
  const client = new QueryClient()
  const serverSession = getServerSession(ctx.req, ctx.res, authOptions)

  const result = await Promise.allSettled([
    client.prefetchQuery<TCampaignList>(
      [endpoints.campaign.listCampaigns.url, 'indexPage'],
      campaignListReOrderedQueryFn,
    ),
    serverSession,
  ])

  //Get session value if promise is fullfilled. Null otherwise
  const session = result[1].status === 'fulfilled' ? result[1].value : null

  //For getting session on server side the docs recommend using getServerSession as per
  //here: https://next-auth.js.org/configuration/nextjs#getserversession
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? 'bg', [
        'common',
        'index',
        'campaigns',
        'validation',
        'auth',
      ])),
      session,
      dehydratedState: dehydrate(client),
    },
  }
}

export default IndexPage
