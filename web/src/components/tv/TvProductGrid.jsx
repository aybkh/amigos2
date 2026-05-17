// Grid de productos de la categoría actual con header y dots de navegación
import TvProductCard from './TvProductCard'

export default function TvProductGrid({
  category,
  products,
  catIdx,
  totalCats,
  pageIdx,
  totalPages,
}) {
  return (
    <div className="tv-product-view">
      {/* Título de categoría */}
      <div className="tv-cat-header">
        <h2 className="tv-category-title" key={`${category.id}-${pageIdx}`}>
          {category.name}
          {totalPages > 1 && (
            <span className="tv-page-badge">{pageIdx + 1}/{totalPages}</span>
          )}
        </h2>
      </div>

      {/* Grid de productos */}
      <div className="tv-products-grid" key={`grid-${category.id}-${pageIdx}`}>
        {products.map((product, i) => (
          <TvProductCard
            key={product.id}
            product={product}
            animDelay={i * 0.09}
          />
        ))}
      </div>

      {/* Dots */}
      <div className="tv-dots-bar">
        {totalPages > 1
          ? Array.from({ length: totalPages }).map((_, i) => (
              <span key={i} className={`tv-dot ${i === pageIdx ? 'tv-dot-active' : ''}`} />
            ))
          : Array.from({ length: totalCats }).map((_, i) => (
              <span key={i} className={`tv-dot ${i === catIdx ? 'tv-dot-active' : ''}`} />
            ))}
      </div>
    </div>
  )
}
