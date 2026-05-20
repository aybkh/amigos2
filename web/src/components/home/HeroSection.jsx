import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { ROUTES } from '../../lib/constants'
import { useSiteInfo } from '../../hooks/useSiteInfo'
import { useLanguage } from '../../hooks/useLanguage'
import { useHeroMedia } from '../../hooks/useHeroMedia'
import { t } from '../../lib/i18n'

// Hero Opción C (minimalista) con media opcional como CARD visible
// (no como fondo). En desktop: 2 columnas (media 40% izquierda /
// contenido 60% derecha). En móvil: 1 columna, media entre el logo y
// el slogan. Sin media: contenido centrado con blobs decorativos.

function HeroMedia({ media }) {
  if (media.media_type === 'video') {
    return (
      <video autoPlay muted loop playsInline className="hero-media-video">
        <source src={media.media_url} type="video/mp4" />
      </video>
    )
  }
  return (
    <img
      src={media.media_url}
      alt="Amigos2"
      className="hero-media-image"
      loading="eager"
    />
  )
}

export default function HeroSection() {
  const { siteInfo } = useSiteInfo()
  const { lang } = useLanguage()
  const { media } = useHeroMedia()

  const slogan = siteInfo?.slogan || 'Bar · Restaurante · Pizzería · Lloret de Mar'
  const hasMedia = !!media && media.media_type !== 'none' && !!media.media_url

  return (
    <section id="inicio" className={`hero-section${hasMedia ? ' hero-has-media' : ''}`}>
      <div className="hero-container">
        {/* Columna media (visible solo en desktop) */}
        {hasMedia && (
          <div className="hero-media-column desktop-only">
            <HeroMedia media={media} />
          </div>
        )}

        {/* Columna contenido */}
        <div className="hero-content-column">
          <span className="hero-badge glass-neon">
            <MapPin size={12} />
            {t(lang, 'ui.hero.badge')}
          </span>

          <div className="hero-logo-container">
            <img src="/amigos2-logo-2-1.png" alt="Amigos2" className="hero-logo" />
          </div>

          {/* Media en móvil — después del logo */}
          {hasMedia && (
            <div className="hero-media-mobile mobile-only">
              <HeroMedia media={media} />
            </div>
          )}

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
        </div>
      </div>
    </section>
  )
}
