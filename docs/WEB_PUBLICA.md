# Web Pública — Amigos2

SPA pública del restaurante. Sin autenticación, acceso libre.

## Rutas

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | `HomePage` | Página principal con todas las secciones |
| `/carta` | `MenuPage` | Carta digital con sidebar por categoría |
| `/posts/:slug` | `PostDetailPage` | Detalle de un post/noticia |
| `/tv` | `TvPage` | Digital Signage — tema auto (claro 8-20h, oscuro el resto) |
| `/tv/1` | `TvPage forceTheme="light"` | Digital Signage forzado en tema claro |
| `/tv/2` | `TvPage forceTheme="dark"` | Digital Signage forzado en tema oscuro |

---

## Página Principal (`HomePage`) — desde v1.0.0

Diseño: **Verde Selva Oscuro + Glassmorphism + Verde Neón #00E676 + Crema #F5F0E8**

Secciones en orden:
1. **HeroSection** — Hero fullscreen gradient; badge glass-neon; título gigante; pills 2×2 con productos destacados hardcodeados
2. **StatsBar** — Barra glass: 15 Categorías · 131 Platos · 3:00 AM Cierre · 4.6★ Google
3. **FeaturedSection** — Grid 3×2 de tarjetas glass con carrusel de productos por categoría (Supabase)
4. **ReviewsSection** — Marquee infinito con 15 reseñas Google hardcodeadas; cards blancas
5. **HoursSection** — Card glass-neon centrada con horario de la semana y estado en tiempo real
6. **GallerySection** — Grid 3×2 fotos (#F5F0E8 fondo), lightbox con navegación; oculta si no hay fotos
7. **LocationSection** — Card glass-neon con iframe Google Maps + dirección
8. **ContactSection** — Formulario glass que inserta en `contact_messages` vía `contactService.send()`

### Componentes `components/home/` (v1.0.0)
| Componente | Fuente datos | Descripción |
|-----------|-------------|-------------|
| `HeroSection` | Hardcoded | Gradient selva, orbe neón, pills 2×2 |
| `StatsBar` | Hardcoded | 4 métricas: categorías, platos, cierre, rating |
| `FeaturedSection` | `useMenu()` | 6 cats → cards glass con carousel de productos |
| `HoursSection` | `useSiteInfo()` | opening_hours JSONB → schedule; estado live |
| `GallerySection` | `useGallery({ preview: true })` | 6 fotos + lightbox; null si vacío |
| `LocationSection` | `useSiteInfo()` | iframe Maps, address, botón Maps |
| `ContactSection` | `contactService.send()` | Formulario glass → Supabase contact_messages |

### Componentes `components/landing/` (mantenidos)
| Componente | Descripción |
|-----------|-------------|
| `ReviewsSection` | 15 reseñas reales hardcodeadas, marquee infinito |
| `AllergenIcons` | ALLERGEN_MAP ID 1-16 → SVG `/icons/allergens/*.svg` |

### Layout
- `Navbar` — glass sticky; drawer fullscreen móvil; **selector de idioma desktop** (dropdown 10 idiomas con flags SVG) + **selector mobile** en drawer (chips compactos); NAV_LINKS traducidos con `t(lang, 'ui.nav.*')`
- `Footer` — 3 col: Brand | Social (siteInfo) | Copyright; textos traducidos: "Síguenos", "Diseñado por", links legales

---

## Carta Digital (`MenuPage`) — desde v1.1.0

Página **standalone** — sin `<Layout>`, sin Navbar de la landing, sin footer.

### Estructura de componentes

| Componente | Ubicación | Descripción |
|-----------|-----------|-------------|
| `MenuPage` | `pages/` | Raíz standalone; `LanguageProvider` en `App.jsx` (global); `dir` derivado de `lang === 'ar'` para RTL |
| `MenuHeader` | `components/menu/` | Header sticky glass; logo; botón volver `/`; selector de idioma |
| `CategorySidebar` | `components/menu/` | Sidebar 110px desktop; imagen (http/https) o emoji por nombre; estado activo borde neón |
| `MenuSearch` | `components/menu/` | Input búsqueda en tiempo real con clear button; placeholder i18n |
| `ProductGrid` | `components/menu/` | Secciones por categoría con header; grid 4/3/2 col; filtra por query |
| `ProductCard` | `components/menu/` | Card glass; imagen o emoji; precio neón; iconos alérgenos SVG |
| `ProductModal` | `components/menu/` | Overlay glass; imagen/emoji; descripción; precio; alérgenos con nombres; prev/next; ESC |

### Navegación y comportamiento

- **IntersectionObserver** (`rootMargin: '-10% 0px -75% 0px'`) sincroniza sidebar/pills con el scroll
- **Mobile (≤1024px)**: sidebar oculto → pills horizontales sticky bajo el header
- **Móvil (≤640px)**: 2 columnas; modal como bottom-sheet (border-radius top only)
- **Búsqueda**: filtra productos por nombre y descripción; oculta categorías sin coincidencias
- **i18n**: 10 idiomas — ES, EN, CAT, FR, DE, NL, RU, AR, PL, IT; árabe con `dir="rtl"` en `#menu-root` y `document.documentElement.dir`

### Hooks y servicios

- `useLanguage()` — Context con `{ lang, setLang }`; persiste en `localStorage('amigos2_lang')`; gestiona `document.documentElement.dir`
- `useMenu()` — categorías con productos anidados desde Supabase

### i18n — Sistema de traducciones (v1.2.0)

- **Archivos**: `src/locales/{es,en,cat,fr,de,nl,ru,ar,pl,it}.json`
- **Función `t(lang, key)`**: dot-path lookup con fallback a ES; `t('en', 'ui.hours.title')` → `"Opening Hours"`
- **Función `tCategory(lang, nombreES)`**: traduce nombres de categoría por clave en español; fallback al nombre original
- **RTL**: `ar` activa `dir="rtl"` en `document.documentElement` y en `#menu-root`
- **Persistencia**: `localStorage.setItem('amigos2_lang', code)` — idioma se recuerda entre sesiones

### Ficheros CSS

- `styles/menu.css` — layout sidebar/pills, grids, cards, modal, RTL overrides

---

## Sistema de Diseño — desde v1.0.0

### Paleta (`src/styles/index.css`)

| Variable | Valor | Uso |
|----------|-------|-----|
| `--color-bg-dark` | `#071a10` | Fondo global body, HeroSection, ContactSection |
| `--color-bg-mid` | `#0a2a1a` | FeaturedSection, LocationSection |
| `--color-bg-light` | `#0f3d2a` | Uso secundario |
| `--color-neon` | `#00E676` | Verde neón — CTAs, activos, precios, highlights |
| `--color-neon-dim` | `#00994d` | Neón atenuado — hover secondary |
| `--color-cream` | `#F5F0E8` | Texto principal sobre fondos oscuros |
| `--color-border-glass` | `rgba(245,240,232,0.10)` | Borde elementos glass |
| `--color-border-neon` | `rgba(0,230,118,0.20)` | Borde elementos glass-neon |
| `--color-glass` | `rgba(245,240,232,0.06)` | Fondo glass neutro |
| `--color-glass-neon` | `rgba(0,230,118,0.08)` | Fondo glass neón |

Variables `--color-primary: #C84B31` etc. conservadas para compatibilidad con `pos/` (MenuPage).

### Clases utilitarias CSS

```css
.glass       { background: rgba(245,240,232,0.06); backdrop-filter: blur(20px); border: 1px solid rgba(245,240,232,0.10); }
.glass-neon  { background: rgba(0,230,118,0.08);   backdrop-filter: blur(20px); border: 1px solid rgba(0,230,118,0.20);  }
.stats-grid  { display: grid; grid-template-columns: repeat(4,1fr); → 2×2 en móvil }
.gallery-photo-btn .gallery-overlay { hover glass-neon via CSS }
```

### Tipografía
- Headings: `'Black Ops One'` — uppercase, stencil, letterSpacing
- Cuerpo: `'Montserrat'` — 400/600/700/800

### Secciones y fondos
| Sección | Fondo |
|---------|-------|
| Navbar | `rgba(7,26,16,0.60)` + blur(20px), `rgba(7,26,16,0.95)` al scroll |
| HeroSection | `linear-gradient(160deg, #0a2a1a, #0f3d2a, #071a10)` |
| StatsBar | `rgba(0,230,118,0.05)` + blur |
| FeaturedSection | `#0a2a1a` |
| ReviewsSection | `#040d07` |
| HoursSection | `linear-gradient(160deg, #071a10, #0a2a1a)` |
| GallerySection | `#F5F0E8` (sección clara — contraste) |
| LocationSection | `#0a2a1a` |
| ContactSection | `#071a10` |
| Footer | `#040d07` |

---

## Hooks de datos

| Hook | Descripción |
|------|-------------|
| `useSiteInfo()` | Info del restaurante (nombre, horario, etc.) |
| `useMenu()` | Categorías con sus productos |
| `usePosts({ recent })` | Posts — todos o solo los 3 últimos |
| `useGallery({ preview })` | Fotos — todas o solo las primeras 6 |

---

## Formulario de contacto

`ContactSection` → `contactService.send({ name, email, message })` → inserta en tabla `contact_messages` via Supabase.

Nota: si se migra a Edge Function con Resend, solo cambiar la implementación de `contactService.send()`.

---

## Página TV — Digital Signage (`TvPage`)

Pantalla de cartelería digital. **Sin Navbar ni Footer** — diseño fullscreen dedicado.

### Rutas
- `/tv` — tema automático: claro de 08:00 a 20:00, oscuro el resto
- `/tv/1` — siempre tema claro
- `/tv/2` — siempre tema oscuro

### Ciclo automático
1. **FASE PRODUCT_LIST** — grid 3×2 de hasta 6 productos de la categoría actual (7s por página)
2. **FASE HERO_SCREEN** — pantalla completa con imagen de la categoría (8s) + zoom + partículas

### Configuración (`lib/constants.js`)
```js
TV_CONFIG = {
  PRODUCT_PAGE_DURATION:  7000,
  HERO_DISPLAY_DURATION:  8000,
  TRANSITION_DURATION:    800,
  PRODUCTS_PER_PAGE:      6,
  MENU_REFRESH_INTERVAL:  300000,
  MENU_CACHE_KEY: 'amigos2_menu_cache',
}
```

### Fallback offline
`menuService.getCategories()` escribe en `localStorage` tras cada fetch. Si Supabase no responde, devuelve los datos cacheados.

### Componentes TV (`components/tv/`)
| Componente | Descripción |
|-----------|-------------|
| `TvProductCard.jsx` | Tarjeta de producto — imagen 16:9, Bebas Neue, precio dorado |
| `TvProductGrid.jsx` | Grid 3×2 con cabecera y dots de navegación |
| `TvHeroScreen.jsx` | Hero fullscreen con zoom, partículas, nombre enorme |
