import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { ALLERGEN_MAP } from '../landing/AllergenIcons'
import { useLanguage } from '../../hooks/useLanguage'
import { t, tProduct, tAllergen } from '../../lib/i18n'
import PriceDisplay from '../ui/PriceDisplay'

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

function getProductEmoji(name) {
  const n = (name || '').toLowerCase()
  if (n.includes('pizza')) return '🍕'
  if (n.includes('dürüm') || n.includes('durum') || n.includes('kebab') || n.includes('turca')) return '🥙'
  if (n.includes('paella') || n.includes('arroz')) return '🥘'
  if (n.includes('ensalada')) return '🥗'
  if (n.includes('pasta') || n.includes('espagueti')) return '🍝'
  if (n.includes('burger') || n.includes('hamburguesa')) return '🍔'
  if (n.includes('mojito') || n.includes('coctel') || n.includes('bebida')) return '🍹'
  if (n.includes('bocadillo') || n.includes('sandwich')) return '🥖'
  if (n.includes('pollo')) return '🍗'
  if (n.includes('carne') || n.includes('bistec') || n.includes('filete')) return '🥩'
  if (n.includes('marisco') || n.includes('gambas') || n.includes('pescado')) return '🐟'
  if (n.includes('postre') || n.includes('helado') || n.includes('dulce')) return '🍮'
  return '🍽️'
}

export default function ProductModal({ products, index, onClose, onChange }) {
  const { lang } = useLanguage()
  const [imgFailed, setImgFailed] = useState(false)

  const product = products?.[index]

  useEffect(() => { setImgFailed(false) }, [index])

  useEffect(() => {
    if (!product) return
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && index > 0) onChange(index - 1)
      if (e.key === 'ArrowRight' && index < products.length - 1) onChange(index + 1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [product, index, products, onClose, onChange])

  if (!product) return null

  const allergens = (product.allergens || []).map(resolveAllergen).filter(Boolean)
  const showImg = isValidUrl(product.image_url) && !imgFailed
  const name = tProduct(lang, product.name, 'name')
  const description = product.description
    ? tProduct(lang, product.name, 'description')
    : null

  return (
    <div
      className="menu-modal-overlay"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
    >
      <div className="menu-modal-card">
        <button className="menu-modal-close" onClick={onClose} aria-label={t(lang, 'ui.aria.close')}>
          <X size={16} />
        </button>

        {showImg ? (
          <img
            className="menu-modal-img"
            src={product.image_url}
            alt={name}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="menu-modal-emoji-zone" aria-hidden="true">
            {getProductEmoji(product.name)}
          </div>
        )}

        <div className="menu-modal-body">
          <h2 className="menu-modal-name">{name}</h2>
          {description && (
            <p className="menu-modal-desc">{description}</p>
          )}
          <PriceDisplay price={product.price} className="menu-modal-price" />

          {allergens.length > 0 && (
            <>
              <p className="menu-modal-allergens-title">{t(lang, 'ui.menu.allergens')}</p>
              <div className="menu-modal-allergens">
                {allergens.map((alg, i) => {
                  const algName = tAllergen(lang, alg.name)
                  return (
                    <div key={i} className="menu-modal-allergen-item">
                      <img
                        className="menu-modal-allergen-img"
                        src={alg.iconSrc}
                        alt={algName}
                        title={algName}
                      />
                      <span>{algName}</span>
                    </div>
                  )
                })}
              </div>
            </>
          )}

          <div className="menu-modal-nav">
            <button
              className="menu-modal-nav-btn"
              onClick={() => onChange(index - 1)}
              disabled={index === 0}
            >
              {t(lang, 'ui.menu.prev')}
            </button>
            <span className="menu-modal-counter">
              {index + 1} {t(lang, 'ui.menu.of')} {products.length}
            </span>
            <button
              className="menu-modal-nav-btn"
              onClick={() => onChange(index + 1)}
              disabled={index === products.length - 1}
            >
              {t(lang, 'ui.menu.next')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
