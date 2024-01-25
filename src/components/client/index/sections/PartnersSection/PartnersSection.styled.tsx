import { styled } from '@mui/material/styles'

const PREFIX = 'PartnersSection'
export const classes = {
  container: `${PREFIX}-container`,
}
export const StyledPartnersSection = styled('section')(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  padding: theme.spacing(10, 0, 10),
  marginTop: theme.spacing(12),

  [`& .${classes.container}`]: {
    filter: 'grayscale(80%)',
    opacity: 0.8,
    display: 'flex',
    justifyContent: 'center',

    '&:hover': {
      filter: 'grayscale(0)',
      opacity: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
  },
}))
