// Service Worker básico — habilita la instalación como PWA y cachea el app shell.
// Estrategia: network-first para navegación (siempre intenta servir HTML fresco),
// cache-first para assets estáticos versionados de Vite (/assets/*).

const CACHE_VERSION = 'amigos2-admin-v1'
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/amigos2-logo-1-1.png',
  '/favicon.ico',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return

  const url = new URL(req.url)

  // Nunca cachear llamadas a Supabase u otras APIs externas
  if (url.origin !== self.location.origin) return

  // Navegación SPA: network-first con fallback al index.html cacheado
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone()
          caches.open(CACHE_VERSION).then((c) => c.put('/index.html', copy))
          return res
        })
        .catch(() => caches.match('/index.html'))
    )
    return
  }

  // Assets de Vite (hash en el nombre) → cache-first
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(req).then(
        (cached) =>
          cached ||
          fetch(req).then((res) => {
            const copy = res.clone()
            caches.open(CACHE_VERSION).then((c) => c.put(req, copy))
            return res
          })
      )
    )
    return
  }

  // Resto: stale-while-revalidate
  event.respondWith(
    caches.match(req).then((cached) => {
      const fetchPromise = fetch(req)
        .then((res) => {
          const copy = res.clone()
          caches.open(CACHE_VERSION).then((c) => c.put(req, copy))
          return res
        })
        .catch(() => cached)
      return cached || fetchPromise
    })
  )
})
