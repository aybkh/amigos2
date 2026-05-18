import { useDelivery } from '../../hooks/useDelivery'
import { useLanguage } from '../../hooks/useLanguage'
import { t } from '../../lib/i18n'

const PLATFORMS = {
  glovo:    { img: '/images/glovo.webp',    bg: '#FFC244', fg: '#1a1a1a' },
  ubereats: { img: '/images/ubereats.webp', bg: '#06C167', fg: '#ffffff' },
  justeat:  { img: '/images/just-eat.webp', bg: '#FF8000', fg: '#ffffff' },
  phone:    { img: '/images/amigos2.webp',  bg: '#E63946', fg: '#ffffff' },
}

const NAME_KEY = {
  glovo: 'Glovo',
  ubereats: 'Uber Eats',
  justeat: 'Just Eat',
}

export default function DeliverySection() {
  const { links, loading } = useDelivery()
  const { lang } = useLanguage()

  if (loading || links.length === 0) return null

  const open = (link) => {
    if (link.platform === 'phone') {
      window.location.href = `tel:${String(link.url).replace(/\s+/g, '')}`
    } else {
      window.open(link.url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <section id="domicilio" style={{ background: 'rgba(7,26,16,0.40)', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{
            fontFamily: "'Black Ops One', cursive",
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            color: 'var(--color-cream)', margin: 0,
            letterSpacing: '0.04em', textTransform: 'uppercase',
          }}>
            {t(lang, 'ui.delivery.title')}
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 16, maxWidth: 760, margin: '0 auto',
        }}>
          {links.map(link => {
            const cfg = PLATFORMS[link.platform]
            if (!cfg) return null
            const name = link.platform === 'phone'
              ? t(lang, 'ui.delivery.call')
              : NAME_KEY[link.platform]
            return (
              <button
                key={link.id}
                onClick={() => open(link)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '20px 24px', borderRadius: 12,
                  border: '3px solid rgba(0,0,0,0.18)',
                  background: cfg.bg, color: cfg.fg,
                  cursor: 'pointer', textAlign: 'left',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.30)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.40)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.30)'
                }}
              >
                <span style={{
                  flexShrink: 0, width: 52, height: 52, borderRadius: 10,
                  background: '#ffffff', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  padding: 6,
                }}>
                  <img
                    src={cfg.img}
                    alt=""
                    style={{
                      maxWidth: '100%', maxHeight: '100%',
                      objectFit: 'contain', display: 'block',
                      border: '2px solid rgba(0,0,0,0.15)',
                      borderRadius: 8,
                    }}
                  />
                </span>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    margin: '0 0 4px', fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 800, fontSize: '1.2rem',
                  }}>{name}</h3>
                  <p style={{
                    margin: 0, fontFamily: 'Montserrat, sans-serif',
                    fontSize: '0.85rem', opacity: 0.9,
                  }}>{t(lang, `ui.delivery.${link.platform}_sub`)}</p>
                </div>
                <span style={{ fontSize: '1.5rem', fontWeight: 700, flexShrink: 0 }}>→</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
