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
import { PaymentDataElement } from '../iris-pay/IRISPaySDK'
import IrisElements from '../iris-pay/IRISPayContext'

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
        userhash={'6b788541-b5a0-4009-a895-098610599cf7'}
        hookhash="6b788541-b5a0-4009-a895-098610599cf7"
        publicHash="1234"
        currency="BGN"
        backend="development">
        <PaymentDataElement
          payment_data={{
            sum: 123,
            description: 'currency',
            toIban: '123',
          }}
          onLoad={() => console.log('paymentElement loaded')}
        />
      </IrisElements>
    </Layout>
  )
}
