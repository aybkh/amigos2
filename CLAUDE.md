# CLAUDE.md

Guía de contexto para Claude Code. **Léela completa antes de tocar cualquier archivo.**

---

## ⚡ Respuesta rápida de contexto

- **Proyecto:** `amigos2.com` — web pública de restaurante + panel de administración propio
- **Stack:** React 19 + Vite + Tailwind / Supabase (DB + Auth + Storage) / Cloudflare Pages
- **Sin backend propio:** todo el backend es Supabase (PostgreSQL gestionado)
- **Tres apps separadas:**
  - `web/` → web pública (sin autenticación, acceso público)
  - `admin/` → panel de gestión (autenticación Supabase Auth, solo propietario)
  - `web/src/pages/KioskPage.jsx` → cartelería digital `/tv` (pantallas del local, sin auth, fullscreen)

---

## Reglas obligatorias para Claude Code

1. **Documentar cada cambio en CHANGELOG.md:**
   Tras completar cualquier fix, feature o refactor, añadir una entrada en
   `docs/CHANGELOG.md` siguiendo el formato existente (versión semántica, fecha,
   categorías `[FEATURE]` / `[FIX]` / `[CONFIG]` / `[REFACTOR]`).
   Agrupar cambios relacionados bajo la misma versión si se hacen en la misma sesión.

2. **Mantener docs actualizados:**
   Si un cambio afecta la lógica documentada en `docs/`, actualizar ese doc
   inmediatamente. Nunca dejar docs desactualizados respecto al código.
   - Cambio en tablas Supabase → actualizar `docs/SCHEMA.md`
   - Cambio en estructura de carpetas → actualizar `docs/ARQUITECTURA.md`
   - Cambio en despliegue → actualizar `docs/DESPLIEGUE.md`
   - Cambio en panel admin → actualizar `docs/ADMIN_PANEL.md`
   - Cambio en web pública → actualizar `docs/WEB_PUBLICA.md`

3. **Código limpio y modular:**
   - Cada componente en su propio archivo. Sin componentes de más de 200 líneas.
   - Separar lógica (hooks personalizados en `hooks/`) de presentación (components).
   - Servicios de Supabase en `services/` — nunca llamar a Supabase directamente desde componentes.
   - Constantes y configuración en `lib/constants.js` o `lib/config.js`.

4. **Regla de oro Supabase:**
   Ningún valor sensible (API keys, URLs) va hardcodeado en el código.
   Todo viene de variables de entorno `.env`. Comprobar que `.env` esté en `.gitignore`.

5. **Mobile-first siempre:**
   Diseñar primero para móvil, luego escalar a desktop. El cliente ve la web
   principalmente desde su teléfono.

---

## Qué es este proyecto

Web completa para el restaurante **Amigos2** con dos partes diferenciadas:

### Web pública (`web/`)
- Página de inicio con info del restaurante (hero, sobre nosotros, horario, ubicación)
- Sección de contacto con formulario (envío de email via Resend)
- Botón prominente en la nav → **Carta Digital** (sección de menú completo)
- Galería de fotos
- Posts / noticias / promociones
- Mobile-first, SEO optimizado, carga rápida

### Panel de administración (`admin/`)
- Login con email + contraseña (Supabase Auth)
- CRUD completo de la carta (categorías, productos, precios, imágenes, disponibilidad)
- Editor de info del restaurante (nombre, horario, dirección, teléfono, redes sociales)
- Gestor de posts/promociones (crear, editar, publicar, despublicar)
- Galería de imágenes (subida a Supabase Storage)
- Interfaz ultra-simple: el cliente no es técnico

### Página Kiosco / Cartelería Digital (`/tv`)
- Ruta pública `/tv` — sin autenticación, sin navbar, sin footer
- Diseñada para pantallas grandes del local (TV 55"+), modo fullscreen
- Cicla automáticamente por todas las categorías y sus productos en bucle infinito
- **Dos fases por categoría:**
  1. `PRODUCT_LIST` — grid de productos (6 por página) con nombre, descripción y precio
  2. `HERO_SCREEN` — pantalla de impacto visual con imagen grande de la categoría/producto destacado, animación radial y partículas
- **Modos de tema:**
  - `/tv` — automático (claro de 08:00 a 20:00, oscuro de 20:00 a 08:00)
  - `/tv?theme=light` — forzar tema claro
  - `/tv?theme=dark` — forzar tema oscuro
- Recarga datos de Supabase cada 5 minutos sin intervención
- Si Supabase no responde, intenta cargar `/data/menu_fallback.json`
- **Constantes configurables** en `lib/kioskConstants.js`:
  - `PRODUCT_PAGE_DURATION` = 7000ms
  - `HERO_DISPLAY_DURATION` = 8000ms
  - `TRANSITION_DURATION` = 800ms
  - `PRODUCTS_PER_PAGE` = 6
  - `MENU_REFRESH_INTERVAL` = 300000ms (5 min)
  - `EXCLUDED_CATEGORIES` = [] (array de nombres a excluir)

---

## Estructura del repositorio

```
amigos2.com/
├── web/                          # SPA pública (Cloudflare Pages)
│   ├── public/
│   │   ├── _redirects            # /* /index.html 200 — CRÍTICO para Cloudflare
│   │   └── data/
│   │       └── menu_fallback.json  # Fallback offline para el kiosco
│   ├── src/
│   │   ├── components/           # Componentes UI reutilizables
│   │   │   ├── layout/           # Navbar, Footer, Layout
│   │   │   ├── home/             # HeroSection, AboutSection, HoursSection...
│   │   │   ├── menu/             # MenuSection, CategoryTabs, ProductCard
│   │   │   ├── posts/            # PostCard, PostsSection
│   │   │   ├── gallery/          # GalleryGrid, GalleryModal
│   │   │   ├── contact/          # ContactForm
│   │   │   └── kiosk/            # Componentes exclusivos del modo TV
│   │   │       ├── KioskProductGrid.jsx   # Grid 6 productos fase PRODUCT_LIST
│   │   │       ├── KioskHeroScreen.jsx    # Pantalla de impacto fase HERO_SCREEN
│   │   │       ├── KioskCategoryHeader.jsx
│   │   │       └── KioskParticles.jsx     # Animación de partículas hero
│   │   ├── pages/                # Vistas enrutadas
│   │   │   ├── HomePage.jsx
│   │   │   ├── MenuPage.jsx
│   │   │   ├── PostDetailPage.jsx
│   │   │   └── KioskPage.jsx     # /tv — fullscreen, sin layout, ciclo infinito
│   │   ├── hooks/                # Custom hooks
│   │   │   ├── useMenu.js
│   │   │   ├── usePosts.js
│   │   │   ├── useSiteInfo.js
│   │   │   ├── useGallery.js
│   │   │   └── useKiosk.js       # Máquina de estados del ciclo kiosco
│   │   ├── services/             # Llamadas a Supabase
│   │   │   ├── supabase.js       # Cliente Supabase (singleton)
│   │   │   ├── menuService.js
│   │   │   ├── postsService.js
│   │   │   ├── siteInfoService.js
│   │   │   └── contactService.js # Envío email via Resend
│   │   ├── lib/
│   │   │   ├── constants.js      # Rutas, textos, config general
│   │   │   └── kioskConstants.js # Timings y config exclusiva del kiosco
│   │   ├── styles/               # CSS global y variables
│   │   └── App.jsx               # React Router + rutas
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── admin/                        # SPA panel admin (Cloudflare Pages)
│   ├── public/
│   │   └── _redirects
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/           # AdminLayout, Sidebar, Header
│   │   │   ├── menu/             # CategoryManager, ProductForm, ProductList
│   │   │   ├── posts/            # PostEditor, PostList
│   │   │   ├── gallery/          # ImageUploader, GalleryManager
│   │   │   ├── siteinfo/         # SiteInfoForm, HoursEditor
│   │   │   └── ui/               # Button, Input, Modal, Toast (componentes base)
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── MenuPage.jsx
│   │   │   ├── PostsPage.jsx
│   │   │   ├── GalleryPage.jsx
│   │   │   └── SiteInfoPage.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useMenu.js
│   │   │   └── usePosts.js
│   │   ├── services/
│   │   │   ├── supabase.js
│   │   │   ├── authService.js
│   │   │   ├── menuService.js
│   │   │   ├── postsService.js
│   │   │   ├── galleryService.js
│   │   │   └── siteInfoService.js
│   │   ├── lib/
│   │   │   └── constants.js
│   │   └── App.jsx               # React Router + ProtectedRoute
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── docs/                         # Documentación técnica
│   ├── ARQUITECTURA.md
│   ├── SCHEMA.md                 # Tablas Supabase
│   ├── ADMIN_PANEL.md
│   ├── WEB_PUBLICA.md
│   ├── DESPLIEGUE.md
│   └── CHANGELOG.md
│
└── CLAUDE.md                     # Este archivo
```

---

## Stack tecnológico

| Capa | Tecnología | Motivo |
|------|-----------|--------|
| Frontend | React 19 + Vite | Mismo stack que el proyecto TPV — coherencia |
| Estilos | Tailwind CSS v3 | Rápido, consistente, mobile-first |
| Base de datos | Supabase (PostgreSQL) | Gratuito en tier free, Auth incluido, Storage incluido |
| Autenticación | Supabase Auth | Email+contraseña, sin tokens custom |
| Imágenes | Supabase Storage | Bucket `images` (público) — nombre exacto en todos los servicios |
| Email contacto | Resend (API gratuita) | 3000 emails/mes gratis, integración simple |
| Hosting | Cloudflare Pages | CD automático desde GitHub, dominio custom gratuito |
| Router | React Router v6 | Estándar, familiar del proyecto TPV |

---

## Schema de Supabase

> ⚠️ **Schema real ejecutado** — el SQL definitivo está en `docs/supabase_schema_real.sql`.
> El bucket de Storage se llama `images` (no `images`).

### Tabla `site_info`
- `id` (PK, **serial** autoincrement) — solo existe 1 fila siempre
- `restaurant_name` (text, NOT NULL, default 'Amigos2')
- `slogan` (text, nullable)
- `description` (text, nullable)
- `address` (text, NOT NULL)
- `phone` (text, NOT NULL)
- `email` (text, nullable)
- `website` (text, nullable)
- `opening_hours` (jsonb, NOT NULL) — `{ "lun": "13:00-23:00", "mar": "cerrado", ... }`
- `social_instagram` (text, nullable)
- `social_facebook` (text, nullable)
- `logo_url` (text, nullable)
- `hero_image_url` (text, nullable)
- `updated_at` (timestamptz, NOT NULL)

### Tabla `categories`
- `id` (PK, uuid)
- `name` (text, required)
- `description` (text, nullable)
- `image_url` (text, nullable)
- `display_order` (int)
- `is_active` (bool, default true)
- `created_at` (timestamptz)

### Tabla `products`
- `id` (PK, uuid)
- `category_id` (FK → categories.id)
- `name` (text, required)
- `description` (text, nullable)
- `price` (numeric(10,2))
- `image_url` (text, nullable)
- `is_available` (bool, default true)
- `display_order` (int)
- `allergens` (text[], nullable)
- `created_at` (timestamptz)

### Tabla `posts`
- `id` (PK, uuid)
- `title` (text, required)
- `slug` (text, unique) — generado del título
- `content` (text) — markdown o texto plano
- `cover_image_url` (text, nullable)
- `is_published` (bool, default false)
- `published_at` (timestamptz, nullable)
- `created_at` (timestamptz)

### Tabla `gallery`
- `id` (PK, uuid)
- `image_url` (text, required) — URL de Supabase Storage
- `alt_text` (text, nullable)
- `display_order` (int)
- `created_at` (timestamptz)

---

## Variables de entorno

```bash
# web/.env y admin/.env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...

# admin/.env (adicional)
# Sin secrets adicionales — Supabase Auth gestiona todo

# web/.env (adicional para formulario de contacto)
VITE_RESEND_API_KEY=re_...         # Solo si se llama desde edge function
# Alternativa: usar Supabase Edge Function para no exponer la key en frontend
```

> [!CAUTION]
> `VITE_` prefija las variables que quedan expuestas al browser.
> La API key de Resend NUNCA debe exponerse en el frontend.
> Usar Supabase Edge Function como proxy para el envío de email.

---

## Comandos de desarrollo

```bash
# Web pública
cd web && npm install && npm run dev        # http://localhost:5173

# Panel admin
cd admin && npm install && npm run dev      # http://localhost:5174

# Build producción
cd web && npm run build
cd admin && npm run build

# Lint
npm run lint
```

---

## Despliegue (Cloudflare Pages)

Dos proyectos separados en Cloudflare Pages:
- `amigos2-web` → rama `main`, carpeta `web/`, build: `npm run build`, output: `dist`
- `amigos2-admin` → rama `main`, carpeta `admin/`, build: `npm run build`, output: `dist`

**Crítico:** cada `public/` necesita `_redirects` con contenido `/* /index.html 200`

Variables de entorno se configuran en el dashboard de Cloudflare Pages (no en el repo).

---

## Patrones de código obligatorios

### Servicio Supabase (singleton)
```js
// services/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### Custom hook (patrón estándar)
```js
// hooks/useMenu.js
export function useMenu() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    menuService.getCategories()
      .then(setCategories)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { categories, loading, error }
}
```

### Servicio (patrón estándar)
```js
// services/menuService.js
import { supabase } from './supabase'

export const menuService = {
  async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*, products(*)')
      .eq('is_active', true)
      .order('display_order')
    if (error) throw error
    return data
  }
}
```

---

## Deuda técnica conocida

_(vacío al inicio del proyecto — ir añadiendo aquí)_

---

## Documentación detallada

| Archivo | Contenido |
|---------|-----------|
| `docs/ARQUITECTURA.md` | Estructura, stack, decisiones técnicas |
| `docs/SCHEMA.md` | Tablas y relaciones Supabase |
| `docs/ADMIN_PANEL.md` | Funcionalidades del panel de gestión |
| `docs/WEB_PUBLICA.md` | Páginas, rutas y componentes de la web |
| `docs/DESPLIEGUE.md` | Cloudflare Pages, variables de entorno, CI/CD |
| `docs/CHANGELOG.md` | Historial de versiones |