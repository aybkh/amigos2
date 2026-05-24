import { useState, useEffect, useRef, useCallback } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { t } from '../lib/i18n'
import { useMenu } from '../hooks/useMenu'
import MenuHeader from '../components/menu/MenuHeader'
import CategorySidebar from '../components/menu/CategorySidebar'
import CategoryGrid from '../components/menu/CategoryGrid'
import ProductGrid from '../components/menu/ProductGrid'
import ProductModal from '../components/menu/ProductModal'
import '../styles/menu.css'

export default function MenuPage() {
  const { lang } = useLanguage()
  const { categories, loading, error } = useMenu()
  const [activeCatId, setActiveCatId] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [modal, setModal] = useState(null)
  const observerRef = useRef(null)

  useEffect(() => {
    if (categories.length > 0 && !activeCatId) {
      setActiveCatId(categories[0].id)
    }
  }, [categories, activeCatId])

  useEffect(() => {
    if (drawerOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [drawerOpen])

  useEffect(() => {
    if (categories.length === 0) return
    observerRef.current?.disconnect()
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.find(e => e.isIntersecting)
        if (visible) setActiveCatId(visible.target.dataset.catId)
      },
      { rootMargin: '-10% 0px -75% 0px', threshold: 0 }
    )
    categories.forEach(cat => {
      const el = document.getElementById(`menu-cat-${cat.id}`)
      if (el) observerRef.current.observe(el)
    })
    return () => observerRef.current?.disconnect()
  }, [categories])

  const scrollToCategory = useCallback((cat) => {
    setActiveCatId(cat.id)
    const el = document.getElementById(`menu-cat-${cat.id}`)
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }, [])

  const openModal  = useCallback((products, index) => setModal({ products, index }), [])
  const closeModal = useCallback(() => setModal(null), [])
  const changeModal = useCallback((index) => setModal(prev => prev ? { ...prev, index } : null), [])

  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  return (
    <div id="menu-root" dir={dir}>
      <MenuHeader onOpenDrawer={() => setDrawerOpen(true)} />

      {/* Drawer lateral de categorías (móvil) */}
      {drawerOpen && (
        <div className="menu-drawer-overlay" onClick={() => setDrawerOpen(false)}>
          <nav className="menu-drawer" onClick={e => e.stopPropagation()} aria-label={t(lang, 'ui.menu.categories')}>
            <div className="menu-drawer-header">
              <img src="/amigos2-logo-2-1.png" alt="Amigos2" style={{ height: 60, width: 'auto', display: 'block' }} />
              <button className="menu-drawer-close" onClick={() => setDrawerOpen(false)} aria-label={t(lang, 'ui.aria.close')}>✕</button>
            </div>
            <div className="menu-drawer-list">
              <CategoryGrid
                categories={categories}
                activeCatId={activeCatId}
                onSelect={(cat) => { scrollToCategory(cat); setDrawerOpen(false) }}
                lang={lang}
              />
            </div>
          </nav>
        </div>
      )}

      {/* Cuerpo: sidebar + productos */}
      <div className="menu-body">
        <CategorySidebar
          categories={categories}
          activeCatId={activeCatId}
          onSelect={scrollToCategory}
        />
        <main className="menu-content">
          {loading && <div className="menu-state-msg">{t(lang, 'ui.menu.loading')}</div>}
          {error && <div className="menu-state-msg" style={{ color: '#ff5555' }}>{t(lang, 'ui.menu.error')}</div>}
          {!loading && !error && categories.length === 0 && (
            <div className="menu-state-msg">{t(lang, 'ui.menu.empty')}</div>
          )}
          {!loading && !error && categories.length > 0 && (
            <>
              <ProductGrid
                categories={categories}
                searchQuery=""
                onProductClick={openModal}
              />
              <footer className="menu-footer-disclaimer">
                <p>{t(lang, 'ui.image_disclaimer')}</p>
              </footer>
            </>
          )}
        </main>
      </div>

      {modal && (
        <ProductModal
          products={modal.products}
          index={modal.index}
          onClose={closeModal}
          onChange={changeModal}
        />
      )}
    </div>
  )
}
