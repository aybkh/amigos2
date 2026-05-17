# Despliegue — Cloudflare Pages

Dos proyectos separados en Cloudflare Pages. Cada uno apunta a la misma rama del repositorio pero con raíz de build diferente.

## Pre-requisitos

1. Repositorio en GitHub con la estructura `web/` y `admin/` en la raíz.
2. Proyecto creado en Supabase con las tablas del Schema (ver `SCHEMA.md`).
3. Cuenta en Cloudflare Pages.

---

## Proyecto `amigos2-web` (web pública)

### Configuración en Cloudflare Pages

| Campo | Valor |
|-------|-------|
| Framework preset | None |
| Build command | `npm install && npm run build` |
| Build output directory | `dist` |
| Root directory | `web` |
| Branch | `main` |

### Variables de entorno (Cloudflare Dashboard → Settings → Environment variables)

```
VITE_SUPABASE_URL     = https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY = eyJ...
```

---

## Proyecto `amigos2-admin` (panel admin)

### Configuración en Cloudflare Pages

| Campo | Valor |
|-------|-------|
| Framework preset | None |
| Build command | `npm install && npm run build` |
| Build output directory | `dist` |
| Root directory | `admin` |
| Branch | `main` |

### Variables de entorno

```
VITE_SUPABASE_URL     = https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY = eyJ...
```

---

## Archivo `_redirects` (CRÍTICO)

Cada app tiene `public/_redirects` con:
```
/* /index.html 200
```

Sin este archivo, la navegación directa a rutas como `/carta` o `/menu` devuelve 404 en Cloudflare.

---

## Dominio personalizado

En Cloudflare Pages → Custom domains:
- `amigos2-web` → `amigos2.com` y `www.amigos2.com`
- `amigos2-admin` → `admin.amigos2.com`

Si el dominio está en Cloudflare DNS, la configuración es automática.

---

## Supabase Edge Function (formulario de contacto)

La función `send-contact-email` se despliega con Supabase CLI:

```bash
# Instalar Supabase CLI
npm install -g supabase

# Login
supabase login

# Vincular proyecto
supabase link --project-ref xxxxxxxxxxxx

# Crear función
supabase functions new send-contact-email

# Desplegar
supabase functions deploy send-contact-email --no-verify-jwt

# Configurar secret de Resend
supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxx
```

La función recibe `{ name, email, message }` y llama a Resend API.

---

## Flujo de despliegue continuo

1. Push a `main` → Cloudflare Pages detecta el cambio
2. Ejecuta el build de `web/` y `admin/` en paralelo
3. Despliega automáticamente en ~2 minutos
4. URL de preview disponible para cada commit en ramas distintas a `main`

---

## Desarrollo local

```bash
# Clonar y preparar
git clone <repo>

# Web pública
cd web && npm install && npm run dev
# → http://localhost:5173

# Admin (nueva terminal)
cd admin && npm install && npm run dev
# → http://localhost:5174
```

Crear `web/.env` y `admin/.env` a partir de sus respectivos `.env.example`.
