import { useEffect, Fragment } from 'react'
import { X } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'
import { t } from '../../lib/i18n'
import { LEGAL, LEGAL_TITLES, LEGAL_UPDATED } from '../../locales/legal'

const EMAIL = 'johals2001@yahoo.es'
const neon = { color: 'var(--color-neon)', textDecoration: 'none' }
const cream = { color: 'var(--color-cream)' }

const h2Style = {
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 700, fontSize: '0.82rem',
  color: 'var(--color-neon)',
  margin: '24px 0 8px',
  letterSpacing: '0.10em', textTransform: 'uppercase',
}
const pStyle = {
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '0.84rem', lineHeight: 1.8,
  color: 'rgba(245,240,232,0.70)',
  margin: '0 0 10px',
}
const liStyle = {
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '0.84rem', lineHeight: 1.8,
  color: 'rgba(245,240,232,0.70)',
  marginBottom: 4,
}

const TOKEN = {
  '{email}': <a href={`mailto:${EMAIL}`} style={neon}>{EMAIL}</a>,
  '{aepd}': <a href="https://www.aepd.es" target="_blank" rel="noreferrer" style={neon}>www.aepd.es</a>,
  '{gprivacy}': <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" style={neon}>policies.google.com/privacy</a>,
}

// Resuelve **negrita** y tokens {email}/{aepd}/{gprivacy} dentro de un string
function renderInline(text) {
  const parts = String(text).split(/(\{email\}|\{aepd\}|\{gprivacy\}|\*\*[^*]+\*\*)/g)
  return parts.map((p, i) => {
    if (!p) return null
    if (TOKEN[p]) return <Fragment key={i}>{TOKEN[p]}</Fragment>
    if (p.startsWith('**') && p.endsWith('**')) {
      return <strong key={i} style={cream}>{p.slice(2, -2)}</strong>
    }
    return <Fragment key={i}>{p}</Fragment>
  })
}

function pick(map, lang) {
  return map?.[lang] ?? map?.es ?? ''
}

export default function LegalModal({ type, onClose }) {
  const { lang } = useLanguage()
  const sections = LEGAL[type]

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  if (!sections) return null

  const title = pick(LEGAL_TITLES[type], lang)
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      dir={dir}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'rgba(0,0,0,0.80)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div style={{
        background: '#071a10',
        border: '1px solid rgba(0,230,118,0.18)',
        borderRadius: 16,
        width: '100%', maxWidth: 680,
        maxHeight: '80vh',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 24px 64px rgba(0,0,0,0.60)',
      }}>
        {/* Header sticky */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 24px',
          borderBottom: '1px solid rgba(0,230,118,0.12)',
          flexShrink: 0,
        }}>
          <span style={{
            fontFamily: "'Black Ops One', cursive",
            fontSize: '1.05rem', letterSpacing: '0.06em',
            color: 'var(--color-cream)',
          }}>
            {title}
          </span>
          <button
            onClick={onClose}
            aria-label={t(lang, 'ui.aria.close')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(245,240,232,0.50)', padding: 4,
              display: 'flex', alignItems: 'center',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-cream)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.50)')}
          >
            <X size={18} />
          </button>
        </div>

        {/* Scroll body */}
        <div style={{ overflowY: 'auto', padding: '8px 24px 8px', flex: 1 }}>
          {sections.map((sec, si) => (
            <section key={si}>
              <h2 style={h2Style}>{pick(sec.h2, lang)}</h2>
              {sec.blocks.map((b, bi) => {
                if (b.p) return <p key={bi} style={pStyle}>{renderInline(pick(b.p, lang))}</p>
                if (b.ul) return (
                  <ul key={bi} style={{ paddingLeft: 20, margin: '0 0 10px' }}>
                    {b.ul.map((it, ii) => (
                      <li key={ii} style={liStyle}>{renderInline(pick(it, lang))}</li>
                    ))}
                  </ul>
                )
                if (b.data) return (
                  <ul key={bi} style={{ paddingLeft: 20, margin: '0 0 10px' }}>
                    {b.data.map((d, di) => (
                      <li key={di} style={liStyle}>
                        <strong style={cream}>{pick(d.label, lang)}:</strong>{' '}
                        {d.value === '{email}' ? TOKEN['{email}'] : d.value}
                      </li>
                    ))}
                  </ul>
                )
                return null
              })}
            </section>
          ))}
          <p style={{ ...pStyle, marginTop: 24, color: 'rgba(245,240,232,0.30)', fontSize: '0.78rem' }}>
            {pick(LEGAL_UPDATED, lang)}
          </p>
        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 24px',
          borderTop: '1px solid rgba(0,230,118,0.10)',
          flexShrink: 0,
          display: 'flex', justifyContent: 'flex-end',
        }}>
          <button
            onClick={onClose}
            style={{
              background: 'var(--color-neon)',
              color: 'var(--color-bg-dark)',
              border: 'none', borderRadius: 8,
              padding: '10px 28px',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 800, fontSize: '0.82rem',
              letterSpacing: '0.10em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            {t(lang, 'ui.aria.close')}
          </button>
        </div>
      </div>
    </div>
  )
}
