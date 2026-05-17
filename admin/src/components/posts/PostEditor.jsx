import { useState } from 'react'
import { Input, Textarea } from '../ui/Input'
import Button from '../ui/Button'
import ImagePicker from '../ui/ImagePicker'
import { postsService } from '../../services/postsService'
import { Eye, EyeOff } from 'lucide-react'

function toSlug(text) {
  return text
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export default function PostEditor({ post, onSaved, onCancel }) {
  const isEdit = !!post?.id
  const [form, setForm] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    content: post?.content || '',
    cover_image_url: post?.cover_image_url || '',
    is_published: post?.is_published ?? false,
  })
  const [imageFile, setImageFile] = useState(null)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [slugManual, setSlugManual] = useState(isEdit)

  function set(key, value) {
    setForm(f => ({ ...f, [key]: value }))
  }

  function handleTitleChange(e) {
    const title = e.target.value
    set('title', title)
    if (!slugManual) set('slug', toSlug(title))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      let coverUrl = form.cover_image_url
      if (imageFile) {
        setUploading(true)
        coverUrl = await postsService.uploadCoverImage(imageFile)
        setUploading(false)
      }
      const payload = {
        title: form.title,
        slug: form.slug,
        content: form.content,
        cover_image_url: coverUrl || null,
        is_published: form.is_published,
        ...(form.is_published && !post?.published_at ? { published_at: new Date().toISOString() } : {}),
      }
      if (isEdit) {
        await postsService.update(post.id, payload)
      } else {
        await postsService.create(payload)
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
    <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-stone-800">{isEdit ? 'Editar post' : 'Nuevo post'}</h2>
        {onCancel && (
          <button onClick={onCancel} className="text-sm text-stone-400 hover:text-stone-700">Cancelar</button>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Título" value={form.title} onChange={handleTitleChange} required />
        <div className="space-y-1">
          <Input
            label="Slug (URL)"
            value={form.slug}
            onChange={e => { setSlugManual(true); set('slug', e.target.value) }}
            required
          />
          <p className="text-xs text-stone-400">Se genera automáticamente desde el título. Puedes editarlo manualmente.</p>
        </div>
        <Textarea label="Contenido" value={form.content} onChange={e => set('content', e.target.value)} rows={10} />
        <ImagePicker
          label="Imagen de portada"
          value={form.cover_image_url}
          uploading={uploading}
          onChange={file => {
            if (file) setImageFile(file)
            else { setImageFile(null); set('cover_image_url', '') }
          }}
        />
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => set('is_published', !form.is_published)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              form.is_published ? 'bg-green-500' : 'bg-stone-300'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              form.is_published ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
          <span className="text-sm flex items-center gap-1 text-stone-700">
            {form.is_published ? <Eye size={14} /> : <EyeOff size={14} />}
            {form.is_published ? 'Publicado' : 'Borrador'}
          </span>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          {onCancel && <Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button>}
          <Button type="submit" variant="primary" disabled={saving || uploading}>
            {saving ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Crear post'}
          </Button>
        </div>
      </form>
    </div>
  )
}
