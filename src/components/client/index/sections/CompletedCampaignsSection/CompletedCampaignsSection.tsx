import { useTranslation, i18n } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'

import { useCampaignListReOrdered } from 'common/hooks/campaigns'
import { campaignListPictureUrl } from 'common/util/campaignImageUrls'
import { routes } from 'common/routes'
import { settings } from './helpers/CompletedCampaignsCarouselSettings'
import { moneyPublic } from 'common/util/money'
import DoneIcon from '@mui/icons-material/Done'

import { Heading } from '../../IndexPage.styled'
import { Root, classes } from './CompletedCampaignsSection.styled'
import Carousel from 'components/common/Carousel'
import { Typography } from '@mui/material'
import { Box } from '@mui/material'

export default function CompletedCampaignsSection() {
  const { t } = useTranslation('campaigns')
  const { data } = useCampaignListReOrdered(true, 'indexPage')

  const onLinkMouseDown = (e: React.ChangeEvent<unknown>) => {
    e.preventDefault()
  }
  return (
    <Root aria-label="Completed Campaigns">
      <Heading variant="h4" px={3} component={'h1'}>
        {t('completed-campaigns')}
      </Heading>
      <Carousel {...settings} className={classes.carouselContainer}>
        {data?.completedCampaigns.map((campaign, index) => {
          return (
            <div
              className={classes.campaignCardWrapper}
              key={index}
              data-testid={`completed-campaign-${index}`}>
              <Link href={routes.campaigns.viewCampaignBySlug(campaign.slug)} prefetch={false}>
                <div
                  className={classes.campaignCardImageContainer}
                  onMouseDown={onLinkMouseDown}
                  style={{ position: 'relative', width: '100%', aspectRatio: 1 }}>
                  <Image
                    fill
                    alt={campaign.title}
                    src={campaignListPictureUrl(campaign)}
                    sizes="(min-width: 2000px) 312px, (min-width: 1200px) calc(30vw - 38px), (min-width: 900px) calc(40.57vw - 29px), (min-width: 600px) calc(50vw - 28px), calc(100vw - 32px)"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={classes.campaignCardSumContainer}>
                  <span className={classes.campaignCardSumText}>
                    {i18n?.language === 'bg'
                      ? moneyPublic(campaign.summary.reachedAmount).split(',')[0] + ' лв.'
                      : moneyPublic(campaign.summary.reachedAmount).split('.')[0]}
                  </span>
                  <div className={classes.campaignCardLabelContainer}>
                    <DoneIcon className={classes.campaignCardLabelIcon} />
                    <Typography className={classes.campaignCardLabelText}>
                      {t('successfull-label')}
                    </Typography>
                  </div>
                </div>
                <Box className={classes.campaignCardProgressBar} width={1} />
                <Typography component="h2" className={classes.campaginCardTitleText}>
                  {campaign.title}
                </Typography>
              </Link>
            </div>
          )
        })}
      </Carousel>
    </Root>
  )
}
