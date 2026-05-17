import { useState, useEffect } from 'react'
import AdminLayout from '../components/layout/AdminLayout'
import { siteInfoService } from '../services/siteInfoService'
import { useToast } from '../components/ui/Toast'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import SiteInfoForm from '../components/siteinfo/SiteInfoForm'

export default function SiteInfoPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const show = useToast()

  useEffect(() => {
    siteInfoService.get()
      .then(setData)
      .catch(() => show('Error al cargar la información', 'error'))
      .finally(() => setLoading(false))
  }, [])

  async function handleSave(payload) {
    setSaving(true)
    try {
      const updated = await siteInfoService.update(payload)
      setData(updated)
      show('Cambios guardados correctamente', 'success')
    } catch {
      show('Error al guardar los cambios', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <AdminLayout><LoadingSpinner /></AdminLayout>

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Información del restaurante</h1>
          <p className="text-sm text-stone-500 mt-1">Datos que aparecen en la web pública y en el pie de página.</p>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-6">
          <SiteInfoForm initialData={data} onSave={handleSave} saving={saving} />
        </div>
      </div>
    </AdminLayout>
  )
}
