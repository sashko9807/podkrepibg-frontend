import { useTranslation } from 'next-i18next'

import Image from 'next/image'

import { articles } from 'components/admin/partners/helpers/mediaAboutUsData'

import { settings } from './MediaCarouselSettings'

import { Heading } from '../../IndexPage.styled'
import { StyledMediaSection, classes } from './MediaSection.styled'
import Carousel from 'components/common/Carousel'
import ExternalLink from 'components/common/ExternalLink'

export default function MediaSection() {
  const { t } = useTranslation('index')

  return (
    <StyledMediaSection aria-label="Media articles about Podkrepi.bg">
      <Heading variant="h4" component={'h1'} px={3}>
        {t('media-heading')}
      </Heading>
      <Carousel {...settings}>
        {articles.map((article, index) => (
          <div data-testid={`${article.title}`} key={index}>
            <ExternalLink href={article.url} className={classes.wrapper}>
              <Image src={article.img} alt={article.title} width={100} height={100} />
            </ExternalLink>
          </div>
        ))}
      </Carousel>
    </StyledMediaSection>
  )
}
