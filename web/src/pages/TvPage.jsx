// Página de Digital Signage para TV del local — ciclo automático sin interacción
// Rutas: /tv (auto-tema), /tv/1 (claro), /tv/2 (oscuro)
import { useState, useEffect, useRef, useCallback } from 'react'
import { menuService } from '../services/menuService'
import TvProductGrid from '../components/tv/TvProductGrid'
import TvHeroScreen from '../components/tv/TvHeroScreen'
import { TV_CONFIG } from '../lib/constants'
import '../styles/tv.css'

const PHASE = { PRODUCT_LIST: 'PRODUCT_LIST', HERO_SCREEN: 'HERO_SCREEN' }

function detectTheme(force) {
  if (force === 'light') return 'light'
  if (force === 'dark')  return 'dark'
  const h = new Date().getHours()
  return (h >= 8 && h < 20) ? 'light' : 'dark'
}

function paginate(arr, size) {
  const pages = []
  for (let i = 0; i < arr.length; i += size) pages.push(arr.slice(i, i + size))
  return pages
}

const fmtTime = (d) => d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
const fmtDate = (d) => d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })

export default function TvPage({ forceTheme }) {
  const [categories, setCategories] = useState([])
  const [loading,    setLoading]    = useState(true)
  const [catIdx,     setCatIdx]     = useState(0)
  const [pageIdx,    setPageIdx]    = useState(0)
  const [phase,      setPhase]      = useState(PHASE.PRODUCT_LIST)
  const [fadeOut,    setFadeOut]    = useState(false)
  const [clock,      setClock]      = useState(new Date())
  const [theme,      setTheme]      = useState(() => detectTheme(forceTheme))
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
    const clockId   = setInterval(() => {
      setClock(new Date())
      if (!forceTheme) setTheme(detectTheme())
    }, 1000)
    return () => { clearInterval(refreshId); clearInterval(clockId) }
  }, [loadMenu, forceTheme])

  // ── Datos derivados ──
  const cat         = categories[catIdx] ?? null
  const sortedProds = [...(cat?.products ?? [])].sort((a, b) => a.display_order - b.display_order)
  const pages       = paginate(sortedProds, TV_CONFIG.PRODUCTS_PER_PAGE)
  const totalPages  = pages.length
  const pageProd    = pages[pageIdx] ?? []
  const hasHero     = Boolean(cat?.image_url)

  // ── Máquina de estados del ciclo automático ──
  const advance = useCallback(() => {
    if (!categories.length) return
    setFadeOut(true)
    setTimeout(() => {
      setFadeOut(false)
      if (phase === PHASE.PRODUCT_LIST) {
        if (pageIdx < totalPages - 1) {
          setPageIdx((p) => p + 1)
        } else if (hasHero) {
          setPhase(PHASE.HERO_SCREEN)
          setPageIdx(0)
        } else {
          setPageIdx(0)
          setCatIdx((i) => (i + 1) % categories.length)
        }
      } else {
        setPhase(PHASE.PRODUCT_LIST)
        setPageIdx(0)
        setCatIdx((i) => (i + 1) % categories.length)
      }
    }, TV_CONFIG.TRANSITION_DURATION)
  }, [phase, pageIdx, totalPages, hasHero, categories.length])

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
      <div className={`tv-container tv-${theme}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="tv-bebas" style={{ fontSize: '5rem', color: 'var(--tv-accent)' }}>
          Cargando carta…
        </p>
      </div>
    )
  }

  return (
    <div className={`tv-container tv-${theme}`}>

      {/* ── HEADER ── */}
      <header className="tv-header">
        <span className="tv-bebas" style={{ fontSize: '3.5rem', color: 'var(--tv-text)' }}>
          Amigos<span style={{ color: 'var(--tv-accent)' }}>2</span>
        </span>
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
