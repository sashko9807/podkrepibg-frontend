import {
  Box,
  Card,
  CardActions,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
  CardContent,
  Stack,
  Button,
} from '@mui/material'
import { grey } from '@mui/material/colors'

import { styled } from '@mui/material/styles'

import { routes } from 'common/routes'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { formatDateString } from 'common/util/date'
import LinkButton from 'components/common/LinkButton'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CampaignProgress from './CampaignProgress'

const PREFIX = 'NewsCard'

const classes = {
    cardWrapper: `${PREFIX}-cardWrapper`,
    cardActionArea: `${PREFIX}-cardActionArea`,
    media: `${PREFIX}-media`,
    cardContent: `${PREFIX}-cardContent`,
    articleTitle: `${PREFIX}-articleTitle`,
    campaignTitle: `${PREFIX}-campaignTitle`,
    publishedDate: `${PREFIX}-publishedDate`
}

const StyledCard = styled(Card)(({ theme }) => ({
  [`&.${classes.cardWrapper}`]: {
    boxShadow: 'none',
    position: 'relative'

  },

  [`& .${classes.cardActionArea}`]: {
    '.MuiCardActionArea-focusHighlight' : {
        backgroundColor: 'transparent'
    }
  },
  [`& .${classes.media}`]: {
    width: '100%',
    overflow: 'hidden',
  },
  [`& .${classes.cardContent}`]: {
    marginTop:10,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  [`& .${classes.articleTitle}`] : {
    fontSize: 16,
    fontWeight: 500
  },
  [`& .${classes.campaignTitle}`]: {
    fontSize: 14,
    color: grey[600]
  },
}))


const pictureUrl = "/img/family.jpg"

export default function NewsCard() {
    const { t, i18n } = useTranslation()
    const isSucces = false

    return (
        <StyledCard className={classes.cardWrapper}>
                <CardMedia className={classes.media}>
                    <div style={{position: 'relative', aspectRatio: 4/3}}>
                        <Link href={'http://localhost:3040/test'} passHref>
                        <Image alt={'title'} src={pictureUrl} fill  />
                        </Link>
                 <LinkButton
                href={'test1234'}
                variant="contained"
                color="secondary"
                style={{position: 'absolute', zIndex:1, right: 10, bottom: 10}}
                >
                {t('Дарете')}
              </LinkButton>
                    </div>
                </CardMedia>
                <CardActionArea
                LinkComponent={Link}
                href={'http://localhost:3040/test'}
                data-testid={`article-card-${1}`}
                className={classes.cardActionArea}
                >
                <CardContent className={classes.cardContent}>
                <Grid container gap={1}>
                <CampaignProgress campaignId={'1234'} isSuccess={isSucces} raised={2000} target={5000} />                
                        <Typography textAlign={'left'}   className={classes.articleTitle}>
                            Това заглаваие като че ли е много добро
                        </Typography>               
                    <Box display={'inline-flex'} >
                        <Typography textAlign={'left'}  color="primary.light" fontSize={14}>
                            Научете повече
                        </Typography>               
                           <ArrowForwardIcon color='primary' fontSize='small'/>
                    </Box >
                </Grid>
                </CardContent>
                </CardActionArea>
        </StyledCard>
    )
}