import { useState } from 'react'
import { Input, Textarea } from '../ui/Input'
import Button from '../ui/Button'
import HoursEditor from './HoursEditor'

export default function SiteInfoForm({ initialData, onSave, saving }) {
  const [form, setForm] = useState({
    restaurant_name: initialData?.restaurant_name || '',
    slogan: initialData?.slogan || '',
    description: initialData?.description || '',
    address: initialData?.address || '',
    phone: initialData?.phone || '',
    email: initialData?.email || '',
    website: initialData?.website || '',
    social_instagram: initialData?.social_instagram || '',
    social_facebook: initialData?.social_facebook || '',
    logo_url: initialData?.logo_url || '',
    hero_image_url: initialData?.hero_image_url || '',
    opening_hours: initialData?.opening_hours || {},
  })

  function set(key, value) {
    setForm(f => ({ ...f, [key]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSave(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-stone-800 border-b border-stone-200 pb-2">Información básica</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Nombre del restaurante" value={form.restaurant_name} onChange={e => set('restaurant_name', e.target.value)} required />
          <Input label="Slogan" value={form.slogan} onChange={e => set('slogan', e.target.value)} />
        </div>
        <Textarea label="Descripción" value={form.description} onChange={e => set('description', e.target.value)} rows={4} />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-stone-800 border-b border-stone-200 pb-2">Contacto y ubicación</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Dirección" value={form.address} onChange={e => set('address', e.target.value)} required />
          <Input label="Teléfono" type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} required />
          <Input label="Email" type="email" value={form.email} onChange={e => set('email', e.target.value)} />
          <Input label="Sitio web" type="url" value={form.website} onChange={e => set('website', e.target.value)} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-stone-800 border-b border-stone-200 pb-2">Redes sociales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Instagram (URL)" value={form.social_instagram} onChange={e => set('social_instagram', e.target.value)} />
          <Input label="Facebook (URL)" value={form.social_facebook} onChange={e => set('social_facebook', e.target.value)} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-stone-800 border-b border-stone-200 pb-2">Imágenes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="URL del logo" value={form.logo_url} onChange={e => set('logo_url', e.target.value)} placeholder="https://..." />
          <Input label="URL imagen hero" value={form.hero_image_url} onChange={e => set('hero_image_url', e.target.value)} placeholder="https://..." />
        </div>
        <p className="text-xs text-stone-500">Sube primero la imagen a la Galería y copia aquí la URL pública.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-stone-800 border-b border-stone-200 pb-2">Horario de apertura</h2>
        <HoursEditor value={form.opening_hours} onChange={hours => set('opening_hours', hours)} />
      </section>

      <div className="flex justify-end pt-4 border-t border-stone-200">
        <Button type="submit" variant="primary" disabled={saving}>
          {saving ? 'Guardando…' : 'Guardar cambios'}
        </Button>
      </div>
    </form>
  )
}
