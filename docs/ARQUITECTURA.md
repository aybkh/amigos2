# Arquitectura — Amigos2

## Visión general

Dos SPAs independientes desplegadas en Cloudflare Pages, con Supabase como backend completo (DB, Auth, Storage, Edge Functions).

```
amigos2.com/
├── web/      → SPA pública, acceso sin login
├── admin/    → SPA panel admin, acceso con Supabase Auth
└── docs/     → Documentación técnica
```

## Stack por capa

| Capa | Tecnología | Versión |
|------|-----------|---------|
| UI | React | 19.x |
| Build | Vite | 6.x |
| Estilos | Tailwind CSS | 3.x |
| Router | React Router | 6.x |
| Backend | Supabase | Cloud |
| Auth | Supabase Auth | — |
| Storage | Supabase Storage | — |
| Email | Resend (via Edge Function) | — |
| Hosting | Cloudflare Pages | — |

## Estructura interna de cada app

```
src/
├── components/        # UI — solo presentación
│   ├── layout/        # Navbar, Footer, Layout / AdminLayout
│   ├── home/          # Secciones de la home (web)
│   ├── menu/          # CategoryTabs, ProductCard
│   ├── posts/         # PostCard
│   ├── gallery/       # GalleryGrid, GalleryModal
│   ├── contact/       # ContactForm
│   └── ui/            # Button, Input, Modal, Toast (admin)
├── pages/             # Vistas enrutadas — ensamblan componentes
├── hooks/             # Lógica de datos (useMenu, usePosts…)
├── services/          # Llamadas a Supabase — única capa que lo toca
├── lib/               # constants.js — rutas, nombres de tablas
└── App.jsx            # Router + ProtectedRoute (admin)
```

## Flujo de datos

```
Página → Hook → Service → Supabase → Hook → Página
```

- Las páginas solo usan hooks, nunca servicios directamente.
- Los hooks solo usan servicios, nunca Supabase directamente.
- Los servicios son la única capa que importa `supabase`.

## Decisiones técnicas

### ¿Por qué dos apps separadas y no un monorepo?
Cloudflare Pages es más simple con proyectos separados. Cada app tiene su propio dominio (`amigos2.com` y `admin.amigos2.com`), su propio proceso de build y sus propias variables de entorno.

### ¿Por qué Tailwind v3 y no v4?
Tailwind v4 (alpha) requiere cambios de configuración significativos. v3 es estable, maduro y bien documentado.

### Paleta de colores `web/` (desde v0.6.0)

| Token Tailwind | Valor | Uso |
|---------------|-------|-----|
| `primary` | `#2A5A43` | Verde Botella — navbar, sidebar menú, iconos de ubicación |
| `accent` | `#C84B31` | Rojo Ladrillo — CTAs, precios, hover links, highlights |
| `cream` | `#F9F8F6` | Fondo claro — cards, HoursSection, GallerySection |
| `dark` | `#1c1c1c` | Pizarra — body base, MenuPage, PostDetailPage |
| `textMain` | `#2D2926` | Gris casi negro — texto sobre cream |

**Utilitarios CSS en `index.css`:**
- `.bg-pizarra` — fondo oscuro con noise CSS (1px dot pattern)
- `.bg-ladrillo` — textura ladrillo `/textures/ladrillo.webp` con overlay oscuro
- `.card-cream` — fondo cream, borde 2px `textMain`, shadow neo
- `.btn-accent` — rojo ladrillo, shadow neo, hover translate
- `.btn-primary` — verde botella, hover más oscuro

**Fuentes:** `font-heading` = Black Ops One (headings), `font-sans` = Montserrat (body)

### ¿Por qué no usar @tanstack/query?
Para este tamaño de proyecto, los hooks con useState+useEffect son suficientes y reducen dependencias. Si el admin crece con CRUDs complejos, migrar a TanStack Query es la siguiente evolución natural.

### ¿Por qué Resend vía Edge Function?
La API key de Resend no puede estar en el frontend (`VITE_` la expone al browser). Supabase Edge Functions actúan como proxy seguro — reciben el formulario desde el frontend y hacen la llamada a Resend server-side.
