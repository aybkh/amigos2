import { Pencil, Trash2, Plus, ChevronUp, ChevronDown, ChevronLeft } from 'lucide-react'
import Button from '../ui/Button'

function AvailabilityToggle({ on, onToggle, label }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      className={`inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        on ? 'bg-amber-500' : 'bg-stone-300'
      }`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        on ? 'translate-x-6' : 'translate-x-1'
      }`} />
    </button>
  )
}

export default function ProductList({ category, onToggleAvailability, onCreate, onEdit, onDelete, onReorder, onBack }) {
  if (!category) {
    return (
      <div className="bg-white rounded-xl border border-stone-200 flex items-center justify-center h-64 text-stone-400 text-sm">
        Selecciona una categoría
      </div>
    )
  }

  const products = category.products ?? []

  return (
    <div className="bg-white rounded-xl border border-stone-200 flex flex-col">
      {/* Cabecera */}
      <div className="flex items-center justify-between gap-2 p-4 border-b border-stone-100">
        <div className="flex items-center gap-2 min-w-0">
          {onBack && (
            <button
              onClick={onBack}
              className="md:hidden p-2 -ml-2 text-stone-500 hover:text-stone-800"
              aria-label="Volver a categorías"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <div className="min-w-0">
            <h2 className="font-semibold text-stone-800 truncate">{category.name}</h2>
            <p className="text-xs text-stone-400">{products.length} productos</p>
          </div>
        </div>
        <Button size="sm" variant="primary" onClick={onCreate}>
          <Plus size={14} className="mr-1" /> Nuevo
        </Button>
      </div>

      {products.length === 0 ? (
        <p className="p-6 text-center text-stone-400 text-sm">Sin productos en esta categoría</p>
      ) : (
        <>
          {/* MÓVIL — Lista de tarjetas (stacked) */}
          <ul className="md:hidden divide-y divide-stone-100">
            {products.map((prod, idx) => (
              <li key={prod.id} className="p-3">
                <div className="flex items-start gap-3">
                  {prod.image_url ? (
                    <img
                      src={prod.image_url}
                      alt={prod.name}
                      className="h-14 w-14 rounded-lg object-cover shrink-0"
                    />
                  ) : (
                    <div className="h-14 w-14 rounded-lg bg-stone-100 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="font-medium text-stone-800 truncate">{prod.name}</p>
                      <span className="font-semibold text-stone-700 shrink-0">
                        {Number(prod.price).toFixed(2)} €
                      </span>
                    </div>
                    {prod.description && (
                      <p className="text-xs text-stone-400 line-clamp-1 mt-0.5">
                        {prod.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between gap-2 mt-2">
                      <AvailabilityToggle
                        on={prod.is_available}
                        onToggle={() => onToggleAvailability(prod)}
                        label="Disponible"
                      />
                      <div className="flex items-center gap-0.5">
                        <button
                          onClick={() => onReorder(idx, idx - 1)}
                          disabled={idx === 0}
                          className="p-2 text-stone-400 hover:text-stone-700 disabled:opacity-30"
                          aria-label="Subir"
                        ><ChevronUp size={16} /></button>
                        <button
                          onClick={() => onReorder(idx, idx + 1)}
                          disabled={idx === products.length - 1}
                          className="p-2 text-stone-400 hover:text-stone-700 disabled:opacity-30"
                          aria-label="Bajar"
                        ><ChevronDown size={16} /></button>
                        <button
                          onClick={() => onEdit(prod)}
                          className="p-2 text-stone-400 hover:text-amber-600"
                          aria-label="Editar"
                        ><Pencil size={16} /></button>
                        <button
                          onClick={() => onDelete(prod)}
                          className="p-2 text-stone-400 hover:text-red-600"
                          aria-label="Eliminar"
                        ><Trash2 size={16} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* DESKTOP — Tabla */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-stone-50 text-xs text-stone-500 uppercase tracking-wide">
                <tr>
                  <th className="text-left px-4 py-2">Producto</th>
                  <th className="text-right px-4 py-2">Precio</th>
                  <th className="text-center px-4 py-2">Disponible</th>
                  <th className="text-right px-4 py-2">Orden</th>
                  <th className="px-4 py-2" />
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {products.map((prod, idx) => (
                  <tr key={prod.id} className="hover:bg-stone-50">
                    <td className="px-4 py-3 flex items-center gap-3">
                      {prod.image_url && (
                        <img src={prod.image_url} alt={prod.name} className="h-10 w-10 rounded-lg object-cover shrink-0" />
                      )}
                      <div>
                        <p className="font-medium text-stone-800">{prod.name}</p>
                        {prod.description && <p className="text-xs text-stone-400 line-clamp-1">{prod.description}</p>}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-stone-700">{Number(prod.price).toFixed(2)} €</td>
                    <td className="px-4 py-3 text-center">
                      <AvailabilityToggle on={prod.is_available} onToggle={() => onToggleAvailability(prod)} label="Disponible" />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-0.5">
                        <button onClick={() => onReorder(idx, idx - 1)} disabled={idx === 0} className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-30">
                          <ChevronUp size={14} />
                        </button>
                        <button onClick={() => onReorder(idx, idx + 1)} disabled={idx === products.length - 1} className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-30">
                          <ChevronDown size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 justify-end">
                        <button onClick={() => onEdit(prod)} className="p-1 text-stone-400 hover:text-amber-600">
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => onDelete(prod)} className="p-1 text-stone-400 hover:text-red-600">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
