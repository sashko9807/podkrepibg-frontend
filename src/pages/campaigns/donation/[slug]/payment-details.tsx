import { Typography } from "@mui/material"
import Layout from "components/client/layout/Layout"
import SupportUsForm from "components/client/support-us-form/SupportUsForm"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import theme from 'common/theme'
import { useTranslation } from "react-i18next"

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { paymentId, code } = ctx.query

  return {
    props: {
        paymentId: paymentId as string,
        bankCode: code as string,
      ...(await serverSideTranslations(ctx.locale ?? 'bg', [
        'common',
        'auth',
        'validation',
        'campaigns',
        'one-time-donation',
      ])),
  }
}
}

export default function CampaignBankDetails({paymentId, bankCode}:{paymentId: string, bankCode: string}){
        const {t} = useTranslation('one-time-donation')
    return (
        <Layout>
                      <Typography marginTop={theme.spacing(4)} variant="h6">
            {t('third-step.bank-details')}
          </Typography>
          <Typography variant="body1" marginBottom={theme.spacing(1)}>
            {t('third-step.bank-instructions1')}
          </Typography>
          <Typography variant="body1" marginBottom={theme.spacing(1)}>
            {t('third-step.bank-instructions2')}
          </Typography>
            <SupportUsForm paymentReference={bankCode} />
        </Layout>
    )
}