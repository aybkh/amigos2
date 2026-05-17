import { MapPin, ExternalLink } from 'lucide-react'
import { useSiteInfo } from '../../hooks/useSiteInfo'
import { useLanguage } from '../../hooks/useLanguage'
import { t } from '../../lib/i18n'

const HARDCODED_ADDRESS = 'Buenos Aires 44, 17310 Lloret de Mar'
const HARDCODED_EMBED   = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2695.8203982075165!2d2.831212475550589!3d41.69939957658453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12bb17d94db5b89d%3A0xef09233d855d8b28!2sAmigos%202!5e1!3m2!1sca!2ses!4v1778770913577!5m2!1sca!2ses'
const HARDCODED_MAPS    = 'https://maps.google.com/?q=Amigos+2+Lloret+de+Mar'

export default function LocationSection() {
  const { siteInfo } = useSiteInfo()
  const { lang } = useLanguage()
  const address  = siteInfo?.address || HARDCODED_ADDRESS
  const embedUrl = siteInfo?.map_embed_url || HARDCODED_EMBED
  const mapsUrl  = HARDCODED_MAPS

  return (
    <section
      id="ubicacion"
      style={{
        background: 'var(--color-bg-mid)',
        padding: '80px 24px',
      }}
    >
      <div style={{ maxWidth: 700, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{
            fontFamily: "'Black Ops One', cursive",
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            color: 'var(--color-cream)', margin: 0, letterSpacing: '0.04em',
          }}>
            {t(lang, 'ui.location.title')}
          </h2>
        </div>

        <div className="glass-neon" style={{ borderRadius: 16, overflow: 'hidden' }}>

          <div style={{ height: 320, background: 'var(--color-bg-dark)' }}>
            <iframe
              title="Mapa Amigos 2"
              src={embedUrl}
              width="100%" height="100%"
              frameBorder="0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ display: 'block', filter: 'saturate(0.7) brightness(0.85)' }}
            />
          </div>

          <div style={{
            padding: '18px 24px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 12,
            borderTop: '1px solid rgba(0,230,118,0.15)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <MapPin size={16} color="var(--color-neon)" />
              <span style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.88rem', fontWeight: 500,
                color: 'rgba(245,240,232,0.80)',
              }}>
                {address}
              </span>
            </div>
            <a
              href={mapsUrl}
              target="_blank" rel="noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <button style={{
                background: 'var(--color-neon)',
                color: 'var(--color-bg-dark)',
                border: 'none', borderRadius: 8,
                padding: '10px 18px',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700, fontSize: '0.80rem',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                <ExternalLink size={14} />
                {t(lang, 'ui.location.view_maps')}
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
