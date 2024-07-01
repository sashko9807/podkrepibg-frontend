import React, { createContext } from 'react'
import { IRISSupportedCountries, IRISSupportedLangs, SupportedCurrencies } from './IRISPayComponent'

type IPContext = {
  userhash: string
  hookhash: string
  backend: 'production' | 'development'
  publicHash?: string
  country?: IRISSupportedCountries
  lang?: IRISSupportedLangs
  currency?: SupportedCurrencies
}
export const IRISPayContext = createContext<IPContext | null>(null)

type IRISSDKElements = React.PropsWithChildren<IPContext>

export default function IrisElements({
  children,
  userhash,
  backend,
  hookhash,
  publicHash,
  country = 'bulgaria',
  lang = 'bg',
  currency = 'BGN',
}: IRISSDKElements) {
  return (
    <IRISPayContext.Provider
      value={{ userhash, hookhash, backend, publicHash, country, lang, currency }}>
      {children}
    </IRISPayContext.Provider>
  )
}
