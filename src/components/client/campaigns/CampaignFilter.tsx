import React, { useMemo, useState } from 'react'
import { styled } from '@mui/material/styles'
import { Grid, IconButton, Typography } from '@mui/material'
import { useCampaignListReOrdered } from 'common/hooks/campaigns'
import CampaignsList from './CampaignsList'
import { CampaignResponse } from 'gql/campaigns'
import { CampaignTypeCategory } from 'components/common/campaign-types/categories'
import { useTranslation } from 'next-i18next'
import {
  Apartment,
  Brush,
  BusAlert,
  Category,
  FilterNone,
  Forest,
  MedicalServices,
  Pets,
  School,
  SportsTennis,
  TheaterComedy,
  VolunteerActivism,
} from '@mui/icons-material'
import theme from 'common/theme'

const PREFIX = 'CampaignFilter'

const classes = {
  filterButtons: `${PREFIX}-filterButtons`,
  filterButtonContainer: `${PREFIX}-filterButtonsCtn`,
}

const Root = styled('div')(() => ({
  [`& .${classes.filterButtonContainer}`]: {
    display: 'flex',
    justifyContent: 'center',
  },
  [`& .${classes.filterButtons}`]: {
    width: '100%',
    height: '80px',
    borderRadius: 0,
    borderBottom: '1px solid transparent',
    display: 'flex',
    flexDirection: 'column',

    '&:selected': {
      color: theme.palette.primary.light,
      borderBottom: `5px solid ${theme.palette.primary.light}`,
    },
    '&:active': {
      color: theme.palette.primary.light,
      borderBottom: `5px solid ${theme.palette.primary.light}`,
    },
    '&:focus': {
      color: theme.palette.primary.light,
      borderBottom: `5px solid ${theme.palette.primary.light}`,
      background: 'transperent',
    },
    '&:hover': {
      color: theme.palette.primary.light,
      borderBottom: `5px solid ${theme.palette.primary.light}`,
      backgroundColor: 'white',
    },
  },
}))

const categories: {
  [key in CampaignTypeCategory]: { icon?: React.ReactElement }
} = {
  medical: { icon: <MedicalServices fontSize="small" /> },
  charity: { icon: <VolunteerActivism fontSize="small" /> },
  disasters: { icon: <BusAlert fontSize="small" /> },
  education: { icon: <School fontSize="small" /> },
  events: { icon: <TheaterComedy fontSize="small" /> },
  environment: { icon: <Apartment fontSize="small" /> },
  sport: { icon: <SportsTennis fontSize="small" /> },
  art: { icon: <Brush fontSize="small" /> },
  animals: { icon: <Pets fontSize="small" /> },
  nature: { icon: <Forest fontSize="small" /> },
  others: {},
}

export default function CampaignFilter() {
  const { t } = useTranslation()

  const { data: campaigns } = useCampaignListReOrdered(true, 'campaignPage')
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')
  const campaignList = campaigns?.activeCampaigns.concat(campaigns.completedCampaigns)
  // TODO: add filters&sorting of campaigns so people can select based on personal preferences
  const campaignToShow = useMemo<CampaignResponse[]>(() => {
    if (selectedCategory === 'ALL') {
      return campaignList ?? []
    }
    const filteredCampaigns =
      campaignList?.filter((campaign) => campaign.campaignType.category === selectedCategory) ?? []
    return filteredCampaigns
  }, [campaigns, selectedCategory])

  return (
    <>
      <Grid
        container
        justifyContent={'center'}
        display={'flex'}
        component={'section'}
        aria-label="Campaign filters">
        <Root>
          <Grid container item sx={{ my: 5 }} maxWidth={'lg'}>
            {Object.values(CampaignTypeCategory).map((category) => {
              const count = campaignList?.reduce((acc, curr) => {
                return category === curr.campaignType.category ? acc + 1 : acc
              }, 0)
              return (
                <Grid item xs={6} md={2} className={classes.filterButtonContainer} key={category}>
                  <IconButton
                    key={category}
                    className={classes.filterButtons}
                    disabled={count === 0}
                    onClick={() => setSelectedCategory(category)}>
                    {categories[category].icon ?? <Category fontSize="small" />}
                    <Typography>
                      {t(`campaigns:filters.${category}`)} ({count})
                    </Typography>
                  </IconButton>
                </Grid>
              )
            })}
            <Grid item xs={6} md={2} className={classes.filterButtonContainer}>
              <IconButton
                className={classes.filterButtons}
                onClick={() => setSelectedCategory('ALL')}>
                <FilterNone fontSize="small" />
                <Typography>
                  {t(`campaigns:filters.all`)} ({campaignList?.length ?? 0})
                </Typography>
              </IconButton>
            </Grid>
          </Grid>
        </Root>
      </Grid>
      <CampaignsList campaignToShow={campaignToShow} />
    </>
  )
}
