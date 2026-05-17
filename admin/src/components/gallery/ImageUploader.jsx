import { useRef, useState } from 'react'
import { Upload, X } from 'lucide-react'
import { galleryService } from '../../services/galleryService'

export default function ImageUploader({ onUploaded }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [queue, setQueue] = useState([]) // [{file, status:'pending'|'uploading'|'done'|'error'}]

  async function processFiles(files) {
    const newItems = Array.from(files).map(file => ({ file, status: 'pending', id: Math.random() }))
    setQueue(prev => [...prev, ...newItems])

    for (const item of newItems) {
      setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: 'uploading' } : q))
      try {
        const url = await galleryService.upload(item.file)
        await galleryService.create({ image_url: url, alt_text: item.file.name.split('.')[0] })
        setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: 'done' } : q))
      } catch {
        setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: 'error' } : q))
      }
    }
    onUploaded()
    setTimeout(() => setQueue(prev => prev.filter(q => q.status === 'error')), 2000)
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragging(false)
    if (e.dataTransfer.files?.length) processFiles(e.dataTransfer.files)
  }

  function handleFileInput(e) {
    if (e.target.files?.length) processFiles(e.target.files)
    if (inputRef.current) inputRef.current.value = ''
  }

  const uploading = queue.some(q => q.status === 'uploading' || q.status === 'pending')
  const done = queue.filter(q => q.status === 'done').length
  const total = queue.length

  return (
    <div className="space-y-3">
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          dragging ? 'border-amber-400 bg-amber-50' : 'border-stone-300 hover:border-amber-300 hover:bg-stone-50'
        }`}
      >
        <Upload size={28} className="mx-auto mb-2 text-stone-400" />
        <p className="text-sm font-medium text-stone-700">Arrastra fotos aquí o haz clic para seleccionar</p>
        <p className="text-xs text-stone-400 mt-1">PNG, JPG, WEBP — múltiples archivos</p>
      </div>
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileInput} />

      {queue.length > 0 && (
        <div className="space-y-1.5">
          {queue.map(item => (
            <div key={item.id} className="flex items-center gap-3 p-2 bg-stone-50 rounded-lg">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-stone-700 truncate">{item.file.name}</p>
                {item.status !== 'done' && item.status !== 'error' && (
                  <div className="mt-1 h-1 bg-stone-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-300"
                      style={{ width: item.status === 'uploading' ? '70%' : '10%' }}
                    />
                  </div>
                )}
              </div>
              <span className={`text-xs shrink-0 ${
                item.status === 'done' ? 'text-green-600' :
                item.status === 'error' ? 'text-red-500' :
                'text-stone-400'
              }`}>
                {item.status === 'done' ? '✓' : item.status === 'error' ? '✗' : '…'}
              </span>
              {item.status === 'error' && (
                <button onClick={() => setQueue(prev => prev.filter(q => q.id !== item.id))}>
                  <X size={12} className="text-stone-400" />
                </button>
              )}
            </div>
          ))}
          {uploading && (
            <p className="text-xs text-stone-500 text-center">Subiendo {done}/{total}…</p>
          )}
        </div>
      )}
    </div>
  )
}
