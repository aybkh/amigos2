// Página de Digital Signage para TV del local — ciclo automático sin interacción
// Ruta única: /tv — tema oscuro Amigos2 (verde selva + neón)
import { useState, useEffect, useRef, useCallback } from 'react'
import { menuService } from '../services/menuService'
import TvProductGrid from '../components/tv/TvProductGrid'
import TvHeroScreen from '../components/tv/TvHeroScreen'
import { TV_CONFIG } from '../lib/constants'
import '../styles/tv.css'

const PHASE = { PRODUCT_LIST: 'PRODUCT_LIST', HERO_SCREEN: 'HERO_SCREEN' }

// Pagina garantizando que ninguna página tenga menos de 2 productos
// (siempre que el total sea >= 2). Si la última página quedaría con 1 sólo
// elemento, se reparte tomando uno de la anterior.
function paginate(arr, size) {
  const pages = []
  for (let i = 0; i < arr.length; i += size) pages.push(arr.slice(i, i + size))
  if (pages.length > 1 && pages[pages.length - 1].length === 1) {
    const last = pages[pages.length - 1]
    const prev = pages[pages.length - 2]
    pages[pages.length - 1] = [prev.pop(), ...last]
  }
  return pages
}

const fmtTime = (d) => d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
const fmtDate = (d) => d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })

export default function TvPage() {
  const [categories, setCategories] = useState([])
  const [loading,    setLoading]    = useState(true)
  const [catIdx,     setCatIdx]     = useState(0)
  const [pageIdx,    setPageIdx]    = useState(0)
  const [phase,      setPhase]      = useState(PHASE.HERO_SCREEN)
  const [fadeOut,    setFadeOut]    = useState(false)
  const [clock,      setClock]      = useState(new Date())
  const timer = useRef(null)

  // ── Carga de datos con fallback en localStorage ──
  const loadMenu = useCallback(async () => {
    try {
      const data = await menuService.getCategories()
      setCategories(data)
    } catch {
      // menuService ya intenta el caché internamente; si falla no hacemos nada
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadMenu()
    const refreshId = setInterval(loadMenu, TV_CONFIG.MENU_REFRESH_INTERVAL)
    const clockId   = setInterval(() => setClock(new Date()), 1000)
    return () => { clearInterval(refreshId); clearInterval(clockId) }
  }, [loadMenu])

  // Si la categoría actual no tiene imagen de portada, saltar el hero
  // y pasar directamente a la lista de productos
  useEffect(() => {
    if (phase === PHASE.HERO_SCREEN && cat && !cat.image_url) {
      setPhase(PHASE.PRODUCT_LIST)
    }
  }, [phase, cat])

  // ── Datos derivados ──
  const cat         = categories[catIdx] ?? null
  const sortedProds = [...(cat?.products ?? [])].sort((a, b) => a.display_order - b.display_order)
  const pages       = paginate(sortedProds, TV_CONFIG.PRODUCTS_PER_PAGE)
  const totalPages  = pages.length
  const pageProd    = pages[pageIdx] ?? []

  // ── Máquina de estados del ciclo automático ──
  // Orden por categoría: HERO_SCREEN (si tiene imagen) → páginas de PRODUCT_LIST → siguiente categoría
  const advance = useCallback(() => {
    if (!categories.length) return
    setFadeOut(true)
    setTimeout(() => {
      setFadeOut(false)
      if (phase === PHASE.HERO_SCREEN) {
        // Tras el hero, mostrar la primera página de productos de la misma categoría
        setPhase(PHASE.PRODUCT_LIST)
        setPageIdx(0)
      } else {
        // PRODUCT_LIST: avanzar página o pasar a la siguiente categoría
        if (pageIdx < totalPages - 1) {
          setPageIdx((p) => p + 1)
        } else {
          const nextIdx = (catIdx + 1) % categories.length
          const nextHasHero = Boolean(categories[nextIdx]?.image_url)
          setCatIdx(nextIdx)
          setPageIdx(0)
          setPhase(nextHasHero ? PHASE.HERO_SCREEN : PHASE.PRODUCT_LIST)
        }
      }
    }, TV_CONFIG.TRANSITION_DURATION)
  }, [phase, pageIdx, totalPages, catIdx, categories])

  useEffect(() => {
    if (!categories.length) return
    const dur = phase === PHASE.HERO_SCREEN
      ? TV_CONFIG.HERO_DISPLAY_DURATION
      : TV_CONFIG.PRODUCT_PAGE_DURATION
    timer.current = setTimeout(advance, dur)
    return () => clearTimeout(timer.current)
  }, [phase, catIdx, pageIdx, categories.length, advance])

  // ── Loading ──
  if (loading || !cat) {
    return (
      <div className="tv-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="tv-bebas" style={{ fontSize: '5rem', color: 'var(--tv-accent)' }}>
          Cargando carta…
        </p>
      </div>
    )
  }

  return (
    <div className="tv-container">

      {/* ── HEADER ── */}
      <header className="tv-header">
        <img
          src="/amigos2-logo-2-1.png"
          alt="Amigos2"
          className="tv-logo"
        />
        <div style={{ textAlign: 'right' }}>
          <div className="tv-bebas" style={{ fontSize: '4.2rem', lineHeight: 1, color: 'var(--tv-text)' }}>
            {fmtTime(clock)}
          </div>
          <div className="tv-bebas" style={{ fontSize: '1.4rem', letterSpacing: '3px', color: 'var(--tv-accent)', textTransform: 'uppercase' }}>
            {fmtDate(clock)}
          </div>
        </div>
      </header>

      {/* ── CONTENIDO PRINCIPAL ── */}
      <main className={`tv-main ${fadeOut ? 'tv-out' : 'tv-in'}`}>
        {phase === PHASE.PRODUCT_LIST && (
          <TvProductGrid
            category={cat}
            products={pageProd}
            catIdx={catIdx}
            totalCats={categories.length}
            pageIdx={pageIdx}
            totalPages={totalPages}
          />
        )}
        {phase === PHASE.HERO_SCREEN && (
          <TvHeroScreen category={cat} />
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer className="tv-footer">
        <p className="tv-bebas" style={{ fontSize: '1.3rem', letterSpacing: '4px', color: 'var(--tv-text-dim)', textTransform: 'uppercase' }}>
          {cat.name}
          {totalPages > 1 && (
            <span style={{ marginLeft: '1rem', opacity: 0.55, fontSize: '0.9rem' }}>
              pág. {pageIdx + 1}/{totalPages}
            </span>
          )}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {categories.map((_, i) => (
            <span key={i} className={`tv-dot ${i === catIdx ? 'tv-dot-active' : ''}`} />
          ))}
        </div>
      </footer>

    </div>
  )
}
