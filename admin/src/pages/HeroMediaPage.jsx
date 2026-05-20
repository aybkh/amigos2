import { useState, useEffect } from 'react'
import AdminLayout from '../components/layout/AdminLayout'
import { heroMediaService } from '../services/heroMediaService'
import { useToast } from '../components/ui/Toast'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import HeroMediaManager from '../components/heromedia/HeroMediaManager'

export default function HeroMediaPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const show = useToast()

  useEffect(() => {
    heroMediaService.get()
      .then(setData)
      .catch(() => show('Error al cargar el hero', 'error'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <AdminLayout><LoadingSpinner /></AdminLayout>

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Hero de la home</h1>
          <p className="text-sm text-stone-500 mt-1">
            Activa una imagen o vídeo de fondo en el hero. Si dejas “Sin imagen/vídeo”,
            se mantiene el gradiente verde por defecto con las formas flotantes.
          </p>
        </div>
        <HeroMediaManager initial={data} />
      </div>
    </AdminLayout>
  )
}
