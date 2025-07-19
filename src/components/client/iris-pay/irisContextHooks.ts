import { useContext } from 'react'
import { IRISPayContext } from './IRISPayContext'

export function useIrisElements() {
  const context = useContext(IRISPayContext)
  if (!context) {
    throw new Error('Need to be withing IrisElement context')
  }

  return context
}
