import { Card } from '@mui/material'
import { styled } from '@mui/material/styles'
import type { CardProps } from '@mui/material'

export const Root = styled(Card)<CardProps>(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'initial',
  boxShadow: 'none',
  position: 'relative',

  '&:hover': {
    filter: 'grayscale(15%)',
    backgroundColor: '#F8F8F8	',
  },
}))
