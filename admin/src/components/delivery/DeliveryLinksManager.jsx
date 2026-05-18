import { useState } from 'react'
import { Input } from '../ui/Input'
import Button from '../ui/Button'
import { deliveryService } from '../../services/deliveryService'
import { useToast } from '../ui/Toast'

const LABELS = {
  glovo: 'Glovo',
  ubereats: 'Uber Eats',
  justeat: 'Just Eat',
  phone: 'Llamar al local (teléfono)',
}

export default function DeliveryLinksManager({ initial }) {
  const [links, setLinks] = useState(initial)
  const [savingId, setSavingId] = useState(null)
  const show = useToast()

  const setUrl = (id, url) =>
    setLinks(ls => ls.map(l => (l.id === id ? { ...l, url } : l)))

  async function save(link) {
    setSavingId(link.id)
    try {
      const updated = await deliveryService.update(link.id, { url: link.url })
      setLinks(ls => ls.map(l => (l.id === link.id ? updated : l)))
      show('Enlace guardado', 'success')
    } catch {
      show('Error al guardar', 'error')
    } finally {
      setSavingId(null)
    }
  }

  async function toggle(link) {
    try {
      const updated = await deliveryService.update(link.id, { is_active: !link.is_active })
      setLinks(ls => ls.map(l => (l.id === link.id ? updated : l)))
    } catch {
      show('Error al cambiar estado', 'error')
    }
  }

  return (
    <div className="space-y-4">
      {links.map(link => (
        <div
          key={link.id}
          className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col md:flex-row md:items-end gap-3"
        >
          <div className="flex-1">
            <Input
              label={LABELS[link.platform] || link.platform}
              value={link.url || ''}
              onChange={e => setUrl(link.id, e.target.value)}
              placeholder={link.platform === 'phone' ? '+34 600 000 000' : 'https://...'}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="primary" disabled={savingId === link.id} onClick={() => save(link)}>
              {savingId === link.id ? 'Guardando…' : 'Guardar'}
            </Button>
            <button
              type="button"
              onClick={() => toggle(link)}
              className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                link.is_active
                  ? 'border-green-300 text-green-700 bg-green-50 hover:bg-green-100'
                  : 'border-gray-300 text-gray-500 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              {link.is_active ? '✓ Activo' : '✗ Inactivo'}
            </button>
          </div>
        </div>
      ))}
      <p className="text-xs text-gray-500">
        Si un enlace está inactivo o vacío no aparece en la web. El botón “Llamar al local”
        usa el número de teléfono que escribas aquí.
      </p>
    </div>
  )
}
