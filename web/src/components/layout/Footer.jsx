import { Instagram, Facebook, Phone } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'
import { useLegalModal } from '../../contexts/LegalModalContext'
import { t } from '../../lib/i18n'

// Botón social — si no hay href, se renderiza atenuado y sin navegación
function SocialBtn({ href, label, children, external = true }) {
  if (!href) {
    return (
      <span
        className="footer-social-icon footer-social-icon--disabled"
        aria-label={label}
        title={label}
      >
        {children}
      </span>
    )
  }
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label={label}
      className="footer-social-icon"
    >
      {children}
    </a>
  )
}

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
  </svg>
)

export default function Footer({ siteInfo }) {
  const { lang } = useLanguage()
  const { openLegal } = useLegalModal()
  const instagram = siteInfo?.social_instagram || null
  const facebook  = siteInfo?.social_facebook  || null
  const phone     = siteInfo?.phone
  const email     = siteInfo?.email

  const legalLinks = [
    { labelKey: 'ui.footer.legal',   modal: 'aviso'      },
    { labelKey: 'ui.footer.privacy', modal: 'privacidad' },
    { labelKey: 'ui.footer.cookies', modal: 'cookies'    },
  ]

  return (
    <footer className="site-footer">
      <div className="footer-content">
        {/* Logo */}
        <img
          src="/amigos2-logo-2-1.png"
          alt="Amigos2"
          className="footer-logo"
        />

        {/* Info básica */}
        <div className="footer-info">
          <p>{t(lang, 'ui.footer.tagline')}</p>
          <p>Lloret de Mar</p>
          {(email || phone) && (
            <p className="footer-contact">
              {email && <a href={`mailto:${email}`}>{email}</a>}
              {email && phone && <span> · </span>}
              {phone && <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>}
            </p>
          )}
        </div>

        {/* Iconos sociales + teléfono (sin título "Síguenos") */}
        <div className="footer-social">
          <SocialBtn
            href={phone ? `tel:${phone.replace(/\s+/g, '')}` : null}
            label="Teléfono"
            external={false}
          >
            <Phone size={20} />
          </SocialBtn>
          <SocialBtn href={instagram} label="Instagram">
            <Instagram size={20} />
          </SocialBtn>
          <SocialBtn href={facebook} label="Facebook">
            <Facebook size={20} />
          </SocialBtn>
          <SocialBtn href={null} label="TikTok">
            <TikTokIcon />
          </SocialBtn>
        </div>

        {/* Links legales (modal) */}
        <div className="footer-legal-links">
          {legalLinks.map(({ labelKey, modal }) => (
            <button
              key={modal}
              type="button"
              onClick={() => openLegal(modal)}
              className="footer-legal-link"
            >
              {t(lang, labelKey)}
            </button>
          ))}
        </div>

        {/* Copyright + créditos discretos */}
        <div className="footer-bottom">
          <p className="footer-copyright">© 2026 Amigos2 · Lloret de Mar</p>
          <p className="footer-credits">
            {t(lang, 'ui.footer.designed_by')}{' '}
            <a href="https://ayoubjerari.com" target="_blank" rel="noreferrer">AyoubDev</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
