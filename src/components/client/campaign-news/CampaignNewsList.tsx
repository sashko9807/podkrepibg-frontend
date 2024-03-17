import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { CampaignNewsResponse } from 'gql/campaign-news'
import { Button, Grid, Typography, Stack, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import AvTimerIcon from '@mui/icons-material/AvTimer'
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined'
import useMediaQuery from '@mui/material/useMediaQuery'
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
import { HTMLContentSeparator } from 'common/util/htmlUtils'
import { campaignListPictureUrl } from 'common/util/campaignImageUrls'
import { useViewCampaignById } from 'common/hooks/campaigns'
import { dateToTime, formatDateString } from 'common/util/date'
import { GetArticleDocuments, GetArticleGalleryPhotos } from 'common/util/newsFilesUrls'
import { CampaignTypeCategory } from 'components/common/campaign-types/categories'
import { QuillStypeWrapper } from 'components/common/QuillStyleWrapper'
import { useShowMoreContent } from './hooks/useShowMoreContent'
import { scrollToTop } from './utils/scrollToTop'
import { getArticleHeight } from './utils/getArticleHeight'
import Layout from '../layout/Layout'

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
}

const ArticleSection = styled(Grid)(({ theme }) => ({
  borderBottom: `1px solid`,
  borderBottomColor: '#CCCCCC',
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

    [theme.breakpoints.up('sm')]: {
      aspectRatio: 16 / 9,
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
    // fontSize: theme.typography.pxToRem(14),
    // fontWeight: 400,
    // [theme.breakpoints.up('sm')]: {
    //   fontSize: theme.typography.pxToRem(16),
    // },
  },

  [`& .${classes.articleHeader}`]: {
    fontSize: theme.typography.pxToRem(18),
    color: theme.palette.grey[900],
    fontWeight: 400,

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
  articles: CampaignNewsResponse[] | []
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
  const { t, i18n } = useTranslation()
  const router = useRouter()

  return (
    <>
      {articles?.map((article, index: number) => {
        // The next two lines should be uncommented finally
        // const documents = GetArticleDocuments(article.newsFiles)
        // const images = GetArticleGalleryPhotos(article.newsFiles)
        return (
          <ArticleSection item key={article.id}>
            <Grid container item direction={'row'} className={classes.innerContainer} gap={2}>
              <Grid item md={3} xs={5} className={classes.imageContainer}>
                <Image
                  src={images[index]}
                  alt={images[index]}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Grid>
              <Grid
                container
                item
                xs={6}
                md={8}
                justifyContent={'space-between'}
                direction={'column'}>
                <Grid item>
                  <Typography
                    sx={{ wordBreak: 'break-all', typography: { sm: 'body1', md: 'subtitle1' } }}
                    className={classes.campaignTitle}
                    variant="subtitle1"
                    color="primary.dark">
                    {article.campaign.title}
                  </Typography>
                  <Typography
                    // variant="h5"
                    className={classes.articleHeader}
                    sx={{ wordBreak: 'break-all', typography: { xs: 'h5', sm: 'h3' } }}
                    onClick={() =>
                      router.push(routes.campaigns.news.viewSingleArticle(article.slug))
                    }>
                    {article.title}
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  direction={'column'}
                  gap={1}
                  sx={{ display: { xs: 'none', sm: 'flex' } }}>
                  <Grid container item direction={'row'} columnSpacing={{ xs: 5, md: 9 }}>
                    <Grid container item xs="auto">
                      <StatusLabel variant="body2" display="inline" color="primary">
                        {t('campaign-types:grid.category')}
                      </StatusLabel>
                      <StatusText sx={{ wordBreak: 'break-word', whiteSpace: 'pre-line' }}>
                        {article.campaign.campaignType.category}
                      </StatusText>
                    </Grid>
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
                  </Grid>
                  <Grid
                    container
                    item
                    direction={'row'}
                    columnSpacing={{ xs: 5, md: 5 }}
                    flexWrap={'wrap'}>
                    <Grid container item xs={'auto'}>
                      <AvTimerIcon color="primary" />
                      <Typography variant="body2">
                        {formatDateString(article.publishedAt, i18n.language)} &nbsp;
                        {dateToTime(article.publishedAt, i18n.language)}
                      </Typography>
                    </Grid>
                    <Grid container item gap={1} xs="auto">
                      <SupervisedUserCircleOutlinedIcon color="primary" sx={{ float: 'left' }} />
                      <Typography className={classes.articleAuthor}>{article.author}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                item
                direction={'row'}
                xs="auto"
                gap={1}
                sx={{ display: { xs: 'flex', sm: 'none' } }}>
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
                <Grid container item direction={'row'} md="auto" gap={1}>
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
