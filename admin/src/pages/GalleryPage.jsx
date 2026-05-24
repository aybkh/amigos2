import { useState, useEffect, useCallback } from 'react'
import AdminLayout from '../components/layout/AdminLayout'
import { galleryService } from '../services/galleryService'
import { useToast } from '../components/ui/Toast'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import ImageUploader from '../components/gallery/ImageUploader'
import GalleryManager from '../components/gallery/GalleryManager'

export default function GalleryPage() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const show = useToast()

  const load = useCallback(() => {
    galleryService.getAll()
      .then(setImages)
      .catch(() => show('Error al cargar la galería', 'error'))
      .finally(() => setLoading(false))
  }, [show])

  useEffect(() => { load() }, [load])

  async function handleDelete(img) {
    if (!window.confirm('¿Eliminar esta imagen de la galería?')) return
    try {
      await galleryService.delete(img.id)
      setImages(prev => prev.filter(i => i.id !== img.id))
      show('Imagen eliminada', 'success')
    } catch {
      show('Error al eliminar la imagen', 'error')
    }
  }

  async function handleReorder(fromIdx, toIdx) {
    if (toIdx < 0 || toIdx >= images.length) return
    const reordered = [...images]
    const [moved] = reordered.splice(fromIdx, 1)
    reordered.splice(toIdx, 0, moved)
    setImages(reordered)
    try {
      await Promise.all(
        reordered.map((img, idx) => galleryService.update(img.id, { display_order: idx }))
      )
    } catch {
      show('Error al guardar el orden', 'error')
      load()
    }
  }

  async function handleUpdateDescription(id, altText) {
    try {
      await galleryService.update(id, { alt_text: altText })
      setImages(prev => prev.map(img => img.id === id ? { ...img, alt_text: altText } : img))
      show('Descripción guardada', 'success')
    } catch {
      show('Error al guardar la descripción', 'error')
    }
  }

  if (loading) return <AdminLayout><LoadingSpinner /></AdminLayout>

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Galería de imágenes</h1>
          <p className="text-sm text-stone-500 mt-1">{images.length} {images.length === 1 ? 'imagen' : 'imágenes'} en la galería</p>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-5">
          <h2 className="font-semibold text-stone-800 mb-4">Subir imágenes</h2>
          <ImageUploader onUploaded={load} />
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-5">
          <h2 className="font-semibold text-stone-800 mb-4">Gestionar galería</h2>
          <GalleryManager 
            images={images} 
            onDelete={handleDelete} 
            onReorder={handleReorder} 
            onUpdateDescription={handleUpdateDescription} 
          />
        </div>
      </div>
    </AdminLayout>
  )
}
