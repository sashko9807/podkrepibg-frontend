import React, { createContext } from 'react'

type IPContext = {
  userhash: string
  hookhash: string
  backend: 'production' | 'development'
  publicHash?: string
}
export const IRISPayContext = createContext<IPContext | null>(null)

type IRISSDKElements = React.PropsWithChildren<IPContext>

export default function IrisElements({
  children,
  userhash,
  backend,
  hookhash,
  publicHash,
}: IRISSDKElements) {
  return (
    <IRISPayContext.Provider value={{ userhash, hookhash, backend, publicHash }}>
      {children}
    </IRISPayContext.Provider>
  )
}
