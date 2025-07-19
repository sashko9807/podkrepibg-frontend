import { useTranslation } from 'next-i18next'

import Layout from 'components/client/layout/Layout'
import ActiveCampaignsSection from './sections/ActiveCampaignsSection/ActiveCampaignsSection'
import CompletedCampaignsSection from './sections/CompletedCampaignsSection/CompletedCampaignsSection'
import PlatformStatisticsSection from './sections/PlatformStatisticsSection/PlatformStatisticsSection'
import MediaSection from './sections/MediaSection/MediaSection'
import HowWeWorkSection from './sections/HowWeWorkSection/HowWeWorkSection'
import PartnersSection from './sections/PartnersSection/PartnersSection'
import SubscriptionSection from './sections/SubscriptionSection/SubscriptionSection'
import TeamMembersSection from './sections/TeamMembersSection/TeamMembersSection'
import JoinPodkrepiBgSection from './sections/JoinPodkrepiBgSection/JoinPodkrepiBgSection'
import FaqSection from './sections/FaqSection/FaqSection'
import IrisElements, { IRISPayContext } from '../iris-pay/IRISPayContext'
import { PaymentDataElement } from '../iris-pay/IRISPaySDK'

export default function IndexPage() {
  const { t } = useTranslation('index')
  return (
    <Layout
      maxWidth={false}
      disableOffset
      disableGutters
      title={t('title')}
      metaDescription={t('metaDescription')}>
      <ActiveCampaignsSection />
      <CompletedCampaignsSection />
      <PlatformStatisticsSection />
      <MediaSection />
      <HowWeWorkSection />
      <PartnersSection />
      <TeamMembersSection />
      <JoinPodkrepiBgSection />
      <SubscriptionSection />
      <FaqSection />
      <IrisElements
        backend="development"
        country="bulgaria"
        publicHash="f75fa38d-ca1b-4241-a01a-58965d444aba"
        userhash="7193492f-4ce1-4f74-a92f-e1a5b5aeded3"
        hookhash="553ae161-76a4-49f0-8a0c-f6d5f4a8fca4"
        currency="BGN">
        <PaymentDataElement
          payment_data={{
            toIban: 'BG85IORT80947826532954',
            sum: 1,
            description: 'PodkrepiBG - 123',
            merchant: 'Podkrepi.bg',
          }}
        />
      </IrisElements>
    </Layout>
  )
}
