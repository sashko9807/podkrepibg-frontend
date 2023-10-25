import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'
import { useTranslation } from 'next-i18next'

export default function LocaleButton() {
  const router = useRouter()
  const { t } = useTranslation()
  const changeLang = useCallback(
    (locale: string) => (event: React.MouseEvent) => {
      event.preventDefault()
      // Same route different language
      const date = new Date()
      const expireMs = 100 * 365 * 24 * 60 * 60 * 1000 // 100 days
      date.setTime(date.getTime() + expireMs)
      document.cookie = `NEXT_LOCALE=${locale};expires=${date.toUTCString()};path=/`
      router.push(router.asPath, undefined, { locale })
    },
    [router.asPath, router.locale],
  )
  if (!router.locale) {
    return null
  }

  if (router.locale === 'bg') {
    return (
      <Button variant="text" color="inherit" size="small" onClick={changeLang('en')}>
        {t('EN')}
      </Button>
    )
  }

  return (
    <Button variant="text" color="inherit" size="small" onClick={changeLang('bg')}>
      {t('BG')}
    </Button>
  )
}
