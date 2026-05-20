import { useState } from 'react'
import { Input } from '../ui/Input'
import Button from '../ui/Button'
import { heroMediaService } from '../../services/heroMediaService'
import { useToast } from '../ui/Toast'

const TYPES = [
  { value: 'none',  label: 'Sin imagen/vídeo (gradiente verde)' },
  { value: 'image', label: 'Imagen de fondo' },
  { value: 'video', label: 'Vídeo de fondo (MP4)' },
]

export default function HeroMediaManager({ initial }) {
  const [mediaType, setMediaType] = useState(initial?.media_type || 'none')
  const [mediaUrl, setMediaUrl] = useState(initial?.media_url || '')
  const [saving, setSaving] = useState(false)
  const [current, setCurrent] = useState(initial)
  const show = useToast()

  async function save() {
    setSaving(true)
    try {
      const updated = await heroMediaService.upsert({
        media_type: mediaType,
        media_url: mediaType === 'none' ? null : mediaUrl,
        is_active: true,
      })
      setCurrent(updated)
      show('Hero actualizado', 'success')
    } catch {
      show('Error al guardar', 'error')
    } finally {
      setSaving(false)
    }
  }

  const previewUrl = current?.media_url
  const previewType = current?.media_type

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Tipo de fondo</label>
          <select
            value={mediaType}
            onChange={e => setMediaType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {TYPES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {mediaType !== 'none' && (
          <Input
            label={`URL ${mediaType === 'image' ? 'de la imagen' : 'del vídeo (MP4)'}`}
            value={mediaUrl}
            onChange={e => setMediaUrl(e.target.value)}
            placeholder="https://xkbhijdtqpblryybwnho.supabase.co/storage/v1/object/public/images/..."
          />
        )}

        <div className="pt-2">
          <Button variant="primary" disabled={saving} onClick={save}>
            {saving ? 'Guardando…' : 'Guardar cambios'}
          </Button>
        </div>
        <p className="text-xs text-gray-500">
          Sube la imagen o vídeo al bucket <code>images</code> de Supabase Storage y pega aquí la URL pública.
        </p>
      </div>

      {previewUrl && previewType !== 'none' && (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Vista previa actual</p>
          {previewType === 'image' ? (
            <img src={previewUrl} alt="Hero" className="rounded-lg w-full max-w-md" />
          ) : (
            <video src={previewUrl} controls muted className="rounded-lg w-full max-w-md" />
          )}
        </div>
      )}
    </div>
  )
}
