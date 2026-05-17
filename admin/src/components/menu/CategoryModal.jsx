import { useState } from 'react'
import Modal from '../ui/Modal'
import { Input, Textarea } from '../ui/Input'
import Button from '../ui/Button'
import ImagePicker from '../ui/ImagePicker'
import { menuService } from '../../services/menuService'

export default function CategoryModal({ category, onClose, onSaved }) {
  const isEdit = !!category?.id
  const [form, setForm] = useState({
    name: category?.name || '',
    description: category?.description || '',
    is_active: category?.is_active ?? true,
    image_url: category?.image_url || '',
  })
  const [imageFile, setImageFile] = useState(null)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  function set(key, value) {
    setForm(f => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      let imageUrl = form.image_url
      if (imageFile) {
        setUploading(true)
        imageUrl = await menuService.uploadImage(imageFile, 'categories')
        setUploading(false)
      }
      const payload = { ...form, image_url: imageUrl || null }
      if (isEdit) {
        await menuService.updateCategory(category.id, payload)
      } else {
        await menuService.createCategory(payload)
      }
      onSaved()
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
      setUploading(false)
    }
  }

  return (
    <Modal title={isEdit ? 'Editar categoría' : 'Nueva categoría'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Nombre" value={form.name} onChange={e => set('name', e.target.value)} required />
        <Textarea label="Descripción" value={form.description} onChange={e => set('description', e.target.value)} rows={3} />
        <ImagePicker
          label="Imagen de categoría"
          value={form.image_url}
          uploading={uploading}
          onChange={file => {
            if (file) setImageFile(file)
            else { setImageFile(null); set('image_url', '') }
          }}
        />
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => set('is_active', !form.is_active)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              form.is_active ? 'bg-amber-500' : 'bg-stone-300'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              form.is_active ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
          <span className="text-sm text-stone-700">Categoría activa</span>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="primary" disabled={saving || uploading}>
            {saving ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Crear categoría'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
