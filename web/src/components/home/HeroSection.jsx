import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { ROUTES } from '../../lib/constants'
import { useSiteInfo } from '../../hooks/useSiteInfo'
import { useLanguage } from '../../hooks/useLanguage'
import { t } from '../../lib/i18n'
import PriceDisplay from '../ui/PriceDisplay'

const HERO_PILLS = [
  { emoji: '🍕', name: 'Pizza Amigos 2', price: 10 },
  { emoji: '🥙', name: 'Dürüm XXL',     price: 9  },
  { emoji: '🥘', name: 'Paella Mixta',  price: 13 },
  { emoji: '🍹', name: 'Mojito 1L',     price: 12 },
]

export default function HeroSection() {
  const { siteInfo } = useSiteInfo()
  const { lang } = useLanguage()

  const rawName = siteInfo?.restaurant_name || 'Amigos 2'
  const base    = rawName.replace(/\s*\d+\s*$/, '').trim().toUpperCase()
  const suffix  = rawName.match(/\d+$/)?.[0] ?? ''
  const slogan  = siteInfo?.slogan || 'Bar · Restaurante · Pizzería · Doner Kebab · Paellas · Cócteles'

  return (
    <section
      id="inicio"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #0a2a1a 0%, #0f3d2a 50%, #071a10 100%)',
        position: 'relative',
        display: 'flex', alignItems: 'center',
        padding: '96px 24px 64px',
        overflow: 'hidden',
      }}
    >
      {/* Decorative orb */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-5%',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(0,230,118,0.12) 0%, transparent 65%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 1200, margin: '0 auto', width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '48px 64px', alignItems: 'center',
      }}>

        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Badge */}
          <div style={{ display: 'flex' }}>
            <span
              className="glass-neon"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '6px 14px', borderRadius: 100,
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700, fontSize: '0.72rem',
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'var(--color-neon)',
              }}
            >
              <MapPin size={12} />
              {t(lang, 'ui.hero.badge')}
            </span>
          </div>

          {/* Title from siteInfo */}
          <h1 style={{
            fontFamily: "'Black Ops One', cursive",
            fontSize: 'clamp(3.5rem, 10vw, 7rem)',
            lineHeight: 0.95, margin: 0,
            color: 'var(--color-cream)', letterSpacing: '0.02em',
          }}>
            {base}{suffix && <span style={{ color: 'var(--color-neon)' }}>{suffix}</span>}
          </h1>

          {/* Slogan from siteInfo */}
          <p style={{
            margin: 0,
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.95rem', fontWeight: 500,
            letterSpacing: '0.05em',
            color: 'rgba(245,240,232,0.50)', lineHeight: 1.6,
          }}>
            {slogan}
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link to={ROUTES.MENU} style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'var(--color-neon)', color: 'var(--color-bg-dark)',
                border: 'none', borderRadius: 10, padding: '14px 28px',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 800, fontSize: '0.90rem',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                {t(lang, 'ui.hero.cta_menu')}
              </button>
            </Link>
            <button
              onClick={() => document.getElementById('ubicacion')?.scrollIntoView({ behavior: 'smooth' })}
              className="glass"
              style={{
                border: '1px solid rgba(245,240,232,0.15)',
                background: 'rgba(245,240,232,0.06)',
                color: 'var(--color-cream)',
                borderRadius: 10, padding: '14px 24px',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700, fontSize: '0.90rem',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,230,118,0.40)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(245,240,232,0.15)')}
            >
              <MapPin size={16} /> {t(lang, 'ui.hero.cta_location')}
            </button>
          </div>
        </div>

        {/* Right column — 2×2 pills */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {HERO_PILLS.map(({ emoji, name, price }) => (
            <div
              key={name}
              className="glass"
              style={{
                borderRadius: 14, padding: '20px 16px',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 8, textAlign: 'center',
                transition: 'border-color 0.2s', cursor: 'default',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,230,118,0.35)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(245,240,232,0.10)')}
            >
              <span style={{ fontSize: '2.2rem', lineHeight: 1 }}>{emoji}</span>
              <span style={{
                fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '0.82rem',
                color: 'var(--color-cream)', lineHeight: 1.3,
              }}>{name}</span>
              <PriceDisplay price={price} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
