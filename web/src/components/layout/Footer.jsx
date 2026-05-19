import { Instagram, Facebook } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'
import { useLegalModal } from '../../contexts/LegalModalContext'
import { t } from '../../lib/i18n'

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
  </svg>
)

function SocialBtn({ href, label, children }) {
  return (
    <a
      href={href || '#'}
      target={href && href !== '#' ? '_blank' : undefined}
      rel={href && href !== '#' ? 'noopener noreferrer' : undefined}
      aria-label={label}
      style={socialBtnStyle}
      onMouseEnter={e => Object.assign(e.currentTarget.style, socialBtnHover)}
      onMouseLeave={e => Object.assign(e.currentTarget.style, socialBtnStyle)}
    >
      {children}
    </a>
  )
}

export default function Footer({ siteInfo }) {
  const { lang } = useLanguage()
  const { openLegal } = useLegalModal()
  const instagram = siteInfo?.social_instagram || null
  const facebook  = siteInfo?.social_facebook  || null
  const phone     = siteInfo?.phone
  const email     = siteInfo?.email

  const legalLinks = [
    { labelKey: 'ui.footer.legal',   modal: 'aviso'     },
    { labelKey: 'ui.footer.privacy', modal: 'privacidad' },
    { labelKey: 'ui.footer.cookies', modal: 'cookies'    },
  ]

  return (
    <footer className="site-footer" style={{
      background: '#040d07',
      borderTop: '1px solid rgba(0,230,118,0.10)',
      padding: '52px 24px 28px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* 3-col grid */}
        <div className="site-footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 40, alignItems: 'start',
          marginBottom: 40,
        }}>

          {/* Col 1 — Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <img
              src="/amigos2-logo-2-1.png"
              alt="Amigos2"
              style={{ height: 'auto', width: '60%', display: 'block' }}
            />
            <p style={{
              margin: 0,
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.82rem', letterSpacing: '0.06em',
              color: 'rgba(245,240,232,0.45)', lineHeight: 1.7,
            }}>
              {t(lang, 'ui.footer.tagline')}<br />Lloret de Mar
            </p>
          </div>

          {/* Col 2 — Social icons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{
              margin: 0,
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700, fontSize: '0.75rem',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'rgba(245,240,232,0.40)',
            }}>{t(lang, 'ui.footer.follow_us')}</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <SocialBtn href={instagram} label="Instagram">
                <Instagram size={18} />
              </SocialBtn>
              <SocialBtn href={facebook} label="Facebook">
                <Facebook size={18} />
              </SocialBtn>
              <SocialBtn href={null} label="TikTok">
                <TikTokIcon />
              </SocialBtn>
            </div>
          </div>

          {/* Col 3 — Copyright + dev */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{
              margin: 0,
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.80rem',
              color: 'rgba(245,240,232,0.35)',
            }}>
              © 2026 Amigos 2 · Lloret de Mar
            </p>
            {email && (
              <a href={`mailto:${email}`} style={{ textDecoration: 'none' }}>
                <p style={{
                  margin: 0,
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.78rem',
                  color: 'rgba(245,240,232,0.35)',
                }}>{email}</p>
              </a>
            )}
            {phone && (
              <a href={`tel:${phone.replace(/\s+/g, '')}`} style={{ textDecoration: 'none' }}>
                <p style={{
                  margin: 0,
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.78rem',
                  color: 'rgba(245,240,232,0.35)',
                }}>{phone}</p>
              </a>
            )}
            <a href="https://ayoubjerari.com" target="_blank" rel="noreferrer"
              style={{ textDecoration: 'none' }}>
              <p style={{
                margin: 0,
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700, fontSize: '0.75rem',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'rgba(245,240,232,0.25)',
              }}>
                {t(lang, 'ui.footer.designed_by')}{' '}
                <span style={{ color: 'var(--color-neon)' }}>AyoubDev</span>
              </p>
            </a>
          </div>
        </div>

        {/* Legal links */}
        <div style={{
          borderTop: '1px solid rgba(245,240,232,0.06)',
          paddingTop: 20,
          display: 'flex', flexWrap: 'wrap', gap: '6px 16px',
          justifyContent: 'center',
        }}>
          {legalLinks.map(({ labelKey, modal }, i, arr) => (
            <span key={modal} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <button
                onClick={() => openLegal(modal)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.72rem', color: 'rgba(245,240,232,0.28)',
                  textDecoration: 'none', transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-neon)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.28)')}
              >
                {t(lang, labelKey)}
              </button>
              {i < arr.length - 1 && (
                <span style={{ color: 'rgba(245,240,232,0.15)', fontSize: '0.72rem' }}>·</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}

const socialBtnStyle = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  width: 36, height: 36,
  background: 'rgba(0,230,118,0.08)',
  border: '1px solid rgba(0,230,118,0.20)',
  borderRadius: 8,
  color: 'rgba(245,240,232,0.70)',
  textDecoration: 'none',
  transition: 'background 0.2s, color 0.2s, border-color 0.2s',
}

const socialBtnHover = {
  ...socialBtnStyle,
  background: 'var(--color-neon)',
  color: 'var(--color-bg-dark)',
  borderColor: 'var(--color-neon)',
}
