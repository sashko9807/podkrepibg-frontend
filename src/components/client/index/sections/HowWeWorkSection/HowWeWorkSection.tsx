import React from 'react'

import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import { Grid, Hidden } from '@mui/material'

import { Root } from './HowWeWorkSection.styled'
import { Heading, InfoText } from 'components/client/index/IndexPage.styled'

export default function HowWeWorkSection() {
  const { t, i18n } = useTranslation('index')

  const mobileInfographicPath = `/infographic-${i18n?.language}-mobile.svg`
  const desktopInfographicPath = `/infographic-${i18n?.language}.svg`

  return (
    <Root aria-label="How does Pordkprepi.bg work">
      <Heading variant="h4" px={3} component={'h1'}>
        {t('how-we-work.heading')}
      </Heading>
      <InfoText maxWidth="lg" px={3}>
        {t('how-we-work.text')}
      </InfoText>
      <Grid>
        <Hidden mdUp>
          {/* A11Y TODO: Render the svg without an <Image /> so screenreaders can read it out */}
          <Image alt="Podkrepi infographic" src={mobileInfographicPath} width={320} height={1000} />
        </Hidden>
        <Hidden mdDown>
          {/* A11Y TODO: Render the svg without an <Image /> so screenreaders can read it out */}
          <Image alt="How we work" src={desktopInfographicPath} width={900} height={1000} />
        </Hidden>
      </Grid>
    </Root>
  )
}
