import { Card, CardActionArea, CardMedia, Grid, Typography, CardContent } from '@mui/material'
import { grey } from '@mui/material/colors'

import { styled } from '@mui/material/styles'

import { routes } from 'common/routes'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import LinkButton from 'components/common/LinkButton'
import CampaignProgress from './CampaignProgress'
import { CampaignResponse } from 'gql/campaigns'
import { campaignListPictureUrl } from 'common/util/campaignImageUrls'
import { moneyPublic } from 'common/util/money'
import { useMemo } from 'react'
import { CampaignState } from './helpers/campaign.enums'
import SuccessfullCampaignTag from './SuccessfullCampaignTag'

const PREFIX = 'CampaignCard'

const classes = {
  cardWrapper: `${PREFIX}-cardWrapper`,
  cardActionArea: `${PREFIX}-cardActionArea`,
  media: `${PREFIX}-media`,
  cardContent: `${PREFIX}-cardContent`,
  campaignTitle: `${PREFIX}-campaignTitle`,
  publishedDate: `${PREFIX}-publishedDate`,
  supportNowButton: `${PREFIX}-supportNowButton`,
}

const StyledCard = styled(Card)(() => ({
  [`&.${classes.cardWrapper}`]: {
    boxShadow: 'none',
    position: 'relative',
  },

  [`& .${classes.cardActionArea}`]: {
    '.MuiCardActionArea-focusHighlight': {
      backgroundColor: 'transparent',
    },
  },

  [`& .${classes.supportNowButton}`]: {
    position: 'absolute',
    zIndex: 1,
    right: 10,
    bottom: 10,
  },
  [`& .${classes.media}`]: {
    width: '100%',
    overflow: 'hidden',
  },
  [`& .${classes.cardContent}`]: {
    marginTop: 10,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  [`& .${classes.campaignTitle}`]: {
    fontSize: 16,
    fontWeight: 500,
  },
  [`& .${classes.campaignTitle}`]: {
    fontSize: 14,
    color: grey[600],
  },
}))

type Props = { campaign: CampaignResponse; index: number }

export default function CampaignCard({ campaign, index }: Props) {
  const { t } = useTranslation()

  const {
    id,
    targetAmount: target,
    summary,
    currency,
    state: campaignState,
    allowDonationOnComplete,
    slug,
    title,
  } = campaign

  const pictureUrl = campaignListPictureUrl(campaign)
  const reached = summary ? summary.reachedAmount : 0
  const percentage = useMemo(() => Math.ceil((reached / target) * 100), [target, reached])

  return (
    <StyledCard className={classes.cardWrapper}>
      <CardMedia className={classes.media}>
        <div style={{ position: 'relative', aspectRatio: 4 / 3 }}>
          <Link href={routes.campaigns.viewCampaignBySlug(slug)} passHref>
            <Image alt={'title'} src={pictureUrl} fill />
          </Link>
          {(campaignState !== CampaignState.complete || allowDonationOnComplete) && (
            <LinkButton
              href={routes.campaigns.oneTimeDonation(slug)}
              variant="contained"
              color="secondary"
              className={classes.supportNowButton}>
              {t('campaigns:cta.support')}
            </LinkButton>
          )}
          {campaignState === CampaignState.complete && <SuccessfullCampaignTag />}
        </div>
      </CardMedia>
      <CardActionArea
        LinkComponent={Link}
        href={routes.campaigns.viewCampaignBySlug(slug)}
        data-testid={`campaign-card-${index}`}
        className={classes.cardActionArea}>
        <CardContent className={classes.cardContent}>
          <Grid container gap={1}>
            <Grid container item justifyContent={'space-between'}>
              <Grid item>
                <Typography fontSize={14} fontWeight={600}>
                  {`${t('campaigns:campaign.reached')} ${moneyPublic(reached, currency)} `}
                </Typography>
                <Typography fontSize={14} fontWeight={400} fontStyle={'italic'} textAlign={'left'}>
                  {` ${t('или')} ${percentage}%`}
                </Typography>
              </Grid>
              <Grid item sx={{ px: 1 }}>
                <Typography fontSize={14} fontWeight={600} textAlign={'right'}>{`${t(
                  'campaigns:of',
                )} ${moneyPublic(target, currency)}`}</Typography>
                <Typography fontSize={14} fontWeight={400} fontStyle={'italic'} textAlign={'right'}>
                  {t('campaigns:campaign.of-goal')}
                </Typography>
              </Grid>
              <CampaignProgress campaignId={id} raised={reached} target={target} />
            </Grid>
            <Typography gutterBottom variant="h5" className={classes.campaignTitle}>
              {title}
            </Typography>
          </Grid>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  )
}
