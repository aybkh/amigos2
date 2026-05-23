import { ChevronUp, ChevronDown, Pencil, Trash2, Plus } from 'lucide-react'
import Button from '../ui/Button'

export default function CategoryList({ categories, selectedId, onSelect, onCreate, onEdit, onDelete, onReorder }) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-stone-100">
        <h2 className="font-semibold text-stone-800">Categorías</h2>
        <Button size="sm" variant="primary" onClick={onCreate}>
          <Plus size={14} className="mr-1" /> Nueva
        </Button>
      </div>
      <ul className="flex-1 overflow-y-auto divide-y divide-stone-100">
        {categories.length === 0 && (
          <li className="p-6 text-center text-stone-400 text-sm">Sin categorías</li>
        )}
        {categories.map((cat, idx) => (
          <li
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`flex items-center gap-2 p-3 cursor-pointer hover:bg-stone-50 transition-colors ${
              selectedId === cat.id ? 'bg-amber-50 border-l-4 border-amber-500' : ''
            }`}
          >
            {cat.image_url && (
              <img src={cat.image_url} alt={cat.name} className="h-9 w-9 rounded-lg object-cover shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-stone-800 truncate">{cat.name}</p>
              <p className="text-xs text-stone-400">{cat.products?.length ?? 0} productos</p>
            </div>
            <div className="flex items-center gap-0.5 shrink-0" onClick={e => e.stopPropagation()}>
              <button
                onClick={() => onReorder(idx, idx - 1)}
                disabled={idx === 0}
                className="p-2 md:p-1 text-stone-400 hover:text-stone-700 disabled:opacity-30"
                aria-label="Subir"
              ><ChevronUp size={16} /></button>
              <button
                onClick={() => onReorder(idx, idx + 1)}
                disabled={idx === categories.length - 1}
                className="p-2 md:p-1 text-stone-400 hover:text-stone-700 disabled:opacity-30"
                aria-label="Bajar"
              ><ChevronDown size={16} /></button>
              <button
                onClick={() => onEdit(cat)}
                className="p-2 md:p-1 text-stone-400 hover:text-amber-600"
                aria-label="Editar"
              ><Pencil size={16} /></button>
              <button
                onClick={() => onDelete(cat)}
                className="p-2 md:p-1 text-stone-400 hover:text-red-600"
                aria-label="Eliminar"
              ><Trash2 size={16} /></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
