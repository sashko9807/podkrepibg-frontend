import styled from '@emotion/styled'

import theme from 'common/theme'

const PREFIX = 'CompletedCampaignSection'
export const classes = {
  carouselContainer: `${PREFIX}-carouselContainer`,
  campaignCardWrapper: `${PREFIX}-campaignCardContainer`,
  campaignCardImageContainer: `${PREFIX}-containerImage`,
  campaignCardImage: `${PREFIX}-campaignCardImage`,
  campaginCardTitleText: `${PREFIX}-campaginCardTitle`,
  campaignCardSumContainer: `${PREFIX}-campaignCardSumContainer`,
  campaignCardSumText: `${PREFIX}-campaignCardSum`,
  campaignCardSuccessText: `${PREFIX}-campaignCardSuccessText`,
  campaignCardProgressBar: `${PREFIX}-campaignCardProgressBar`,
  campaignCardLabelContainer: `${PREFIX}-campaignCardSuccessContainer`,
  campaignCardLabelIcon: `${PREFIX}-campaignCardSuccessIcon`,
  campaignCardLabelText: `${PREFIX}-campaignCardLabelText`,
}

export const Root = styled('section')(() => ({
  marginTop: theme.spacing(12),
  padding: theme.spacing(0, 2),

  [`& .${classes.carouselContainer}`]: {
    margin: '0 auto',
    maxWidth: theme.spacing(162),

    '.slick-list': {
      paddingBottom: theme.spacing(3),
    },

    '.slick-dots li button::before': {
      fontSize: theme.typography.pxToRem(10),
      color: '#D9D9D9',
      opacity: 1,
    },

    '.slick-dots li.slick-active button::before': {
      fontSize: theme.typography.pxToRem(10),
      color: '#B0E5FF',
      opacity: 1,
    },

    '.slick-slide[aria-hidden=false]': {
      visibility: 'visible',
    },

    '.slick-slide[aria-hidden=true]': {
      visibility: 'hidden',
      animation: 'fadeIn 400ms',
    },

    '@keyframes fadeIn': {
      from: { visibility: 'visible' },
      to: { visibility: 'hidden' },
    },
  },

  [`& .${classes.campaignCardWrapper}`]: {
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, 1.25),
      paddingRight: theme.spacing(2.5),
    },

    '&:hover': {
      opacity: 0.9,
    },
  },
  [`& .${classes.campaignCardImageContainer}`]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: theme.spacing(37.5),
    backgroundSize: 'cover',
  },
  [`& .${classes.campaginCardTitleText}`]: {
    fontSize: theme.typography.pxToRem(16),
    color: theme.palette.common.black,
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 400,
    margin: theme.spacing(1, 0, 0),
  },
  [`& .${classes.campaignCardSumContainer}`]: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    padding: theme.spacing(0.6, 0),
    color: theme.palette.common.black,
    fontFamily: 'Montserrat, sans-serif',
    fontSize: theme.typography.pxToRem(17),
  },

  [`& .${classes.campaignCardSumText}`]: {
    fontWeight: 700,
    fontSize: theme.typography.pxToRem(16),
    fontFamily: 'sans-serif',
  },
  [`& .${classes.campaignCardLabelContainer}`]: {
    display: 'flex',
    textTransform: 'uppercase',
    color: '#616161',
  },

  [`& .${classes.campaignCardLabelIcon}`]: {
    fontSize: theme.typography.pxToRem(21),
    marginRight: theme.spacing(0.5),
  },
  [`& .${classes.campaignCardLabelText}`]: {
    fontWeight: 700,
    fontSize: theme.typography.pxToRem(16),
  },
  [`& .${classes.campaignCardProgressBar}`]: {
    background: '#62DE88',
    borderRadius: theme.borders.round,
    height: theme.spacing(2),
  },
}))
