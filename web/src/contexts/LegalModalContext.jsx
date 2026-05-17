import { createContext, useContext } from 'react'

export const LegalModalContext = createContext(null)

export function useLegalModal() {
  return useContext(LegalModalContext)
}
