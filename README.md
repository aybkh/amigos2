# amigos2.com

Web pública + panel de administración para el restaurante **Amigos2**.

## ¿Qué es esto?

Dos aplicaciones React independientes desplegadas en Cloudflare Pages:

| App | URL | Descripción |
|-----|-----|-------------|
| `web/` | `amigos2.com` | Web pública del restaurante |
| `admin/` | `admin.amigos2.com` | Panel de gestión (privado) |

Ambas usan **Supabase** como backend (base de datos, autenticación y almacenamiento de imágenes).

---

## Web pública

- Página principal con info del restaurante, horario y ubicación
- Carta digital completa (categorías + productos + precios)
- Galería de fotos
- Posts y promociones
- Formulario de contacto
- Diseño mobile-first, SEO optimizado

## Panel de administración

Acceso con email + contraseña. Permite al propietario gestionar:

- ✅ Carta: categorías, productos, precios, disponibilidad, imágenes
- ✅ Info del restaurante: nombre, horario, dirección, teléfono, redes sociales
- ✅ Posts y promociones: crear, editar, publicar, despublicar
- ✅ Galería: subir y organizar fotos
- ✅ Sin conocimientos técnicos necesarios

---

## Puesta en marcha (desarrollo)

### Requisitos

- Node.js 20+
- Cuenta en [Supabase](https://supabase.com) (gratuita)
- Cuenta en [Cloudflare](https://cloudflare.com) (gratuita)

### 1. Clonar y configurar

```bash
git clone https://github.com/tu-usuario/amigos2.com
```

### 2. Configurar Supabase

1. Crear proyecto en [supabase.com](https://supabase.com)
2. Ejecutar el SQL de `docs/SCHEMA.md` en el editor SQL de Supabase
3. Crear bucket de Storage llamado `images` (público)
4. Copiar URL y anon key del proyecto

### 3. Variables de entorno

```bash
# web/
cp web/.env.example web/.env
# Rellenar VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY

# admin/
cp admin/.env.example admin/.env
# Rellenar VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY
```

### 4. Instalar y ejecutar

```bash
# Web pública (http://localhost:5173)
cd web && npm install && npm run dev

# Panel admin (http://localhost:5174)
cd admin && npm install && npm run dev
```

---

## Despliegue

Ambas apps se despliegan automáticamente en **Cloudflare Pages** en cada push a `main`.

Ver instrucciones detalladas en [`docs/DESPLIEGUE.md`](docs/DESPLIEGUE.md).

---

## Stack

- **React 19** + **Vite** — frontend
- **Tailwind CSS v3** — estilos
- **Supabase** — base de datos (PostgreSQL), autenticación, storage de imágenes
- **React Router v6** — navegación
- **Cloudflare Pages** — hosting y CD
- **Resend** — envío de emails del formulario de contacto

---

## Estructura del proyecto

```
amigos2.com/
├── web/          # Web pública
├── admin/        # Panel de administración
├── docs/         # Documentación técnica
└── CLAUDE.md     # Guía para Claude Code
```

Ver estructura detallada en [`docs/ARQUITECTURA.md`](docs/ARQUITECTURA.md).

---

## Documentación

| Documento | Contenido |
|-----------|-----------|
| [`docs/ARQUITECTURA.md`](docs/ARQUITECTURA.md) | Stack, estructura, decisiones |
| [`docs/SCHEMA.md`](docs/SCHEMA.md) | Tablas Supabase + SQL de creación |
| [`docs/ADMIN_PANEL.md`](docs/ADMIN_PANEL.md) | Funcionalidades del panel |
| [`docs/WEB_PUBLICA.md`](docs/WEB_PUBLICA.md) | Páginas y componentes de la web |
| [`docs/DESPLIEGUE.md`](docs/DESPLIEGUE.md) | Cloudflare Pages + CI/CD |
| [`docs/CHANGELOG.md`](docs/CHANGELOG.md) | Historial de cambios |
