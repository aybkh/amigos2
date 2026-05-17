import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { ALLERGEN_MAP } from '../landing/AllergenIcons'
import '../../styles/pos/ProductModal.css'

const resolveAllergenById = (val) => {
    const num = Number(val)
    if (!isNaN(num) && ALLERGEN_MAP[num]) return ALLERGEN_MAP[num]
    const lc = String(val).toLowerCase().trim()
    const found = Object.values(ALLERGEN_MAP).find(a => a.name.toLowerCase() === lc)
    return found || { name: val, iconSrc: null, emoji: "⚠️", color: "#999" }
}

export default function ProductModal({ isOpen, onClose, product }) {
    const [imgError, setImgError] = useState(false)

    useEffect(() => {
        if (isOpen) setImgError(false)
    }, [isOpen, product])

    if (!isOpen || !product) return null

    const allergens = product.allergens || []

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">{product.name}</h2>
                    <button className="modal-close-btn" onClick={onClose}>
                        <X size={28} />
                    </button>
                </div>

                {product.image_url && !imgError && (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        onError={() => setImgError(true)}
                        style={{ width: '100%', borderRadius: 12, border: '4px solid #000', boxShadow: '6px 6px 0 #000', marginBottom: 20, objectFit: 'cover', maxHeight: 260 }}
                    />
                )}

                {product.description && (
                    <div className="product-description-box">
                        <i>{product.description}</i>
                    </div>
                )}

                {allergens.length > 0 && (
                    <div className="product-allergens-section">
                        <span className="section-title">Alérgenos</span>
                        <div className="product-allergens-list">
                            {allergens.map((val, i) => {
                                const alg = resolveAllergenById(val)
                                return (
                                    <div key={i} className="allergen-info-item">
                                        {alg.iconSrc ? (
                                            <img src={alg.iconSrc} alt={alg.name} className="allergen-mini-icon"
                                                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling && (e.target.nextSibling.style.display = 'flex') }} />
                                        ) : null}
                                        <div className="allergen-fallback-mini" style={{ display: alg.iconSrc ? 'none' : 'flex', borderColor: alg.color }}>
                                            {alg.emoji}
                                        </div>
                                        <span className="allergen-info-name">{alg.name}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}

                {product.price && Number(product.price) > 0 && (
                    <button className="modal-footer-btn" onClick={onClose}>
                        {Number(product.price).toFixed(2)} €
                    </button>
                )}
            </div>
        </div>
    )
}
