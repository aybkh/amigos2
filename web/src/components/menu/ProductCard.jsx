import { useState } from 'react'
import { ALLERGEN_MAP } from '../landing/AllergenIcons'
import PriceDisplay from '../ui/PriceDisplay'
import { useLanguage } from '../../hooks/useLanguage'
import { tProduct, tAllergen } from '../../lib/i18n'

const isValidUrl = (url) => !!url && (url.startsWith('http://') || url.startsWith('https://'))

const TEXT_TO_ID = {
  gluten: 1, crustáceos: 2, crustaceos: 2, huevos: 3, huevo: 3,
  pescado: 4, cacahuetes: 5, cacahuete: 5, soja: 6,
  lácteos: 7, lacteos: 7, leche: 7, 'frutos de cáscara': 8,
  'frutos de cascara': 8, 'frutos secos': 8, apio: 9, mostaza: 10,
  sésamo: 11, sesamo: 11, sulfitos: 12, moluscos: 13, altramuces: 14,
  picante: 15, carne: 16,
}

function resolveAllergen(val) {
  const num = Number(val)
  if (!isNaN(num) && ALLERGEN_MAP[num]) return ALLERGEN_MAP[num]
  const id = TEXT_TO_ID[String(val).toLowerCase().trim()]
  return id ? ALLERGEN_MAP[id] : null
}

function getProductEmoji(name, categoryName) {
  const n = ((name || '') + ' ' + (categoryName || '')).toLowerCase()
  if (n.includes('pizza')) return '🍕'
  if (n.includes('dürüm') || n.includes('durum') || n.includes('kebab') || n.includes('turca')) return '🥙'
  if (n.includes('paella') || n.includes('arroz')) return '🥘'
  if (n.includes('ensalada')) return '🥗'
  if (n.includes('pasta') || n.includes('espagueti') || n.includes('fettucine')) return '🍝'
  if (n.includes('burger') || n.includes('hamburguesa')) return '🍔'
  if (n.includes('mojito') || n.includes('coctel') || n.includes('bebida') || n.includes('refresco')) return '🍹'
  if (n.includes('bocadillo') || n.includes('sandwich')) return '🥖'
  if (n.includes('aperitivo') || n.includes('entrante') || n.includes('tapa')) return '🍢'
  if (n.includes('hindú') || n.includes('hindu') || n.includes('curry') || n.includes('indio')) return '🍛'
  if (n.includes('pollo')) return '🍗'
  if (n.includes('carne') || n.includes('bistec') || n.includes('filete')) return '🥩'
  if (n.includes('marisco') || n.includes('gambas') || n.includes('pescado')) return '🐟'
  if (n.includes('postre') || n.includes('helado') || n.includes('dulce')) return '🍮'
  if (n.includes('vegano') || n.includes('vegetariano')) return '🥦'
  return '🍽️'
}

export default function ProductCard({ product, categoryName, onClick }) {
  const { lang } = useLanguage()
  const [imgFailed, setImgFailed] = useState(false)
  const showImg = isValidUrl(product.image_url) && !imgFailed
  const name = tProduct(lang, product.name, 'name')
  const description = product.description
    ? tProduct(lang, product.name, 'description')
    : null

  const allergens = (product.allergens || [])
    .map(resolveAllergen)
    .filter(Boolean)

  return (
    <article className="menu-card" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}>

      {/* Zona imagen */}
      {showImg ? (
        <img
          className="menu-card-img"
          src={product.image_url}
          alt={name}
          onError={() => setImgFailed(true)}
          loading="lazy"
        />
      ) : (
        <div className="menu-card-emoji-zone" aria-hidden="true">
          {getProductEmoji(product.name, categoryName)}
        </div>
      )}

      {/* Franja alérgenos — siempre presente (aunque vacía) para alinear tarjetas */}
      <div className="menu-card-allergens-strip">
        {allergens.length > 0 && allergens.slice(0, 6).map((alg, i) => {
            const algName = tAllergen(lang, alg.name)
            return (
              <img
                key={i}
                className="menu-allergen-strip-icon"
                src={alg.iconSrc}
                alt={algName}
                title={algName}
              />
            )
          })}
      </div>

      {/* Cuerpo */}
      <div className="menu-card-body">
        <p className="menu-card-name">{name}</p>
        {description && (
          <p className="menu-card-desc">{description}</p>
        )}
        <PriceDisplay price={product.price} className="menu-card-price" />
      </div>
    </article>
  )
}
