import { useState } from 'react'

export const ALLERGEN_MAP = {
    1:  { name: "Gluten",           iconSrc: "/icons/allergens/gluten.svg",        emoji: "🌾", color: "#e67e22" },
    2:  { name: "Crustáceos",       iconSrc: "/icons/allergens/crustaceos.svg",    emoji: "🦐", color: "#e74c3c" },
    3:  { name: "Huevos",           iconSrc: "/icons/allergens/huevos.svg",        emoji: "🥚", color: "#f1c40f" },
    4:  { name: "Pescado",          iconSrc: "/icons/allergens/pescado.svg",       emoji: "🐟", color: "#3498db" },
    5:  { name: "Cacahuetes",       iconSrc: "/icons/allergens/cacahuetes.svg",    emoji: "🥜", color: "#d35400" },
    6:  { name: "Soja",             iconSrc: "/icons/allergens/soja.svg",          emoji: "🫘", color: "#27ae60" },
    7:  { name: "Lácteos",          iconSrc: "/icons/allergens/lacteos.svg",       emoji: "🥛", color: "#bdc3c7" },
    8:  { name: "Frutos de cáscara",iconSrc: "/icons/allergens/frutos-cascara.svg",emoji: "🌰", color: "#d35400" },
    9:  { name: "Apio",             iconSrc: "/icons/allergens/apio.svg",          emoji: "🥬", color: "#2ecc71" },
    10: { name: "Mostaza",          iconSrc: "/icons/allergens/mostaza.svg",       emoji: "🧴", color: "#f39c12" },
    11: { name: "Sésamo",           iconSrc: "/icons/allergens/sesamo.svg",        emoji: "🥯", color: "#ecf0f1" },
    12: { name: "Sulfitos",         iconSrc: "/icons/allergens/sulfitos.svg",      emoji: "🧪", color: "#9b59b6" },
    13: { name: "Moluscos",         iconSrc: "/icons/allergens/moluscos.svg",      emoji: "🐚", color: "#34495e" },
    14: { name: "Altramuces",       iconSrc: "/icons/allergens/altramuces.svg",    emoji: "🌸", color: "#f1c40f" },
    15: { name: "Picante",          iconSrc: "/icons/allergens/picante.svg",       emoji: "🌶️", color: "#c0392b" },
    16: { name: "Carne",            iconSrc: "/icons/allergens/carne.svg",         emoji: "🥩", color: "#7f8c8d" },
}

const TEXT_TO_ID = {
    "gluten": 1,
    "crustáceos": 2, "crustaceos": 2,
    "huevos": 3, "huevo": 3,
    "pescado": 4,
    "cacahuetes": 5, "cacahuete": 5, "cacahuetes (manies)": 5,
    "soja": 6,
    "lácteos": 7, "lacteos": 7, "leche": 7,
    "frutos de cáscara": 8, "frutos de cascara": 8, "frutos secos": 8,
    "apio": 9,
    "mostaza": 10,
    "sésamo": 11, "sesamo": 11,
    "sulfitos": 12, "dióxido de azufre": 12,
    "moluscos": 13,
    "altramuces": 14,
    "picante": 15,
    "carne": 16,
}

const resolveAllergen = (val) => {
    const num = Number(val)
    if (!isNaN(num) && ALLERGEN_MAP[num]) return ALLERGEN_MAP[num]
    const key = String(val).toLowerCase().trim()
    const id = TEXT_TO_ID[key]
    return id ? ALLERGEN_MAP[id] : { name: val, iconSrc: null, emoji: "⚠️", color: "#999" }
}

const AllergenIconItem = ({ alg }) => {
    const [imageError, setImageError] = useState(false)

    if (!alg.iconSrc || imageError) {
        return (
            <div title={alg.name} className="allergen-icon-fallback" style={{ border: `2px solid ${alg.color}` }}>
                <span role="img" aria-label={alg.name}>{alg.emoji}</span>
            </div>
        )
    }

    return (
        <img
            src={alg.iconSrc}
            alt={alg.name}
            title={alg.name}
            onError={() => setImageError(true)}
            className="allergen-icon-item"
        />
    )
}

const AllergenIcons = ({ allergens, allergenIds }) => {
    const raw = allergens || allergenIds || []
    if (!raw || raw.length === 0) return null

    const validAllergens = raw.map(v => resolveAllergen(v)).filter(Boolean)
    if (validAllergens.length === 0) return null

    return (
        <div className="allergen-overlay">
            {validAllergens.map((alg, index) => (
                <AllergenIconItem key={index} alg={alg} />
            ))}
        </div>
    )
}

export default AllergenIcons
