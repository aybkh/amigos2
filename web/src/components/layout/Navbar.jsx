import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Home, Clock, Images, Phone, UtensilsCrossed, ChevronDown } from 'lucide-react'
import { ROUTES } from '../../lib/constants'
import { useLanguage } from '../../hooks/useLanguage'
import { LANG_OPTIONS, t } from '../../lib/i18n'

const navBase = {
  position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderBottom: '1px solid rgba(0,230,118,0.20)',
  transition: 'background 0.3s ease',
}

export default function Navbar() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const location  = useLocation()
  const navigate  = useNavigate()
  const { lang, setLang } = useLanguage()
  const dropRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  useEffect(() => {
    if (!langOpen) return
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setLangOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [langOpen])

  const scrollTo = (hash) => {
    setOpen(false)
    const id = hash.replace('#', '')
    if (location.pathname !== '/') {
      navigate('/' + hash)
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navLinks = [
    { key: 'home',    hash: '#inicio',   Icon: Home   },
    { key: 'hours',   hash: '#horarios', Icon: Clock  },
    { key: 'gallery', hash: '#galeria',  Icon: Images },
    { key: 'contact', hash: '#contacto', Icon: Phone  },
  ]

  const current = LANG_OPTIONS.find(l => l.code === lang)

  return (
    <>
      <nav
        className={`navbar-main ${scrolled ? 'scrolled' : ''} ${open ? 'drawer-open' : ''}`}
        style={{
          ...navBase,
          background: scrolled || open ? 'rgba(7,26,16,0.95)' : 'rgba(7,26,16,0.60)',
        }}
      >
        <div className="navbar-inner" style={{
          maxWidth: 1200, margin: '0 auto',
          padding: '0 20px',
          display: 'flex', alignItems: 'center', height: 64, gap: 24,
        }}>
          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(o => !o)}
            aria-label={t(lang, 'ui.aria.menu_btn')}
            className="navbar-mobile-btn"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--color-cream)',
              width: 44, height: 44,
              padding: 0, touchAction: 'manipulation',
            }}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Logo */}
          <Link to="/" className="navbar-logo" style={{ textDecoration: 'none', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
            <img
              src="/amigos2-logo-2-1.png"
              alt="Amigos2"
              style={{ height: 60, width: 'auto', display: 'block' }}
            />
          </Link>

          {/* Desktop center links */}
          <div className="navbar-links">
            {navLinks.map(({ key, hash }) => (
              <button
                key={hash}
                onClick={() => scrollTo(hash)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(245,240,232,0.70)',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 600, fontSize: '0.82rem',
                  letterSpacing: '0.10em', textTransform: 'uppercase',
                  padding: '4px 0', transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-neon)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.70)')}
              >
                {t(lang, `ui.nav.${key}`)}
              </button>
            ))}
          </div>

          {/* Right side: lang selector + CTA */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>

            {/* Language selector (desktop) */}
            <div ref={dropRef} style={{ position: 'relative' }} className="navbar-lang">
              <button
                onClick={() => setLangOpen(o => !o)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: 'rgba(0,230,118,0.08)',
                  border: '1px solid rgba(0,230,118,0.20)',
                  borderRadius: 8, padding: '6px 10px',
                  color: 'var(--color-cream)',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 600, fontSize: '0.78rem',
                  cursor: 'pointer', transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-neon)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(0,230,118,0.20)')}
              >
                {current?.flag && (
                  <img src={current.flag} alt={current.label} width={18} height={13}
                    style={{ borderRadius: 2, objectFit: 'cover' }} />
                )}
                <span>{current?.label}</span>
                <ChevronDown size={11} style={{ transform: langOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
              </button>
              {langOpen && (
                <div style={{
                  position: 'absolute', top: '110%', right: 0, zIndex: 100,
                  background: '#040d07',
                  border: '1px solid rgba(0,230,118,0.20)',
                  borderRadius: 10, overflow: 'hidden',
                  minWidth: 140,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.40)',
                }}>
                  {LANG_OPTIONS.map(opt => (
                    <button
                      key={opt.code}
                      onClick={() => { setLang(opt.code); setLangOpen(false) }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        width: '100%', padding: '10px 14px',
                        background: lang === opt.code ? 'rgba(0,230,118,0.10)' : 'none',
                        border: 'none', cursor: 'pointer',
                        color: lang === opt.code ? 'var(--color-neon)' : 'rgba(245,240,232,0.75)',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: lang === opt.code ? 700 : 500,
                        fontSize: '0.82rem',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={e => { if (lang !== opt.code) e.currentTarget.style.background = 'rgba(0,230,118,0.05)' }}
                      onMouseLeave={e => { if (lang !== opt.code) e.currentTarget.style.background = 'none' }}
                    >
                      <img src={opt.flag} alt={opt.label} width={18} height={13}
                        style={{ borderRadius: 2, objectFit: 'cover' }} />
                      {opt.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="navbar-cta">
              <Link to={ROUTES.MENU} style={{ textDecoration: 'none' }}>
                <button
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--color-neon)',
                    color: 'var(--color-neon)',
                    borderRadius: 8, padding: '8px 20px',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 700, fontSize: '0.82rem',
                    letterSpacing: '0.10em', textTransform: 'uppercase',
                    cursor: 'pointer', transition: 'background 0.2s, color 0.2s',
                    backdropFilter: 'blur(10px)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--color-neon)'
                    e.currentTarget.style.color = 'var(--color-bg-dark)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'var(--color-neon)'
                  }}
                >
                  {t(lang, 'ui.nav.menu_cta')}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Drawer backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 48, background: 'rgba(0,0,0,0.5)' }}
        />
      )}

      {/* Mobile drawer */}
      <div style={{
        position: 'fixed', top: 64, left: 0, right: 0, bottom: 0, zIndex: 49,
        background: '#040d07',
        display: 'flex', flexDirection: 'column',
        padding: '24px 24px 32px',
        transform: open ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.30s ease',
      }}>
        {navLinks.map(({ key, hash, Icon }) => (
          <button
            key={hash}
            onClick={() => scrollTo(hash)}
            style={{
              display: 'flex', alignItems: 'center', gap: 16,
              background: 'none', border: 'none',
              borderBottom: '1px solid rgba(245,240,232,0.08)',
              padding: '20px 4px',
              color: 'var(--color-cream)',
              fontFamily: "'Black Ops One', cursive",
              fontSize: '1.5rem', letterSpacing: 2,
              textTransform: 'uppercase', cursor: 'pointer',
              width: '100%', textAlign: 'left',
            }}
          >
            <Icon size={22} color="var(--color-neon)" />
            {t(lang, `ui.nav.${key}`)}
          </button>
        ))}

        <div style={{ marginTop: 'auto', paddingTop: 24 }}>
          <Link to={ROUTES.MENU} style={{ textDecoration: 'none' }} onClick={() => setOpen(false)}>
            <button style={{
              width: '100%', padding: '18px',
              background: 'var(--color-neon)',
              color: 'var(--color-bg-dark)',
              border: 'none', borderRadius: 12,
              fontFamily: "'Black Ops One', cursive",
              fontSize: '1.2rem', letterSpacing: 2, textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
            }}>
              <UtensilsCrossed size={22} />
              {t(lang, 'ui.nav.menu_cta').toUpperCase()}
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
