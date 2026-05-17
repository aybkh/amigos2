import es  from '../locales/es.json'
import en  from '../locales/en.json'
import cat from '../locales/cat.json'
import fr  from '../locales/fr.json'
import de  from '../locales/de.json'
import nl  from '../locales/nl.json'
import ru  from '../locales/ru.json'
import ar  from '../locales/ar.json'
import pl  from '../locales/pl.json'
import it  from '../locales/it.json'
import { productsMap } from '../locales/productsMap'

export const translations = { es, en, cat, fr, de, nl, ru, ar, pl, it }

export const LANG_OPTIONS = [
  { code: 'es',  label: 'ES',  flag: '/icons/es.svg',  name: 'Español'    },
  { code: 'en',  label: 'EN',  flag: '/icons/en.svg',  name: 'English'    },
  { code: 'cat', label: 'CAT', flag: '/icons/ca.svg',  name: 'Català'     },
  { code: 'ar',  label: 'AR',  flag: '/icons/ar.svg',  name: 'العربية'    },
  { code: 'nl',  label: 'NL',  flag: '/icons/nl.svg',  name: 'Nederlands' },
  { code: 'fr',  label: 'FR',  flag: '/icons/fr.svg',  name: 'Français'   },
  { code: 'ru',  label: 'RU',  flag: '/icons/ru.svg',  name: 'Русский'    },
  { code: 'de',  label: 'DE',  flag: '/icons/de.svg',  name: 'Deutsch'    },
  { code: 'pl',  label: 'PL',  flag: '/icons/pl.svg',  name: 'Polski'     },
  { code: 'it',  label: 'IT',  flag: '/icons/it.svg',  name: 'Italiano'   },
]

const VALID_LANGS = new Set(Object.keys(translations))

function getLocale(lang) {
  return translations[VALID_LANGS.has(lang) ? lang : 'es']
}

export function t(lang, key) {
  const locale = getLocale(lang)
  const esFallback = translations.es
  const keys = key.split('.')
  let val = locale
  for (const k of keys) {
    val = val?.[k]
    if (val === undefined) break
  }
  if (val !== undefined) return val
  let fb = esFallback
  for (const k of keys) {
    fb = fb?.[k]
    if (fb === undefined) break
  }
  return fb ?? key
}

export function tCategory(lang, spanishName) {
  if (!spanishName) return spanishName
  const locale = getLocale(lang)
  return locale?.categories?.[spanishName] ?? spanishName
}

// Traducción de nombre de alérgeno (clave = nombre canónico ES, ver ALLERGEN_MAP)
export function tAllergen(lang, spanishName) {
  if (!spanishName) return spanishName
  const locale = getLocale(lang)
  return locale?.allergens?.[spanishName] ?? spanishName
}

// Traducción de productos vía mapa en código (locales/productsMap.js).
// field: 'name' | 'description'. Fallback: es → nombre original.
export function tProduct(lang, productName, field = 'name') {
  const entry = productsMap[productName]
  if (!entry || !entry[field]) return productName
  return entry[field][lang] || entry[field].es || productName
}
