import { Method } from 'axios'
import { PaymentStatus } from 'gql/donations.enums'
import { StatisticsGroupBy } from 'components/client/campaigns/helpers/campaign.enums'
import { FilterData, PaginationData, SortData } from 'gql/types'

type Endpoint = {
  url: string
  method: Method
}

export const endpoints = {
  auth: {
    login: <Endpoint>{ url: '/login', method: 'POST' },
    register: <Endpoint>{ url: '/register', method: 'POST' },
    refresh: <Endpoint>{ url: '/refresh', method: 'POST' },
    providerLogin: <Endpoint>{ url: '/provider-login', method: 'POST' },
  },
  affiliate: {
    join: <Endpoint>{ url: '/affiliate/join', method: 'POST' },
    getAffiliates: <Endpoint>{ url: '/affiliate/list-all', method: 'GET' },
    getData: <Endpoint>{ url: '/affiliate/data', method: 'GET' },
    cancelDonation: (affiliateCode: string, donationId: string) =>
      <Endpoint>{
        url: `/affiliate/${affiliateCode}/donations/${donationId}/cancel`,
        method: 'PATCH',
      },
    refreshCode: (affiliateId: string) =>
      <Endpoint>{ url: `/affiliate/${affiliateId}/code-refresh`, method: 'PATCH' },
    updateStatus: (affiliateId: string) =>
      <Endpoint>{ url: `/affiliate/${affiliateId}/status`, method: 'PATCH' },
  },
  campaign: {
    listCampaigns: <Endpoint>{ url: '/campaign/list', method: 'GET' },
    listAdminCampaigns: <Endpoint>{ url: '/campaign/list-all', method: 'GET' },
    getUserDonatedToCampaigns: <Endpoint>{
      url: '/campaign/user-donations-campaigns',
      method: 'GET',
    },
    getUserCampaigns: <Endpoint>{
      url: '/campaign/get-user-campaigns',
      method: 'GET',
    },
    createCampaign: <Endpoint>{ url: '/campaign/create-campaign', method: 'POST' },
    canEditCampaign: (slug: string) =>
      <Endpoint>{ url: `/campaign/${slug}/can-edit`, method: 'GET' },
    viewCampaign: (slug: string) => <Endpoint>{ url: `/campaign/${slug}`, method: 'GET' },
    viewCampaignById: (id: string) => <Endpoint>{ url: `/campaign/byId/${id}`, method: 'GET' },
    editCampaign: (id: string) => <Endpoint>{ url: `/campaign/${id}`, method: 'PUT' },
    subscribeToCampaign: (id: string) =>
      <Endpoint>{ url: `/campaign/${id}/subscribe`, method: 'POST' },
    deleteCampaign: (id: string) => <Endpoint>{ url: `/campaign/${id}`, method: 'DELETE' },
    uploadFile: (campaignId: string) =>
      <Endpoint>{ url: `/campaign-file/${campaignId}`, method: 'POST' },
    downloadFile: (fileId: string) => <Endpoint>{ url: `/campaign-file/${fileId}`, method: 'GET' },
    deleteFile: (fileId: string) => <Endpoint>{ url: `/campaign-file/${fileId}`, method: 'DELETE' },
    getDonations: (id: string) => <Endpoint>{ url: `/campaign/donations/${id}`, method: 'GET' },
    listCampaignExpenses: (slug: string) =>
      <Endpoint>{ url: `/campaign/${slug}/expenses`, method: 'GET' },
    listCampaignApprovedExpenses: (slug: string) =>
      <Endpoint>{ url: `/campaign/${slug}/expenses/approved`, method: 'GET' },
    listAllNews: (page: number) => <Endpoint>{ url: `/campaign/news?page=${page}`, method: 'GET' },
    listNewsForCampaign: (page: number, slug: string) =>
      <Endpoint>{ url: `/campaign/${slug}/news?page=${page}` },
  },
  notifications: {
    sendConfirmationEmail: <Endpoint>{ url: '/notifications/send-confirm-email', method: 'POST' },
    subscribePublicEmail: <Endpoint>{ url: '/notifications/public/subscribe', method: 'POST' },
    sendNewsLetterConsentEmail: <Endpoint>{ url: '/notifications/send-newsletter-consent' },
    unsubscribePublicEmail: <Endpoint>{ url: '/notifications/public/unsubscribe', method: 'POST' },
    subscribeEmail: <Endpoint>{ url: '/notifications/subscribe', method: 'POST' },
    unsubscribeEmail: <Endpoint>{ url: '/notifications/unsubscribe', method: 'POST' },
    getCampaignNotificationSubscriptions: <Endpoint>{
      url: '/notifications/campaign-notifications',
      method: 'GET',
    },
  },
  campaignNews: {
    createNewsArticle: <Endpoint>{ url: '/campaign-news', method: 'POST' },
    listAdminNews: <Endpoint>{ url: '/campaign-news/list-all', method: 'GET' },
    listAllNewsForCampaign: (slug: string) =>
      <Endpoint>{ url: `/campaign-news/${slug}/list`, method: 'GET' },
    viewArticleBySlug: (slug: string) => <Endpoint>{ url: `/campaign-news/${slug}`, method: 'GET' },
    viewNewsArticleById: (id: string) =>
      <Endpoint>{ url: `/campaign-news/byId/${id}`, method: 'GET' },
    editNewsArticle: (articleId: string) =>
      <Endpoint>{ url: `/campaign-news/${articleId}`, method: 'PUT' },
    deleteNewsArticle: (articleId: string) =>
      <Endpoint>{ url: `/campaign-news/${articleId}`, method: 'DELETE' },
    uploadFile: (articleId: string) =>
      <Endpoint>{ url: `/campaign-news-file/${articleId}`, method: 'POST' },
    downloadFile: (fileId: string) =>
      <Endpoint>{ url: `/campaign-news-file/${fileId}`, method: 'GET' },
    deleteFile: (fileId: string) =>
      <Endpoint>{ url: `/campaign-news-file/${fileId}`, method: 'DELETE' },
  },
  campaignType: {
    listCampaignTypes: <Endpoint>{ url: '/campaign-type/list', method: 'GET' },
  },
  support: {
    createInfoRequest: <Endpoint>{ url: '/support/create-inquiry', method: 'POST' },
    createSupportRequest: <Endpoint>{ url: '/support/create-request', method: 'POST' },
    supportRequestList: <Endpoint>{ url: '/support/support-request/list', method: 'GET' },
    infoRequestList: <Endpoint>{ url: '/support/info-request/list', method: 'GET' },
  },
  statistics: {
    getGroupedDonations: (id: string, groupBy: StatisticsGroupBy) =>
      <Endpoint>{ url: `statistics/donations/${id}?groupBy=${groupBy}`, method: 'GET' },
    getUniqueDonations: (id: string) =>
      <Endpoint>{ url: `statistics/unique-donations/${id}`, method: 'GET' },
    getHourlyDonations: (id: string) =>
      <Endpoint>{ url: `statistics/hourly-donations/${id}`, method: 'GET' },
  },
  payments: {
    list: (
      paymentId?: string,
      campaignId?: string,
      paginationData?: PaginationData,
      filterData?: FilterData,
      searchData?: string,
    ) => {
      const { pageIndex, pageSize } = (paginationData as PaginationData) || {}
      const { status, paymentProvider, date, minAmount, maxAmount, sortBy } =
        (filterData as FilterData) || {}
      const { from, to } = date || {}

      const urlParams = new URLSearchParams({
        paymentId: `${paymentId ?? ''}`,
        campaignId: `${campaignId ?? ''}`,
        pageIndex: `${pageIndex}`,
        pageSize: `${pageSize}`,
        status: status,
        provider: paymentProvider,
        from: `${from}`,
        to: `${to}`,
        search: `${searchData}`,
        sortBy: `${sortBy}`,
        minAmount: `${minAmount ?? ''}`,
        maxAmount: `${maxAmount ?? ''}`,
      })
      return <Endpoint>{
        url: `/donation/payments?${urlParams}`,
        method: 'GET',
      }
    },
    getPayment: (id: string) => {
      return <Endpoint>{ url: `/donation/payments/${id}`, method: 'GET' }
    },
  },
  donation: {
    prices: <Endpoint>{ url: '/stripe/prices', method: 'GET' },
    singlePrices: <Endpoint>{ url: '/stripe/prices/single', method: 'GET' },
    recurringPrices: <Endpoint>{ url: '/stripe/prices/recurring', method: 'GET' },
    createCheckoutSession: <Endpoint>{ url: '/stripe/create-checkout-session', method: 'POST' },
    createSubscriptionPayment: <Endpoint>{ url: '/stripe/create-subscription', method: 'POST' },
    createPaymentIntent: <Endpoint>{ url: '/stripe/payment-intent', method: 'POST' },
    createSetupIntent: <Endpoint>{ url: '/stripe/setup-intent', method: 'POST' },
    createPaymentIntentFromSetup: (id: string) =>
      <Endpoint>{
        url: `/stripe/setup-intent/${id}/payment-intent`,
        method: 'POST',
      },
    createSubscriptionFromSetup: (id: string) =>
      <Endpoint>{
        url: `/stripe/setup-intent/${id}/subscription`,
        method: 'POST',
      },
    updateSetupIntent: (id: string) =>
      <Endpoint>{
        url: `/stripe/setup-intent/${id}`,
        method: 'POST',
      },
    cancelSetupIntent: (id: string) =>
      <Endpoint>{
        url: `/stripe/setup-intent/${id}/cancel`,
        method: 'POST',
      },
    createBankDonation: <Endpoint>{ url: '/donation/create-bank-payment', method: 'POST' },
    synchronizeWithPayment: (id: string) =>
      <Endpoint>{ url: `/donation/${id}/sync-with-payment`, method: 'PATCH' },
    refundStripePayment: (id: string) =>
      <Endpoint>{ url: `/donation/refund-stripe-payment/${id}`, method: 'POST' },
    invalidateStripePayment: (id: string) =>
      <Endpoint>{ url: `/donation/${id}/invalidate`, method: 'PATCH' },
    getDonation: (id: string) => <Endpoint>{ url: `/donation/${id}`, method: 'GET' },
    getDonationByPaymentIntent: (id: string) =>
      <Endpoint>{ url: `/donation/payment-intent?id=${id}`, method: 'GET' },
    donationsList: (
      paymentId?: string,
      campaignId?: string,
      paginationData?: PaginationData,
      filterData?: FilterData,
      searchData?: string,
    ) => {
      const { pageIndex, pageSize } = (paginationData as PaginationData) || {}
      const { status, paymentProvider, date, minAmount, maxAmount, sortBy } =
        (filterData as FilterData) || {}
      const { from, to } = date || {}

      const urlParams = new URLSearchParams({
        paymentId: `${paymentId ?? ''}`,
        campaignId: `${campaignId ?? ''}`,
        pageIndex: `${pageIndex}`,
        pageSize: `${pageSize}`,
        status: status,
        provider: paymentProvider,
        from: `${from}`,
        to: `${to}`,
        search: `${searchData}`,
        sortBy: `${sortBy}`,
        minAmount: `${minAmount ?? ''}`,
        maxAmount: `${maxAmount ?? ''}`,
      })
      return <Endpoint>{
        url: `/donation/list?${urlParams}`,
        method: 'GET',
      }
    },
    getDonations: (
      status: PaymentStatus,
      campaignId?: string,
      pageindex?: number,
      pagesize?: number,
    ) =>
      <Endpoint>{
        url: campaignId
          ? `/donation/listPublic/?campaignId=${campaignId}&status=${status}&pageindex=${pageindex}&pagesize=${pagesize}`
          : `/donation/listPublic/?status=${status}&pageindex=${pageindex}&pagesize=${pagesize}`,
        method: 'GET',
      },
    getUserDonation: (id: string) => <Endpoint>{ url: `/donation/user/${id}`, method: 'GET' },
    getDonorsCount: <Endpoint>{ url: `/donation/donors-count`, method: 'GET' },
    getTotalDonatedMoney: <Endpoint>{ url: '/donation/money', method: 'GET' },
    editDonation: (id: string) => <Endpoint>{ url: `/donation/${id}`, method: 'PATCH' },
    deleteDonation: <Endpoint>{ url: `/donation/delete`, method: 'POST' },
    userDonations: <Endpoint>{ url: 'donation/user-donations', method: 'GET' },
    uploadBankTransactionsFile: (bankTransactionsFileId: string) =>
      <Endpoint>{ url: `/bank-transactions-file/${bankTransactionsFileId}`, method: 'POST' },
    exportToExcel: (
      filterData?: FilterData,
      searchData?: string,
      campaignId?: string,
      paymentId?: string,
    ) =>
      <Endpoint>{
        url: `/donation/export-excel?status=${filterData?.status}&provider=${
          filterData?.paymentProvider
        }&from=${filterData?.date.from}&to=${filterData?.date.to}&search=${searchData}&minAmount=${
          filterData?.minAmount ?? ''
        }&maxAmount=${filterData?.maxAmount ?? ''}&sortBy=${
          filterData?.sortBy ?? ''
        }&campaignId=${campaignId}&paymentId=${paymentId}`,
        method: 'GET',
      },
  },
  bankTransactions: {
    transactionsList: (
      paginationData?: PaginationData,
      filterData?: FilterData,
      sort?: SortData,
      searchData?: string,
    ) => {
      const { pageIndex, pageSize } = (paginationData as PaginationData) || {}
      const { status, date } = (filterData as FilterData) || {}
      const { sortBy, sortOrder } = (sort as SortData) || {}
      const { from, to } = date || {}

      return <Endpoint>{
        url: `/bank-transaction/list?pageindex=${pageIndex}&pagesize=${pageSize}&status=${status}&from=${from}&to=${to}&search=${searchData}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
        method: 'GET',
      }
    },
    exportToExcel: <Endpoint>{ url: '/bank-transaction/export-excel', method: 'GET' },
    editPaymentRef: (id: string) =>
      <Endpoint>{ url: `/bank-transaction/${id}/edit-ref`, method: 'PUT' },
    rerunDates: <Endpoint>{ url: '/bank-transaction/rerun-dates', method: 'POST' },
  },
  documents: {
    documentsList: <Endpoint>{ url: '/document', method: 'GET' },
    getDocument: (slug: string) => <Endpoint>{ url: `/document/${slug}`, method: 'GET' },
    createDocument: <Endpoint>{ url: '/document', method: 'POST' },
    editDocument: (slug: string) => <Endpoint>{ url: `/document/${slug}`, method: 'PUT' },
    deleteDocument: (slug: string) => <Endpoint>{ url: `/document/${slug}`, method: 'DELETE' },
  },
  bankAccounts: {
    bankAccountList: <Endpoint>{ url: '/bankaccount', method: 'GET' },
    createBankAccount: <Endpoint>{ url: '/bankaccount', method: 'POST' },
    viewBankAccount: (id: string) => <Endpoint>{ url: `/bankaccount/${id}`, method: 'GET' },
    editBankAccount: (id: string) => <Endpoint>{ url: `/bankaccount/${id}`, method: 'PATCH' },
    deleteBankAccount: (id: string) => <Endpoint>{ url: `/bankaccount/${id}`, method: 'DELETE' },
  },
  city: {
    createCity: <Endpoint>{ url: '/city/create', method: 'POST' },
    citiesList: <Endpoint>{ url: '/city/list', method: 'GET' },
    viewCity: (id: string) => <Endpoint>{ url: `/city/${id}`, method: 'GET' },
    editCity: (id: string) => <Endpoint>{ url: `/city/${id}`, method: 'PATCH' },
    deleteCity: (id: string) => <Endpoint>{ url: `/city/${id}`, method: 'DELETE' },
  },
  withdrawals: {
    withdrawalsList: <Endpoint>{ url: '/withdrawal', method: 'GET' },
    getWithdrawal: (id: string) => <Endpoint>{ url: `/withdrawal/${id}`, method: 'GET' },
    createWithdrawal: <Endpoint>{ url: '/withdrawal', method: 'POST' },
    editWithdrawal: (id: string) => <Endpoint>{ url: `/withdrawal/${id}`, method: 'PUT' },
    deleteWithdrawal: (id: string) => <Endpoint>{ url: `/withdrawal/${id}`, method: 'DELETE' },
  },
  country: {
    listCountries: <Endpoint>{ url: '/country/list', method: 'GET' },
    createCountry: <Endpoint>{ url: '/country/create-country', method: 'POST' },
    viewCountry: (id: string) => <Endpoint>{ url: `/country/${id}`, method: 'GET' },
    editCountry: (id: string) => <Endpoint>{ url: `/country/${id}`, method: 'PATCH' },
    deleteCountry: (id: string) => <Endpoint>{ url: `/country/${id}`, method: 'DELETE' },
  },
  coordinators: {
    coordinatorsList: <Endpoint>{ url: '/coordinator/list', method: 'GET' },
    viewCoordinator: (id: string) => <Endpoint>{ url: `/coordinator/${id}`, method: 'GET' },
    postCoordinator: <Endpoint>{ url: '/coordinator', method: 'POST' },
    deleteCoordinator: (id: string) => <Endpoint>{ url: `/coordinator/${id}`, method: 'DELETE' },
  },
  expenses: {
    listExpenses: <Endpoint>{ url: '/expenses/list', method: 'GET' },
    createExpense: <Endpoint>{ url: '/expenses/create-expense', method: 'POST' },
    viewExpense: (id: string) => <Endpoint>{ url: `/expenses/${id}`, method: 'GET' },
    editExpense: (id: string) => <Endpoint>{ url: `/expenses/${id}`, method: 'PATCH' },
    deleteExpense: (id: string) => <Endpoint>{ url: `/expenses/${id}`, method: 'DELETE' },
    uploadFile: (expenseId: string) =>
      <Endpoint>{ url: `/expenses/${expenseId}/files/`, method: 'POST' },
    downloadFile: (fileId: string) =>
      <Endpoint>{ url: `/expenses/download-file/${fileId}`, method: 'GET' },
    listExpenseFiles: (id: string) => <Endpoint>{ url: `/expenses/${id}/files`, method: 'GET' },
    deleteExpenseFile: (fileId: string) =>
      <Endpoint>{ url: `/expenses/file/${fileId}`, method: 'DELETE' },
  },
  benefactor: {
    benefactorList: <Endpoint>{ url: '/benefactor', method: 'GET' },
    getBenefactor: (id: string) => <Endpoint>{ url: `/benefactor/${id}`, method: 'GET' },
    createBenefactor: <Endpoint>{ url: '/benefactor', method: 'POST' },
    editBenefactor: (id: string) => <Endpoint>{ url: `/benefactor/${id}`, method: 'PATCH' },
    deleteBenefactor: (id: string) => <Endpoint>{ url: `/benefactor/${id}`, method: 'DELETE' },
  },
  vaults: {
    vaultsList: <Endpoint>{ url: '/vault', method: 'GET' },
    getVault: (slug: string) => <Endpoint>{ url: `/vault/${slug}`, method: 'GET' },
    createVault: <Endpoint>{ url: '/vault', method: 'POST' },
    editVault: (slug: string) => <Endpoint>{ url: `/vault/${slug}`, method: 'PUT' },
    deleteVault: (slug: string) => <Endpoint>{ url: `/vault/${slug}`, method: 'DELETE' },
  },
  beneficiary: {
    listBeneficiary: <Endpoint>{ url: '/beneficiary/list', method: 'GET' },
    viewBeneficiary: (id: string) => <Endpoint>{ url: `/beneficiary/${id}`, method: 'GET' },
    createBeneficiary: <Endpoint>{ url: '/beneficiary/create-beneficiary', method: 'POST' },
    editBeneficiary: (id: string) => <Endpoint>{ url: `/beneficiary/${id}`, method: 'PUT' },
    removeBeneficiary: (id: string) => <Endpoint>{ url: `/beneficiary/${id}`, method: 'DELETE' },
  },
  campaignTypes: {
    listCampaignTypes: <Endpoint>{ url: '/campaign-types/', method: 'GET' },
    viewCampaignType: (id: string) => <Endpoint>{ url: `/campaign-types/${id}`, method: 'GET' },
    createCampaignType: <Endpoint>{ url: '/campaign-types', method: 'POST' },
    editCampaignType: (id: string) => <Endpoint>{ url: `/campaign-types/${id}`, method: 'PUT' },
    removeCampaignType: (id: string) =>
      <Endpoint>{ url: `/campaign-types/${id}`, method: 'DELETE' },
  },
  person: {
    list: (paginationData?: PaginationData, sort?: SortData, searchData?: string) => {
      const { pageIndex, pageSize } = (paginationData as PaginationData) || {}
      const { sortBy, sortOrder } = (sort as SortData) || {}

      return <Endpoint>{
        url: `/person?pageindex=${pageIndex}&pagesize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}&search=${searchData}`,
        method: 'GET',
      }
    },
    createBeneficiary: <Endpoint>{ url: '/beneficiary/create-beneficiary', method: 'POST' },
    viewPerson: (slug: string) => <Endpoint>{ url: `/person/${slug}`, method: 'GET' },
    viewPersonByKeylockId: (sub: string) =>
      <Endpoint>{ url: `/person/by-keylock-id/${sub}`, method: 'GET' },
    editPerson: (id: string) => <Endpoint>{ url: `/person/${id}`, method: 'PUT' },
    createPerson: <Endpoint>{ url: '/person', method: 'POST' },
    deletePerson: (id: string) => <Endpoint>{ url: `/person/${id}`, method: 'DELETE' },
  },
  company: {
    createCompany: <Endpoint>{ url: '/company/create-company', method: 'POST' },
    list: <Endpoint>{ url: '/company/list', method: 'GET' },
    viewCompany: (slug: string) => <Endpoint>{ url: `/company/${slug}`, method: 'GET' },
  },
  transfer: {
    listTransfer: <Endpoint>{ url: '/transfer/', method: 'GET' },
    viewTransfer: (id: string) => <Endpoint>{ url: `/transfer/${id}`, method: 'GET' },
    createTransfer: <Endpoint>{ url: '/transfer/create', method: 'POST' },
    editTransfer: (id: string) => <Endpoint>{ url: `/transfer/${id}`, method: 'PUT' },
    removeTransfer: (id: string) => <Endpoint>{ url: `/transfer/${id}`, method: 'DELETE' },
  },
  account: {
    me: <Endpoint>{ url: '/account/me', method: 'GET' },
    update: <Endpoint>{ url: '/account/me', method: 'PATCH' },
    updatePassword: <Endpoint>{ url: '/account/me/credentials', method: 'PATCH' },
    updateProfileActiveStatus: (keycloakId: string) =>
      <Endpoint>{ url: `/account/${keycloakId}/status`, method: 'PATCH' },
    forgottenPassword: <Endpoint>{ url: '/login/forgot-password', method: 'POST' },
    resetPassword: <Endpoint>{ url: '/login/reset-password', method: 'POST' },
    delete: <Endpoint>{ url: '/account/me', method: 'DELETE' },
    new: <Endpoint>{ url: '/account/new', method: 'GET' },
  },
  recurringDonation: {
    list: <Endpoint>{ url: '/recurring-donation/list', method: 'GET' },
    getRecurringDonation: (id: string) =>
      <Endpoint>{ url: `/recurring-donation/${id}`, method: 'GET' },
    createRecurringDonation: <Endpoint>{ url: '/recurring-donation', method: 'POST' },
    editRecurringDonation: (id: string) =>
      <Endpoint>{ url: `/recurring-donation/${id}`, method: 'PUT' },
    deleteRecurringDonation: (id: string) =>
      <Endpoint>{ url: `/recurring-donation/${id}`, method: 'DELETE' },
    cancelRecurringDonation: (id: string) =>
      <Endpoint>{ url: `/recurring-donation/${id}/cancel`, method: 'PATCH' },

    getUserRecurringDonations: <Endpoint>{
      url: '/recurring-donation/user-donations',
      method: 'GET',
    },
  },
  irregularityFile: {
    uploadIrregularityFile: (irregularityId: string) =>
      <Endpoint>{ url: `/irregularity-file/${irregularityId}`, method: 'POST' },
    listIrregularityFiles: (irregularityId: string) =>
      <Endpoint>{ url: `/irregularity-file/list/${irregularityId}`, method: 'GET' },
    deleteIrregularityFile: (id: string) =>
      <Endpoint>{ url: `/irregularity-file/${id}`, method: 'DELETE' },
  },
  irregularity: {
    createIrregularity: <Endpoint>{ url: '/irregularity', method: 'POST' },
    irregularityList: <Endpoint>{ url: '/irregularity/list', method: 'GET' },
    viewIrregularity: (id: string) => <Endpoint>{ url: `/irregularity/${id}`, method: 'GET' },
    editIrregularity: (id: string) => <Endpoint>{ url: `/irregularity/${id}`, method: 'PUT' },
    removeIrregularity: (id: string) => <Endpoint>{ url: `/irregularity/${id}`, method: 'DELETE' },
    download: (id: string) => <Endpoint>{ url: `/irregularity-file/${id}`, method: 'GET' },
  },
  organizer: {
    createOrganizer: <Endpoint>{ url: '/organizer', method: 'POST' },
    viewOrganizer: (id: string) => <Endpoint>{ url: `/organizer/${id}`, method: 'GET' },
    listOrganizer: <Endpoint>{ url: '/organizer/list', method: 'GET' },
    removeOrganizer: (id: string) => <Endpoint>{ url: `/organizer/${id}`, method: 'DELETE' },
  },
  donationWish: {
    createDonationWish: <Endpoint>{ url: '/donation-wish', method: 'POST' },
    listDonationWishes: (
      campaignId?: string,
      paginationData?: PaginationData,
      sort?: SortData,
      searchData?: string,
    ) => {
      const { pageIndex, pageSize } = (paginationData as PaginationData) || {}
      const { sortBy, sortOrder } = (sort as SortData) || {}

      return <Endpoint>{
        url: `/donation-wish/list/${campaignId}?pageindex=${pageIndex}&pagesize=${pageSize}&search=${searchData}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
        method: 'GET',
      }
    },
  },
  campaignApplication: {
    create: <Endpoint>{ url: '/campaign-application/create', method: 'POST' },
    update: (id: string) => <Endpoint>{ url: `/campaign-application/${id}`, method: 'PATCH' },
    uploadFile: (campaignId: string) =>
      <Endpoint>{ url: `/campaign-application/uploadFile/${campaignId}`, method: 'POST' },
    deleteFile: (fileId: string) =>
      <Endpoint>{ url: `/campaign-application/fileById/${fileId}`, method: 'DELETE' },
    view: (id: string) => <Endpoint>{ url: `/campaign-application/byId/${id}`, method: 'GET' },
    listAllForAdmin: <Endpoint>{ url: `/campaign-application/list`, method: 'GET' },
    getFile: (fileId: string) =>
      <Endpoint>{ url: `/campaign-application/fileById/${fileId}`, method: 'GET' },
  },
}
