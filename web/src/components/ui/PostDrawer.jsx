import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { postsService } from '../../services/postsService'
import { useLanguage } from '../../hooks/useLanguage'
import { t } from '../../lib/i18n'

const LOCALE_MAP = {
  es: 'es-ES', en: 'en-GB', cat: 'ca-ES', fr: 'fr-FR',
  de: 'de-DE', nl: 'nl-NL', ru: 'ru-RU', ar: 'ar-SA',
  pl: 'pl-PL', it: 'it-IT',
}

function formatDate(dateStr, lang) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString(LOCALE_MAP[lang] ?? 'es-ES', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default function PostDrawer({ post, onClose }) {
  const { lang } = useLanguage()
  const [full, setFull] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    postsService.getBySlug(post.slug)
      .then(setFull)
      .catch(() => setFull(post))
      .finally(() => setLoading(false))
  }, [post.slug])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  const data = full || post

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 9998,
          background: 'rgba(0,0,0,0.60)',
        }}
      />

      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 9999,
        width: '100%', maxWidth: 480,
        background: '#0a2a1a',
        borderLeft: '1px solid rgba(0,230,118,0.20)',
        display: 'flex', flexDirection: 'column',
        animation: 'slideInRight 0.3s ease',
        boxShadow: '-8px 0 40px rgba(0,0,0,0.50)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 20px',
          borderBottom: '1px solid rgba(0,230,118,0.12)',
          flexShrink: 0,
          background: '#0a2a1a',
        }}>
          <span style={{
            fontFamily: "'Black Ops One', cursive",
            fontSize: '1rem', letterSpacing: '0.04em',
            color: 'var(--color-neon)',
          }}>
            {t(lang, 'ui.posts.title')}
          </span>
          <button
            onClick={onClose}
            aria-label={t(lang, 'ui.aria.close')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(245,240,232,0.50)', padding: 4,
              display: 'flex', alignItems: 'center',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-cream)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.50)')}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ overflowY: 'auto', flex: 1 }}>
          {data.cover_image_url && (
            <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', flexShrink: 0 }}>
              <img
                src={data.cover_image_url}
                alt={data.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          )}

          <div style={{ padding: '24px 20px 40px' }}>
            <p style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: '0.76rem',
              color: 'rgba(245,240,232,0.38)', margin: '0 0 10px',
              letterSpacing: '0.04em',
            }}>
              {formatDate(data.published_at, lang)}
            </p>

            <h2 style={{
              fontFamily: "'Black Ops One', cursive",
              fontSize: 'clamp(1.3rem, 4vw, 1.7rem)',
              color: 'var(--color-cream)', letterSpacing: '0.04em',
              lineHeight: 1.25, margin: '0 0 20px',
            }}>
              {data.title}
            </h2>

            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[100, 80, 90, 60].map((w, i) => (
                  <div key={i} style={{
                    height: 14, borderRadius: 4,
                    background: 'rgba(245,240,232,0.06)',
                    width: `${w}%`,
                  }} />
                ))}
              </div>
            ) : data.content ? (
              data.content.split('\n').filter(Boolean).map((para, i) => (
                <p key={i} style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.88rem', lineHeight: 1.85,
                  color: 'rgba(245,240,232,0.72)',
                  margin: '0 0 14px',
                }}>
                  {para}
                </p>
              ))
            ) : null}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </>
  )
}
