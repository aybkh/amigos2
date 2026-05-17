import { useState, useCallback } from 'react'
import AdminLayout from '../components/layout/AdminLayout'
import { usePosts } from '../hooks/usePosts'
import { postsService } from '../services/postsService'
import { useToast } from '../components/ui/Toast'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import PostList from '../components/posts/PostList'
import PostEditor from '../components/posts/PostEditor'

export default function PostsPage() {
  const { posts, loading, reload } = usePosts()
  const show = useToast()
  const [selectedId, setSelectedId] = useState(null)
  const [creating, setCreating] = useState(false)

  const selectedPost = posts.find(p => p.id === selectedId) || null
  const showEditor = creating || selectedPost !== null

  const handleSaved = useCallback(() => {
    setCreating(false)
    reload()
    show('Post guardado correctamente', 'success')
  }, [reload, show])

  function handleCreate() {
    setSelectedId(null)
    setCreating(true)
  }

  function handleSelect(id) {
    setCreating(false)
    setSelectedId(id)
  }

  function handleCancel() {
    setCreating(false)
    setSelectedId(null)
  }

  async function handleDelete(post) {
    if (!window.confirm(`¿Eliminar el post "${post.title}"?`)) return
    try {
      await postsService.delete(post.id)
      if (selectedId === post.id) setSelectedId(null)
      reload()
      show('Post eliminado', 'success')
    } catch {
      show('Error al eliminar el post', 'error')
    }
  }

  async function handlePublish(post) {
    try {
      await postsService.publish(post.id)
      reload()
      show('Post publicado', 'success')
    } catch {
      show('Error al publicar el post', 'error')
    }
  }

  async function handleUnpublish(post) {
    try {
      await postsService.unpublish(post.id)
      reload()
      show('Post despublicado', 'success')
    } catch {
      show('Error al despublicar el post', 'error')
    }
  }

  if (loading) return <AdminLayout><LoadingSpinner /></AdminLayout>

  return (
    <AdminLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-stone-900">Posts y Noticias</h1>
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-4 items-start">
          <PostList
            posts={posts}
            selectedId={selectedId}
            onSelect={handleSelect}
            onCreate={handleCreate}
            onDelete={handleDelete}
            onPublish={handlePublish}
            onUnpublish={handleUnpublish}
          />
          {showEditor ? (
            <PostEditor
              post={creating ? null : selectedPost}
              onSaved={handleSaved}
              onCancel={handleCancel}
            />
          ) : (
            <div className="bg-white rounded-xl border border-stone-200 flex items-center justify-center h-64 text-stone-400 text-sm">
              Selecciona un post para editarlo o crea uno nuevo
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
