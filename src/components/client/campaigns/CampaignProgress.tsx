import React from 'react'

import { darken, lighten, styled } from '@mui/material/styles'

import type { Theme } from '@mui/material'

import { UUID } from 'gql/types'

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
  }: {
    theme?: Theme
    progress: number
    labelSize?: string
    color: string
  }) => ({
    backgroundColor: lighten(color, 0.8),
    borderRadius: 10,
    height: `calc(${labelSize} * 1)`,
    [`&.${classes.donationProgress}`]: {
      width: '100%',
    },

    [`& .${classes.bar}`]: {
      borderRadius: 10,
      height: `calc(${labelSize} * 1)`,
      width: `${progress}%`,
      background: progress >= 100 ? '#62DE88' : darken(color, 1),
      transition: `width 400ms ease-out`,
    },

    [`& .${classes.label}`]: {
      paddingLeft: 5,
      paddingRight: 5,
      lineHeight: `calc(${labelSize} * 1)`,
      fontSize: labelSize,
      textAlign: 'right',
      color: theme?.palette.common.black,
    },
  }),
)

type Props = {
  campaignId: UUID
  raised: number
  target: number
}
export default function CampaignProgress({ campaignId, raised, target }: Props) {
  const percentage = Math.ceil((raised / target) * 100)
  const progressBarWidth = Math.min(percentage, 100)

  return (
    <ProgressBar
      role="progressbar"
      color={'#b1defe'}
      progress={progressBarWidth}
      className={classes.donationProgress}
      aria-valuenow={percentage}
      aria-label={`Campaign progress bar`}
      aria-valuetext={`${percentage}% of target reached`}>
      <div className={classes.bar}>
        <div className={classes.label}>{Math.ceil(percentage)}%</div>
      </div>
    </ProgressBar>
  )
}
