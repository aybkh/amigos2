import { useState, useEffect } from 'react'
import { useLegalModal } from '../../contexts/LegalModalContext'
import { useLanguage } from '../../hooks/useLanguage'
import { t } from '../../lib/i18n'

const STORAGE_KEY = 'amigos2_cookies'

export default function CookieBanner() {
  const { lang } = useLanguage()
  const [decision, setDecision] = useState(null)
  const [bannerVisible, setBannerVisible] = useState(false)
  const { openLegal } = useLegalModal()

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'accepted' || stored === 'rejected') {
      setDecision(stored)
      setBannerVisible(false)
    } else {
      setBannerVisible(true)
    }
  }, [])

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setDecision('accepted')
    setBannerVisible(false)
  }

  const reject = () => {
    localStorage.setItem(STORAGE_KEY, 'rejected')
    setDecision('rejected')
    setBannerVisible(false)
  }

  return (
    <>
      {bannerVisible && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0,
          width: '100%',
          maxWidth: 480,
          zIndex: 9999,
          background: 'rgba(7,26,16,0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(0,230,118,0.20)',
          borderRight: '1px solid rgba(0,230,118,0.10)',
          borderTopRightRadius: 16,
          padding: '20px 22px',
          boxShadow: '0 -4px 32px rgba(0,0,0,0.40)',
        }}>
          <p style={{
            fontFamily: "'Black Ops One', cursive",
            fontSize: '1rem', color: 'var(--color-cream)',
            margin: '0 0 8px', letterSpacing: '0.04em',
          }}>
            🍪 {t(lang, 'ui.cookies.title')}
          </p>
          <p style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.82rem', lineHeight: 1.6,
            color: 'rgba(245,240,232,0.65)',
            margin: '0 0 16px',
          }}>
            {t(lang, 'ui.cookies.body')}{' '}
            <button
              onClick={() => openLegal('cookies')}
              style={{
                background: 'none', border: 'none', padding: 0,
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.82rem', fontWeight: 700,
                color: 'var(--color-neon)', cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              {t(lang, 'ui.cookies.more')}
            </button>
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button
              onClick={reject}
              style={{
                flex: '0 0 auto',
                background: 'rgba(245,240,232,0.06)',
                border: '1px solid rgba(245,240,232,0.20)',
                borderRadius: 8, padding: '9px 18px',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700, fontSize: '0.80rem',
                color: 'rgba(245,240,232,0.75)',
                cursor: 'pointer', letterSpacing: '0.06em',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(245,240,232,0.45)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(245,240,232,0.20)')}
            >
              {t(lang, 'ui.cookies.reject')}
            </button>
            <button
              onClick={accept}
              style={{
                flex: '1 1 auto',
                background: 'var(--color-neon)',
                border: 'none', borderRadius: 8, padding: '9px 18px',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 800, fontSize: '0.80rem',
                color: 'var(--color-bg-dark)',
                cursor: 'pointer', letterSpacing: '0.06em',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {t(lang, 'ui.cookies.accept')}
            </button>
          </div>
        </div>
      )}

      {decision && !bannerVisible && (
        <button
          onClick={() => setBannerVisible(true)}
          title={t(lang, 'ui.cookies.prefs')}
          aria-label={t(lang, 'ui.cookies.prefs')}
          style={{
            position: 'fixed', bottom: 5, left: 7,
            width: 30, height: 30,
            borderRadius: '50%',
            background: 'rgba(0,230,118,0.08)',
            border: '1px solid rgba(0,230,118,0.30)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.1rem',
            cursor: 'pointer', zIndex: 9999,
            transition: 'background 0.2s, border-color 0.2s',
            padding: 0,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--color-neon)'
            e.currentTarget.style.borderColor = 'var(--color-neon)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(0,230,118,0.08)'
            e.currentTarget.style.borderColor = 'rgba(0,230,118,0.30)'
          }}
        >
          🍪
        </button>
      )}
    </>
  )
}
