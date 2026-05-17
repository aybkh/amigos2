import { useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function GalleryModal({ photo, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && onPrev) onPrev()
      if (e.key === 'ArrowRight' && onNext) onNext()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose, onPrev, onNext])

  const btnStyle = {
    backgroundColor: '#2A5A43',
    border: '2px solid #F9F8F6',
    color: '#ffffff',
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
        style={btnStyle}
        aria-label="Cerrar"
      >
        <X size={18} />
      </button>

      {onPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
          style={btnStyle}
          aria-label="Anterior"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      <div
        className="rounded-2xl overflow-hidden max-w-full max-h-[85vh]"
        style={{ border: '4px solid #F9F8F6' }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.image_url}
          alt={photo.alt_text ?? 'Foto del restaurante'}
          className="max-w-full max-h-[85vh] object-contain"
        />
      </div>

      {onNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext() }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
          style={btnStyle}
          aria-label="Siguiente"
        >
          <ChevronRight size={22} />
        </button>
      )}
    </div>
  )
}
