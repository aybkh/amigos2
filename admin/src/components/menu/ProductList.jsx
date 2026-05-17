import { Pencil, Trash2, Plus, ChevronUp, ChevronDown } from 'lucide-react'
import Button from '../ui/Button'

export default function ProductList({ category, onToggleAvailability, onCreate, onEdit, onDelete, onReorder }) {
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
      <div className="flex items-center justify-between p-4 border-b border-stone-100">
        <div>
          <h2 className="font-semibold text-stone-800">{category.name}</h2>
          <p className="text-xs text-stone-400">{products.length} productos</p>
        </div>
        <Button size="sm" variant="primary" onClick={onCreate}>
          <Plus size={14} className="mr-1" /> Nuevo producto
        </Button>
      </div>
      <div className="overflow-x-auto">
        {products.length === 0 ? (
          <p className="p-6 text-center text-stone-400 text-sm">Sin productos en esta categoría</p>
        ) : (
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
                    <button
                      onClick={() => onToggleAvailability(prod)}
                      className={`inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        prod.is_available ? 'bg-amber-500' : 'bg-stone-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        prod.is_available ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
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
        )}
      </div>
    </div>
  )
}
