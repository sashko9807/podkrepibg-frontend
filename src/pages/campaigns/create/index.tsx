import { GetServerSideProps } from 'next'
import HSCreateCampaignPage from 'components/client/campaigns/HSCreateCampaignPage'

import { securedPropsWithTranslation } from 'middleware/auth/securedProps'
import { routes } from 'common/routes'
import NotFoundPage from 'pages/404'

export const getServerSideProps: GetServerSideProps = securedPropsWithTranslation(
  ['common', 'auth', 'validation', 'campaigns'],
  routes.campaigns.create,
)

export default HSCreateCampaignPage
