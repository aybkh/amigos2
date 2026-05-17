import { useState } from 'react'
import GalleryModal from '../gallery/GalleryModal'

function SkeletonPhoto() {
  return (
    <div
      className="gallery-item"
      style={{ background: 'rgba(255,255,255,0.06)', cursor: 'default' }}
    />
  )
}

export default function GalleryPreviewSection({ photos, loading }) {
  const [selectedIdx, setSelectedIdx] = useState(null)

  if (!loading && !photos?.length) return null

  return (
    <section id="galeria" className="featured-section">
      <div className="max-w-[1200px] mx-auto">
        <div className="section-head">
          <h2>Galería</h2>
        </div>

        <div className="gallery-grid">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonPhoto key={i} />)
            : photos.map((photo, idx) => (
                <button
                  key={photo.id}
                  onClick={() => setSelectedIdx(idx)}
                  className="gallery-item"
                  aria-label="Ver foto"
                >
                  <img
                    src={photo.image_url}
                    alt={photo.alt_text ?? 'Foto del restaurante'}
                    loading="lazy"
                  />
                  <div className="gallery-item-overlay" />
                </button>
              ))
          }
        </div>
      </div>

      {selectedIdx !== null && photos?.[selectedIdx] && (
        <GalleryModal
          photo={photos[selectedIdx]}
          onClose={() => setSelectedIdx(null)}
          onPrev={selectedIdx > 0 ? () => setSelectedIdx(i => i - 1) : null}
          onNext={selectedIdx < photos.length - 1 ? () => setSelectedIdx(i => i + 1) : null}
        />
      )}
    </section>
  )
}
