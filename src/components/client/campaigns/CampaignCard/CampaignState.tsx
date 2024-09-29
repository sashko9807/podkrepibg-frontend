import React from 'react'
import { CampaignState } from '../helpers/campaign.enums'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined'
import BackHandOutlinedIcon from '@mui/icons-material/BackHandOutlined'
import TonalityIcon from '@mui/icons-material/Tonality'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'

type CampaignStateTextProps = {
  state: CampaignState
}
export default function CampaignStateText({ state }: CampaignStateTextProps) {
  const { t } = useTranslation('campaigns')
  const campaignStateIconMap = {
    [CampaignState.complete]: <CheckCircleOutlineIcon />,
    [CampaignState.partially_financed]: <TonalityIcon />,
    [CampaignState.suspended]: <BackHandOutlinedIcon />,
    [CampaignState.paused]: <PauseCircleOutlineOutlinedIcon />,
    [CampaignState.blocked]: <CancelOutlinedIcon />,
  }
  return (
    <Box display="flex" justifyContent={'flex-start'} alignItems={'center'} gap={1} py={0.5}>
      <Typography color="black" fontSize={'1rem'}>
        {t('status')}:
      </Typography>
      <Box>
        <Typography
          color="black"
          display="flex"
          alignItems={'center'}
          fontSize={'1rem'}
          gap={0.5}
          fontWeight={500}>
          {t(`campaign-status.${state}`)}
          {campaignStateIconMap[state]}
        </Typography>
      </Box>
    </Box>
  )
}
