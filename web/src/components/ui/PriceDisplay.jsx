export default function PriceDisplay({ price, className = '' }) {
  // Ocultar si no hay precio o es 0 (aún no configurado en admin)
  if (price == null || Number(price) <= 0) return null
  const [euros, cents] = Number(price).toFixed(2).split('.')
  return (
    <span className={`price-display ${className}`.trim()}>
      <span className="price-euros">{euros}</span>
      <span className="price-cents">,{cents}&nbsp;€</span>
    </span>
  )
}
