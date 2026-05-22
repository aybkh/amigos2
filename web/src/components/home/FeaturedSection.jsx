import { useState, useEffect, useMemo, useRef } from 'react'
import { useMenu } from '../../hooks/useMenu'
import { useLanguage } from '../../hooks/useLanguage'
import { t } from '../../lib/i18n'
import PriceDisplay from '../ui/PriceDisplay'

const TARGET_NAMES = ['Pizzas', 'Comida Turca', 'Paellas', 'Platos Combinados', 'Cócteles', 'Hindú']

// Rotación automática del plato destacado por categoría
const ROTATE_MS   = 10000  // cada 10s (pausado, profesional)
const FADE_OUT_MS = 320    // debe coincidir con la animación featuredFadeOut

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

function FeaturedCard({ cat, lang, tick, index, phase }) {
  const [imgFailed, setImgFailed] = useState(false)

  const products = getAvailableProducts(cat)

  // Producto aleatorio de ESTA categoría; recalcula en cada tick de rotación
  const product = useMemo(() => {
    if (products.length === 0) return null
    return products[Math.floor(Math.random() * products.length)]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat.id, tick])

  // Reiniciar el fallback de imagen al cambiar de producto
  useEffect(() => { setImgFailed(false) }, [product?.id])

  const emoji   = getCategoryEmoji(cat.name)
  const showImg = isValidUrl(product?.image_url) && !imgFailed

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
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,230,118,0.25)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(245,240,232,0.08)')}
    >
      {/* Fundido suave: stagger en cascada al entrar (delay por índice) */}
      <div
        className="featured-fade"
        style={{
          display: 'flex', flexDirection: 'column', flex: 1,
          animationDelay: phase === 'in' ? `${index * 0.1}s` : '0s',
        }}
      >
        <div
          className="featured-img-zone"
          style={{
            background: 'rgba(0,230,118,0.05)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {showImg ? (
            <img
              src={product.image_url}
              alt=""
              loading="lazy"
              onError={() => setImgFailed(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <span style={{ fontSize: '3rem', lineHeight: 1 }}>{emoji}</span>
          )}
        </div>

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
                {product.price != null
                  ? <PriceDisplay price={product.price} />
                  : <span style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 800, fontSize: '0.95rem',
                      color: 'var(--color-neon)',
                    }}>—</span>}
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
    </div>
  )
}

export default function FeaturedSection() {
  const { categories, loading } = useMenu()
  const { lang } = useLanguage()
  const [tick, setTick]   = useState(0)
  const [phase, setPhase] = useState('in')   // 'in' | 'out'

  // Pausa al pasar el ratón — ref para que el intervalo vea el valor actual
  const pausedRef  = useRef(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return
      setPhase('out')                              // 1) fade out
      timeoutRef.current = setTimeout(() => {
        setTick(n => n + 1)                        // 2) cambia los platos (invisible)
        setPhase('in')                             // 3) fade in con stagger
      }, FADE_OUT_MS)
    }, ROTATE_MS)
    return () => {
      clearInterval(id)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

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
    <section
      id="featured"
      style={{ background: 'var(--color-bg-mid)', padding: '48px 24px' }}
      onMouseEnter={() => { pausedRef.current = true }}
      onMouseLeave={() => { pausedRef.current = false }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{
            fontFamily: "'Black Ops One', cursive",
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            color: 'var(--color-cream)', margin: 0, letterSpacing: '0.04em',
          }}>
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

        <div className={`featured-grid ${phase === 'out' ? 'is-out' : 'is-in'}`}>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="featured-img-zone" style={{
                  borderRadius: 14,
                  background: 'rgba(245,240,232,0.04)',
                  border: '1px solid rgba(245,240,232,0.06)',
                }} />
              ))
            : featured.map((cat, i) => (
                <FeaturedCard
                  key={cat.id}
                  cat={cat}
                  lang={lang}
                  tick={tick}
                  index={i}
                  phase={phase}
                />
              ))
          }
        </div>
      </div>
    </section>
  )
}
