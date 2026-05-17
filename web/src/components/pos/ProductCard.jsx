import { useState } from 'react'
import { ChefHat } from 'lucide-react'
import AllergenIcons from '../landing/AllergenIcons'
import '../../styles/pos/ProductCard.css'

export default function ProductCard({ originalProd, category, onClick }) {
    const [imgError, setImgError] = useState(false)

    if (!originalProd) return null

    const prod = originalProd
    const isUnavailable = prod.is_available === false

    const getImageSrc = () => {
        if (prod.image_url) return prod.image_url
        const name = (prod.name || '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[̀-ͯ]/g, '')
            .replace(/ /g, '-')
            .replace(/[^a-z0-9-]/g, '')
        return `/products/${name}.webp`
    }

    return (
        <div
            className={`product-card ${isUnavailable ? 'sold-out' : ''}`}
            onClick={() => { if (!isUnavailable && onClick) onClick() }}
        >
            {isUnavailable && <div className="sold-out-badge">Agotado</div>}

            <div className="product-image-container">
                {!imgError ? (
                    <img
                        src={getImageSrc()}
                        alt={prod.name}
                        className="product-image"
                        loading="lazy"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="product-fallback-icon">
                        <ChefHat size={48} />
                    </div>
                )}
            </div>

            {prod.allergens && prod.allergens.length > 0 && (
                <div className="product-allergens-strip">
                    <AllergenIcons allergens={prod.allergens} />
                </div>
            )}

            <div className="product-info">
                <h3 className="product-name">{prod.name}</h3>
                {prod.price && Number(prod.price) > 0 && (
                    <div className="product-price">
                        {Number(prod.price).toFixed(2)} €
                    </div>
                )}
            </div>
        </div>
    )
}
