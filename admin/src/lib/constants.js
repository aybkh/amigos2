// Rutas del panel de administración
export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/',
  MENU: '/menu',
  POSTS: '/posts',
  GALLERY: '/gallery',
  SITE_INFO: '/info',
  MESSAGES: '/messages',
  DELIVERY: '/delivery',
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
}

// Bucket de Supabase Storage (único bucket público)
export const STORAGE = {
  PUBLIC: 'images',
}
