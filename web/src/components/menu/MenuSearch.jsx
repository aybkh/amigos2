import { Search, X } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'
import { t } from '../../lib/i18n'

export default function MenuSearch({ value, onChange }) {
  const { lang } = useLanguage()
  const placeholder = t(lang, 'ui.menu.search_placeholder')
  return (
    <div className="menu-search-wrap">
      <span className="menu-search-icon"><Search size={16} /></span>
      <input
        className="menu-search-input"
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label={placeholder}
      />
      {value && (
        <button className="menu-search-clear" onClick={() => onChange('')} aria-label={t(lang, 'ui.aria.clear')}>
          <X size={15} />
        </button>
      )}
    </div>
  )
}
