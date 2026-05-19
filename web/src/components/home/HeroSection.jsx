import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { ROUTES } from '../../lib/constants'
import { useSiteInfo } from '../../hooks/useSiteInfo'
import { useLanguage } from '../../hooks/useLanguage'
import { t } from '../../lib/i18n'

// Hero Opción C — minimalista: gradiente oscuro + 2 blobs verdes
// desenfocados (::before y ::after en CSS), contenido centrado.
// Mobile-first; ver `.hero-section` en styles/index.css.

export default function HeroSection() {
  const { siteInfo } = useSiteInfo()
  const { lang } = useLanguage()

  const rawName = siteInfo?.restaurant_name || 'Amigos 2'
  const base    = rawName.replace(/\s*\d+\s*$/, '').trim().toUpperCase()
  const suffix  = rawName.match(/\d+$/)?.[0] ?? ''
  const slogan  = siteInfo?.slogan || 'Bar · Restaurante · Pizzería · Lloret de Mar'

  return (
    <section id="inicio" className="hero-section">
      <span className="hero-badge glass-neon">
        <MapPin size={12} />
        {t(lang, 'ui.hero.badge')}
      </span>

      <h1 className="hero-title">
        {base}
        {suffix && <span className="hero-title-accent">{suffix}</span>}
      </h1>

      <p className="hero-subtitle">{slogan}</p>

      <div className="hero-cta-buttons">
        <Link to={ROUTES.MENU} className="hero-btn-primary">
          {t(lang, 'ui.hero.cta_menu')}
        </Link>
        <button
          type="button"
          className="hero-btn-secondary"
          onClick={() => document.getElementById('ubicacion')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <MapPin size={16} /> {t(lang, 'ui.hero.cta_location')}
        </button>
      </div>
    </section>
  )
}
