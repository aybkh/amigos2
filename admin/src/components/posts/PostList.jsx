import { Pencil, Trash2, Eye, EyeOff, Plus } from 'lucide-react'
import Button from '../ui/Button'

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function PostList({ posts, selectedId, onSelect, onCreate, onDelete, onPublish, onUnpublish }) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-stone-100">
        <h2 className="font-semibold text-stone-800">Posts</h2>
        <Button size="sm" variant="primary" onClick={onCreate}>
          <Plus size={14} className="mr-1" /> Nuevo post
        </Button>
      </div>
      <ul className="divide-y divide-stone-100">
        {posts.length === 0 && (
          <li className="p-6 text-center text-stone-400 text-sm">Sin posts. Crea el primero.</li>
        )}
        {posts.map(post => (
          <li
            key={post.id}
            onClick={() => onSelect(post.id)}
            className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-stone-50 transition-colors ${
              selectedId === post.id ? 'bg-amber-50 border-l-4 border-amber-500' : ''
            }`}
          >
            {post.cover_image_url && (
              <img src={post.cover_image_url} alt={post.title} className="h-12 w-16 object-cover rounded-lg shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-stone-800 truncate">{post.title}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  post.is_published
                    ? 'bg-green-100 text-green-700'
                    : 'bg-stone-100 text-stone-500'
                }`}>
                  {post.is_published ? 'Publicado' : 'Borrador'}
                </span>
                <span className="text-xs text-stone-400">{formatDate(post.published_at || post.created_at)}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0" onClick={e => e.stopPropagation()}>
              {post.is_published ? (
                <button onClick={() => onUnpublish(post)} className="p-1 text-stone-400 hover:text-stone-700" title="Despublicar">
                  <EyeOff size={14} />
                </button>
              ) : (
                <button onClick={() => onPublish(post)} className="p-1 text-stone-400 hover:text-green-600" title="Publicar">
                  <Eye size={14} />
                </button>
              )}
              <button onClick={() => onSelect(post.id)} className="p-1 text-stone-400 hover:text-amber-600">
                <Pencil size={14} />
              </button>
              <button onClick={() => onDelete(post)} className="p-1 text-stone-400 hover:text-red-600">
                <Trash2 size={14} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
