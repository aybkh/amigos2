// Grid masonry-style de la galería completa
import { useState } from 'react'
import GalleryModal from './GalleryModal'

export default function GalleryGrid({ photos }) {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {photos.map((photo) => (
          <button
            key={photo.id}
            onClick={() => setSelected(photo)}
            className="aspect-square overflow-hidden rounded-xl bg-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <img
              src={photo.image_url}
              alt={photo.alt_text ?? 'Foto del restaurante'}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {selected && (
        <GalleryModal photo={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
