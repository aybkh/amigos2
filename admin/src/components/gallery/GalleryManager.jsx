import { useState, useEffect } from 'react'
import { ChevronUp, ChevronDown, Trash2, Save } from 'lucide-react'

function GalleryItem({ img, idx, isFirst, isLast, onDelete, onReorder, onUpdateDescription }) {
  const [altText, setAltText] = useState(img.alt_text || '')

  useEffect(() => {
    setAltText(img.alt_text || '')
  }, [img.alt_text])

  const hasChanged = altText !== (img.alt_text || '')

  return (
    <div className="bg-stone-50 rounded-xl overflow-hidden border border-stone-200 shadow-sm flex flex-col">
      {/* Image container */}
      <div className="group relative aspect-video sm:aspect-square bg-stone-100 border-b border-stone-200">
        <img
          src={img.image_url}
          alt={img.alt_text || `Foto ${idx + 1}`}
          className="w-full h-full object-cover"
        />
        {/* Overlay controls */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100">
          <button
            onClick={() => onReorder(idx, idx - 1)}
            disabled={isFirst}
            className="p-1.5 bg-white/90 rounded-full text-stone-700 hover:bg-white disabled:opacity-30 transition-colors"
            title="Mover arriba"
          ><ChevronUp size={15} /></button>
          
          <button
            onClick={() => onDelete(img)}
            className="p-1.5 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
            title="Eliminar imagen"
          ><Trash2 size={15} /></button>
          
          <button
            onClick={() => onReorder(idx, idx + 1)}
            disabled={isLast}
            className="p-1.5 bg-white/90 rounded-full text-stone-700 hover:bg-white disabled:opacity-30 transition-colors"
            title="Mover abajo"
          ><ChevronDown size={15} /></button>
        </div>
        
        {/* Badge with index */}
        <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2 py-0.5 rounded-full">
          #{idx + 1}
        </span>
      </div>

      {/* Description area */}
      <div className="p-3 flex flex-col gap-2 flex-grow">
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
            Descripción corta
          </label>
          <input
            type="text"
            placeholder="Ej. Terraza exterior..."
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            className="w-full border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white transition-all"
          />
        </div>
        
        <button
          onClick={() => onUpdateDescription(img.id, altText)}
          disabled={!hasChanged}
          className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            hasChanged 
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm cursor-pointer' 
              : 'bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200'
          }`}
        >
          <Save size={12} />
          <span>Guardar</span>
        </button>
      </div>
    </div>
  )
}

export default function GalleryManager({ images, onDelete, onReorder, onUpdateDescription }) {
  if (images.length === 0) {
    return (
      <div className="text-center py-12 text-stone-400 text-sm border-2 border-dashed border-stone-200 rounded-xl">
        Sin imágenes. Sube las primeras fotos arriba.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((img, idx) => (
        <GalleryItem
          key={img.id}
          img={img}
          idx={idx}
          isFirst={idx === 0}
          isLast={idx === images.length - 1}
          onDelete={onDelete}
          onReorder={onReorder}
          onUpdateDescription={onUpdateDescription}
        />
      ))}
    </div>
  )
}
