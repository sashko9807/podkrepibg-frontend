import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { CampaignNewsListResponse } from 'gql/campaign-news'
import { Button, Grid, Typography, IconButton, GridProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import AvTimerIcon from '@mui/icons-material/AvTimer'
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import {
  Apartment,
  Brush,
  BusAlert,
  Category,
  Forest,
  MedicalServices,
  Pets,
  School,
  SportsTennis,
  TheaterComedy,
  VolunteerActivism,
} from '@mui/icons-material'
import theme from 'common/theme'
import { routes } from 'common/routes'

import { dateToTime, formatDateString } from 'common/util/date'
import { CampaignTypeCategory } from 'components/common/campaign-types/categories'
import Link from 'next/link'

const categories: {
  [key in CampaignTypeCategory]: { icon?: React.ReactElement }
} = {
  medical: { icon: <MedicalServices fontSize="small" color="primary" /> },
  charity: { icon: <VolunteerActivism fontSize="small" color="primary" /> },
  disasters: { icon: <BusAlert fontSize="small" color="primary" /> },
  education: { icon: <School fontSize="small" color="primary" /> },
  events: { icon: <TheaterComedy fontSize="small" color="primary" /> },
  environment: { icon: <Apartment fontSize="small" color="primary" /> },
  sport: { icon: <SportsTennis fontSize="small" color="primary" /> },
  art: { icon: <Brush fontSize="small" color="primary" /> },
  animals: { icon: <Pets fontSize="small" color="primary" /> },
  nature: { icon: <Forest fontSize="small" color="primary" /> },
  others: { icon: <Category fontSize="small" color="primary" /> },
}
const PREFIX = 'CampaignNewsSection'
const classes = {
  defaultPadding: `${PREFIX}-defaultPadding`,
  dateAndAuthorContainer: `${PREFIX}-dateAndAuthorContainer`,
  articleAuthor: `${PREFIX}-articleAuthorAndDate`,
  articlepublishedDate: `${PREFIX}-articlePublishedDate`,
  articleHeader: `${PREFIX}-articleHeader`,
  articleDescription: `${PREFIX}-articleDescription`,
  readMoreButton: `${PREFIX}-readMoreButton`,
  campaignTitle: `${PREFIX}-campaignTitle`,
  innerContainer: `${PREFIX}-innerContainer`,
  imageContainer: `${PREFIX}-imageContainer`,
  newsSummaryDekstop: `${PREFIX}-newsSummary--desktop`,
  newsSummaryMobile: `${PREFIX}-newsSummary--mobile`,
}

const ArticleSection = styled(Grid)<GridProps>(({ theme }) => ({
  borderBottom: `1px solid`,
  borderBottomColor: '#CCCCCC',
  display: 'grid',
  [`& .${classes.articleDescription}`]: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  [`& .${classes.innerContainer}`]: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(1),
  },

  [`& .${classes.imageContainer}`]: {
    aspectRatio: 1,
    position: 'relative',
    maxHeight: 125,

    [theme.breakpoints.up('sm')]: {
      aspectRatio: 16 / 9,
      maxHeight: '100%',
    },
  },

  [`& .${classes.articlepublishedDate}`]: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 400,
  },

  [`& .${classes.articleAuthor}`]: {
    fontSize: theme.typography.pxToRem(14),
    fontFamily: theme.typography.fontFamily,
    fontWeight: 400,

    [theme.breakpoints.down(450)]: {
      maxWidth: '20ch',
    },
  },

  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },

  [`& .${classes.campaignTitle}`]: {
    color: '#0098E3',
    fontWeight: 400,
  },

  [`& .${classes.articleHeader}`]: {
    fontSize: theme.typography.pxToRem(18),
    color: theme.palette.grey[900],
    fontWeight: 400,
    textDecoration: 'none',

    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(25),
      color: theme.palette.grey[800],
    },

    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },

  [`& .${classes.dateAndAuthorContainer}`]: {
    marginBottom: theme.spacing(2),
  },

  [`& .${classes.newsSummaryMobile}`]: {
    display: 'flex',
    [theme.breakpoints.up(751)]: {
      display: 'none',
    },
  },

  [`& .${classes.newsSummaryDekstop}`]: {
    display: 'none',
    [theme.breakpoints.up(751)]: {
      display: 'flex',
    },
  },

  [`& .${classes.readMoreButton}`]: {
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.primary.light,
    textDecoration: 'underline',
    padding: 0,
    margin: 0,
    position: 'relative',
    bottom: 5,
  },
}))

// These images are only for development stage
const images = ['/img/fox.jpg', '/img/squirrel.jpg', '/img/wolf.jpg']

type Props = {
  articles: CampaignNewsListResponse[] | []
}
const StatusText = styled(Typography)(() => ({
  fontSize: theme.typography.pxToRem(14),
}))
const StatusLabel = styled(Typography)(() => ({
  fontSize: theme.typography.pxToRem(14),
  fontWeight: 700,
  marginRight: theme.spacing(1),
}))

export default function CampaignNewsList({ articles }: Props) {
  const { t, i18n } = useTranslation('news')

  const router = useRouter()
  return (
    <>
      {articles?.map((article, index: number) => {
        // The next two lines should be uncommented finally
        // const documents = GetArticleDocuments(article.newsFiles)
        // const images = GetArticleGalleryPhotos(article.newsFiles)
        return (
          <ArticleSection item key={article.id} component="article" padding={1}>
            <Grid container item direction={'row'} className={classes.innerContainer} gap={2}>
              <Grid item md={3} xs={5} className={classes.imageContainer}>
                <Image src={images[index]} alt="" fill aria-hidden style={{ objectFit: 'cover' }} />
              </Grid>
              <Grid
                container
                item
                xs={6}
                md={8}
                justifyContent={'space-between'}
                direction={'column'}>
                <Grid item component={'header'}>
                  <Typography
                    component={'p'}
                    sx={{ wordBreak: 'break-all', typography: { sm: 'body1', md: 'subtitle1' } }}
                    className={classes.campaignTitle}
                    variant="subtitle1"
                    color="primary.dark">
                    {article.campaign.title}
                  </Typography>
                  <Typography
                    component={'h2'}
                    // tabIndex={0}
                    className={classes.articleHeader}
                    sx={{ wordBreak: 'break-all', typography: { xs: 'h5', sm: 'h3' } }}
                    onClick={() =>
                      router.push(routes.campaigns.news.viewSingleArticle(article.slug))
                    }>
                    <Link
                      href={routes.campaigns.news.viewSingleArticle(article.slug)}
                      style={{ textDecoration: 'none', color: 'inherit' }}>
                      {article.title}
                    </Link>
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  direction={'row'}
                  gap={{ xs: 2, md: 5 }}
                  className={classes.newsSummaryDekstop}>
                  <Grid
                    container
                    item
                    direction={'column'}
                    columnSpacing={{ xs: 5, md: 10 }}
                    xs="auto">
                    <Grid container item>
                      <StatusLabel variant="body2" display="inline" color="primary">
                        {t('campaign-types:grid.category')}
                      </StatusLabel>
                      <StatusText sx={{ wordBreak: 'break-word', whiteSpace: 'pre-line' }}>
                        {article.campaign.campaignType.category}
                      </StatusText>
                    </Grid>
                    <Grid container item>
                      <AvTimerIcon color="primary" aria-label="Published at" />
                      <Typography variant="body2">
                        {formatDateString(article.publishedAt, i18n.language)} &nbsp;
                        {dateToTime(article.publishedAt, i18n.language)}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    direction={'column'}
                    columnSpacing={{ xs: 5, md: 5 }}
                    flexWrap={'wrap'}
                    xs="auto">
                    <Grid container item xs={'auto'}>
                      <Grid item>
                        <StatusLabel variant="body2" display="inline" color="primary">
                          {t('campaigns:campaign.status')}
                        </StatusLabel>
                      </Grid>
                      <Grid item>
                        <StatusText>
                          {t(`campaigns:campaign-status.${article.campaign.state}`)}
                        </StatusText>
                      </Grid>
                    </Grid>
                    <Grid container item gap={1}>
                      <SupervisedUserCircleOutlinedIcon
                        color="primary"
                        aria-label="Author"
                        sx={{ float: 'left' }}
                      />
                      <Typography className={classes.articleAuthor}>{article.author}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                item
                direction={'column'}
                wrap="wrap"
                xs="auto"
                gap={1}
                className={classes.newsSummaryMobile}>
                <Grid container item direction={'column'} xs="auto">
                  <Grid container item gap={1} xs="auto">
                    <AvTimerIcon color="primary" />
                    <Typography className={classes.articlepublishedDate}>
                      {formatDateString(article.publishedAt, i18n.language)} &nbsp;
                      {dateToTime(article.publishedAt, i18n.language)}
                    </Typography>
                  </Grid>
                  <Grid container item gap={1}>
                    <SupervisedUserCircleOutlinedIcon color="primary" />
                    <Typography className={classes.articleAuthor}>{article.author}</Typography>
                  </Grid>
                </Grid>
                <Grid container item direction={'row'} xs="auto" md="auto" gap={1}>
                  <Grid container item xs="auto" gap={1}>
                    <Grid container item gap={1} xs="auto">
                      {
                        categories[article.campaign.campaignType.category as CampaignTypeCategory]
                          .icon
                      }
                      <StatusText>{article.campaign.campaignType.category}</StatusText>
                    </Grid>
                  </Grid>
                  <Grid container item xs="auto" gap={1}>
                    <AnalyticsIcon fontSize="small" color="primary" />
                    <StatusText>
                      {t(`campaigns:campaign-status.${article.campaign.state}`)}
                    </StatusText>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </ArticleSection>
        )
      })}
    </>
  )
}
