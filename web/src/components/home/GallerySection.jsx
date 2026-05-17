import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useGallery } from '../../hooks/useGallery'
import { useLanguage } from '../../hooks/useLanguage'
import { t } from '../../lib/i18n'

function Lightbox({ photos, idx, onClose, onPrev, onNext, lang }) {
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(4,13,7,0.96)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(12px)',
      }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 20, right: 20,
          background: 'rgba(245,240,232,0.10)',
          border: '1px solid rgba(245,240,232,0.15)',
          borderRadius: 8,
          color: 'var(--color-cream)',
          width: 40, height: 40,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}
        aria-label={t(lang, 'ui.aria.close')}
      >
        <X size={20} />
      </button>

      <img
        src={photos[idx]?.image_url}
        alt={photos[idx]?.alt_text ?? ''}
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '90vw', maxHeight: '85vh',
          objectFit: 'contain', borderRadius: 12,
        }}
      />

      {onPrev && (
        <button
          onClick={e => { e.stopPropagation(); onPrev() }}
          style={{ ...navBtnStyle, left: 16 }}
          aria-label={t(lang, 'ui.aria.prev')}
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {onNext && (
        <button
          onClick={e => { e.stopPropagation(); onNext() }}
          style={{ ...navBtnStyle, right: 16 }}
          aria-label={t(lang, 'ui.aria.next')}
        >
          <ChevronRight size={24} />
        </button>
      )}

      <span style={{
        position: 'absolute', bottom: 20,
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600, fontSize: '0.80rem',
        color: 'rgba(245,240,232,0.50)',
      }}>
        {idx + 1} / {photos.length}
      </span>
    </div>
  )
}

const navBtnStyle = {
  position: 'absolute', top: '50%', transform: 'translateY(-50%)',
  background: 'rgba(245,240,232,0.10)',
  border: '1px solid rgba(245,240,232,0.15)',
  borderRadius: 10,
  color: 'var(--color-cream)',
  width: 48, height: 48,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer',
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
        padding: '80px 24px',
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
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 12 }}
                  />
                  <div className="gallery-overlay" />
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
