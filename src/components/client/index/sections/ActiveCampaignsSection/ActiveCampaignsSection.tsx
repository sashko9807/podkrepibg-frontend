import { useTranslation } from 'next-i18next'

import { useCampaignListReOrdered } from 'common/hooks/campaigns'
import { routes } from 'common/routes'
import ActiveCampaignCard from './ActiveCampaignCard/ActiveCampaignCard'

import {
  Root,
  ActiveCampaignsWrapper,
  SeeAllButton,
  SeeAllButtonWrapper,
} from './ActiveCampaignsSection.styled'

export default function ActiveCampaignsSection() {
  const { t } = useTranslation('index')
  const { data } = useCampaignListReOrdered(true, 'indexPage')
  const activeCampaigns = data?.activeCampaigns.slice(0, 5)

  if (activeCampaigns === undefined) {
    return null
  } else {
    return (
      <Root aria-label="Active Campaigns">
        <ActiveCampaignsWrapper>
          {activeCampaigns?.map((campaign, index) => (
            <ActiveCampaignCard index={index} key={campaign.id} campaign={campaign} />
          ))}
        </ActiveCampaignsWrapper>{' '}
        <SeeAllButtonWrapper>
          <SeeAllButton href={routes.campaigns.index}>{t('campaign.see-all')}</SeeAllButton>
        </SeeAllButtonWrapper>
      </Root>
    )
  }
}
