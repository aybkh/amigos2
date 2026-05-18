import { useState, useEffect } from 'react'
import AdminLayout from '../components/layout/AdminLayout'
import { deliveryService } from '../services/deliveryService'
import { useToast } from '../components/ui/Toast'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import DeliveryLinksManager from '../components/delivery/DeliveryLinksManager'

export default function DeliveryPage() {
  const [links, setLinks] = useState(null)
  const [loading, setLoading] = useState(true)
  const show = useToast()

  useEffect(() => {
    deliveryService.list()
      .then(setLinks)
      .catch(() => show('Error al cargar los enlaces de delivery', 'error'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <AdminLayout><LoadingSpinner /></AdminLayout>

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Pedir a domicilio</h1>
          <p className="text-sm text-stone-500 mt-1">
            Enlaces de Glovo, Uber Eats, Just Eat y teléfono que aparecen en la sección
            “Pedir a domicilio” de la web.
          </p>
        </div>
        {links && <DeliveryLinksManager initial={links} />}
      </div>
    </AdminLayout>
  )
}
