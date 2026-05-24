import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { useGallery } from '../../hooks/useGallery'
import { useLanguage } from '../../hooks/useLanguage'
import { t } from '../../lib/i18n'

function Lightbox({ photos, idx, onClose, onPrev, onNext, lang }) {
  // Bloquear scroll del body mientras el lightbox está abierto
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  // Navegación por teclado: Esc cierra, ← anterior, → siguiente
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft'  && onPrev) onPrev()
      else if (e.key === 'ArrowRight' && onNext) onNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onPrev, onNext])

  return (
    <div className="gallery-lightbox" onClick={onClose}>
      <button
        onClick={onClose}
        className="gallery-lightbox-btn gallery-lightbox-close"
        aria-label={t(lang, 'ui.aria.close')}
      >
        <X size={20} />
      </button>

      <img
        src={photos[idx]?.image_url}
        alt={photos[idx]?.alt_text ?? ''}
        onClick={e => e.stopPropagation()}
        className="gallery-lightbox-image"
      />

      {onPrev && (
        <button
          onClick={e => { e.stopPropagation(); onPrev() }}
          className="gallery-lightbox-btn gallery-lightbox-prev"
          aria-label={t(lang, 'ui.aria.prev')}
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {onNext && (
        <button
          onClick={e => { e.stopPropagation(); onNext() }}
          className="gallery-lightbox-btn gallery-lightbox-next"
          aria-label={t(lang, 'ui.aria.next')}
        >
          <ChevronRight size={24} />
        </button>
      )}

      <span className="gallery-lightbox-counter">
        {idx + 1} / {photos.length}
      </span>
    </div>
  )
}

export default function GallerySection() {
  const { photos, loading } = useGallery({ preview: true })
  const { lang } = useLanguage()
  const [selected, setSelected] = useState(null)
  const [featuredIdx, setFeaturedIdx] = useState(0)

  // Rotación automática cada 5 segundos (si no está abierto el lightbox)
  useEffect(() => {
    if (loading || photos.length <= 1 || selected !== null) return
    const interval = setInterval(() => {
      setFeaturedIdx(prev => (prev + 1) % photos.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [loading, photos.length, selected])

  if (!loading && photos.length === 0) return null

  return (
    <section
      id="galeria"
      style={{
        background: 'var(--color-bg-dark)',
        padding: '48px 24px',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2
            className="section-title-glow"
            style={{
              fontFamily: "'Black Ops One', cursive",
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              color: 'var(--color-cream)', margin: 0, letterSpacing: '0.04em',
            }}
          >
            {t(lang, 'ui.gallery.title')}
          </h2>
        </div>

        {/* 1. Imagen Grande Destacada (Showcase) */}
        {loading ? (
          <div
            style={{
              width: '100%',
              maxWidth: 760,
              margin: '0 auto 20px',
              aspectRatio: '3 / 2',
              borderRadius: 16,
              background: 'rgba(245,240,232,0.04)',
              border: '1px solid rgba(0, 230, 118, 0.15)',
            }}
          />
        ) : (
          <div
            className="gallery-featured-card"
            onClick={() => setSelected(featuredIdx)}
            style={{
              width: '100%',
              maxWidth: 760,
              margin: '0 auto 20px',
              aspectRatio: '3 / 2',
              borderRadius: 16,
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer',
              border: '1px solid rgba(0, 230, 118, 0.20)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.40)',
            }}
          >
            {photos.map((photo, idx) => (
              <img
                key={photo.id}
                src={photo.image_url}
                alt={photo.alt_text ?? ''}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  opacity: idx === featuredIdx ? 1 : 0,
                  transition: 'opacity 0.8s ease-in-out',
                  zIndex: idx === featuredIdx ? 1 : 0,
                }}
              />
            ))}
            {/* Overlay con gradiente y zoom icon */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(7,26,16,0.70) 0%, transparent 60%)',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '16px 20px',
                zIndex: 10,
              }}
            >
              <div style={{ flex: 1, minWidth: 0, position: 'relative', height: '1.25rem', overflow: 'hidden' }}>
                {photos.map((photo, idx) => (
                  <span
                    key={photo.id}
                    style={{
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      color: 'var(--color-cream)',
                      textShadow: '0 2px 4px rgba(0,0,0,0.60)',
                      opacity: idx === featuredIdx ? 1 : 0,
                      transition: 'opacity 0.8s ease-in-out',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      width: '100%',
                    }}
                  >
                    {photo.alt_text || t(lang, 'ui.gallery.title')}
                  </span>
                ))}
              </div>
              <span
                style={{
                  marginLeft: 'auto',
                  background: 'var(--color-neon)',
                  color: 'var(--color-bg-dark)',
                  borderRadius: '50%',
                  width: 38,
                  height: 38,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0, 230, 118, 0.40)',
                  zIndex: 11,
                }}
              >
                <ZoomIn size={18} />
              </span>
            </div>
          </div>
        )}

        {/* 2. Fila de Miniaturas (Thumbnails) */}
        <div
          className="gallery-thumbnails-container"
          style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'center',
            overflowX: 'auto',
            padding: '4px 4px 16px',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {loading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  style={{
                    flexShrink: 0,
                    width: 'clamp(70px, 18vw, 100px)',
                    aspectRatio: '3 / 2',
                    borderRadius: 10,
                    background: 'rgba(245,240,232,0.03)',
                    border: '1px solid rgba(245,240,232,0.06)',
                  }}
                />
              ))
            : photos.map((photo, idx) => (
                <button
                  key={photo.id}
                  onClick={() => setFeaturedIdx(idx)}
                  aria-label={`${t(lang, 'ui.aria.view_photo')} ${idx + 1}`}
                  style={{
                    flexShrink: 0,
                    width: 'clamp(70px, 18vw, 100px)',
                    aspectRatio: '3 / 2',
                    borderRadius: 10,
                    border: idx === featuredIdx
                      ? '2px solid var(--color-neon)'
                      : '1px solid rgba(245,240,232,0.15)',
                    padding: 0,
                    background: 'none',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    opacity: idx === featuredIdx ? 1 : 0.45,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: idx === featuredIdx
                      ? '0 0 14px rgba(0, 230, 118, 0.50)'
                      : 'none',
                    transform: idx === featuredIdx ? 'scale(1.04)' : 'none',
                  }}
                >
                  <img
                    src={photo.image_url}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </button>
              ))}
        </div>

      </div>

      {selected !== null && (
        <Lightbox
          photos={photos}
          idx={selected}
          lang={lang}
          onClose={() => setSelected(null)}
          onPrev={selected > 0 ? () => setSelected(i => i - 1) : null}
          onNext={selected < photos.length - 1 ? () => setSelected(i => i + 1) : null}
        />
      )}
    </section>
  )
}
