import { ChevronUp, ChevronDown, Trash2 } from 'lucide-react'

export default function GalleryManager({ images, onDelete, onReorder }) {
  if (images.length === 0) {
    return (
      <div className="text-center py-12 text-stone-400 text-sm border-2 border-dashed border-stone-200 rounded-xl">
        Sin imágenes. Sube las primeras fotos arriba.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {images.map((img, idx) => (
        <div key={img.id} className="group relative aspect-square rounded-xl overflow-hidden border border-stone-200">
          <img
            src={img.image_url}
            alt={img.alt_text || `Foto ${idx + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
            <button
              onClick={() => onReorder(idx, idx - 1)}
              disabled={idx === 0}
              className="p-1.5 bg-white/90 rounded-full text-stone-700 hover:bg-white disabled:opacity-30"
            ><ChevronUp size={14} /></button>
            <button
              onClick={() => onDelete(img)}
              className="p-1.5 bg-red-500 rounded-full text-white hover:bg-red-600"
            ><Trash2 size={14} /></button>
            <button
              onClick={() => onReorder(idx, idx + 1)}
              disabled={idx === images.length - 1}
              className="p-1.5 bg-white/90 rounded-full text-stone-700 hover:bg-white disabled:opacity-30"
            ><ChevronDown size={14} /></button>
          </div>
          <span className="absolute bottom-1 right-1 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded-full">
            {idx + 1}
          </span>
        </div>
      ))}
    </div>
  )
}
