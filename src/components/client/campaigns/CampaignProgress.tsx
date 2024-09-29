import React from 'react'

import { alpha, lighten, styled } from '@mui/material/styles'

import type { Theme } from '@mui/material'

import { UUID } from 'gql/types'
import theme from 'common/theme'
import { CampaignState } from './helpers/campaign.enums'

const PREFIX = 'CampaignProgress'

const classes = {
  root: `${PREFIX}-root`,
  bar: `${PREFIX}-bar`,
  donationProgress: `${PREFIX}-donationProgress`,
  label: `${PREFIX}-label`,
}

const ProgressBar = styled('div')(
  ({
    theme,
    progress = 0,
    labelSize = `0.81rem`,
    color,
    state,
  }: {
    theme?: Theme
    progress: number
    labelSize?: string
    color: string
    state: keyof typeof CampaignState
  }) => ({
    borderRadius: 10,
    backgroundColor: alpha(color, 0.4),
    height: `calc(${labelSize} * 1)`,
    [`&.${classes.donationProgress}`]: {
      width: '100%',
    },

    [`& .${classes.bar}`]: {
      borderRadius: 10,
      height: `calc(${labelSize} * 1)`,
      width: `${progress}%`,
      background: progress >= 100 ? '#5EDF8F' : color,
      transition: `width 400ms ease-out`,
    },

    [`& .${classes.label}`]: {
      paddingLeft: 5,
      paddingRight: 5,
      lineHeight: `calc(${labelSize} * 1)`,
      fontSize: labelSize,
      textAlign: 'right',
      color: theme?.palette.common.black,
      display: state === CampaignState.active ? 'block' : 'none',
    },
  }),
)

type Props = {
  state: keyof typeof CampaignState
  raised: number
  target: number
}
export default function CampaignProgress({ state, raised, target }: Props) {
  const percentage = Math.ceil((raised / target) * 100)
  const progressBarWidth = Math.min(percentage, 100)
  const progressBarColorMap = {
    [CampaignState.active]: theme.palette.primary.main,
    [CampaignState.partially_financed]: '#FFCB57',
    [CampaignState.paused]: '#FFCB57',
    [CampaignState.complete]: '#5EDF8F',
    [CampaignState.suspended]: '#FFCB57',
    [CampaignState.blocked]: '#D32F2F',
    [CampaignState.deleted]: '#D32F2F',
    [CampaignState.draft]: theme.palette.grey[500],
  }
  return (
    <ProgressBar
      state={state}
      role="progressbar"
      color={progressBarColorMap[state]}
      progress={progressBarWidth}
      labelSize="0.938rem"
      className={classes.donationProgress}
      aria-valuenow={percentage}
      aria-label={`Campaign progress bar`}
      aria-valuetext={`${percentage}% of target reached`}>
      <div className={classes.bar}>
        <div className={classes.label}>{Math.ceil(progressBarWidth)}%</div>
      </div>
    </ProgressBar>
  )
}
