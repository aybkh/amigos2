import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { ROUTES } from '../../lib/constants'
import { useSiteInfo } from '../../hooks/useSiteInfo'
import { useLanguage } from '../../hooks/useLanguage'
import { useHeroMedia } from '../../hooks/useHeroMedia'
import { t } from '../../lib/i18n'

// Hero Opción C (minimalista) con:
//  · Logo de marca en vez de wordmark de texto
//  · Soporte opcional de imagen/vídeo de fondo desde la tabla `hero_media`
//    (admin lo configura desde /hero). Si no hay media activo,
//    el fondo es el gradiente verde + 2 blobs (default).

export default function HeroSection() {
  const { siteInfo } = useSiteInfo()
  const { lang } = useLanguage()
  const { media } = useHeroMedia()

  const slogan = siteInfo?.slogan || 'Bar · Restaurante · Pizzería · Lloret de Mar'
  const hasMedia = media && media.media_type !== 'none' && !!media.media_url
  const sectionClass = `hero-section${hasMedia ? ' hero-has-media' : ''}`

  return (
    <section id="inicio" className={sectionClass}>
      {/* Media de fondo opcional (imagen o vídeo) */}
      {hasMedia && (
        <div className="hero-background-media" aria-hidden="true">
          {media.media_type === 'video' ? (
            <video autoPlay muted loop playsInline>
              <source src={media.media_url} type="video/mp4" />
            </video>
          ) : (
            <img src={media.media_url} alt="" />
          )}
          <div className="hero-overlay" />
        </div>
      )}

      <span className="hero-badge glass-neon">
        <MapPin size={12} />
        {t(lang, 'ui.hero.badge')}
      </span>

      <div className="hero-logo-container">
        <img src="/amigos2-logo-2-1.png" alt="Amigos2" className="hero-logo" />
      </div>

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
