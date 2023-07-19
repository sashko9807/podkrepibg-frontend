import React, { useMemo } from 'react'

import { styled } from '@mui/material/styles'
import LinearProgress from '@mui/material/LinearProgress'
import { Box, Grid, Theme, Typography } from '@mui/material'

import { UUID } from 'gql/types'

const PREFIX = 'CampaignProgress'

const classes = {
  root: `${PREFIX}-root`,
  bar: `${PREFIX}-bar`,
  donationProgress: `${PREFIX}-donationProgress`,
  cardActions: `${PREFIX}-cardActions`,
}

const StyledGrid = styled(Grid)(({ theme }: { theme: Theme }) => ({
  [`&.${classes.donationProgress}`]: {
    width: '100%',
  },

  [`& .${classes.root}`]: {
    minHeight: theme.spacing(1.7),
    borderRadius: 10,
  },

  [`& .${classes.bar}`]: {
    borderRadius: 10,
  },

  [`& .${classes.cardActions}`]: {
    padding: '0',
  },
}))

const BorderLinearProgress = LinearProgress

type Props = {
  campaignId: UUID
  raised: number
  target: number
}
export default function CampaignProgress({ campaignId, raised, target }: Props) {
  const percentage = useMemo(() => (raised / target) * 100, [raised, target])
  const progressBarTextWidth = percentage > 100 ? 100 : percentage

  return (
    <StyledGrid className={classes.donationProgress} container>
      <Grid item xs={12}>
        <Box
          style={{
            position: 'relative',
            width: `${progressBarTextWidth}%`,
            height: 0,
            zIndex: 1,
          }}
          sx={{ px: 0.5 }}>
          <Typography
            fontSize={14}
            sx={{
              textAlign: 'right',
            transform: 'translateY(-17%)',
            }}>
            {Math.ceil(percentage)}%
          </Typography>
        </Box>
        <BorderLinearProgress
          variant="determinate"
          value={percentage >= 100 ? 100 : percentage}
          aria-labelledby={`campaign-${campaignId}--donations-progressbar`}
          classes={{
            root: classes.root,
            bar: classes.bar,
          }}
          sx={{
            '.MuiLinearProgress-bar': { background: percentage >= 100 ? '#62DE88' : 'primary' },
          }}
        />
      </Grid>
    </StyledGrid>
  )
}
