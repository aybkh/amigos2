import '../../styles/pos/CategorySidebar.css'

const getCategoryIcon = (cat) => cat.image_url || null

export default function CategorySidebar({ categories, selectedCategory, onSelectCategory, isMobileVisible }) {
    return (
        <aside className={`category-sidebar ${isMobileVisible ? 'mobile-visible' : ''}`}>
            <div className="brand-title">
                <span className="nav-brand-text">AMIGOS<span>2</span></span>
            </div>

            {categories.map(cat => (
                <div
                    key={cat.id}
                    className={`cat-btn ${selectedCategory?.id === cat.id ? 'active' : ''}`}
                    onClick={() => onSelectCategory(cat)}
                >
                    {getCategoryIcon(cat) && (
                        <img
                            src={getCategoryIcon(cat)}
                            alt={cat.name}
                            className="cat-img-svg"
                            onError={(e) => { e.target.style.display = 'none' }}
                        />
                    )}
                </div>
            ))}

            <div className="sidebar-footer">
                Dev by <a href="https://ayoubjerari.com" target="_blank" rel="noopener noreferrer" className="sidebar-footer-link">AyoubDev</a>
            </div>
        </aside>
    )
}
