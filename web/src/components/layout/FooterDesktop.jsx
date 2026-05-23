import { Link } from 'react-router-dom'
import { Instagram, Facebook, Phone, Mail } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'
import { useLegalModal } from '../../contexts/LegalModalContext'
import { t } from '../../lib/i18n'
import { ROUTES } from '../../lib/constants'
import '../../styles/FooterDesktop.css'

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
  </svg>
)
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.519 5.276l-.99 3.617 3.96-1.592zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.296-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01a1.094 1.094 0 00-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414z"/>
  </svg>
)

function SocialBtn({ href, label, children }) {
  if (!href) {
    return (
      <span className="footer-desktop-social-disabled" aria-label={label} title={label}>
        {children}
      </span>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      {children}
    </a>
  )
}

export default function FooterDesktop({ siteInfo }) {
  const { lang } = useLanguage()
  const { openLegal } = useLegalModal()

  const instagram = siteInfo?.social_instagram || null
  const facebook  = siteInfo?.social_facebook  || null
  const tiktok    = siteInfo?.social_tiktok    || null
  const phone     = siteInfo?.phone
  const email     = siteInfo?.email
  const phoneDigits = phone ? phone.replace(/[^0-9]/g, '') : null

  const legalLinks = [
    { labelKey: 'ui.footer.legal',   modal: 'aviso'      },
    { labelKey: 'ui.footer.privacy', modal: 'privacidad' },
    { labelKey: 'ui.footer.cookies', modal: 'cookies'    },
  ]

  return (
    <footer className="footer-desktop">
      <div className="footer-desktop-container">
        <div className="footer-desktop-grid">

          {/* Col 1 — Logo + info */}
          <div className="footer-desktop-column">
            <img src="/amigos2-logo-2-1.png" alt="Amigos2" className="footer-desktop-logo" />
            <p className="footer-desktop-tagline">{t(lang, 'ui.footer.tagline')}</p>
            <p className="footer-desktop-location">Lloret de Mar</p>
          </div>

          {/* Col 2 — Navegación */}
          <div className="footer-desktop-column">
            <h3 className="footer-desktop-title">{t(lang, 'ui.footer.nav_title')}</h3>
            <ul className="footer-desktop-links">
              <li><Link to="/">{t(lang, 'ui.nav.home')}</Link></li>
              <li><Link to={ROUTES.MENU}>{t(lang, 'ui.nav.menu_cta')}</Link></li>
              <li><a href="/#galeria">{t(lang, 'ui.nav.gallery')}</a></li>
              <li><a href="/#contacto">{t(lang, 'ui.nav.contact')}</a></li>
            </ul>
          </div>

          {/* Col 3 — Horarios */}
          <div className="footer-desktop-column">
            <h3 className="footer-desktop-title">{t(lang, 'ui.hours.title')}</h3>
            <p className="footer-desktop-hours">
              {t(lang, 'ui.hours.days.lun')} – {t(lang, 'ui.hours.days.dom')}
            </p>
            <p className="footer-desktop-hours-time">12:30 – 23:59</p>
            <p className="footer-desktop-hours-time">00:00 – 03:00</p>
          </div>

          {/* Col 4 — Contacto + Redes */}
          <div className="footer-desktop-column">
            <h3 className="footer-desktop-title">{t(lang, 'ui.contact.title')}</h3>
            {phone && (
              <a href={`tel:${phoneDigits}`} className="footer-desktop-contact">
                <Phone size={14} /> {phone}
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className="footer-desktop-contact">
                <Mail size={14} /> {email}
              </a>
            )}

            <div className="footer-desktop-socials">
              <SocialBtn href={instagram} label="Instagram"><Instagram size={20} /></SocialBtn>
              <SocialBtn href={facebook}  label="Facebook"><Facebook size={20} /></SocialBtn>
              <SocialBtn href={tiktok}    label="TikTok"><TikTokIcon /></SocialBtn>
              <SocialBtn
                href={phoneDigits ? `https://wa.me/${phoneDigits}` : null}
                label="WhatsApp"
              >
                <WhatsAppIcon />
              </SocialBtn>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-desktop-bottom">
          <p className="footer-desktop-copyright">© 2026 Amigos2 · Lloret de Mar</p>
          <div className="footer-desktop-legal">
            {legalLinks.map(({ labelKey, modal }, i, arr) => (
              <span key={modal}>
                <button type="button" onClick={() => openLegal(modal)}>
                  {t(lang, labelKey)}
                </button>
                {i < arr.length - 1 && <span className="footer-desktop-legal-sep">·</span>}
              </span>
            ))}
          </div>
          <p className="footer-desktop-credits">
            {t(lang, 'ui.footer.designed_by')}{' '}
            <a href="https://ayoubjerari.com" target="_blank" rel="noreferrer">AyoubDev</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
