// Rutas de la aplicación
export const ROUTES = {
  HOME:      '/',
  MENU:      '/carta',
  TV:        '/tv',
  TV_LIGHT:  '/tv/1',
  TV_DARK:   '/tv/2',
}

// Configuración de la pantalla TV (Digital Signage)
export const TV_CONFIG = {
  PRODUCT_PAGE_DURATION:  7000,           // 7s por página de productos
  HERO_DISPLAY_DURATION:  8000,           // 8s en pantalla hero
  TRANSITION_DURATION:    800,            // 800ms de animación de transición
  PRODUCTS_PER_PAGE:      6,              // productos por bloque en TV
  MENU_REFRESH_INTERVAL:  5 * 60 * 1000, // refresca menú cada 5 min
  MENU_CACHE_KEY:         'amigos2_menu_cache', // clave localStorage para fallback offline
}

// Nombres de tablas Supabase
export const TABLES = {
  SITE_INFO: 'site_info',
  CATEGORIES: 'categories',
  PRODUCTS: 'products',
  POSTS: 'posts',
  GALLERY: 'gallery',
  CONTACT_MESSAGES: 'contact_messages',
  DELIVERY_LINKS: 'delivery_links',
  HERO_MEDIA: 'hero_media',
}

// Nombre del bucket de Storage para imágenes públicas
export const STORAGE_BUCKET = 'images'

// Número de posts recientes en la home
export const HOME_POSTS_LIMIT = 3

// Número de fotos de galería en la home
export const HOME_GALLERY_LIMIT = 6
