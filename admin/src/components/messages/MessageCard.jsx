import { useState } from 'react'
import { Mail, MailOpen, Trash2 } from 'lucide-react'
import Button from '../ui/Button'

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('es-ES', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export default function MessageCard({ message, onMarkRead, onMarkUnread, onDeleteRequest }) {
  const [expanded, setExpanded] = useState(false)

  function handleToggle() {
    const next = !expanded
    setExpanded(next)
    if (next && !message.is_read) {
      onMarkRead(message.id)
    }
  }

  const isNew = !message.is_read

  return (
    <div
      className="bg-white rounded-xl border transition-shadow hover:shadow-sm overflow-hidden"
      style={isNew
        ? { borderColor: '#2A5A43', borderLeftWidth: 4 }
        : { borderColor: '#e5e7eb', borderLeftWidth: 4, borderLeftColor: 'transparent' }
      }
    >
      {/* Header — siempre visible */}
      <button
        onClick={handleToggle}
        className="w-full text-left px-4 py-4 flex items-start gap-3"
      >
        <div className="mt-0.5 shrink-0 text-gray-400">
          {expanded ? <MailOpen size={18} /> : <Mail size={18} />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-gray-800 text-sm">{message.name}</span>
            {isNew ? (
              <span className="text-xs font-medium text-white px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: '#C84B31' }}>
                Nuevo
              </span>
            ) : (
              <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                Leído
              </span>
            )}
            <span className="text-xs text-gray-400 ml-auto shrink-0">{formatDate(message.created_at)}</span>
          </div>
          <a
            href={`mailto:${message.email}`}
            onClick={e => e.stopPropagation()}
            className="text-xs text-blue-600 hover:underline"
          >
            {message.email}
          </a>
          {!expanded && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2 text-left">
              {message.message}
            </p>
          )}
        </div>
      </button>

      {/* Body expandido */}
      {expanded && (
        <div className="px-4 pb-4 pl-10">
          <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
            {message.message}
          </p>
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            {message.is_read ? (
              <Button variant="secondary" size="sm" onClick={() => onMarkUnread(message.id)}>
                <Mail size={14} className="mr-1.5" />
                Marcar como no leído
              </Button>
            ) : (
              <Button variant="secondary" size="sm" onClick={() => onMarkRead(message.id)}>
                <MailOpen size={14} className="mr-1.5" />
                Marcar como leído
              </Button>
            )}
            <Button variant="danger" size="sm" onClick={() => onDeleteRequest(message.id)}>
              <Trash2 size={14} className="mr-1.5" />
              Eliminar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
