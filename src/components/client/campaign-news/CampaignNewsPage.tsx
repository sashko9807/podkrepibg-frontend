import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import {
  Typography,
  Grid,
  PaginationItem,
  Divider,
  Card,
  CardContent,
  Pagination,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import EmailIcon from '@mui/icons-material/Email'

import theme from 'common/theme'
import { baseUrl, routes } from 'common/routes'
import { useCampaignNewsList } from 'common/hooks/campaign-news'
import Layout from 'components/client/layout/Layout'
import BreadcrumbWrapper from 'components/common/BreadcrumbWrapper'
import RenderSubscribeModal from '../notifications/GeneralSubscribeModal'
import {
  Subtitle,
  SubscribeButton,
  SubscribeHeading,
} from '../index/sections/PlatformStatisticsSection/PlatformStatisticsSection.styled'

import CampaignNewsList from './CampaignNewsList'

const PREFIX = 'CampaignsNewsPage'

const classes = {
  title: `${PREFIX}-title`,
  subheading: `${PREFIX}-subheading`,
  support: `${PREFIX}-support`,
  applyButton: `${PREFIX}-applyButton`,
  arrowIcon: `${PREFIX}-arrowIcon`,
}

const Root = styled(Layout)(({ theme }) => ({
  [`& .${classes.title}`]: {
    fontWeight: 500,
    fontSize: theme.typography.pxToRem(45),
    lineHeight: theme.typography.pxToRem(60),
    letterSpacing: theme.typography.pxToRem(-1.5),
    marginBottom: theme.spacing(1),
  },

  '.ql-video, img': {
    margin: '0 auto',
    display: 'block',
  },
}))

type Props = {
  page: number
  slug: string | null
}

export default function CampaignNewsPage({ page, slug = null }: Props) {
  const [subscribeIsOpen, setSubscribeOpen] = useState(false)
  const { data } = useCampaignNewsList(page, slug)
  const { t } = useTranslation('news')
  //TODO: Fill breadcumbs dynamically
  const breadcumbData = [
    { label: 'campaigns', url: routes.campaigns.index },
    { label: 'news', url: '' },
  ]
  if (slug && data) {
    breadcumbData.splice(1, 0, {
      label: data.campaign.campaignNews[0].title,
      url: routes.campaigns.viewCampaignBySlug(data.campaign.campaignNews[0].slug),
    })
  }

  return (
    <Root
      maxWidth={false}
      disableOffset
      sx={{
        padding: { xs: 0, md: theme.spacing(10) },
        marginTop: { xs: theme.spacing(5), sm: theme.spacing(10), md: 0 },
      }}
      prevPage={
        data?.pagination.prevPage
          ? `${baseUrl}${routes.campaigns.news.listNewsPaginated(data?.pagination.prevPage, slug)}`
          : undefined
      }
      nextPage={
        data?.pagination.nextPage
          ? `${baseUrl}${routes.campaigns.news.listNewsPaginated(data?.pagination.nextPage, slug)}`
          : undefined
      }>
      <Grid container direction={'column'} sx={{ padding: 0, maxWidth: 1172 }}>
        <Grid container item direction={'column'} md={12} gap={2}>
          <Grid item px={{ xs: 2 }}>
            <Typography variant="h1" component="h1" className={classes.title}>
              {t('news')}
            </Typography>
            <BreadcrumbWrapper crumb={breadcumbData} />
          </Grid>
          <Divider orientation="horizontal" sx={{ marginBottom: theme.spacing(4) }} />
        </Grid>
        <Grid container justifyContent={'flex-end'}>
          <Grid
            item
            justifyContent={'center'}
            xs={12}
            sm={11.1}
            sx={{ maxWidth: 1079 }}
            component={'section'}>
            {data && data?.campaign.campaignNews.length > 0 && (
              <CampaignNewsList articles={data.campaign.campaignNews} />
            )}
            <Grid container item justifyContent={'center'}>
              {data && data?.pagination.totalPages > 1 && (
                <Pagination
                  count={data?.pagination.totalPages}
                  page={data?.pagination.currentPage}
                  sx={{ ul: { justifyContent: 'center' }, marginTop: theme.spacing(6) }}
                  renderItem={(item) => {
                    if (item.disabled || !item.page) {
                      return <PaginationItem {...item} />
                    }
                    return (
                      <Link
                        href={routes.campaigns.news.listNewsPaginated(item.page, slug)}
                        passHref>
                        <PaginationItem {...item} />
                      </Link>
                    )
                  }}
                />
              )}
            </Grid>
            <Grid item my={2} mx={2}>
              <Card
                elevation={0}
                sx={{
                  border: `1px solid ${theme.borders.light}`,
                  borderRadius: theme.borders.semiRound,
                  [theme.breakpoints.up('md')]: {
                    border: 0,
                  },
                }}>
                <CardContent>
                  <Grid container justifyContent="space-between" alignItems={'center'}>
                    {subscribeIsOpen && <RenderSubscribeModal setOpen={setSubscribeOpen} />}
                    <Grid container item xs={12} justifyContent={'space-between'} gap={2}>
                      <Grid
                        container
                        item
                        direction={'column'}
                        md={6}
                        gap={2}
                        alignItems={'center'}>
                        <Grid container item alignItems={'center'} gap={1} wrap="nowrap">
                          <EmailIcon color="primary" fontSize="small" cursor="pointer" />
                          <Typography component={'h3'} fontSize={{ xs: 18, md: 25 }}>
                            {t('common:notifications.subscribe-monthly-newsletter')}
                          </Typography>
                        </Grid>
                        <Subtitle>{t('common:notifications.subscribeGeneralSubtext')}</Subtitle>
                      </Grid>
                      <Grid container item justifyContent={'center'} alignSelf={'center'} md={5}>
                        <SubscribeButton
                          onClick={() => setSubscribeOpen(true)}
                          variant="contained"
                          fullWidth>
                          {t('common:notifications.subscribe-general-newsletter-button')}
                        </SubscribeButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Root>
  )
}
