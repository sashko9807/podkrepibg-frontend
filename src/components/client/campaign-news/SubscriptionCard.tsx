import { Card, CardContent, Grid, Typography } from '@mui/material'
import theme from 'common/theme'
import React, { useState } from 'react'
import RenderSubscribeModal from '../notifications/GeneralSubscribeModal'
import {
  SubscribeButton,
  Subtitle,
} from '../index/sections/PlatformStatisticsSection/PlatformStatisticsSection.styled'
import { useTranslation } from 'next-i18next'
import EmailIcon from '@mui/icons-material/Email'

export default function SubscriptionCard() {
  const [subscribeIsOpen, setSubscribeOpen] = useState(false)
  const { t } = useTranslation()
  return (
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
            <Grid container item direction={'column'} md={6} gap={2} alignItems={'center'}>
              <Grid container item alignItems={'center'} gap={1} wrap="nowrap">
                <EmailIcon color="primary" fontSize="small" cursor="pointer" />
                <Typography component={'h3'} fontSize={{ xs: 18, md: 25 }}>
                  {t('common:notifications.subscribe-monthly-newsletter')}
                </Typography>
              </Grid>
              <Subtitle>{t('common:notifications.subscribeGeneralSubtext')}</Subtitle>
            </Grid>
            <Grid container item justifyContent={'center'} alignSelf={'center'} md={5}>
              <SubscribeButton onClick={() => setSubscribeOpen(true)} variant="contained" fullWidth>
                {t('common:notifications.subscribe-general-newsletter-button')}
              </SubscribeButton>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
