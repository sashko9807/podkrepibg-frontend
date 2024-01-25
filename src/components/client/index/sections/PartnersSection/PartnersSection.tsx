import { useTranslation } from 'next-i18next'

import { allPartners } from 'components/admin/partners/helpers/partnersData'

import { settings } from '../MediaSection/MediaCarouselSettings'

import { Heading } from '../../IndexPage.styled'
import { StyledPartnersSection, classes } from './PartnersSection.styled'
import Image from 'next/image'
import ExternalLink from 'components/common/ExternalLink'
import Carousel from 'components/common/Carousel'

export default function PartnersSection() {
  const { t } = useTranslation('index')

  return (
    <StyledPartnersSection aria-label="Partners of Podkrepi.bg">
      <Heading variant="h4" px={3} component={'h1'}>
        {t('partners-heading')}
      </Heading>
      <Carousel {...settings}>
        {allPartners.map((partner, index) => (
          <div data-testid={`${partner.name}`} key={index}>
            <ExternalLink href={partner.website} className={classes.container}>
              <Image src={partner.image} alt={partner.name} width={100} height={72} />
            </ExternalLink>
          </div>
        ))}
      </Carousel>
    </StyledPartnersSection>
  )
}
