import theme from 'common/theme'

import { styled } from '@mui/material/styles'

const PREFIX = 'MediaSection'
export const classes = {
  wrapper: `${PREFIX}-wrapper`,
}

export const StyledMediaSection = styled('section')(() => ({
  backgroundColor: '#EAF4FC',
  padding: theme.spacing(10, 0, 10),

  [`& .${classes.wrapper}`]: {
    display: 'flex',
    justifyContent: 'center',
    background: theme.palette.background.default,
    filter: 'grayscale(80%)',
    opacity: 0.8,
    boxShadow:
      '0px 1px 8px 0px rgba(0, 0, 0, 0.12), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 3px 3px -2px rgba(0, 0, 0, 0.20)',

    '&:hover': {
      filter: 'grayscale(0)',
      opacity: 1,
    },
  },
}))
