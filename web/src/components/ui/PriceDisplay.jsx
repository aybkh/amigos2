export default function PriceDisplay({ price, className = '' }) {
  // Solo se oculta si no hay precio. 0 es un precio válido (gratis).
  if (price == null) return null
  const [euros, cents] = Number(price).toFixed(2).split('.')
  return (
    <span className={`price-display ${className}`.trim()}>
      <span className="price-euros">{euros}</span>
      <span className="price-cents">,{cents}&nbsp;€</span>
    </span>
  )
}
