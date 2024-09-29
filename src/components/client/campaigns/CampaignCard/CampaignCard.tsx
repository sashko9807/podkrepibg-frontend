import { useTranslation, i18n } from 'next-i18next'
import { CampaignResponse } from 'gql/campaigns'

import { Box, Typography } from '@mui/material'

import { routes } from 'common/routes'
import { campaignListPictureUrl } from 'common/util/campaignImageUrls'
import { moneyPublic } from 'common/util/money'
import theme from 'common/theme'
import Link from 'components/common/Link'
import CampaignProgress from 'components/client/campaigns/CampaignProgress'
import SuccessfullCampaignTag from '../SuccessfullCampaignTag'
import { CampaignState } from '../helpers/campaign.enums'

import { Root } from './CampaignCard.styled'
import {
  CampaignTitle,
  DonateButton,
  StyledCardActions,
  StyledContent,
  Sum,
  SumNumber,
  SumWrapper,
} from '../../index/sections/ActiveCampaignsSection/ActiveCampaignCard/ActiveCampaignCard.styled'
import Image from 'next/image'
import CampaignStateText from './CampaignState'

type Props = { campaign: CampaignResponse; index: number }

export default function ActiveCampaignCard({ campaign, index }: Props) {
  const { t } = useTranslation('campaigns')
  const {
    id,
    slug,
    title,
    summary,
    targetAmount: target,
    state: campaignState,
    allowDonationOnComplete,
  } = campaign

  const campaignImagesUrl = campaignListPictureUrl(campaign)

  const reached = summary ? summary.reachedAmount + (summary.guaranteedAmount ?? 0) : 0
  const reachedAmount = moneyPublic(reached)
  const targetAmount = moneyPublic(campaign.targetAmount)
  const percentage = (reached / target) * 100

  return (
    <Root data-testid={`campaign-card-${index}`}>
      <Box
        position={'relative'}
        sx={{
          width: '100%',
          aspectRatio: 1.5,
          maxHeight: theme.spacing(27.9),
        }}>
        <Link href={routes.campaigns.viewCampaignBySlug(slug)}>
          <Image
            priority
            src={campaignImagesUrl}
            alt={title}
            fill
            sizes="(min-width: 2000px) 312px, (min-width: 1200px) calc(30vw - 38px), (min-width: 900px) calc(40.57vw - 29px), (min-width: 600px) calc(50vw - 28px), calc(100vw - 32px)"
            quality={index === 0 ? 100 : 75}
            style={{ objectFit: 'cover' }}
          />
        </Link>
      </Box>
      <StyledContent>
        <Link href={routes.campaigns.viewCampaignBySlug(slug)}>
          <Box my={1}>
            <CampaignStateText state={campaignState} />
            <CampaignProgress state={campaignState} raised={reached} target={target} />
          </Box>
          <SumWrapper>
            <Sum>
              <SumNumber>
                {i18n?.language === 'bg'
                  ? reachedAmount.split(',')[0] + ' лв.'
                  : reachedAmount.split('.')[0]}
              </SumNumber>
            </Sum>
            <Sum>
              <SumNumber>
                {i18n?.language === 'bg'
                  ? targetAmount.split(',')[0] + ' лв.'
                  : targetAmount.split('.')[0]}
              </SumNumber>
            </Sum>
          </SumWrapper>
          <CampaignTitle>{title}</CampaignTitle>
        </Link>
        {/* <StyledCardActions disableSpacing>
          <DonateButton
            href={routes.campaigns.viewCampaignBySlug(slug)}
            variant="contained"
            color="secondary">
            {t('Научи повече')}
          </DonateButton>
        </StyledCardActions> */}
      </StyledContent>
    </Root>
  )
}
