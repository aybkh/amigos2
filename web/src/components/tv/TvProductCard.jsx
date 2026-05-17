// Tarjeta de producto optimizada para pantalla de TV — imagen grande, nombre y precio legibles desde lejos
export default function TvProductCard({ product, animDelay = 0 }) {
  const isAvailable = product.is_available !== false

  const price = Number(product.price ?? 0)
  const [intPart, decPart] = price.toFixed(2).split('.')

  return (
    <div
      className={`tv-product-card ${!isAvailable ? 'tv-unavailable' : ''}`}
      style={{ animationDelay: `${animDelay}s` }}
    >
      <div className="tv-product-image-wrap">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="tv-product-image"
            loading="eager"
            onError={(e) => { e.target.style.display = 'none' }}
          />
        ) : (
          <div className="tv-product-placeholder">🍽️</div>
        )}
        {!isAvailable && <div className="tv-sold-out">Agotado</div>}
      </div>

      <div className="tv-product-info">
        <h3 className="tv-product-name">{product.name}</h3>
        <div className="tv-price">
          <span className="tv-price-tag">
            <span className="tv-price-int">{intPart}</span>
            <span className="tv-price-dec">.{decPart}</span>
            <span className="tv-price-cur">€</span>
          </span>
        </div>
      </div>
    </div>
  )
}
