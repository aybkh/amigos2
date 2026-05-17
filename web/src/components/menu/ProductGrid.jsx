import ProductCard from './ProductCard'
import { useLanguage } from '../../hooks/useLanguage'
import { t, tCategory } from '../../lib/i18n'
import { displayProductName } from '../../lib/productDisplay'

export default function ProductGrid({ categories, searchQuery, onProductClick }) {
  const { lang } = useLanguage()
  const q = (searchQuery || '').toLowerCase().trim()

  const filtered = categories.map(cat => {
    const products = (cat.products || [])
      .filter(p => {
        if (!q) return true
        return (
          p.name?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
        )
      })
      // "Margarita" → "Pizza Margarita" en la categoría de pizzas
      .map(p => ({ ...p, name: displayProductName(p.name, cat.name) }))
    return { ...cat, products }
  }).filter(cat => cat.products.length > 0)

  if (q && filtered.length === 0) {
    return (
      <div className="menu-no-results">
        {t(lang, 'ui.menu.no_results')} "<strong style={{ color: 'var(--color-cream)' }}>{searchQuery}</strong>"
      </div>
    )
  }

  return (
    <>
      {filtered.map(cat => {
        // El título SIEMPRE va antes del grid y nunca puede quedar vacío:
        // así una categoría sin nombre no genera un encabezado invisible
        // que haga parecer sus productos "flotando" sobre otra sección.
        const title =
          tCategory(lang, cat.name)?.trim() ||
          cat.name?.trim() ||
          t(lang, 'ui.menu.categories')

        return (
          <section
            key={cat.id}
            id={`menu-cat-${cat.id}`}
            className="menu-category-section"
            data-cat-id={cat.id}
          >
            <div className="menu-category-header">
              <h2 className="menu-category-title">{title}</h2>
              {cat.description && (
                <p className="menu-category-desc">{cat.description}</p>
              )}
            </div>

            <div className="menu-product-grid">
              {cat.products.map((product, idx) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  categoryName={cat.name}
                  onClick={() => onProductClick(cat.products, idx)}
                />
              ))}
            </div>
          </section>
        )
      })}
    </>
  )
}
