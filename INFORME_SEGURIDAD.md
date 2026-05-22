# 🔒 Informe de Auditoría de Seguridad

**Fecha:** 2026-05-21
**Proyecto:** Amigos2 (Web pública + Panel Admin)
**Alcance:** código del repo + pruebas en vivo contra Supabase con la `anon key` pública
**Metodología:** revisión estática de `web/` y `admin/` + tests RLS/Storage reales (no destructivos)

---

## ✅ ASPECTOS SEGUROS

Verificado **en vivo** contra el proyecto Supabase (`xkbhijdtqpblryybwnho`):

- **RLS de escritura activo y correcto.** Con la `anon key` (la que va en el bundle público):
  - `categories` → INSERT bloqueado (`42501`), UPDATE bloqueado (`[]`)
  - `products` → UPDATE bloqueado (`[]`)
  - `posts` → INSERT bloqueado (`42501`)
  - Nadie puede modificar la carta, categorías ni posts sin autenticarse.
- **`contact_messages` protegido.** SELECT con `anon key` devuelve `[]` → los mensajes de clientes (nombre, email, texto) **no son legibles** públicamente. DELETE también bloqueado.
- **Storage `images` protegido.** Subida de archivos con `anon key` → `403 / new row violates RLS`. Nadie puede subir ficheros sin autenticarse.
- **Autenticación del admin correcta.** Todas las rutas del panel pasan por `<ProtectedRoute>` (`admin/src/App.jsx:17-22`); sin sesión Supabase → redirige a login. Login vía `supabase.auth.signInWithPassword` (Supabase Auth gestiona hashing y rate-limiting).
- **Sin XSS por inyección de HTML.** No se usa `dangerouslySetInnerHTML`, `innerHTML` ni `eval` en ningún archivo. El contenido de posts se renderiza como texto, no como HTML.
- **Credenciales no expuestas en git.** Los `.env` (`web/.env`, `admin/.env`) no están trackeados. La `VITE_SUPABASE_ANON_KEY` es pública por diseño (se envía al navegador con el bundle de Vite) — no es un secreto.
- **API key de Resend no está en el frontend.** El envío de email usa una Edge Function como proxy (según `web/.env` y `CLAUDE.md`).
- **Mensaje de error de login genérico** ("Email o contraseña incorrectos") → no revela si el email existe.

---

## ⚠️ VULNERABILIDADES ENCONTRADAS

### 🚨 CRÍTICAS (arreglar inmediatamente)

_Ninguna._ No se encontró ninguna vulnerabilidad crítica. La capa de datos (RLS + Storage) está correctamente protegida.

### ⚠️ MEDIAS (arreglar pronto)

- [x] **M1 — `.gitignore` no incluye `.env`.** ✅ RESUELTO 2026-05-21. Añadidos `.env`, `.env.*` (`!.env.example`), `node_modules/`, `dist/` al `.gitignore`.
- [~] **M2 — Formulario de contacto sin protección anti-spam.** ⚠️ MITIGADO PARCIALMENTE 2026-05-21. Añadido rate-limiting client-side (1 envío / 60s). **Nota:** es client-side — un atacante puede seguir golpeando la API REST directamente. Para protección real falta captcha + mover el INSERT a una Edge Function (pendiente).
- [x] **M3 — Sin validación de entrada en el formulario de contacto.** ✅ RESUELTO 2026-05-21. Validación de doble capa: cliente (`ContactForm.jsx` — nombre 2-100 solo letras, email formato + máx 255, mensaje 10-1000) **y servidor** (constraints `CHECK` en `contact_messages`: `name_len`, `message_len`, `email_len`, `email_fmt`). La BD rechaza datos basura aunque se ataque la API REST directamente.

### 💡 MEJORAS RECOMENDADAS

- [ ] **B1 — Sin cabeceras de seguridad HTTP.** No existe `web/public/_headers` para Cloudflare Pages. Faltan: `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`.
- [ ] **B2 — `docs/DESPLIEGUE.md` no documenta URLs de producción ni CORS.** No indica qué URLs hay que registrar en Supabase (Auth → URL Configuration: *Site URL* y *Redirect URLs*) ni la configuración CORS de Storage. Ver sección "Configuración Supabase pendiente".
- [ ] **B3 — Falta `docs/supabase_schema_real.sql`.** `CLAUDE.md` afirma que el SQL definitivo del schema está ahí, pero el archivo no existe en el repo. Sin él, las políticas RLS no están versionadas y no se pueden auditar/restaurar.
- [ ] **B4 — `.gitignore` tampoco incluye `node_modules/` ni `dist/`.** No están trackeados ahora, pero conviene listarlos explícitamente.
- [ ] **B5 — Si en el futuro los posts renderizan Markdown como HTML**, sanitizar la salida (p. ej. `DOMPurify`). Hoy se renderizan como texto plano y son seguros.

---

## 📋 ACCIONES REQUERIDAS

### 1. (M1) Completar `.gitignore`

**Archivo:** `.gitignore` (raíz)
**Cambio:** añadir al final:

```gitignore
# Dependencias y builds
node_modules/
dist/

# Variables de entorno — NUNCA subir
.env
.env.*
!.env.example
```

Después verificar que ningún `.env` esté ya en el historial:
`git ls-files | grep .env` → debe devolver vacío (verificado hoy: OK).

### 2. (M2) Anti-spam en el formulario de contacto

Opciones, de menos a más esfuerzo:

- **Honeypot** (rápido): añadir un campo oculto al formulario; si llega relleno, descartar. No frena ataques directos a la API REST.
- **Captcha** (recomendado): Cloudflare Turnstile, validado en una Edge Function que sea la única autorizada a insertar en `contact_messages`.
- **Rate-limiting real:** mover el INSERT a una Edge Function (quitar el INSERT anónimo directo a la tabla) y limitar por IP.

**Archivo afectado:** `web/src/components/contact/ContactForm.jsx` + `web/src/services/contactService.js`

### 3. (M3) Validar la entrada de contacto

**Archivo:** `web/src/components/contact/ContactForm.jsx`
**Cambio (ejemplo):**

```javascript
// Antes — solo validación del navegador
const handleSubmit = async (e) => {
  e.preventDefault()
  setStatus('sending')
  await contactService.send(form)
  ...
}

// Después — validar longitudes y formato antes de enviar
const handleSubmit = async (e) => {
  e.preventDefault()
  const name = form.name.trim()
  const message = form.message.trim()
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
  if (name.length < 2 || name.length > 80) return setStatus('error')
  if (!emailOk)                            return setStatus('error')
  if (message.length < 5 || message.length > 1000) return setStatus('error')
  setStatus('sending')
  await contactService.send({ name, email: form.email.trim(), message })
  ...
}
```

Además, añadir constraints en la columna en Supabase:

```sql
ALTER TABLE contact_messages
  ADD CONSTRAINT name_len    CHECK (char_length(name) BETWEEN 2 AND 80),
  ADD CONSTRAINT message_len CHECK (char_length(message) BETWEEN 5 AND 1000);
```

### 4. (B1) Cabeceras de seguridad en Cloudflare Pages

**Archivo nuevo:** `web/public/_headers`

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
```

(Una CSP estricta requiere ajustar `connect-src` para el dominio de Supabase; hacerla con cuidado para no romper la app.)

### 5. (B3) Versionar el schema y las políticas RLS

Exportar desde Supabase el SQL del schema **incluyendo las políticas RLS** y guardarlo en `docs/supabase_schema_real.sql`, tal como `CLAUDE.md` ya da por hecho.

---

## 🔧 Configuración Supabase pendiente (documentar en `docs/DESPLIEGUE.md`)

Tras desplegar en Cloudflare Pages, registrar en el dashboard de Supabase:

**Auth → URL Configuration**
- *Site URL:* la URL de producción del **admin** (es la app con login), p. ej. `https://admin.amigos2.com`
- *Redirect URLs:* añadir esa URL de producción y, si se usan, las de preview de Cloudflare Pages (`https://*.amigos2-admin.pages.dev`)

**Storage / CORS**
- El bucket `images` es público para lectura — sirve imágenes vía URL pública, sin problema de CORS para `<img>`.
- Si en el futuro se descargan ficheros vía `fetch`/JS desde otro dominio, configurar *Allowed origins* en Supabase con los dominios de producción de `web/` y `admin/`.

**Recomendado:** restringir el uso de la `anon key` por dominio si Supabase lo permite en el plan, o al menos vigilar el uso de la API.

---

## ✅ CHECKLIST POST-CORRECCIÓN

- [x] RLS activado y verificado en `categories`, `products`, `posts`, `contact_messages`
- [x] Storage `images` protegido contra subida anónima
- [x] Auth implementada en admin (`ProtectedRoute` en todas las rutas)
- [x] `.env` fuera del control de versiones (de facto)
- [x] Sin XSS por `dangerouslySetInnerHTML`
- [ ] `.gitignore` incluye `.env`, `.env.*`, `node_modules/`, `dist/` (M1)
- [ ] Anti-spam en formulario de contacto (M2)
- [ ] Validación de inputs cliente + constraints en BD (M3)
- [ ] Cabeceras de seguridad `_headers` (B1)
- [ ] URLs de producción + CORS documentados en `DESPLIEGUE.md` (B2)
- [ ] `docs/supabase_schema_real.sql` versionado con políticas RLS (B3)

---

## 📝 Notas de la auditoría

- Las pruebas de escritura/lectura se hicieron con la `anon key` real. Los tests fueron **no destructivos** (UPDATE no-op `is_available=true`/`is_active=true`, IDs reales sin alterar valores).
- ⚠️ **Quedó una fila de prueba en `contact_messages`** con `name = "__audit_test__"` (el INSERT anónimo está permitido por diseño y el DELETE anónimo está —correctamente— bloqueado por RLS). **Bórrala desde el panel admin → Mensajes.**
- No se pudo auditar el SQL de las políticas RLS porque `docs/supabase_schema_real.sql` no existe (ver B3). La verificación de RLS se hizo por comportamiento observado, no por revisión del código de las políticas.
