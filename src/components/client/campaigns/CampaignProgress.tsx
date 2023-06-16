import React, { useMemo } from 'react'
import { styled } from '@mui/material/styles'
import LinearProgress from '@mui/material/LinearProgress'
import { Grid, Typography } from '@mui/material'
import { UUID } from 'gql/types'
import { moneyPublic } from 'common/util/money'

const PREFIX = 'CampaignProgress'

const classes = {
  root: `${PREFIX}-root`,
  bar: `${PREFIX}-bar`,
  donationProgress: `${PREFIX}-donationProgress`,
  cardActions: `${PREFIX}-cardActions`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`&.${classes.donationProgress}`]: {
    width: '100%',
    '> div p': {
      color: theme.palette.text.secondary,
    },
  },

  [`& .${classes.cardActions}`]: {
    padding: '0',
  },
  [`& .${classes.root}`]: {
    height: theme.spacing(2),
    borderRadius: 10
  },
}))

const BorderLinearProgress = LinearProgress

type Props = {
  campaignId: UUID
  isSuccess: boolean,
  raised: number
  target: number
}
export default function CampaignProgress({ campaignId, isSuccess, raised, target }: Props) {
  const percentage = useMemo(() => (raised / target) * 100, [raised, target])
  return (
    <StyledGrid className={classes.donationProgress} container>
      <Grid container item xs={12}>
        <Grid container item flexDirection={'row'} justifyContent={'space-between'}>
        <Typography component={'div'}>Събрани: {moneyPublic(raised, 'BGN')}</Typography>
        {
          !isSuccess ? <Typography>ЦЕЛ: {moneyPublic(target, 'BGN')}</Typography>  : <Typography>Успешна</Typography>     
        }
        </Grid>
        <Grid item xs={12}>

        <BorderLinearProgress
          variant="determinate"
          value={percentage > 100 ? 100 : percentage}
          aria-labelledby={`campaign-${campaignId}--donations-progressbar`}
          classes={{
            root: classes.root,
            bar: classes.bar,
          }}
        />
        </Grid>
      </Grid>
      {/* <Grid item xs={6}>
        <Typography gutterBottom color="primary" variant="body1" align="left">
          {money(raised)}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography gutterBottom color="primary" variant="body1" align="right">
          {money(target)}
        </Typography>
        {raised > target && (
          <Typography gutterBottom color="primary" variant="body1" align="right">
            (+ {money(raised - target)})
          </Typography>
        )}
      </Grid> */}
    </StyledGrid>
  )
}
