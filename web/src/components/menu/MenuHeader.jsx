import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, ChevronLeft, Menu } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'
import { LANG_OPTIONS, t } from '../../lib/i18n'
import { ROUTES } from '../../lib/constants'

export default function MenuHeader({ onOpenDrawer }) {
  const { lang, setLang } = useLanguage()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const dropRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const current = LANG_OPTIONS.find(l => l.code === lang)

  return (
    <header className="menu-header">
      {/* Móvil: hamburger */}
      <button
        className="menu-hamburger-btn"
        onClick={onOpenDrawer}
        aria-label={t(lang, 'ui.menu.categories')}
      >
        <Menu size={22} />
      </button>
      {/* Desktop: botón volver */}
      <button
        className="menu-back-btn"
        onClick={() => navigate(ROUTES.HOME)}
        aria-label={t(lang, 'ui.menu.back')}
      >
        <ChevronLeft size={16} />
        {t(lang, 'ui.menu.back')}
      </button>

      <div className="menu-header-logo">
        <img
          src="/amigos2-logo-2-1.png"
          alt="Amigos2"
          style={{ height: 60, width: 'auto', display: 'inline-block', verticalAlign: 'middle' }}
        />
      </div>

      <div className="menu-lang-selector" ref={dropRef}>
        <button
          className={`menu-lang-btn${open ? ' open' : ''}`}
          onClick={() => setOpen(p => !p)}
          aria-label={t(lang, 'ui.aria.lang')}
        >
          {current?.flag && (
            <img src={current.flag} alt={current.label} width={18} height={13}
              style={{ borderRadius: 2, objectFit: 'cover', flexShrink: 0 }} />
          )}
          <span>{current?.label}</span>
          <ChevronDown size={12} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
        </button>
        {open && (
          <div className="menu-lang-dropdown">
            {LANG_OPTIONS.map(opt => (
              <button
                key={opt.code}
                className={`menu-lang-option${lang === opt.code ? ' active' : ''}`}
                onClick={() => { setLang(opt.code); setOpen(false) }}
              >
                <img src={opt.flag} alt={opt.label} width={18} height={13}
                  style={{ borderRadius: 2, objectFit: 'cover', flexShrink: 0 }} />
                <span>{opt.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
