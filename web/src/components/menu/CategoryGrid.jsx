import { useState } from 'react'
import { tCategory } from '../../lib/i18n'

const isValidUrl = (url) => !!url && (url.startsWith('http://') || url.startsWith('https://'))

function getCategoryEmoji(name) {
  const n = (name || '').toLowerCase()
  if (n.includes('pizza')) return '🍕'
  if (n.includes('kebab') || n.includes('turca') || n.includes('dürüm') || n.includes('durum')) return '🥙'
  if (n.includes('paella') || n.includes('arroz') || n.includes('marisco') || n.includes('pescado')) return '🥘'
  if (n.includes('carne') || n.includes('combinado') || n.includes('asado') || n.includes('filete') || n.includes('bistec')) return '🥩'
  if (n.includes('ensalada')) return '🥗'
  if (n.includes('pasta') || n.includes('espagueti')) return '🍝'
  if (n.includes('burger') || n.includes('hamburguesa')) return '🍔'
  if (n.includes('bocadillo') || n.includes('sandwich')) return '🥖'
  if (n.includes('aperitivo') || n.includes('entrante') || n.includes('tapa')) return '🍢'
  if (n.includes('hindú') || n.includes('hindu') || n.includes('curry') || n.includes('biryan') || n.includes('indio')) return '🍛'
  if (n.includes('cóctel') || n.includes('coctel') || n.includes('sangr') || n.includes('bebida') || n.includes('cerveza') || n.includes('café') || n.includes('cafe') || n.includes('refresco')) return '🍹'
  if (n.includes('postre') || n.includes('dulce') || n.includes('helado') || n.includes('desayuno') || n.includes('especialidad')) return '🍮'
  return '🍽️'
}

function CategoryItem({ cat, active, onSelect, lang }) {
  const [failed, setFailed] = useState(false)
  const label = tCategory(lang, cat.name)
  const showImg = isValidUrl(cat.image_url) && !failed

  return (
    <button
      className={`category-item${active ? ' active' : ''}`}
      onClick={() => onSelect(cat)}
      title={label}
    >
      <div className="category-image-container">
        {showImg ? (
          <img
            src={cat.image_url}
            alt={label}
            loading="lazy"
            onError={() => setFailed(true)}
          />
        ) : (
          <span className="category-emoji" aria-hidden="true">{getCategoryEmoji(cat.name)}</span>
        )}
      </div>
      <span className="category-label">{label}</span>
    </button>
  )
}

export default function CategoryGrid({ categories, activeCatId, onSelect, lang }) {
  return (
    <div className="category-grid">
      {categories.map(cat => (
        <CategoryItem
          key={cat.id}
          cat={cat}
          active={activeCatId === cat.id}
          onSelect={onSelect}
          lang={lang}
        />
      ))}
    </div>
  )
}
