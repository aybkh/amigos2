import { useState } from 'react'
import Modal from '../ui/Modal'
import { Input, Textarea } from '../ui/Input'
import Button from '../ui/Button'
import ImagePicker from '../ui/ImagePicker'
import { menuService } from '../../services/menuService'
import { X } from 'lucide-react'

const COMMON_ALLERGENS = ['Gluten', 'Lácteos', 'Huevo', 'Frutos secos', 'Mariscos', 'Pescado', 'Soja', 'Sésamo']

export default function ProductModal({ product, categoryId, onClose, onSaved }) {
  const isEdit = !!product?.id
  const [form, setForm] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price != null ? String(product.price) : '',
    is_available: product?.is_available ?? true,
    image_url: product?.image_url || '',
    allergens: product?.allergens || [],
  })
  const [imageFile, setImageFile] = useState(null)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [allergenInput, setAllergenInput] = useState('')

  function set(key, value) {
    setForm(f => ({ ...f, [key]: value }))
  }

  function addAllergen(tag) {
    const t = tag.trim()
    if (t && !form.allergens.includes(t)) set('allergens', [...form.allergens, t])
    setAllergenInput('')
  }

  function removeAllergen(tag) {
    set('allergens', form.allergens.filter(a => a !== tag))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      let imageUrl = form.image_url
      if (imageFile) {
        setUploading(true)
        imageUrl = await menuService.uploadImage(imageFile, 'products')
        setUploading(false)
      }
      const payload = {
        name: form.name,
        description: form.description || null,
        price: parseFloat(form.price) || 0,
        is_available: form.is_available,
        image_url: imageUrl || null,
        allergens: form.allergens.length > 0 ? form.allergens : null,
        category_id: categoryId,
      }
      if (isEdit) {
        await menuService.updateProduct(product.id, payload)
      } else {
        await menuService.createProduct(payload)
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
    <Modal title={isEdit ? 'Editar producto' : 'Nuevo producto'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Input label="Nombre" value={form.name} onChange={e => set('name', e.target.value)} required />
          </div>
          <Input
            label="Precio (€)"
            type="number"
            step="0.01"
            min="0"
            value={form.price}
            onChange={e => set('price', e.target.value)}
            required
          />
          <div className="flex items-end pb-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => set('is_available', !form.is_available)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  form.is_available ? 'bg-amber-500' : 'bg-stone-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  form.is_available ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
              <span className="text-sm text-stone-700">Disponible</span>
            </div>
          </div>
        </div>
        <Textarea label="Descripción" value={form.description} onChange={e => set('description', e.target.value)} rows={2} />
        <ImagePicker
          label="Imagen del producto"
          value={form.image_url}
          uploading={uploading}
          onChange={file => {
            if (file) setImageFile(file)
            else { setImageFile(null); set('image_url', '') }
          }}
        />
        <div className="space-y-2">
          <p className="text-sm font-medium text-stone-700">Alérgenos</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {form.allergens.map(a => (
              <span key={a} className="flex items-center gap-1 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                {a}
                <button type="button" onClick={() => removeAllergen(a)}><X size={10} /></button>
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">
            {COMMON_ALLERGENS.filter(a => !form.allergens.includes(a)).map(a => (
              <button
                key={a}
                type="button"
                onClick={() => addAllergen(a)}
                className="text-xs px-2 py-1 border border-stone-300 rounded-full hover:border-amber-400 hover:text-amber-700 transition-colors"
              >{a}</button>
            ))}
          </div>
          <div className="flex gap-2 mt-1">
            <input
              type="text"
              value={allergenInput}
              onChange={e => setAllergenInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addAllergen(allergenInput) } }}
              placeholder="Otro alérgeno…"
              className="flex-1 text-sm border border-stone-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <Button type="button" size="sm" variant="secondary" onClick={() => addAllergen(allergenInput)}>
              Añadir
            </Button>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="primary" disabled={saving || uploading}>
            {saving ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Crear producto'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
