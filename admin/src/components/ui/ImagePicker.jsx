import { useRef, useState } from 'react'
import { Upload, X } from 'lucide-react'

export default function ImagePicker({ value, onChange, uploading, label = 'Imagen' }) {
  const inputRef = useRef(null)
  const [preview, setPreview] = useState(value || null)

  function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
    onChange(file)
  }

  function handleClear() {
    setPreview(null)
    onChange(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-stone-700">{label}</p>
      {preview ? (
        <div className="relative inline-block">
          <img src={preview} alt="preview" className="h-32 w-auto rounded-lg object-cover border border-stone-200" />
          <button
            type="button"
            onClick={handleClear}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-stone-300 rounded-lg text-stone-500 hover:border-amber-400 hover:text-amber-600 transition-colors disabled:opacity-50"
        >
          <Upload size={16} />
          <span className="text-sm">{uploading ? 'Subiendo…' : 'Seleccionar imagen'}</span>
        </button>
      )}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  )
}
