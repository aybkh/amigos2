import { Link } from 'react-router-dom'
import { Pizza, UtensilsCrossed, Flame, MapPin } from 'lucide-react'
import { ROUTES } from '../../lib/constants'
import { useSiteInfo } from '../../hooks/useSiteInfo'
import { useLanguage } from '../../hooks/useLanguage'
import { useHeroMedia } from '../../hooks/useHeroMedia'
import { t } from '../../lib/i18n'
import '../../styles/HeroSection.css'

// Hero compacto con media (imagen/vídeo del panel admin) como FONDO
// a pantalla completa + overlay oscuro. Sin media: color sólido.

function HeroBackground({ media }) {
  if (media.media_type === 'video') {
    return (
      <video
        autoPlay muted loop playsInline
        className="hero-bg-media"
        aria-hidden="true"
      >
        <source src={media.media_url} type="video/mp4" />
      </video>
    )
  }
  return (
    <img
      src={media.media_url}
      alt=""
      className="hero-bg-media"
      loading="eager"
      aria-hidden="true"
    />
  )
}

export default function HeroSection() {
  const { siteInfo } = useSiteInfo()
  const { lang } = useLanguage()
  const { media } = useHeroMedia()

  const slogan = siteInfo?.slogan || 'Bar · Restaurante · Pizzería · Lloret de Mar'
  const hasMedia = !!media && media.media_type !== 'none' && !!media.media_url

  const scrollToLocation = () =>
    document.getElementById('ubicacion')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="inicio" className="hero-section-compact">

      {/* Fondo: media del admin + overlay oscuro */}
      {hasMedia && (
        <div className="hero-bg" aria-hidden="true">
          <HeroBackground media={media} />
          <div className="hero-overlay" />
        </div>
      )}

      <div className="hero-inner">

        {/* Logo + slogan */}
        <div className="hero-main">
          <img src="/amigos2-logo-2-1.png" alt="Amigos2" className="hero-logo" />
          <p className="hero-slogan">{slogan}</p>
        </div>

        {/* CTAs */}
        <div className="hero-ctas">
          <Link to={ROUTES.MENU} target="_blank" rel="noopener noreferrer" className="hero-cta-primary">
            {t(lang, 'ui.hero.cta_menu')}
          </Link>
          <button type="button" onClick={scrollToLocation} className="hero-cta-secondary">
            <MapPin size={18} />
            {t(lang, 'ui.hero.cta_location')}
          </button>
        </div>

        {/* Mini-cards categorías destacadas → carta */}
        <div className="hero-highlights">
          <Link to={`${ROUTES.MENU}?cat=pizza`} target="_blank" rel="noopener noreferrer" className="hero-highlight-card" aria-label="Ver Pizzas">
            <Pizza size={28} strokeWidth={1.5} />
            <span>Pizzas</span>
          </Link>
          <Link to={`${ROUTES.MENU}?cat=turca`} target="_blank" rel="noopener noreferrer" className="hero-highlight-card" aria-label="Ver Comida Turca">
            <UtensilsCrossed size={28} strokeWidth={1.5} />
            <span>Turca</span>
          </Link>
          <Link to={`${ROUTES.MENU}?cat=hind`} target="_blank" rel="noopener noreferrer" className="hero-highlight-card" aria-label="Ver Comida Hindú">
            <Flame size={28} strokeWidth={1.5} />
            <span>Hindú</span>
          </Link>
        </div>

      </div>
    </section>
  )
}
