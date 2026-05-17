import { useState, useCallback } from 'react'
import AdminLayout from '../components/layout/AdminLayout'
import MessageCard from '../components/messages/MessageCard'
import Modal from '../components/ui/Modal'
import Button from '../components/ui/Button'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { useMessages } from '../hooks/useMessages'
import { useUnreadCount } from '../hooks/useUnreadCount'
import { useToast } from '../components/ui/Toast'
import { messagesService } from '../services/messagesService'

export default function MessagesPage() {
  const { messages, loading, reload } = useMessages()
  const { refresh: refreshBadge } = useUnreadCount()
  const show = useToast()
  const [deleteId, setDeleteId] = useState(null)

  const unreadCount = messages.filter(m => !m.is_read).length

  const handleMarkRead = useCallback(async (id) => {
    try {
      await messagesService.markAsRead(id)
      reload()
      refreshBadge()
    } catch {
      show('Error al marcar como leído', 'error')
    }
  }, [reload, refreshBadge, show])

  const handleMarkUnread = useCallback(async (id) => {
    try {
      await messagesService.markAsUnread(id)
      reload()
      refreshBadge()
    } catch {
      show('Error al marcar como no leído', 'error')
    }
  }, [reload, refreshBadge, show])

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await messagesService.delete(deleteId)
      setDeleteId(null)
      reload()
      refreshBadge()
      show('Mensaje eliminado', 'success')
    } catch {
      show('Error al eliminar el mensaje', 'error')
    }
  }

  if (loading) return <AdminLayout><LoadingSpinner /></AdminLayout>

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Mensajes
          {unreadCount > 0 && (
            <span className="ml-2 text-base font-semibold text-white px-2.5 py-1 rounded-full align-middle"
                  style={{ backgroundColor: '#C84B31' }}>
              {unreadCount} nuevo{unreadCount !== 1 ? 's' : ''}
            </span>
          )}
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Mensajes recibidos desde el formulario de contacto de la web.
        </p>

        {messages.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 flex items-center justify-center h-48 text-gray-400 text-sm">
            No hay mensajes todavía.
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <MessageCard
                key={msg.id}
                message={msg}
                onMarkRead={handleMarkRead}
                onMarkUnread={handleMarkUnread}
                onDeleteRequest={setDeleteId}
              />
            ))}
          </div>
        )}
      </div>

      {deleteId && (
        <Modal title="Eliminar mensaje" onClose={() => setDeleteId(null)}>
          <p className="text-sm text-gray-600 mb-6">
            ¿Estás seguro de que quieres eliminar este mensaje? Esta acción no se puede deshacer.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setDeleteId(null)}>Cancelar</Button>
            <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
          </div>
        </Modal>
      )}
    </AdminLayout>
  )
}
