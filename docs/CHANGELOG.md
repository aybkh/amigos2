# Changelog — amigos2.com

Formato: [Versión semántica] - YYYY-MM-DD — Descripción breve

Categorías: `[FEATURE]` `[FIX]` `[CONFIG]` `[REFACTOR]` `[DOCS]`

## [1.4.9] - 2026-05-20 — Footer rediseñado (mobile-first + áreas táctiles)

### [REFACTOR] Footer compacto, accesible y mobile-first
- `components/layout/Footer.jsx` — reescrito: layout en columna centrada (logo + info + iconos + links legales + bottom), eliminado el título "SÍGUENOS", grid de 3 columnas reemplazado por flex column. Mantiene `useLegalModal` para los modales legales y `siteInfo` para contacto
- `styles/index.css` — bloque `.site-footer` mobile-first:
  - Padding 32px/20px/16px móvil → 48px/40px/24px desktop
  - Logo 120px móvil → 150px desktop
  - **Iconos sociales 44×44 en móvil** (área táctil accesible, regla móvil ≥44px) → 40×40 desktop
  - Links legales: **vertical 14px** móvil con padding 6×12 (área táctil) → fila 13px con separadores `·` en desktop
  - Créditos: 10px opacity 0.30 móvil → 11px desktop (más discretos que antes)
- Sustituido el rule antiguo `.site-footer-grid` (ya no existe en el JSX)

---

## [1.4.8] - 2026-05-20 — Hero con logo + media de fondo + padding compacto en toda la home

### [FEATURE] Logo en el hero (en vez de wordmark de texto)
- `components/home/HeroSection.jsx` — el `<h1>` de texto sustituido por `<img src="/amigos2-logo-2-1.png" />` en un `.hero-logo-container`
- `styles/index.css` — `.hero-logo` 280px móvil / 400px desktop, con `drop-shadow`

### [FEATURE] Soporte opcional de imagen/vídeo de fondo en el hero
- Nueva tabla `hero_media` (Supabase) con `media_type` (`image|video|none`), `media_url`, `is_active`. RLS lectura pública + escritura autenticada. SQL en `docs/SCHEMA.md`. Pendiente ejecutarlo en el SQL Editor
- `web`: `services/heroMediaService.js` (tolera tabla inexistente), `hooks/useHeroMedia.js`, `HeroSection.jsx` renderiza `<img>` o `<video autoPlay muted loop playsInline>` absoluto + overlay si hay media activo; la clase `.hero-has-media` oculta los blobs decorativos
- `admin`: `services/heroMediaService.js`, `pages/HeroMediaPage.jsx`, `components/heromedia/HeroMediaManager.jsx` (selector tipo + URL + preview), ruta `/hero` y entrada en el sidebar (icono `Film`)
- `TABLES.HERO_MEDIA` añadido a constantes de web y admin

### [REFACTOR] Padding vertical compacto en toda la home (mobile-first)
- 7 secciones: `padding: '80px 24px'` → `'48px 24px'` (`ContactSection`, `DeliverySection`, `FeaturedSection`, `GallerySection`, `HoursSection`, `LocationSection`, `PostsPreviewSection`)
- `ReviewsSection`: `'72px 0'` → `'48px 0'`
- Hero: móvil `60px 24px 48px` / desktop `80px 40px 60px` (era 80/100px)
- Resultado: ~30–40% menos altura vertical entre secciones

### [STYLE] Transiciones suaves de fondo
- `styles/index.css` — `section, footer { transition: background 0.4s ease }` para suavizar cualquier cambio de fondo (e.g., con/sin media en el hero)

---

## [1.4.7] - 2026-05-20 — Hero rediseñado (Opción C minimalista, mobile-first)

### [FEATURE] HeroSection minimalista con gradiente + blobs verdes
- `components/home/HeroSection.jsx` reescrito: layout centrado (badge + título + slogan + 2 CTAs), sin la rejilla 2×2 de pills. Reusa i18n existente (`ui.hero.badge`/`cta_menu`/`cta_location`) y `siteInfo.restaurant_name`/`slogan`
- `styles/index.css` — bloque `.hero-section` **mobile-first**: gradiente `135deg #071a10 → #0a2618 → #071a10`, dos blobs verdes (`::before` 260px top-right, `::after` 200px bottom-left, `filter: blur`) por encima del fondo. Tipografía y CTAs apilados en columna en móvil; `@media (min-width: 768px)` los pasa a fila, agranda los blobs (600/420px) y el título (`clamp(4rem, 8vw, 6.5rem)`). Cero assets nuevos
- Sin cambios de i18n (las claves del hero ya existen en los 10 locales)

> Auditoría mobile-first del resto de secciones (Featured, Stats, Hours, Reviews, Contact): pendiente — la mayoría ya usan `clamp(...)` para tipografía y el delivery/footer/header ya están adaptados (v1.4.2 / v1.4.6)

---

## [1.4.6] - 2026-05-19 — Delivery 1 col en móvil + footer compacto en móvil

### [FIX] Botones delivery: 2 columnas desktop, 1 en móvil
- `components/home/DeliverySection.jsx` — quitado `gridTemplateColumns` inline; el grid usa clase `delivery-grid`
- `styles/index.css` — `.delivery-grid` 2 columnas; `@media (max-width:767px)` → 1 columna

### [FIX] Footer demasiado alto en móvil
- `components/layout/Footer.jsx` — clases `site-footer` y `site-footer-grid`
- `styles/index.css` — en `@media (max-width:767px)`: padding del footer `32px 20px 20px` y gap/margin del grid a 24px (con `!important` para vencer los estilos inline). Desktop sin cambios

> Hero (rediseño): pendiente de que el usuario elija opción A/B/C/D antes de implementar

---

## [1.4.5] - 2026-05-18 — Sección "Pedir a domicilio" + disclaimer imágenes

### [FEATURE] Sección Pedir a domicilio (home, entre Horario y Galería/Contacto)
- Nueva tabla `delivery_links` (Supabase): `platform` (glovo/ubereats/justeat/phone), `url`, `is_active`, `display_order`. SQL + RLS (lectura pública, escritura autenticada) documentado en `docs/SCHEMA.md` — pendiente ejecutarlo en el SQL Editor
- `web`: `services/deliveryService.js` (solo activos con url), `hooks/useDelivery.js`, `components/home/DeliverySection.jsx` (4 botones de marca: Glovo #FFC244, Uber Eats #06C167, Just Eat #FF8000, Llamar #E63946; phone → `tel:`, resto → nueva pestaña). Insertado en `HomePage` tras `HoursSection`. La sección no aparece si no hay enlaces activos con URL
- `web/src/locales/{10}.json` — grupo `ui.delivery` (title, call, *_sub) en los 10 idiomas
- Ajuste: grid a **2 botones por fila** (`repeat(2,1fr)`); iconos = imágenes de marca de `public/images` en recuadro blanco (Glovo, Uber Eats, Just Eat, y `amigos2` para el botón de teléfono) en lugar de emojis
- `just-eat.png` y `amigos2.png` convertidos a **.webp** (con sharp `--no-save`) y PNG originales eliminados; todas las imágenes de delivery ahora son webp
- `admin`: `services/deliveryService.js`, `pages/DeliveryPage.jsx`, `components/delivery/DeliveryLinksManager.jsx` (editar URL + activar/desactivar por plataforma); ruta `ROUTES.DELIVERY` en `App.jsx` y entrada “Pedir a domicilio” (icono Bike) en el sidebar de `AdminLayout`
- `TABLES.DELIVERY_LINKS` añadido a constantes de web y admin

### [FEATURE] Disclaimer "imágenes ilustrativas" en /carta
- `pages/MenuPage.jsx` — `<footer className="menu-footer-disclaimer">` al final, con `t(lang, 'ui.image_disclaimer')`
- `styles/menu.css` — `.menu-footer-disclaimer` ultra-discreto (10–11px, opacity 0.30, itálica), scope `#menu-root`
- `web/src/locales/{10}.json` — clave `ui.image_disclaimer` en los 10 idiomas

---

## [1.4.4] - 2026-05-18 — Logo e icono de marca (favicon roto corregido)

### [FIX] Favicon roto
- `web/index.html` y `admin/index.html` — apuntaban a `/favicon.svg` (inexistente, 404). Cambiado a `/favicon.ico` (presente en `public/`) + añadidos `<link rel="icon" image/png>` y `<link rel="apple-touch-icon">` con `amigos2-logo-1-1.png`

### [FEATURE] Logo de marca en su sitio
- Dos variantes en `public/` (web y admin): `amigos2-logo-2-1.png` (horizontal, crema/rojo, fondo transparente) y `amigos2-logo-1-1.png` (tile cuadrado verde con A2)
- Web (UI oscura) usa el **2:1**: `components/layout/Navbar.jsx`, `components/menu/MenuHeader.jsx`, drawer en `pages/MenuPage.jsx` y `components/layout/Footer.jsx` — sustituido el wordmark de texto "AMIGOS2" por `<img>`
- Admin (UI clara) usa el **1:1** (el 2:1 crema sería invisible sobre fondo blanco): `pages/LoginPage.jsx` y `components/layout/AdminLayout.jsx` (sidebar + header móvil)
- Tamaño del logo web subido a **60px** de alto (Navbar, MenuHeader, drawer) y 64px en Footer (antes 30–48px, se veían pequeños). Los headers miden 64px, así que el logo entra con ~2px de margen
- Builds web y admin sin errores; `favicon.ico` y los PNG se copian a `dist`

---

## [1.4.3] - 2026-05-17 — i18n: alérgenos y páginas legales traducidos

### [FEATURE] Nombres de alérgenos en 10 idiomas
- `locales/{10}.json` — añadido objeto `allergens` con los 16 alérgenos (Gluten, Crustáceos, Huevos, Pescado, Cacahuetes, Soja, Lácteos, Frutos de cáscara, Apio, Mostaza, Sésamo, Sulfitos, Moluscos, Altramuces, Picante, Carne) traducidos
- `lib/i18n.js` — nueva `tAllergen(lang, spanishName)` (clave = nombre canónico ES de `ALLERGEN_MAP`)
- `components/menu/ProductCard.jsx` y `ProductModal.jsx` — `alt`/`title`/texto del alérgeno usan `tAllergen(lang, alg.name)`

### [FEATURE] Páginas legales traducidas (Aviso Legal, Privacidad, Cookies)
- `locales/legal.js` (nuevo) — contenido estructurado de los 3 documentos en los 10 idiomas (títulos, secciones, párrafos, listas y datos). Datos de empresa (Amigos 2, NIF, dirección, teléfono, email) no se traducen. Tokens `{email}`/`{aepd}`/`{gprivacy}` y negrita `**…**` resueltos en el render
- `components/ui/LegalModal.jsx` — reescrito: renderiza desde `LEGAL` según el idioma activo (`useLanguage`), título y botón cerrar traducidos (`LEGAL_TITLES`, `ui.aria.close`), `dir=rtl` para árabe, fecha de actualización traducida (`LEGAL_UPDATED`)

### [REFACTOR] Sidebar de categorías a una sola columna
- `styles/menu.css` — `#menu-root .category-grid`: `grid-template-columns: 1fr` (una columna en desktop y drawer móvil, según petición). Resto de ajustes finos de `.category-image-container` (aspect-ratio, borde) los ajustó el usuario manualmente

---

## [1.4.2] - 2026-05-17 — Categorías: misma estructura desktop y móvil (imagen 4:3 + label)

### [FEATURE] Grid de categorías unificado con imagen 4:3 + texto
- `components/menu/CategoryGrid.jsx` (nuevo) — componente compartido: `div.category-grid` (grid 2 columnas) de `button.category-item` con `div.category-image-container` (aspect-ratio 4:3, imagen `onError`→emoji) + `span.category-label` (`tCategory`). Activa: borde verde `#00E676` + glow + `scale(1.05)` + label verde bold
- `components/menu/CategorySidebar.jsx` — ahora es un wrapper fino: `aside.category-sidebar-desktop` (220px) que renderiza `CategoryGrid`
- `pages/MenuPage.jsx` — el drawer móvil renderiza el mismo `CategoryGrid` dentro de `.menu-drawer-list`; eliminados `getCategoryEmoji`/`isValidUrl`/`DrawerCatImage` locales (movidos a `CategoryGrid`)
- `styles/menu.css` — reemplazadas las reglas previas por el set unificado (scope `#menu-root`): `.category-sidebar-desktop`, `.category-grid` (2 cols), `.category-item`, `.category-image-container` (4:3), `.category-emoji`, `.category-label` + estados active/hover; `.menu-drawer-list` con padding 12px. Desktop ≥768 muestra el aside; <768 el drawer (vía hamburger existente). Mismo bloque visual en ambos
- Fallback emoji si `image_url` es null/no-URL o la imagen falla

> Diagnóstico imágenes: 10/15 categorías cargan (200); 5 NO se actualizaron en BD y conservan nombres de fichero cortos inválidos (`entrantes-hindus.webp`, `comida-hindu.webp`, `platos-combinados.webp`, `cocteles.webp`, `bebidas.webp`). El `UPDATE` de "Cócteles y Sangrías" falla si el SQL usa "Sangrias" sin tilde. Pendiente: re-ejecutar el SQL corregido en el SQL Editor (anon key no puede escribir por RLS)

---

## [1.4.1] - 2026-05-17 — CategorySidebar rediseñado (estilo The Kebab Lab)

### [FEATURE] Sidebar de categorías con imágenes (desktop + drawer móvil)
- `components/menu/CategorySidebar.jsx` — reescrito: `nav.category-sidebar-desktop` con `button.category-item` (1:1, sin texto). Activa: fondo `#00E676` + glow; inactiva: borde `dashed` verde + opacidad 0.6. Imagen `cat.image_url` con fallback a emoji (`CatImage`, `onError`)
- `pages/MenuPage.jsx` — drawer móvil: filas `category-drawer-item` con imagen 50×50 + nombre traducido; activa con fondo `rgba(0,230,118,0.1)` y `border-left` verde. Nuevo `DrawerCatImage` con fallback a emoji
- `styles/menu.css` — sustituido `.menu-sidebar*`/`.menu-drawer-item*` por `#menu-root .category-sidebar-desktop` / `.category-item` / `.category-drawer-item` (scope `#menu-root` para no colisionar con `pos/POSPage.css` global). Breakpoint del sidebar/hamburger movido a 767px (desktop ≥768 muestra sidebar; <768 drawer). RTL actualizado a las nuevas clases
- Fallback de emojis: si `image_url` es null o no es URL válida, o la imagen falla al cargar, se muestra el emoji con el mismo estilo

> TAREA 1 (UPDATEs en Supabase) NO ejecutable con la anon key (RLS bloquea writes; 0 filas). Además los `image_url` actuales en BD son nombres de fichero cortos inválidos (p. ej. `cocteles.webp`) que no cargan. Hay que correr el SQL en el SQL Editor con la versión corregida (ver respuesta): los ficheros reales del bucket usan los slugs largos del enunciado y la categoría es **"Cócteles y Sangrías"** (con tilde en í; el SQL del enunciado decía "Sangrias" sin tilde → 0 filas)

---

## [1.4.0] - 2026-05-17 — Traducción completa de productos y categorías vía mapa en código

### [FEATURE] Datos de carta (productos + categorías) traducidos a 10 idiomas
- Consultado Supabase: 15 categorías y 131 productos (nombres + descripciones)
- `locales/productsMap.js` (nuevo) — mapa con los 131 productos: `name` y `description` en es/en/cat/fr/de/nl/ru/ar/pl/it. Términos propios/no traducibles (Naan, Biryani, Kebab, Dürüm, Pizza, Calzone, Hot Dog, cócteles, nombres propios) se mantienen en alfabeto latino; ru/ar transliterados. Las pizzas se indexan con prefijo "Pizza X" (coherente con `lib/productDisplay.js`), lo que además resuelve los nombres duplicados (Atún, Carbonara, Margarita existen como plato y como pizza)
- `lib/i18n.js` — nueva función `tProduct(lang, productName, field='name')`: lee `productsMap`, fallback `es` → nombre original
- `locales/{es,en,cat,fr,de,nl,ru,ar,pl,it}.json` — objeto `categories` regenerado con las **15 categorías exactas** de Supabase (incl. "Entrantes Hindús", "Comida Hindú y Biryanys", "Pescados, Mariscos y Paellas", "Cócteles y Sangrías", "Bebidas, Cervezas y Cafés", "Especialidades y Desayunos", "Menús Completos") traducidas a los 10 idiomas
- `components/menu/ProductCard.jsx` y `components/menu/ProductModal.jsx` — usan `tProduct(lang, product.name, 'name'|'description')` para nombre, descripción y `alt`; el emoji sigue derivándose del nombre original ES
- Verificado: 131/131 productos cubiertos (0 faltantes), build 0 errores, traducciones resueltas en FR/EN/RU; Naan/Biryani/Pizza se mantienen

> Alcance: traduce la carta (`/carta`). Fuera de alcance (siguen en ES, son datos de BD): posts/novedades, `site_info` (slogan/descripción/dirección), texto legal en `LegalModal`. `FeaturedSection`/`HeroSection`/kiosco `/tv` muestran nombres de producto sin `tProduct` (se puede extender reutilizando el helper si se desea)

---

## [1.3.9] - 2026-05-17 — i18n: categorías traducidas en sidebar/drawer

### [FIX] Nombres de categoría sin traducir en la navegación de la carta
- Auditoría: las 117 claves `ui.*` están completas en los 10 idiomas (sin claves faltantes). El español que se ve NO viene de la UI sino de datos de Supabase (nombres/descripciones de productos y categorías, posts, site_info) y de dos bugs de código
- `components/menu/CategorySidebar.jsx` — usa `tCategory(lang, cat.name)` para el nombre visible y el `title` (antes mostraba siempre el nombre español aunque el encabezado de sección sí se traducía con `tCategory`)
- `pages/MenuPage.jsx` — drawer de categorías (móvil): nombre con `tCategory(lang, cat.name)`; `aria-label` del botón cerrar usa `t(lang, 'ui.aria.close')` (antes "Cerrar" hardcodeado)

> Pendiente (no es bug de código, requiere decisión de datos): los nombres/descripciones de productos y las descripciones de categoría provienen de Supabase en español y no tienen mecanismo de traducción; las categorías cuyo nombre exacto no esté en el mapa `categories` de cada locale (p. ej. "Entrantes Hindús") caen al español. `components/ui/LegalModal.jsx` es texto legal 100% en español (decisión legal/negocio, no traducido). `GalleryModal/GalleryPreviewSection/GalleryGrid` tienen textos hardcodeados pero son dead code (no referenciados)

---

## [1.3.8] - 2026-05-17 — Carta: pizzas con prefijo "Pizza"

### [FEATURE] Nombre de pizza con prefijo
- `lib/productDisplay.js` (nuevo) — `displayProductName(name, categoryName)`: en categorías cuyo nombre contiene "pizza" antepone `Pizza ` al producto si no empieza ya por "pizza" (p. ej. "Margarita" → "Pizza Margarita"; "Pizza Amigos2" se deja igual)
- `components/menu/ProductGrid.jsx` — aplica `displayProductName` al construir la lista de productos (tras el filtro de búsqueda, sobre el nombre original), de modo que tanto las cards (`ProductCard`) como el modal (`ProductModal`, recibe ese mismo array) muestran "Pizza X" de forma consistente. No muta el dato original en Supabase

---

## [1.3.7] - 2026-05-17 — Carta: encabezado de categoría sticky

### [FEATURE] Título de categoría fijo al hacer scroll
- `styles/menu.css` — `#menu-root .menu-category-header`: pasa a `position: sticky; top: 64px` (justo bajo `.menu-header`, que mide 64px y tiene `z-index: 100`), `z-index: 10`, fondo `rgba(7, 26, 16, 0.95)` + `backdrop-filter: blur(10px)` para legibilidad mientras los productos pasan por debajo; `padding: 0` (el espacio visual sigue en el `<h2>`), `margin-bottom: 16px`. Al llegar a la siguiente categoría, su encabezado empuja/reemplaza al anterior (comportamiento sticky estándar)
- Se mantiene el scope `#menu-root` para seguir ganando en especificidad sobre `pos/POSPage.css` (global), que fijaba `top: 70px/126px` + textura ladrillo. `.menu-category-title` sin cambios (padding `12px 0 12px 16px`, border-left verde, fondo transparente). Sin franja antes del primer título (la primera categoría hace sticky pegada al header principal)

---

## [1.3.6] - 2026-05-17 — Carta: sin franja vacía + encabezado transparente

### [FIX] Franja oscura sobre la primera categoría y fondo del encabezado
- Diagnóstico: `.menu-header` es `position: sticky` (en flujo normal), por lo que NO necesita `padding-top` de compensación; añadir 80px crearía la franja, no la quitaría. La causa del hueco era la suma `margin-top` del header de sección (24px) + `:first-child` (8px) + padding del contenido
- `styles/menu.css` — `.menu-category-section`: eliminado `margin-bottom: 52px` y la regla `:first-child ... margin-top: 8px`; separación entre secciones movida a `.menu-category-section + .menu-category-section { margin-top: 40px }` (la primera arranca justo bajo el header, sin franja); `.menu-category-header`: `margin: 0 0 16px` (sin margen superior)
- `styles/menu.css` — `.menu-category-title`: `background`/`background-color`/`background-image` forzados a `transparent`/`none` con `!important` (solo border-left verde + texto); `padding` a `12px 0 12px 16px`; regla RTL actualizada a `12px 16px 12px 0`

### [FIX] Franja residual = hueco del antiguo nav horizontal de categorías
- Causa real (según el usuario): la franja está donde antes vivía el nav horizontal de categorías (eliminado en v1.2.2). No quedaba markup de ese nav, pero sí `padding-top` del contenedor reservando ese espacio
- `styles/menu.css` — `.menu-content`: `padding-top` eliminado en desktop (`0 24px 80px`) y en `@media (max-width: 1024px)` (`0 16px 80px`); la primera categoría queda pegada justo debajo del header sticky
- `components/menu/CategoryTabs.jsx` — eliminado: componente del antiguo nav horizontal, ya sin referencias en el código (dead code que confundía el diagnóstico)

### [FIX] CAUSA RAÍZ confirmada — colisión CSS con el TPV (POSPage.css global)
- Diagnóstico definitivo (vía inspector): la franja oscura la genera `.menu-category-header` con `padding: 16px 0` + textura ladrillo (`background-image`) + `position: sticky; top: 70px/126px`, definido en `styles/pos/POSPage.css` (231–262). Ese archivo se carga **globalmente** (`main.jsx` → `LandingPage.css` → `@import './pos/POSPage.css'`) y redefine las mismas clases `menu-*` que usa la carta. `menu.css` (especificidad de 1 clase) no reseteaba `padding`/`background`/`position`, así que esas props del TPV se filtraban en `/carta`
- `styles/menu.css` — reglas de la carta ancladas a `#menu-root` (id+clase gana siempre sobre la clase global del TPV, sin tocar el código del TPV): `#menu-root .menu-category-header { padding: 0; margin: 0 0 16px; background: none; background-image: none; position: static; top: auto; text-align: left; backdrop-filter: none }`; el padding visual se mueve al `<h2>` en `#menu-root .menu-category-title { padding: 12px 0 12px 16px; text-shadow: none; background: transparent }`; regla RTL re-anclada a `#menu-root[dir="rtl"] .menu-category-title` para conservar especificidad

> Nota: la tarea pedía versionar como v1.3.5, pero esa versión ya estaba ocupada por el fix anterior de esta sesión (precio a la derecha); se usa v1.3.6 para no sobrescribir el historial.

---

## [1.3.5] - 2026-05-17 — Carta: precio alineado a la derecha en las cards

### [FIX] Precio a la derecha en `.menu-card`
- `styles/menu.css` — `.menu-card-price`: añadido `align-self: flex-end` para que el `<PriceDisplay>` se alinee al borde derecho dentro del cuerpo flex-column de la card

---

## [1.3.4] - 2026-05-17 — Carta: encabezado de categoría siempre visible

### [FIX] Cards "flotando" sobre el encabezado en /carta
- Diagnóstico: `/carta` (App.jsx → solo `MenuPage`, sin `Layout`/`FeaturedSection`/`HeroSection`), `ProductGrid` ya renderiza el título antes del grid, y `menu.css` no tiene `position: absolute/fixed` en cards ni secciones. La causa real es una categoría con `name` vacío/en blanco: su `<h2>` quedaba vacío (solo la barra neón) y sus productos (p. ej. "Calamares", "Nuggets de Pollo") parecían huérfanos sobre la siguiente sección
- `components/menu/ProductGrid.jsx` — el título de categoría ahora se traduce con `tCategory(lang, cat.name)` y nunca puede quedar vacío: fallback `cat.name` → `ui.menu.categories`. Cada `<section>` mantiene el orden encabezado → grid; ninguna categoría puede generar un encabezado invisible

---

## [1.3.3] - 2026-05-17 — Reviews: auto-scroll + swipe manual

### [FEATURE] Carrusel de reseñas con autoplay y swipe
- `components/landing/ReviewsSection.jsx` — sustituido el doble track (marquee CSS desktop + snap manual móvil) por un único contenedor `.reviews-scroll`: autoplay con `setInterval` que avanza una card cada 5s mediante `scrollBy({ behavior:'smooth' })`; loop infinito (`scrollTo(0)` al detectar fin); `onTouchStart`/`onMouseDown` pausan el autoplay y lo reanudan a los 8s (timeout limpiado al desmontar); eliminado el texto "← desliza →"
- `styles/index.css` — añadidas `.reviews-scroll` (flex, overflow-x auto, scroll-snap-x, scrollbar oculta) y `.review-card` (300px desktop, 85vw ≤640px); eliminadas las reglas obsoletas `.reviews-outer`/`.reviews-track-*` y el `@keyframes marqueeLeft` (ya sin uso)

---

## [1.3.2] - 2026-05-17 — Navbar móvil: selector de idioma en el header

### [FIX] Selector de idioma siempre visible en el header móvil
- `components/layout/Navbar.jsx` — añadida clase `navbar-inner` al contenedor del header y `navbar-logo` al logo; eliminado el bloque de banderas/idiomas del drawer hamburger (el drawer queda con: links de navegación + botón VER CARTA)
- `styles/index.css` — `.navbar-inner { position: relative }`; en `@media (max-width: 768px)`: `.navbar-lang` pasa de `display:none` a `display:flex` (idioma visible a la derecha, mismo componente compacto bandera+código+▾ que en desktop); `.navbar-logo` con `position:absolute; left:50%; translateX(-50%)` para centrarlo entre el hamburger (izquierda) y el selector de idioma (derecha)

---

## [1.3.1] - 2026-05-17 — Precio con céntimos pequeños + limpieza carrusel muerto

### [FEATURE] Formato de precio entero grande + céntimos pequeños
- `components/ui/PriceDisplay.jsx` — componente reutilizable: divide el precio en entero (`.price-euros`) y `,céntimos €` (`.price-cents`); devuelve `null` si el precio es nulo o 0
- `styles/index.css` — añadidas reglas `.price-display` / `.price-euros` (1.8em) / `.price-cents` (0.65em, alineado arriba) en color `--color-neon`
- `components/menu/ProductCard.jsx` — usa `<PriceDisplay>` (clase `menu-card-price` conservada para espaciado base)
- `components/menu/ProductModal.jsx` — usa `<PriceDisplay>` (clase `menu-modal-price` conservada)
- `components/home/FeaturedSection.jsx` — usa `<PriceDisplay>`; fallback `—` cuando no hay precio
- `components/home/HeroSection.jsx` — `HERO_PILLS` ahora usa precios numéricos; pills renderizan `<PriceDisplay>`

### [REFACTOR] Eliminado carrusel muerto de Favoritos
- Borrados `components/landing/FeaturedMenu.jsx` y `components/home/FeaturedCategoriesSection.jsx` — componentes no referenciados que aún implementaban el carrusel con flechas ‹›/auto-slide. La sección viva (`home/FeaturedSection.jsx`, usada en `HomePage`) ya era estática desde v1.3.0 (una sola card fija por categoría)

---

## [1.3.0] - 2026-05-15 — Auditoría i18n completa: todos los textos traducidos

### [FEATURE] Nuevas claves de traducción en los 10 idiomas
- `src/locales/{es,en,cat,fr,de,nl,ru,ar,pl,it}.json` — añadidos 8 nuevos grupos de claves: `ui.aria.*` (acciones accesibles), `ui.stats.*` (StatsBar), `ui.featured.*` (sección Favoritos), `ui.reviews.*` (reseñas), `ui.gallery.*` (galería), `ui.posts.*` (novedades), `ui.location.*` (ubicación), `ui.cookies.*` (banner cookies); `ui.footer.tagline` añadido a sección footer existente

### [FEATURE] Componentes actualizados para usar i18n
- `components/home/StatsBar.jsx` — usa `useLanguage` + `t()` para todos los labels
- `components/home/FeaturedSection.jsx` — usa `t()` para título, subtítulo, "Sin productos"; eliminado carrusel con flechas ‹›, cada card muestra un solo producto estático (el primero disponible de la categoría)
- `components/landing/ReviewsSection.jsx` — usa `t()` para rating, título y texto deslizar
- `components/home/GallerySection.jsx` — usa `t()` para título y aria-labels del lightbox
- `components/home/PostsPreviewSection.jsx` — usa `t()` para título, subtítulo, "Leer más"; `formatDate` usa locale del idioma activo
- `components/ui/PostDrawer.jsx` — usa `t()` para título y aria-label cerrar; `formatDate` locale-aware
- `components/home/LocationSection.jsx` — usa `t()` para título y botón Maps
- `components/ui/CookieBanner.jsx` — todos los textos usan `t()` (título, cuerpo, botones, aria-labels)
- `components/layout/Footer.jsx` — `ui.footer.tagline` reemplaza texto hardcodeado "Bar · Restaurante · Pizzería"
- `components/layout/Navbar.jsx` — aria-label hamburger usa `t(lang, 'ui.aria.menu_btn')`
- `components/menu/MenuHeader.jsx` — aria-label selector idioma usa `t(lang, 'ui.aria.lang')`
- `components/menu/MenuSearch.jsx` — aria-label borrar usa `t(lang, 'ui.aria.clear')`
- `components/menu/CategorySidebar.jsx` — aria-label nav usa `t(lang, 'ui.menu.categories')`
- `components/menu/ProductModal.jsx` — aria-label cerrar usa `t(lang, 'ui.aria.close')`

---

## [1.2.4] - 2026-05-15 — Fix navbar: hamburger oculto en desktop

### [FIX] Hamburger ≡ visible en desktop
- `styles/index.css` — `.navbar-mobile-btn`: añadidos `align-items: center; justify-content: center` al bloque `display: none` (desktop), para que el flex-centering funcione cuando el media query activa `display: flex !important` en móvil
- `components/layout/Navbar.jsx` — eliminados `display: 'flex', alignItems: 'center', justifyContent: 'center'` del `style` inline del botón hamburger; el inline `display: 'flex'` sobreescribía la clase CSS `display: none` en desktop, causando que el botón fuera visible siempre

---

## [1.2.3] - 2026-05-15 — Carta: fix franja oscura encima del encabezado de categoría

### [FIX] Franja oscura vacía sobre el título de categoría
- `styles/menu.css` — `.menu-category-header`: reducido `margin-top` de 40px a 24px; añadida regla `.menu-category-section:first-child .menu-category-header { margin-top: 8px }` para que la primera categoría no tenga espacio vacío sobre ella; `.menu-category-title`: padding cambiado a `8px 0 8px 16px` (vertical explícito); RTL updated a `padding: 8px 16px 8px 0`

---

## [1.2.2] - 2026-05-15 — Carta: sin pills horizontales, encabezado categorías rediseñado

### [FIX] Eliminadas pills horizontales en móvil
- `pages/MenuPage.jsx` — eliminado `<div className="menu-pills">` completo; eliminado `pillsRef`; `scrollToCategory` ya no intenta sincronizar pills; offset de scroll simplificado a `-80px` fijo
- `styles/menu.css` — eliminados bloques `.menu-pills`, `.menu-pill`, `.menu-pill.active`, `.menu-pill:not(.active):hover` del bloque responsive `@media (max-width: 1024px)`; acceso a categorías en móvil exclusivamente vía drawer (hamburger)

### [FIX] Encabezado de categoría rediseñado
- `components/menu/ProductGrid.jsx` — eliminado `<span className="menu-category-count">` y wrapper `<div>` interior; estructura simplificada a `header > h2 + p`
- `styles/menu.css` — `.menu-category-header`: margin-top 40px, sin flex; `.menu-category-title`: `clamp(1.3rem, 4vw, 2rem)`, `border-left: 4px solid var(--color-neon)`, `padding-left: 16px`, `letter-spacing: 0.08em`, uppercase, fondo transparente; eliminado `.menu-category-count`; RTL actualizado a 4px y padding-right: 16px

---

## [1.2.1] - 2026-05-15 — Banner cookies, modales legales, posts como drawer lateral

### [FEATURE] Banner de cookies + icono persistente
- `src/contexts/LegalModalContext.jsx` — NUEVO: contexto mínimo `{ openLegal }` compartido entre Footer y CookieBanner
- `src/components/ui/CookieBanner.jsx` — NUEVO: banner fixed bottom-left (max-width 480px), glass oscuro, border-top neón; botones Rechazar / Aceptar; link "Más información" abre modal cookies; icono 🍪 36px redondeado siempre visible tras decidir; estado en `localStorage('amigos2_cookies')`; solo se renderiza en `pathname === '/'` (gestionado en AppInner)

### [FEATURE] Modales legales (en vez de páginas separadas)
- `src/components/ui/LegalModal.jsx` — NUEVO: overlay rgba(0,0,0,0.80); panel glass 680px max-width, 80vh max-height, scroll interno; header sticky con título + X; footer con botón "Cerrar" neón; ESC cierra; contenido completo de los 3 modales (aviso, privacidad, cookies) como subcomponentes internos
- `src/components/layout/Footer.jsx` — links legales cambiados de `<Link to>` a `<button onClick={() => openLegal(modal)}>` via contexto; eliminada dependencia de `ROUTES` legales
- `src/lib/constants.js` — eliminados `ROUTES.LEGAL`, `ROUTES.PRIVACY`, `ROUTES.COOKIES`, `ROUTES.POST_DETAIL`
- `src/App.jsx` — REESCRITO: extraído `AppInner` (con `useLocation`) dentro de `<BrowserRouter>`; `LegalModalContext.Provider` en AppInner; eliminadas rutas `/aviso-legal`, `/politica-privacidad`, `/politica-cookies`, `/posts/:slug`

### [FEATURE] Posts como drawer lateral
- `src/components/ui/PostDrawer.jsx` — NUEVO: overlay + panel 480px deslizando desde la derecha (`slideInRight` 0.3s); carga el post completo por slug via `postsService.getBySlug`; skeleton de carga; contenido párrafo a párrafo; ESC cierra; bloquea scroll del body; header con X
- `src/components/home/PostsPreviewSection.jsx` — `PostCard` cambio de `<Link>` a `<article onClick>` con estado local `openPost`; abre `PostDrawer` en vez de navegar

### [LIMPIEZA] Páginas eliminadas
- `pages/LegalPage.jsx`, `pages/PrivacyPage.jsx`, `pages/CookiesPage.jsx`, `pages/PostDetailPage.jsx` — ELIMINADAS

---

## [1.2.0] - 2026-05-14 — i18n completo: 10 idiomas en toda la web

### [FEATURE] Sistema i18n global — 10 idiomas en web pública + carta

**Arquitectura nueva:**
- `src/locales/` — NUEVO directorio con 10 JSON (es, en, cat, fr, de, nl, ru, ar, pl, it); cada archivo contiene `ui.nav`, `ui.hero`, `ui.hours`, `ui.contact`, `ui.menu`, `ui.footer` + sección `categories`
- `lib/i18n.js` — REESCRITO: importa los 10 JSON; exporta `translations`, `LANG_OPTIONS` (10 idiomas con SVG flags), función standalone `t(lang, 'ui.hours.title')` con dot-path y fallback a ES, y `tCategory(lang, nombreEnEspañol)` para categorías
- `hooks/useLanguage.jsx` — REESCRITO: `localStorage` persiste el idioma elegido (`amigos2_lang`); `setLang()` actualiza `document.documentElement.dir` (RTL para árabe) y `.lang`; contexto expone solo `{ lang, setLang }` (ya no `t`)
- `App.jsx` — `<LanguageProvider>` sube al nivel raíz (wrappea `BrowserRouter`); comparte el idioma en todas las rutas
- `pages/MenuPage.jsx` — eliminada la `<LanguageProvider>` local; usa el standalone `t(lang, key)` importado de `lib/i18n`

**Flags nuevas:**
- `public/icons/pl.svg` — bandera Polonia (blanco/rojo horizontal)
- `public/icons/it.svg` — bandera Italia (verde/blanco/rojo vertical)

**Idiomas añadidos a `LANG_OPTIONS`:**
- PL · Polski (desde 8 → 10 idiomas)
- IT · Italiano

**Componentes actualizados (standalone `t(lang, key)` en vez de `t.key` de contexto):**
- `Navbar.jsx` — NUEVA: selector de idioma desktop (dropdown glass con flags 10 idiomas) + selector mobile en drawer (chips compactos); NAV_LINKS traducidos via `t(lang, 'ui.nav.*')`; CTA "Ver Carta" traducido
- `HeroSection.jsx` — badge `ui.hero.badge`, botón CTA `ui.hero.cta_menu` y `ui.hero.cta_location` traducidos
- `HoursSection.jsx` — título, nombres de días, estados (abierto/cierra a las/cerrado) traducidos; `opens_at` usa `replace('{time}', hora)`
- `ContactSection.jsx` — todos los labels, placeholders, mensajes de éxito/error traducidos
- `Footer.jsx` — "Síguenos", "Diseñado por" y los 3 links legales traducidos
- `MenuHeader.jsx` — botón volver + aria-label de categorías traducidos; añade PL e IT al dropdown
- `ProductGrid.jsx`, `MenuSearch.jsx`, `ProductModal.jsx` — usan `{ lang } = useLanguage()` + `t(lang, key)` standalone

**CSS:**
- `index.css` — añadida `.navbar-lang { display: flex }` y `display: none !important` en breakpoint móvil

---

## [1.1.2] - 2026-05-14 — Posts en landing, iconos sociales footer, 8 idiomas carta

### [FIX] Posts en la web pública
- `pages/HomePage.jsx` — AÑADIDO: import `PostsPreviewSection` + `usePosts`; renderiza `<PostsPreviewSection>` entre `FeaturedSection` y `ReviewsSection`
- `components/home/PostsPreviewSection.jsx` — REESCRITO: diseño verde/neón (sin clases thekebablab); cards glass 16:9 con imagen/emoji; fecha dim; hover `translateY(-3px)`; esqueletos de carga
- `pages/PostDetailPage.jsx` — REESCRITO: sin ladrillo; fondo `--color-bg-dark`; botón volver hover neón; imagen 16:9 con borde neón; contenido en card glass
- **NOTA RLS:** si los posts no aparecen en Supabase, verificar que existe la policy `SELECT` para `anon` con `is_published = true` en la tabla `posts`

### [FEATURE] Footer: iconos sociales siempre visibles
- `components/layout/Footer.jsx` — Instagram y Facebook usan URL de `siteInfo` si existe, `href="#"` si no; TikTok siempre `href="#"` (campo pendiente en site_info); `SocialBtn` extraído como subcomponente; tamaño de iconos 36×36px (era 42px)

### [FEATURE] Carta: 8 idiomas con flags SVG
- `lib/i18n.js` — añadidos CAT, NL, DE, RU con traducciones completas; `LANG_OPTIONS` actualizado a 8 idiomas con `flag: '/icons/*.svg'` en vez de emoji
- `components/menu/MenuHeader.jsx` — flag renderizado con `<img>` (18×13px) en vez de emoji `<span>`; dropdown muestra nombre completo del idioma

---

## [1.1.1] - 2026-05-14 — Carta Digital: correcciones UX móvil

### [FIX]
- `MenuHeader.jsx` — móvil: sustituido botón "← Inicio" por hamburger `≡`; drawer lateral con lista de categorías + emoji; desktop mantiene botón volver
- `MenuPage.jsx` — refactorizado `MenuPageInner`+`MenuContent` en un solo componente; estado `drawerOpen` gestionado aquí; eliminado `<MenuSearch>` del render
- `ProductCard.jsx` — alérgenos movidos de footer a franja entre imagen y nombre (estilo thekebablab: `rgba(0,0,0,0.30)` strip, iconos 16px)
- `menu.css` — añadidos estilos drawer lateral; franja alérgenos `.menu-card-allergens-strip`; `.menu-category-title` con `border-left: 3px solid var(--color-neon)` + bg transparente; pills CSS limpiado (propiedad `background` duplicada eliminada)

---

## [1.0.3] - 2026-05-14 — Admin: fix HoursEditor formato doble turno

### [FIX] admin/src/components/siteinfo/HoursEditor.jsx
- `parseDay()` — nuevo: detecta string legacy vs objeto `{t1, t2}`; elimina crash `value.split is not a function` cuando el campo contiene el nuevo formato de doble turno
- `serializeDay()` — nuevo: genera `{t1: "HH:MM-HH:MM", t2: "HH:MM-HH:MM" | null}` en vez de string
- UI — añadido botón "+ 2º turno" por día; si activo: inputs T2 + botón "✕" para eliminar; separador visual `border-t` entre T1 y T2
- Compatibilidad total con el formato doble turno de `HoursSection.jsx` (web pública)

---

## [1.1.0] - 2026-05-14 — Carta Digital completa (/carta)

### [FEATURE] Carta Digital — página standalone con i18n y carta completa
- `pages/MenuPage.jsx` — reescrito completamente: sin Layout, sin Navbar; standalone con `LanguageProvider`; `IntersectionObserver` para sincronizar categoría activa con scroll
- `lib/i18n.js` — NUEVO: traducciones ES/EN/FR/AR + `LANG_OPTIONS`
- `hooks/useLanguage.js` — NUEVO: `LanguageProvider` (Context) + `useLanguage()` hook
- `styles/menu.css` — NUEVO: layout sidebar 110px + pills móvil + grids + cards + modal; soporte RTL árabe
- `components/menu/MenuHeader.jsx` — NUEVO: header sticky glass; logo AMIGOS2; botón volver; selector de idioma con dropdown (flag + label)
- `components/menu/CategorySidebar.jsx` — REESCRITO: sidebar 110px desktop con imagen (http/https) o emoji por nombre de categoría; estado activo con borde neón
- `components/menu/MenuSearch.jsx` — NUEVO: búsqueda en tiempo real con icono y botón clear; placeholder i18n
- `components/menu/ProductCard.jsx` — REESCRITO: card glass con imagen/emoji, precio en neón, iconos alérgenos SVG (hasta 5)
- `components/menu/ProductGrid.jsx` — NUEVO: secciones por categoría con header y conteo; filtra por búsqueda
- `components/menu/ProductModal.jsx` — NUEVO: overlay fullscreen glass con imagen/emoji, descripción, precio, alérgenos con nombres; navegación prev/next; cierre ESC

### [FEATURE] Grid responsive 4→3→2 columnas
- Desktop: 4 columnas (`repeat(4, 1fr)`)
- Tablet (≤1024px): 3 columnas + pills sticky en vez de sidebar
- Móvil (≤640px): 2 columnas; modal en bottom-sheet

---

## [1.0.2] - 2026-05-14 — Datos reales del restaurante, horario doble turno y páginas legales

### [FEATURE] Páginas legales
- `pages/LegalPage.jsx` — NUEVA: `/aviso-legal`; datos NIF, domicilio, teléfono, email; fondo dark, h2 en neón
- `pages/PrivacyPage.jsx` — NUEVA: `/politica-privacidad`; RGPD, derechos del usuario, Supabase como encargado
- `pages/CookiesPage.jsx` — NUEVA: `/politica-cookies`; sin analytics ni tracking; instrucciones por navegador
- `App.jsx` — añadidas 3 rutas: `ROUTES.LEGAL`, `ROUTES.PRIVACY`, `ROUTES.COOKIES`
- `lib/constants.js` — añadidos `ROUTES.LEGAL`, `ROUTES.PRIVACY`, `ROUTES.COOKIES`
- `components/layout/Footer.jsx` — barra de links legales en la parte inferior (texto muy dim, hover neón); añadido `mailto:` del email de siteInfo

### [FEATURE] Datos del restaurante desde Supabase
- `components/home/HeroSection.jsx` — usa `useSiteInfo()`: título desde `restaurant_name` (split base/sufijo), subtítulo desde `slogan`; fallback a valores hardcodeados si Supabase está vacío
- `components/layout/Footer.jsx` — email desde `siteInfo.email` como mailto

### [FIX] HoursSection — formato doble turno
- `components/home/HoursSection.jsx` — reescrito para el formato `{"t1": "12:30-23:59", "t2": "00:00-03:00"}`
  - `formatHours(val)` — parsea string / objeto `{t1, t2}` / "cerrado"
  - `isOpenNow(hours)` — lógica de cierre post-medianoche: 00:00-03:00 comprueba t2 del día anterior; t1 del día actual
  - `getNextOpenTime(hours)` — extrae la hora de apertura de t1 para el label "Abre a las HH:MM"
  - Filas de días: doble turno en dos líneas independientes; "Cerrado" en rojo suave
  - Compatible con formato string legacy (un solo turno o "cerrado")

### SQL a ejecutar en Supabase (manual)
Ver instrucción completa en la sesión. Actualiza: restaurant_name, slogan, description, address, phone, email, opening_hours (doble turno), map_embed_url.

---

## [1.0.1] - 2026-05-14 — Correcciones móvil y reviews

### [FIX]
- `FeaturedSection` — Grid 2 columnas en móvil via `.featured-grid` (era columna única); altura zona imagen 120px en móvil, 160px desktop via `.featured-img-zone`
- `FeaturedSection` — Imágenes de productos: `isValidUrl()` descarta rutas relativas (`/products/xxx.webp`); `onError` oculta imagen rota y muestra emoji de categoría; estado `imgFailed` se resetea al cambiar producto del carrusel
- `FeaturedSection` — EMOJI_MAP ampliado con pasta 🍝, burger 🍔, tapas 🍟, ensalada 🥗, bocadillo 🥖; Platos Combinados → 🍖; Hindú → 🥣
- `FeaturedSection` — Flechas ‹ › del carrusel: touch target 44×44px (era 28×28px)
- `ReviewsSection` — Bandera de idioma (`review.lang`) visible en esquina superior derecha de cada card, `fontSize: 1.25rem`
- `ReviewsSection` — Móvil (< 768px): scroll snap horizontal (`scroll-snap-type: x mandatory`, cards 85vw) en vez de marquee; indicador "← desliza →" debajo; marquee solo en desktop
- `Navbar` — Botón hamburger: touch target 44×44px (era ~28px con padding: 4)

### [CONFIG]
- `styles/index.css` — `.featured-grid` + `.featured-img-zone` con media query 640px; `.reviews-track-desktop` / `.reviews-track-mobile` para mostrar/ocultar según viewport; `.reviews-outer` con scroll styling

---

## [1.0.0] - 2026-05-14 — Rediseño completo de la landing page: Verde Selva + Glassmorphism + Neón

### [CONFIG]
- `src/styles/index.css` — paleta nueva: `--color-bg-dark #071a10`, `--color-bg-mid #0a2a1a`, `--color-bg-light #0f3d2a`, `--color-neon #00E676`, `--color-cream #F5F0E8`; clases utilitarias `.glass` y `.glass-neon`; sin textura ladrillo en el body
- `src/styles/LandingPage.css` — eliminados imports `landing/` (componentes usan inline Tailwind + CSS vars); mantenidos imports `pos/` para MenuPage
- Variables `--color-primary` conservadas para compatibilidad con MenuPage/pos

### [FEATURE] Navbar — Glassmorphism + Drawer móvil
- `components/layout/Navbar.jsx` — reescrito: fondo `rgba(7,26,16,0.60)` + blur(20px), sticky, border-bottom neón sutil; logo "AMIGOS2" con "2" en #00E676; links centrados desktop uppercase; CTA "Ver Carta" ghost neón; drawer fullscreen móvil (#040d07) con links grandes y botón "VER CARTA" #00E676 fondo

### [FEATURE] Footer — 3 columnas
- `components/layout/Footer.jsx` — reescrito: fondo #040d07, border-top neón; 3 col: Brand | Iconos sociales glass-neon | Copyright+AyoubDev

### [FEATURE] HeroSection — Gradient selva + pills 2×2
- `components/home/HeroSection.jsx` — reescrito: gradient 160deg #0a2a1a→#0f3d2a→#071a10; orbe neón decorativo; badge glass-neon "LLORET DE MAR · ABIERTO HASTA LAS 3AM"; título "AMIGOS2" `clamp(3.5rem,10vw,7rem)`; botones "Ver la Carta" (neón) + "Ubicación" (glass); grid 2×2 pills glass con emojis (Pizza/Dürüm/Paella/Mojito + precios)

### [FEATURE] StatsBar — 4 métricas
- `components/home/StatsBar.jsx` — NUEVO: glass rgba(0,230,118,0.05) + blur; 4 stats: 15 Categorías · 131 Platos · 3:00 AM Cierre · 4.6★ Google; 2×2 en móvil via clase `.stats-grid`

### [FEATURE] FeaturedSection — Carrusel de favoritos desde Supabase
- `components/home/FeaturedSection.jsx` — NUEVO: grid 3×2 desktop / auto-fill móvil; cards glass con imagen/emoji de producto (carousel auto-slide 4s por categoría), flechas ‹ ›; datos de `useMenu()` → filtra las 6 categorías objetivo; subtítulo "Nuestros Favoritos"

### [FEATURE] ReviewsSection — 15 reseñas reales hardcodeadas
- `components/landing/ReviewsSection.jsx` — reescrito: fondo #040d07; marquee infinito de 15 reseñas reales de Google Maps con bandera de idioma; cards blancas (contraste intencional); pausa on hover; sin dependencia de Supabase (datos hardcodeados)

### [FEATURE] HoursSection — Estado en tiempo real
- `components/home/HoursSection.jsx` — reescrito: fondo gradient selva; card glass-neon; estado vivo (Abierto/Cerrado/Abre a las HH:MM) con lógica correcta para cierres post-medianoche; fila del día actual destacada con border-left neón y fondo rgba neón

### [FEATURE] GallerySection — Grid + Lightbox
- `components/home/GallerySection.jsx` — NUEVO: fondo #F5F0E8 (sección clara — contraste); grid auto-fill 240px; skeleton de carga; lightbox fullscreen con blur; navegación ← →; hover overlay glass-neon via CSS (`.gallery-photo-btn .gallery-overlay`)

### [FEATURE] LocationSection — Glass card + mapa
- `components/home/LocationSection.jsx` — reescrito: fondo #0a2a1a; card glass-neon con iframe Google Maps (usa `site_info.map_embed_url` o genera URL desde `site_info.address`); footer de card con dirección + botón "Ver en Maps →" neón

### [FEATURE] ContactSection — Formulario glass
- `components/home/ContactSection.jsx` — reescrito: fondo #071a10; card glass; inputs glass-dark con focus border neón; labels uppercase dim; botón neón full-width; `contactService.send()`; estado success con ✓ en neón

### [REFACTOR]
- `pages/HomePage.jsx` — reescrito: orden Hero → StatsBar → FeaturedSection → ReviewsSection → HoursSection → GallerySection → LocationSection → ContactSection
- `components/layout/Layout.jsx` — Navbar ya no recibe prop `siteInfo` (no la necesita)

---

## [0.9.1] - 2026-05-14 — Auditoría y limpieza de assets; fallbacks de imagen sin archivos estáticos

### [FIX]
- `components/pos/CategorySidebar.jsx` — eliminados fallbacks a `/categories/*.webp` (archivos borrados); imagen oculta con `display:none` si no hay `image_url` en Supabase
- `components/pos/ProductCard.jsx` — fallback a `<ChefHat>` icono ya estaba; confirmado funcional sin `/products/*.webp`

### [REFACTOR]
- `web/public/images/` — eliminados 5 assets del Kebab Lab: `kebab-ico.webp`, `kebab-logo.webp`, `kebab-logo-square.webp`, `start.webp`, `victorprous_badge.webp`
- `web/public/categories/` — carpeta eliminada (16 webp de categorías del Kebab Lab)
- `web/public/products/` — carpeta eliminada (~150 webp de productos del Kebab Lab)

---

## [0.9.0] - 2026-05-14 — Web: copia fiel de thekebablab_menu con paleta Amigos2 (verde botella + rojo ladrillo)

### [CONFIG]
- `src/styles/index.css` — `--color-primary: #C84B31` (rojo ladrillo para todos los CTAs/activos/precios, mapeo 1:1 de `var(--color-primary)` de thekebablab); `--color-bg-global: #2A5A43` verde botella
- `src/styles/LandingPage.css` — imports completos: Base, Navbar, Hero, FeaturedSection, VideoCard, Reviews, Location, Hours, Delivery, Footer, AllergenIcons, Contact, pos/POSPage, pos/CategorySidebar, pos/ProductCard, pos/ProductModal, pos/WelcomeScreen

### [FEATURE] CSS copiado de thekebablab con sustitución de colores orange→verde/rojo
- `styles/landing/Navbar.css` — copia exacta; oranges → `var(--color-primary)` (#C84B31)
- `styles/landing/Hero.css` — rgba naranja hero bg → `rgba(42,90,67,0.45)` y `rgba(10,25,16,0.92)`
- `styles/landing/Base.css` — copia exacta (sin refs de color orange)
- `styles/landing/FeaturedSection.css` — rgba naranja overlay → `rgba(15,25,18,0.88)`; gallery-grid/gallery-item incluidos
- `styles/landing/Hours.css` — today row `rgba(255,129,39,0.189)` → `rgba(42,90,67,0.25)`
- `styles/landing/Location.css` — `rgba(223,119,74,0.738)` → `rgba(42,90,67,0.70)`
- `styles/landing/Footer.css` — copia exacta; `var(--color-primary)` = rojo ladrillo
- `styles/landing/VideoCard.css` — NUEVO (copy): clases `.video-card`, `.video-frame-overlay`, `.arrow-btn`, `.dots-container`, `.dot`
- `styles/landing/Reviews.css` — NUEVO (copy): `.reviews-section`, `.reviews-google-summary`, pausa marquee on hover
- `styles/landing/Delivery.css` — NUEVO (copy): `.delivery-card.local` → `background: #C84B31`
- `styles/pos/POSPage.css` — rgba naranja overlay → `rgba(42,90,67,0.55)`; añadidos `.menu-mobile-bar`, `.menu-product-area`, `.menu-category-header`, `.menu-backdrop`
- `styles/pos/CategorySidebar.css` — copia + clases `.menu-sidebar`, `.menu-cat-btn`, `.menu-cat-name` para MenuPage
- `styles/pos/ProductCard.css` — copia + clases `pos-product-card` para MenuPage de Amigos2
- `styles/pos/ProductModal.css` — NUEVO (copy): modal de detalle de producto; `var(--color-primary)` = rojo ladrillo
- `styles/pos/WelcomeScreen.css` — NUEVO (copy): `rgba(223,119,74,0.738)` → `rgba(42,90,67,0.70)`

### [FEATURE] Componentes JSX copiados y adaptados a Supabase
- `components/landing/AllergenIcons.jsx` — NUEVO: `ALLERGEN_MAP` (ID 1-16 con SVG `/icons/allergens/*.svg`); `TEXT_TO_ID` lookup para `text[]` de Supabase; fallback emoji si SVG falla
- `components/landing/HoursCard.jsx` — NUEVO: `useSiteInfo()` → convierte JSONB `opening_hours` a schedule array; badge estado (abierto/cerrado); hoy destacado con verde
- `components/landing/FeaturedMenu.jsx` — NUEVO: `useMenu()` → 4 primeras categorías con productos con imagen; carrusel auto-slide por categoría
- `components/landing/DeliverySection.jsx` — NUEVO: `useSiteInfo()` → renderiza solo si hay links glovo/ubereats/phone; null si no hay datos
- `components/landing/ReviewsSection.jsx` — NUEVO: requiere `reviews` prop; null si array vacío
- `components/pos/CategorySidebar.jsx` — NUEVO: `cat.image_url` de Supabase con fallback a `/categories/*.webp` por nombre
- `components/pos/ProductCard.jsx` — NUEVO: `product.image_url` de Supabase con fallback a `/products/{name}.webp`; AllergenIcons SVG
- `components/pos/ProductModal.jsx` — NUEVO: muestra imagen, descripción, alérgenos con SVG, precio
- `components/menu/AllergenIcons.jsx` — re-export de `components/landing/AllergenIcons`
- `components/menu/ProductCard.jsx` — re-export de `components/pos/ProductCard`
- `components/layout/Footer.jsx` — reescrito siguiendo Footer.css de thekebablab; elimina `footer-divider`/`footer-legal`
- `components/home/HeroSection.jsx` — reescrito: col izq = `hero-slider-container` con fotos par; col der = `video-card-container` con fotos impar (estructura thekebablab exacta)

### [FEATURE] Páginas actualizadas
- `pages/HomePage.jsx` — estructura thekebablab: Hero → FeaturedMenu → ReviewsSection → LocationSection → HoursCard → DeliverySection → GalleryPreview → ContactSection
- `pages/MenuPage.jsx` — estructura POSPage: CategorySidebar + product-grid + ProductModal; scroll-spy; mobile bar con hamburger

### [CONFIG] Assets copiados
- `web/public/products/` — ~70 imágenes de productos WebP copiadas de thekebablab_menu/public/products/
- `web/public/icons/` — SVGs de alérgenos y banderas (copiados sesión anterior)
- `web/public/categories/` — WebPs de categorías (copiados sesión anterior)

### [BUILD] ✓ npm run build → 0 errores, 1663 módulos, 58s

---

## [0.9.0-alpha] - 2026-05-13 — Web: rediseño exact-replica de thekebablab.es (Navbar, Hero carousels, MenuPage POSPage-style)

### [CONFIG]
- `src/styles/index.css` — `--color-sidebar` cambiado de `#1c1c1c` a `#111111` (negro puro per spec)
- `src/styles/landing/Navbar.css` — navbar siempre sólido negro `#111` (eliminado estado semitransparente), `.btn-order-style` usa `var(--color-accent)` rojo ladrillo con pill `border-radius: 50px`, `.nav-mobile-order-btn` también rojo ladrillo
- `src/styles/landing/Hero.css` — añadido CSS de carrusel tipo teléfono: `.hero-phone-duo`, `.hero-phone-card` (9/16 ratio, `border-radius: 28px`, rotaciones), `.hero-phone-slide`, `.hero-phone-gradient`; clases de flechas de carrusel
- `src/styles/landing/FeaturedSection.css` — añadido soporte de carrusel dentro de tarjetas: `.featured-slide`, `.card-arrow`, `.featured-item-name`; borde de `.featured-card` cambiado a `--color-border` (negro)
- `src/styles/landing/AllergenIcons.css` — NUEVO: `.allergen-overlay`, `.allergen-icon-item`, `.allergen-icon-fallback`
- `src/styles/pos/POSPage.css` — NUEVO: `.menu-mobile-bar`, `.menu-product-area` (padding-left 250px desktop, 0 mobile; ladrillo verde botella bg), `.menu-category-header` (sticky, overlay verde), `.menu-product-grid` (auto-fill minmax 180px), `.menu-backdrop`
- `src/styles/pos/CategorySidebar.css` — NUEVO: `.menu-sidebar` (fixed 250px, negro #111), `.menu-cat-btn` (120px alto, imagen de categoría, activo = rojo ladrillo), `.menu-cat-name` (label negro overlay)
- `src/styles/pos/ProductCard.css` — NUEVO: `.pos-product-card` (blanco, borde 4px negro, shadow 6px), `.pos-allergens-strip`, `.pos-product-name` (Black Ops One uppercase), `.pos-product-price` (rojo ladrillo)
- `src/styles/LandingPage.css` — añadidos imports de AllergenIcons.css y pos/*.css

### [FEATURE] Componentes nuevos y reescritos (replica thekebablab.es)
- `components/menu/AllergenIcons.jsx` — NUEVO: mapea `text[]` de alérgenos a emojis con fallback; renderiza `.allergen-icon-fallback` con color por alérgeno
- `components/home/HeroSection.jsx` — reescrito: dos columnas (`landing-grid`); izquierda = título + slogan + CTA; derecha = dos carruseles tipo teléfono (`PhoneCarousel`) con fotos de galería alternadas; imágenes A/B separadas (par/impar)
- `components/home/FeaturedCategoriesSection.jsx` — NUEVO: sección "Nuestros Favoritos" con categorías de Supabase; cada tarjeta tiene carrusel de imágenes de productos, auto-slide, flechas manuales; nombre de categoría en rojo ladrillo; chip con producto actual visible
- `components/menu/ProductCard.jsx` — reescrito: ahora usa clases pos-* (blanco neobrutalismo); añadidos `AllergenIcons` en franja bajo la imagen; nombre en Black Ops One uppercase; precio en rojo ladrillo
- `pages/MenuPage.jsx` — reescrito al estilo POSPage de thekebablab: sidebar fijo con imágenes de categorías, scroll-spy que actualiza categoría activa, scroll suave a sección al clicar en sidebar, mobile bar con hamburger, backdrop overlay, todas las categorías visibles como secciones apiladas
- `pages/HomePage.jsx` — orden de secciones actualizado: Hero → FeaturedCategoriesSection → About → Hours → Gallery → Location → Contact; eliminado `PostsPreviewSection` del flujo principal (reemplazado por `FeaturedCategoriesSection`)

---

## [0.8.0] - 2026-05-13 — Web: rediseño completo fiel al sistema CSS de thekebablab_menu

### [CONFIG] Sistema CSS modular (igual que thekebablab_menu)
- `src/styles/index.css` — cuerpo con textura ladrillo y overlay verde (`rgba(42,90,67,0.4)`) en lugar de pizarra; variables CSS: `--color-primary` #2A5A43, `--color-accent` #C84B31, `--color-sidebar` #1c1c1c, `--color-bg-global` #2A5A43; scrollbar verde botella
- `src/styles/LandingPage.css` — punto de entrada que importa todos los módulos CSS (igual que thekebablab_menu)
- `src/styles/landing/Base.css` — `.section-head`, `.landing-grid`, utilidades (copiado de thekebablab_menu con colores Amigos2)
- `src/styles/landing/Navbar.css` — `.landing-nav`, `.nav-*`, `.btn-order-style` rojo ladrillo, `.nav-mobile-sidebar` pizarra
- `src/styles/landing/Hero.css` — `.hero-section`, `.hero-bg` (verde ladrillo), `.hero-main-btn` rojo ladrillo
- `src/styles/landing/FeaturedSection.css` — `.featured-section` (overlay verde oscuro), `.featured-card` (borde verde, shadow negro), `.gallery-grid/.gallery-item`
- `src/styles/landing/Hours.css` — `.hours-card`, `.hours-row.today` (borde verde, tint verde), `.today-dot` rojo ladrillo
- `src/styles/landing/Location.css` — `.location-section` (overlay verde sobre ladrillo), `.map-frame`, `.map-pin-icon` rojo ladrillo
- `src/styles/landing/Contact.css` — `.contact-section`, `.contact-form-card`, `.contact-submit-btn` rojo ladrillo
- `src/styles/landing/Footer.css` — `.landing-footer` pizarra, `.social-btn:hover` rojo ladrillo
- `src/main.jsx` — importa `LandingPage.css` globalmente junto a `index.css`

### [FEATURE] Componentes reescritos con clases CSS (patrón thekebablab_menu)
- `Navbar.jsx` — usa `.landing-nav`, `.nav-link-btn`, `.btn-order-style`, drawer `.nav-mobile-sidebar`; scroll effect con clase `.scrolled`/`.transparent`
- `Layout.jsx` — eliminado `pt-16` de `<main>` (cada página gestiona su propio top spacing)
- `HeroSection.jsx` — usa `.hero-section`, `.hero-bg`, `.hero-main-btn`; si hay foto usa foto como bg con overlay verde oscuro, si no usa ladrillo con gradiente
- `AboutSection.jsx` — usa `.featured-section` + `.section-head` + `.about-text`
- `HoursSection.jsx` — usa `.location-section`, `.hours-card`, `.hours-row.today/.closed`; status calculado inline con colores Amigos2
- `LocationSection.jsx` — usa `.location-section`, `.map-frame`, `.map-overlay`, `.map-pin-icon`, `.map-view-btn`
- `PostsPreviewSection.jsx` — usa `.featured-section`, `.featured-grid`, `.featured-card` (mismo patrón tarjetas rotadas de thekebablab_menu)
- `GalleryPreviewSection.jsx` — usa `.featured-section`, `.gallery-grid`, `.gallery-item` con overlay verde en hover
- `ContactSection.jsx` — usa `.contact-section`, `.section-head`
- `ContactForm.jsx` — usa `.contact-form-card`, `.contact-input`, `.contact-submit-btn`
- `Footer.jsx` — usa `.landing-footer`, `.social-links`, `.social-btn`, `.footer-brand-name`
- `PostCard.jsx` — usa `.featured-card` + `.card-image-container` (mismo diseño tarjeta rotada)
- `ProductCard.jsx` — sidebar pizarra, borde/shadow negro neobrutalismo, precio rojo ladrillo
- `CategoryTabs.jsx` — activo: rojo ladrillo + borde negro + shadow neo; inactivo: transparent
- `MenuPage.jsx` — header con ladrillo oscuro, `paddingTop: 70px` (debajo de nav), sidebar pizarra con neo-shadow
- `PostDetailPage.jsx` — `paddingTop: 70px`, fondo ladrillo oscuro, contenido en `.sidebar` neo-shadow

### [DOCS]
- `docs/WEB_PUBLICA.md` — sección de paleta y sistema CSS actualizada

---

## [0.7.0] - 2026-05-13 — Admin: sección Mensajes + badge de no leídos

### [FEATURE] Admin — Página Mensajes (`/messages`)
- `services/messagesService.js` — `getAll()` (ORDER BY created_at DESC), `getUnreadCount()` (COUNT con `head:true`), `markAsRead(id)`, `markAsUnread(id)`, `delete(id)`
- `hooks/useMessages.js` — hook estándar: `{ messages, loading, error, reload }`
- `hooks/useUnreadCount.jsx` — Context (`UnreadCountCtx`) con `count` y `refresh`; `UnreadCountProvider` hace poll inicial en mount; cualquier componente lee el badge sin prop drilling
- `components/messages/MessageCard.jsx` — card colapsable: preview 2 líneas → expansión completa; auto-marca como leído al expandir si estaba sin leer; borde izquierdo Verde Botella en no leídos, badge "Nuevo" Rojo Ladrillo; botones Marcar leído/no leído y Eliminar en vista expandida
- `pages/MessagesPage.jsx` — lista de `MessageCard`, badge rojo con count en el título, `Modal` de confirmación antes de borrar; llama a `reload()` + `refresh()` tras cada acción

### [FEATURE] Admin — Badge global de mensajes no leídos
- `App.jsx` — `UnreadCountProvider` envuelve `AppRoutes` para que el count sea accesible en toda la SPA
- `components/layout/AdminLayout.jsx` — ítem "Mensajes" con `Mail` icon en la sidebar; si `unreadCount > 0` muestra pill rojo Ladrillo con el número; header móvil también muestra el count
- `pages/DashboardPage.jsx` — card de alerta destacada (borde y fondo rojo ladrillo) cuando hay mensajes sin leer, con link directo a `/messages`; card "Mensajes" siempre visible en el grid con count o texto "Formulario de contacto"
- `lib/constants.js` — añadido `ROUTES.MESSAGES = '/messages'` y `TABLES.CONTACT_MESSAGES = 'contact_messages'`

### [FIX] Admin — Build de producción con JSX en archivos `.js`
- `hooks/useUnreadCount.js` → renombrado a `hooks/useUnreadCount.jsx` (contenía JSX; Rollup fallaba en build de producción)
- `hooks/useAuth.js` → renombrado a `hooks/useAuth.jsx` (mismo problema preexistente con `<AuthContext.Provider>`)

### [DOCS]
- `docs/ADMIN_PANEL.md` — sección "Mensajes" añadida; dashboard actualizado
- `docs/SCHEMA.md` — tabla `contact_messages` documentada con SQL y políticas RLS

---

## [0.6.0] - 2026-05-13 — Rediseño visual identidad Amigos2

### [CONFIG] Paleta de colores completa (sustitución del neobrutalismo naranja)
- `tailwind.config.js` — nueva paleta: `primary` (#2A5A43 Verde Botella), `accent` (#C84B31 Rojo Ladrillo), `cream` (#F9F8F6), `dark` (#1c1c1c), `textMain` (#2D2926); shadows `shadow-neo*` adaptados al nuevo `textMain`
- `src/styles/index.css` — nuevas variables CSS: `--color-primary`, `--color-accent`, `--color-bg`, `--color-text`, `--color-text-light`; body con pizarra CSS pura (radial-gradient noise); utilitarios `.bg-pizarra`, `.bg-ladrillo`, `.card-cream`, `.btn-accent`, `.btn-primary`
- `public/textures/ladrillo.webp` — textura de ladrillo movida a subcarpeta `/textures/`; sin cambios en el archivo

### [FEATURE] Web — Identidad visual de cada sección
- **Navbar** — fondo Verde Botella `#2A5A43` siempre sólido; links blanco con hover Rojo Ladrillo; CTA "Ver Carta" Rojo Ladrillo con shadow neo; menú móvil `#1e4231`
- **Footer** — fondo `#1e3d2e` (verde oscuro); iconos redes en círculos Rojo Ladrillo
- **HeroSection** — foto con overlay oscuro verde `rgba(10,20,15,0.68)`, o pizarra CSS si no hay foto; CTA Rojo Ladrillo `btn-accent`; title con text-shadow sutil
- **AboutSection** — `.bg-ladrillo` (textura con overlay oscuro), texto blanco
- **HoursSection** — fondo crema `#F9F8F6`; título Verde Botella; día actual resaltado con borde Rojo Ladrillo y badge rojo; días cerrados en gris
- **PostsPreviewSection** — `.bg-pizarra`; cards con `background: #F9F8F6, border: 2px solid #2A5A43, shadow neo`; título en Verde Botella; fecha en gris
- **GalleryPreviewSection** — fondo crema; imágenes con overlay Verde Botella semitransparente en hover
- **LocationSection** — fondo Verde Botella `#2A5A43`; iconos Rojo Ladrillo; iframe mapa con borde crema
- **ContactSection** — `.bg-pizarra`
- **ContactForm** — inputs `#2a2a2a` borde sutil, focus → borde Rojo Ladrillo; botón submit `btn-accent`
- **GalleryModal** — botones navegación Verde Botella con borde crema

### [FEATURE] Menu y Posts — Identidad visual
- **ProductCard** — fondo crema, borde y shadow `#2D2926`; nombre en Verde Botella; precio en Rojo Ladrillo
- **CategoryTabs / Sidebar** — sidebar Verde Botella; activo Rojo Ladrillo; inactivo fondo semi-transparente blanco
- **MenuPage** — header `.bg-pizarra` con borde Verde Botella; sidebar `#2A5A43`; área de productos sobre `#1c1c1c`; buscador con focus Verde Botella
- **PostCard** — fondo crema; borde Verde Botella; shadow neo; título Verde Botella, hover Rojo Ladrillo
- **PostDetailPage** — `.bg-pizarra`; botón volver Verde Botella; imagen con borde crema; contenido en `#242424`

### [FEATURE] TV (`/tv`) — Paleta actualizada
- `tv.css` — `--tv-accent: #C84B31` (Rojo Ladrillo) en ambos temas; `--tv-header-bg: #2A5A43` (Verde Botella); separadores Rojo Ladrillo; modo oscuro usa textura pizarra CSS
- `tv-product-name` — color fijo `#2A5A43` (Verde Botella)
- `tv-price` — color fijo `#C84B31` (Rojo Ladrillo)
- `tv-hero-radial` — gradiente Verde Botella cuando no hay imagen de categoría; overlay con tono verde oscuro

### [DOCS]
- `docs/ARQUITECTURA.md` — sección "Paleta de colores" con tabla de tokens y utilitarios CSS
- `docs/WEB_PUBLICA.md` — tabla de secciones y sus fondos; nueva paleta documentada

---

## [0.5.0] - 2026-05-13 — Web pública: Supabase conectado + diseño Neobrutalismo

### [FEATURE] Web — Conexión completa a Supabase
- `services/menuService.js` — `getCategories()` con filtrado de productos disponibles en cliente, `getCategoryById()`, `getProductsByCategory()`; caché en `localStorage` para fallback offline
- `services/postsService.js` — `getRecent(n)`, `getAll()`, `getBySlug(slug)` conectados a tabla `posts`
- `services/galleryService.js` — `getAll()` y `getPreview(n)` conectados a tabla `gallery`
- `services/siteInfoService.js` — `get()` conectado a tabla `site_info`
- `services/contactService.js` — `send()` hace INSERT en tabla `contact_messages` (sin Resend aún)
- `lib/constants.js` — añadida constante `TABLES.CONTACT_MESSAGES`, `STORAGE_BUCKET = 'images'`

### [FEATURE] Web — Diseño Neobrutalismo (basado en `thekebablab_menu`)
- `tailwind.config.js` — colores: `primary` (#F26122), `sidebar` (#111111), `surface`, `neoborder`, `neoshadow`; fuentes: `font-heading` (Black Ops One), `font-sans` (Montserrat); shadows: `shadow-neo`, `shadow-neo-lg`, `shadow-neo-sm`
- `src/styles/index.css` — variables CSS completas, body con textura de ladrillo (`/ladrillo.webp`), utilitarios `.neo-card`, `.neo-card-dark`, `.neo-btn`, `.section-dark`, `.section-brick`, `.text-shadow-neo`
- `public/ladrillo.webp` — textura de ladrillo copiada del proyecto de referencia

### [FEATURE] Web — Componentes rediseñados
- `Navbar.jsx` — fondo `sidebar` siempre oscuro, brand en `font-heading`, CTA con `neo-btn`
- `Footer.jsx` — fondo `sidebar`, botones sociales con hover orange, grid de 3 columnas
- `HeroSection.jsx` — fondo ladrillo con overlay + `-mt-16` para extenderse bajo el navbar, título `font-heading` con text-shadow, CTA `neo-btn`
- `AboutSection.jsx` — `section-brick` + `neo-card-dark` para la descripción
- `HoursSection.jsx` — `section-dark` + `neo-card-dark`, fila de hoy destacada con borde naranja
- `PostsPreviewSection.jsx` — `section-brick`, skeletons oscuros
- `GalleryPreviewSection.jsx` — `section-dark`, imágenes con `neo` border/shadow + hover lift
- `LocationSection.jsx` — `section-brick`, tarjeta de contacto `neo-card-dark`, iconos en fondo naranja
- `ContactSection.jsx` — `section-dark`
- `ContactForm.jsx` — inputs oscuros con borde negro, botón `neo-btn` naranja
- `PostCard.jsx` — `neo-card-dark` con hover lift, fecha en naranja
- `ProductCard.jsx` — `neo-card` blanco con borde/shadow negro, precio en naranja
- `CategoryTabs.jsx` — botones con borde negro y shadow, activo en naranja
- `GalleryModal.jsx` — botones nav con estilo neo, borde negro en imagen

### [FEATURE] Web — MenuPage rediseñado
- Layout dos paneles: sidebar sticky de categorías + main con buscador
- Barra de búsqueda por nombre de producto
- Header con fondo ladrillo, cuerpo en `section-dark`
- Skeletons mientras cargan los datos

### [FEATURE] Web — PostDetailPage rediseñado
- Botón "Volver" estilo neo-pill
- Imagen con borde y shadow neobrutalismo
- Contenido en `neo-card-dark`

### [CONFIG] Web — Google Fonts (index.html)
- Añadidos `Black Ops One` y `Montserrat` (400/600/700)

### [DOCS]
- `docs/WEB_PUBLICA.md` — actualizado con nueva paleta neobrutalismo, descripción de MenuPage con sidebar y buscador

---

## [0.4.0] - 2026-05-13 — CRUD completo del panel de administración

### [FEATURE] Admin — Página Info del Restaurante (`/info`)
- `components/siteinfo/HoursEditor.jsx` — editor visual de 7 días con toggle ON/OFF y campos `<time>` de apertura/cierre
- `components/siteinfo/SiteInfoForm.jsx` — formulario completo dividido en secciones (básica, contacto, redes, imágenes, horario)
- `pages/SiteInfoPage.jsx` — carga la fila de `site_info`, guarda con Toast de éxito/error

### [FEATURE] Admin — Carta Digital (`/menu`)
- `components/menu/CategoryList.jsx` — panel izquierdo con lista de categorías, reordenación ↑↓, edición y eliminación
- `components/menu/ProductList.jsx` — panel derecho con tabla de productos, toggle de disponibilidad rápido y reordenación ↑↓
- `components/menu/CategoryModal.jsx` — modal crear/editar categoría con ImagePicker y toggle activa/inactiva
- `components/menu/ProductModal.jsx` — modal crear/editar producto con precio, imagen, toggle disponible y alérgenos (chips predefinidos + entrada libre)
- `pages/MenuPage.jsx` — layout de dos paneles, gestión de estado de selección, operaciones CRUD con Toast

### [FEATURE] Admin — Posts y Noticias (`/posts`)
- `components/posts/PostList.jsx` — lista de posts con badge Publicado/Borrador, acciones rápidas de publicar/despublicar
- `components/posts/PostEditor.jsx` — editor inline con auto-slug desde título (kebab-case, sin acentos), ImagePicker para portada, toggle publicado
- `pages/PostsPage.jsx` — layout lista + editor inline, sin modales

### [FEATURE] Admin — Galería (`/gallery`)
- `components/gallery/ImageUploader.jsx` — zona drag & drop multi-archivo con barra de progreso individual por imagen
- `components/gallery/GalleryManager.jsx` — grid de imágenes con hover overlay (↑ / eliminar / ↓)
- `pages/GalleryPage.jsx` — orquesta subida y gestión, reordenación optimista con rollback si falla

### [FEATURE] Admin — Componente ImagePicker compartido
- `components/ui/ImagePicker.jsx` — selector reutilizable con preview, botón de borrado y estado "Subiendo…"

### [FIX] Admin — Servicios de imágenes
- `services/menuService.js` — añadido `uploadImage(file, folder)` para subir imágenes de categorías y productos
- `services/postsService.js` — añadido `uploadCoverImage(file)` para subir portadas de posts
- `services/galleryService.js` — añadido `update(id, payload)` para reordenación; nombres de path únicos con timestamp + random

### [DOCS]
- `docs/ADMIN_PANEL.md` — actualizado con descripción completa de todas las secciones implementadas
- `docs/CHANGELOG.md` — entrada [0.4.0]

---

## [0.3.1] - 2026-05-13 — Página de Digital Signage /tv

### [FEATURE] Web — Página TV (`/tv`, `/tv/1`, `/tv/2`)
- `web/src/pages/TvPage.jsx` — Digital Signage sin Navbar/Footer, con máquina de estados `PRODUCT_LIST → HERO_SCREEN` en bucle continuo
  - Ciclo automático: 7 s por página de productos, 8 s en hero, 800 ms de transición
  - Prop `forceTheme` ("light" | "dark" | undefined); sin prop → auto-tema por hora (claro 8-20h, oscuro el resto)
  - Refresca datos de Supabase cada 5 minutos en background

### [FEATURE] Web — Componentes TV (`web/src/components/tv/`)
- `TvProductCard.jsx` — tarjeta TV con imagen 16:9, nombre (Bebas Neue), precio en amber con glow
- `TvProductGrid.jsx` — grid 3×2 con cabecera de categoría animada y dots de navegación
- `TvHeroScreen.jsx` — hero fullscreen con imagen de categoría (zoom), overlay degradado, 6 partículas flotantes y nombre enorme

### [FEATURE] Web — Estilos TV (`web/src/styles/tv.css`)
- Variables de tema `--tv-*` para claro y oscuro en el mismo archivo
- Animaciones: `tvReveal`/`tvHide` (transición de fase), `tvCardIn` (entrada de tarjetas), `tvHeroBgZoom` + `tvHeroContentIn` + `tvParticle` (hero)
- Tipografía Bebas Neue importada desde Google Fonts para títulos de TV

### [FEATURE] Web — menuService con caché offline
- `web/src/services/menuService.js` modificado: escribe en `localStorage[amigos2_menu_cache]` tras cada fetch
- Fallback: si Supabase no responde, devuelve datos cacheados → la TV sigue funcionando sin conexión

### [CONFIG] Web — Constantes TV
- `web/src/lib/constants.js` — añadido `ROUTES.TV`, `ROUTES.TV_LIGHT`, `ROUTES.TV_DARK` y objeto `TV_CONFIG` con todas las duraciones y `MENU_CACHE_KEY`
- `web/src/App.jsx` — añadidas rutas `/tv`, `/tv/1`, `/tv/2`

### [DOCS]
- `docs/WEB_PUBLICA.md` — tabla de rutas actualizada, sección completa de la página TV
- `docs/CHANGELOG.md` — entrada [0.3.1]

---

## [0.2.0] - 2026-05-13 — Scaffolding completo de web pública y panel admin

### [CONFIG] Web pública (`web/`)
- `package.json` con React 19, Vite 6, Tailwind 3, React Router 6, Supabase JS, Lucide
- `vite.config.js`, `tailwind.config.js`, `postcss.config.js`
- `index.html`, `src/main.jsx`, `src/styles/index.css`
- `public/_redirects` para Cloudflare Pages
- `.env.example` y `.gitignore`

### [FEATURE] Web — Servicios y hooks
- `services/supabase.js` — cliente singleton
- `services/menuService.js` — categorías con productos
- `services/postsService.js` — posts publicados (todos y recientes)
- `services/galleryService.js` — fotos (todas y preview)
- `services/siteInfoService.js` — info del restaurante
- `services/contactService.js` — envío via Supabase Edge Function
- `hooks/useMenu.js`, `hooks/usePosts.js`, `hooks/useGallery.js`, `hooks/useSiteInfo.js`
- `lib/constants.js` — rutas, nombres de tablas, límites

### [FEATURE] Web — Layout
- `components/layout/Navbar.jsx` — navbar fija con hamburger móvil y botón "Ver Carta"
- `components/layout/Footer.jsx` — footer con info del restaurante y redes
- `components/layout/Layout.jsx` — wrapper Navbar + children + Footer

### [FEATURE] Web — Secciones de la home
- `components/home/HeroSection.jsx` — hero con imagen de fondo y CTA
- `components/home/AboutSection.jsx` — descripción del restaurante
- `components/home/HoursSection.jsx` — horario semanal legible
- `components/home/LocationSection.jsx` — dirección y mapa Google Maps embebido
- `components/home/PostsPreviewSection.jsx` — 3 posts recientes
- `components/home/GalleryPreviewSection.jsx` — 6 fotos en grid
- `components/home/ContactSection.jsx` — wrapper del formulario de contacto
- `components/contact/ContactForm.jsx` — formulario nombre/email/mensaje

### [FEATURE] Web — Menú, posts y galería
- `components/menu/CategoryTabs.jsx` — tabs con scroll horizontal móvil
- `components/menu/ProductCard.jsx` — tarjeta con imagen, precio, alérgenos
- `components/posts/PostCard.jsx` — tarjeta con imagen y fecha
- `components/gallery/GalleryGrid.jsx` — grid clicable
- `components/gallery/GalleryModal.jsx` — lightbox con cierre por Escape

### [FEATURE] Web — Páginas
- `pages/HomePage.jsx` — ensambla todas las secciones
- `pages/MenuPage.jsx` — carta con tabs de categorías
- `pages/PostDetailPage.jsx` — detalle de post por slug
- `App.jsx` — React Router con rutas `/`, `/carta`, `/posts/:slug`

### [CONFIG] Panel admin (`admin/`)
- `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`
- `index.html`, `src/main.jsx`, `src/styles/index.css`
- `public/_redirects`, `.env.example`, `.gitignore`

### [FEATURE] Admin — Servicios y hooks
- `services/supabase.js` — cliente singleton
- `services/authService.js` — login, logout, getSession, onAuthStateChange
- `services/menuService.js` — CRUD categorías y productos
- `services/postsService.js` — CRUD posts + publish/unpublish
- `services/galleryService.js` — subida a Storage + CRUD
- `services/siteInfoService.js` — get y update
- `hooks/useAuth.js` — AuthContext + provider + hook
- `hooks/useMenu.js`, `hooks/usePosts.js` con función `reload`
- `lib/constants.js` — rutas admin, tablas, buckets

### [FEATURE] Admin — Componentes UI base
- `components/ui/Button.jsx` — variantes primary/secondary/danger/ghost
- `components/ui/Input.jsx` + `Textarea` — con label y error
- `components/ui/Modal.jsx` — modal con overlay y cierre por Escape
- `components/ui/Toast.jsx` — ToastProvider + useToast hook
- `components/ui/LoadingSpinner.jsx` — fullscreen o inline

### [FEATURE] Admin — Layout y páginas
- `components/layout/AdminLayout.jsx` — sidebar con nav, responsive, hamburger móvil
- `pages/LoginPage.jsx` — formulario email+contraseña limpio
- `pages/DashboardPage.jsx` — grid de acceso rápido a las 4 secciones
- `pages/MenuPage.jsx` — stub "En construcción"
- `pages/PostsPage.jsx` — stub "En construcción"
- `pages/GalleryPage.jsx` — stub "En construcción"
- `pages/SiteInfoPage.jsx` — stub "En construcción"
- `App.jsx` — BrowserRouter + AuthProvider + ToastProvider + ProtectedRoute

### [DOCS]
- `docs/ARQUITECTURA.md` — estructura, stack, decisiones técnicas
- `docs/SCHEMA.md` — SQL completo para crear tablas + RLS + Storage buckets
- `docs/ADMIN_PANEL.md` — descripción de cada sección del panel
- `docs/WEB_PUBLICA.md` — páginas, rutas, componentes, paleta de estilos
- `docs/DESPLIEGUE.md` — pasos Cloudflare Pages, variables de entorno, Edge Functions

---

## [0.1.0] - 2026-05-13 — Scaffolding inicial del proyecto

### [CONFIG]
- Estructura de repositorio creada: `web/`, `admin/`, `docs/`
- `CLAUDE.md` con reglas, arquitectura y patrones de código para Claude Code
- `README.md` con instrucciones de puesta en marcha y despliegue
- `docs/CHANGELOG.md` inicializado
- Stack definido: React 19 + Vite + Tailwind + Supabase + Cloudflare Pages
- Schema de base de datos definido en `docs/SCHEMA.md`
