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

  if (!loading && photos.length === 0) return null

  return (
    <section
      id="galeria"
      style={{
        background: 'var(--color-cream)',
        padding: '48px 24px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{
            fontFamily: "'Black Ops One', cursive",
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            color: 'var(--color-bg-mid)', margin: 0, letterSpacing: '0.04em',
          }}>
            {t(lang, 'ui.gallery.title')}
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 14,
        }}>
          {(loading ? Array.from({ length: 6 }) : photos).map((photo, idx) => (
            <button
              key={loading ? idx : photo.id}
              onClick={() => !loading && setSelected(idx)}
              className="gallery-photo-btn"
              style={{
                border: 'none', padding: 0, cursor: loading ? 'default' : 'pointer',
                background: 'rgba(10,42,26,0.08)',
                borderRadius: 12,
                aspectRatio: '1 / 1',
                display: 'block',
              }}
              aria-label={t(lang, 'ui.aria.view_photo')}
            >
              {!loading && photo && (
                <>
                  <img
                    src={photo.image_url}
                    alt={photo.alt_text ?? ''}
                    loading="lazy"
                    className="gallery-photo-img"
                  />
                  <div className="gallery-overlay">
                    <span className="gallery-overlay-icon">
                      <ZoomIn size={22} />
                    </span>
                  </div>
                </>
              )}
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
