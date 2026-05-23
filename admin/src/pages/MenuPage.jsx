import { useState, useCallback } from 'react'
import AdminLayout from '../components/layout/AdminLayout'
import { useMenu } from '../hooks/useMenu'
import { menuService } from '../services/menuService'
import { useToast } from '../components/ui/Toast'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import CategoryList from '../components/menu/CategoryList'
import ProductList from '../components/menu/ProductList'
import CategoryModal from '../components/menu/CategoryModal'
import ProductModal from '../components/menu/ProductModal'

export default function MenuPage() {
  const { categories, loading, reload } = useMenu()
  const show = useToast()
  const [selectedId, setSelectedId] = useState(null)
  const [catModal, setCatModal] = useState(null)   // null | {} | {category}
  const [prodModal, setProdModal] = useState(null) // null | {} | {product}

  const selectedCategory = categories.find(c => c.id === selectedId) || null

  const handleSaved = useCallback(() => {
    setCatModal(null)
    setProdModal(null)
    reload()
    show('Guardado correctamente', 'success')
  }, [reload, show])

  async function handleDeleteCategory(cat) {
    if (!window.confirm(`¿Eliminar la categoría "${cat.name}"? Se eliminarán también todos sus productos.`)) return
    try {
      await menuService.deleteCategory(cat.id)
      if (selectedId === cat.id) setSelectedId(null)
      reload()
      show('Categoría eliminada', 'success')
    } catch {
      show('Error al eliminar la categoría', 'error')
    }
  }

  async function handleDeleteProduct(prod) {
    if (!window.confirm(`¿Eliminar "${prod.name}"?`)) return
    try {
      await menuService.deleteProduct(prod.id)
      reload()
      show('Producto eliminado', 'success')
    } catch {
      show('Error al eliminar el producto', 'error')
    }
  }

  async function handleToggleAvailability(prod) {
    try {
      await menuService.updateProduct(prod.id, { is_available: !prod.is_available })
      reload()
    } catch {
      show('Error al actualizar disponibilidad', 'error')
    }
  }

  async function handleCategoryReorder(fromIdx, toIdx) {
    if (toIdx < 0 || toIdx >= categories.length) return
    const reordered = [...categories]
    const [moved] = reordered.splice(fromIdx, 1)
    reordered.splice(toIdx, 0, moved)
    try {
      await Promise.all(
        reordered.map((cat, idx) => menuService.updateCategory(cat.id, { display_order: idx }))
      )
      reload()
    } catch {
      show('Error al reordenar', 'error')
    }
  }

  async function handleProductReorder(fromIdx, toIdx) {
    if (!selectedCategory) return
    const products = [...(selectedCategory.products ?? [])]
    if (toIdx < 0 || toIdx >= products.length) return
    const [moved] = products.splice(fromIdx, 1)
    products.splice(toIdx, 0, moved)
    try {
      await Promise.all(
        products.map((p, idx) => menuService.updateProduct(p.id, { display_order: idx }))
      )
      reload()
    } catch {
      show('Error al reordenar', 'error')
    }
  }

  if (loading) return <AdminLayout><LoadingSpinner /></AdminLayout>

  return (
    <AdminLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-stone-900">Carta Digital</h1>
        {/* Móvil: master/detail (una vista a la vez)
            Desktop: dos columnas 280px + resto */}
        <div className="md:grid md:grid-cols-[280px_1fr] md:gap-4 md:items-start">
          <div className={selectedId ? 'hidden md:block' : 'block'}>
            <CategoryList
              categories={categories}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onCreate={() => setCatModal({})}
              onEdit={cat => setCatModal({ category: cat })}
              onDelete={handleDeleteCategory}
              onReorder={handleCategoryReorder}
            />
          </div>
          <div className={selectedId ? 'block' : 'hidden md:block'}>
            <ProductList
              category={selectedCategory}
              onToggleAvailability={handleToggleAvailability}
              onCreate={() => setProdModal({})}
              onEdit={prod => setProdModal({ product: prod })}
              onDelete={handleDeleteProduct}
              onReorder={handleProductReorder}
              onBack={() => setSelectedId(null)}
            />
          </div>
        </div>
      </div>

      {catModal !== null && (
        <CategoryModal
          category={catModal.category}
          onClose={() => setCatModal(null)}
          onSaved={handleSaved}
        />
      )}
      {prodModal !== null && selectedCategory && (
        <ProductModal
          product={prodModal.product}
          categoryId={selectedCategory.id}
          onClose={() => setProdModal(null)}
          onSaved={handleSaved}
        />
      )}
    </AdminLayout>
  )
}
