import { Card } from '@mui/material'
import { styled } from '@mui/material/styles'

export const Root = styled(Card)(() => ({
  display: 'flex',
  flexDirection: 'column',
  boxShadow: 'none',
  position: 'relative',
  minWidth: 300,

  '&:hover': {
    filter: 'grayscale(15%)',
    backgroundColor: '#F8F8F8	',
  },
}))
