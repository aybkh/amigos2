import { useState, useEffect, useRef } from 'react'
import { useMenu } from '../../hooks/useMenu'
import { useLanguage } from '../../hooks/useLanguage'
import { t } from '../../lib/i18n'
import PriceDisplay from '../ui/PriceDisplay'

const TARGET_NAMES = ['Pizzas', 'Comida Turca', 'Paellas', 'Platos Combinados', 'Cócteles', 'Hindú']

const EMOJI_MAP = {
  pizza: '🍕', pizzas: '🍕',
  turca: '🥙', kebab: '🥙', durum: '🥙', dürüm: '🥙',
  paella: '🥘', paellas: '🥘', pescado: '🥘',
  plato: '🍖', combinado: '🍖',
  cóctel: '🍹', coctel: '🍹', bebida: '🍹', refresco: '🍹',
  hindú: '🥣', hindu: '🥣', biryani: '🥣',
  pasta: '🍝', espagueti: '🍝',
  burger: '🍔', hamburguesa: '🍔',
  tapa: '🍟', entrante: '🍟',
  ensalada: '🥗',
  bocadillo: '🥖',
}

function getCategoryEmoji(name) {
  const low = (name || '').toLowerCase()
  for (const [key, emoji] of Object.entries(EMOJI_MAP)) {
    if (low.includes(key)) return emoji
  }
  return '🍽️'
}

const isValidUrl = (url) => !!url && (url.startsWith('http://') || url.startsWith('https://'))

function getAvailableProducts(cat) {
  return (cat.products ?? []).filter(p => p.is_available !== false)
}

// Un slide del slider — imagen del producto o emoji de fallback
function FeaturedSlide({ product, emoji, active }) {
  const [imgFailed, setImgFailed] = useState(false)
  const showImg = isValidUrl(product?.image_url) && !imgFailed

  return (
    <div className={`featured-slide${active ? ' active' : ''}`} aria-hidden={!active}>
      {showImg
        ? <img src={product.image_url} alt="" loading="lazy" onError={() => setImgFailed(true)} />
        : <span style={{ fontSize: '3rem', lineHeight: 1 }}>{emoji}</span>}
    </div>
  )
}

function FeaturedCard({ cat, lang }) {
  const products = getAvailableProducts(cat)
  const emoji = getCategoryEmoji(cat.name)

  const [currentIndex, setCurrentIndex] = useState(0)
  const pausedRef = useRef(false)
  // Timing desincronizado por tarjeta (4-5s) — réplica de The Kebab Lab
  const delayRef = useRef(4000 + Math.random() * 1000)

  // Auto-slide: avanza solo si hay más de 1 producto y no está en pausa
  useEffect(() => {
    if (products.length <= 1) return
    const id = setInterval(() => {
      if (pausedRef.current) return
      setCurrentIndex(prev => (prev + 1) % products.length)
    }, delayRef.current)
    return () => clearInterval(id)
  }, [products.length])

  const count = products.length
  const activeIdx = count ? currentIndex % count : 0
  const product = products[activeIdx] ?? null

  return (
    <div
      style={{
        background: 'rgba(245,240,232,0.05)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(245,240,232,0.08)',
        borderRadius: 14,
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={e => {
        pausedRef.current = true
        e.currentTarget.style.borderColor = 'rgba(0,230,118,0.25)'
      }}
      onMouseLeave={e => {
        pausedRef.current = false
        e.currentTarget.style.borderColor = 'rgba(245,240,232,0.08)'
      }}
    >
      {/* Slider de productos con crossfade */}
      <div className="featured-img-zone featured-slider">
        {count > 0
          ? products.map((p, idx) => (
              <FeaturedSlide key={p.id} product={p} emoji={emoji} active={idx === activeIdx} />
            ))
          : (
            <div className="featured-slide active">
              <span style={{ fontSize: '3rem', lineHeight: 1 }}>{emoji}</span>
            </div>
          )}

      </div>

      {/* Contenido */}
      <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700, fontSize: '0.60rem',
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--color-neon)',
        }}>{cat.name}</span>
        {product ? (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: 10,
          }}>
            <span style={{
              flex: 1, minWidth: 0,
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700, fontSize: '0.85rem',
              color: 'var(--color-cream)',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{product.name}</span>
            <span style={{ flexShrink: 0 }}>
              <PriceDisplay price={product.price} />
            </span>
          </div>
        ) : (
          <span style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.78rem',
            color: 'rgba(245,240,232,0.35)',
          }}>{t(lang, 'ui.featured.no_products')}</span>
        )}
      </div>
    </div>
  )
}

export default function FeaturedSection() {
  const { categories, loading } = useMenu()
  const { lang } = useLanguage()

  const featured = (() => {
    if (categories.length === 0) return []
    const byName = TARGET_NAMES
      .map(n => categories.find(c => c.name.toLowerCase().includes(n.toLowerCase())))
      .filter(Boolean)
    if (byName.length >= 3) return byName.slice(0, 6)
    return categories.filter(c => c.is_active !== false).slice(0, 6)
  })()

  if (!loading && featured.length === 0) return null

  return (
    <section id="featured" style={{ background: 'linear-gradient(180deg, var(--color-bg-dark) 0%, var(--color-bg-mid) 100%)', padding: '48px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2
            className="section-title-glow"
            style={{
              fontFamily: "'Black Ops One', cursive",
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              color: 'var(--color-cream)', margin: 0, letterSpacing: '0.04em',
            }}
          >
            {t(lang, 'ui.featured.title')}{' '}
            <span style={{ color: 'var(--color-neon)' }}>{t(lang, 'ui.featured.title_highlight')}</span>
          </h2>
          <p style={{
            marginTop: 8, marginBottom: 0,
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 600, fontSize: '0.78rem',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.40)',
          }}>{t(lang, 'ui.featured.subtitle')}</p>
        </div>

        <div className="featured-grid">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="featured-img-zone" style={{
                  borderRadius: 14,
                  background: 'rgba(245,240,232,0.04)',
                  border: '1px solid rgba(245,240,232,0.06)',
                }} />
              ))
            : featured.map(cat => <FeaturedCard key={cat.id} cat={cat} lang={lang} />)
          }
        </div>
      </div>
    </section>
  )
}
