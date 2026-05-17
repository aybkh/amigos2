import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../lib/i18n'

const LanguageContext = createContext(null)

const STORAGE_KEY  = 'amigos2_lang'
const DEFAULT_LANG = 'es'
const VALID_LANGS  = new Set(Object.keys(translations))

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return VALID_LANGS.has(stored) ? stored : DEFAULT_LANG
    } catch {
      return DEFAULT_LANG
    }
  })

  const setLang = (newLang) => {
    if (!VALID_LANGS.has(newLang)) return
    try { localStorage.setItem(STORAGE_KEY, newLang) } catch { /* noop */ }
    setLangState(newLang)
  }

  useEffect(() => {
    const dir = translations[lang]?.ui?.dir ?? 'ltr'
    document.documentElement.dir  = dir
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
