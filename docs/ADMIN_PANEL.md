# Panel de Administración — Amigos2

Panel de gestión para el propietario del restaurante. Acceso por email+contraseña via Supabase Auth.

## Acceso

URL producción: `admin.amigos2.com` (o el subdominio configurado en Cloudflare)
URL local: `http://localhost:5174`

Credenciales: configuradas en Supabase Dashboard → Authentication → Users.

## Secciones

### Dashboard (`/`)
Pantalla de inicio con acceso rápido a todas las secciones. Muestra una card de alerta destacada (rojo ladrillo) si hay mensajes no leídos, con link directo a `/messages`.

### Carta Digital (`/menu`)
- Panel izquierdo: lista de categorías con botones ↑↓ para reordenar, editar y eliminar
- Panel derecho: tabla de productos de la categoría seleccionada
- Toggle rápido de disponibilidad de producto (sin modal)
- Reordenación de productos con ↑↓
- Modal de categoría: nombre, descripción, imagen (upload a Storage), toggle activa/inactiva
- Modal de producto: nombre, precio, descripción, imagen (upload), toggle disponible, alérgenos (chips + input libre)
- Eliminación de categoría borra en cascada todos sus productos (ON DELETE CASCADE)

### Posts y Noticias (`/posts`)
- Panel izquierdo: lista de posts con badge Publicado/Borrador y fecha
- Botones rápidos: publicar/despublicar (ojo), editar (lápiz), eliminar (papelera)
- Panel derecho: editor inline (no modal) con campos título, slug, contenido, imagen portada, toggle publicado
- Slug auto-generado desde el título (kebab-case, sin acentos); editable manualmente
- Al publicar por primera vez, registra `published_at` con la hora actual

### Galería (`/gallery`)
- Zona de subida: drag & drop o selector multi-archivo con barra de progreso por imagen
- Grid de imágenes con hover que muestra botones ↑ / Eliminar / ↓
- Reordenación guarda `display_order` en Supabase
- Las imágenes se suben al bucket `public-images` en la carpeta `gallery/`

### Mensajes (`/messages`)
- Lista de todos los mensajes recibidos desde el formulario de contacto de la web pública
- Badge rojo con el número de no leídos junto al título de la página
- Cada mensaje se muestra como una card colapsable:
  - Colapsado: nombre, email, fecha y preview de 2 líneas del mensaje
  - Expandido: texto completo + botón "Marcar como leído/no leído" + botón "Eliminar"
  - Al expandir un mensaje no leído, se marca como leído automáticamente
- Mensajes no leídos: borde izquierdo Verde Botella (4px), badge "Nuevo" Rojo Ladrillo
- Mensajes leídos: sin borde especial, badge "Leído" gris
- Eliminación con confirmación mediante Modal antes de borrar
- Tras marcar o eliminar, el badge de la sidebar se actualiza instantáneamente

### Info del Restaurante (`/info`)
- Formulario dividido en secciones: información básica, contacto, redes sociales, imágenes, horario
- Editor de horario visual: 7 días con toggle ON/OFF y campos `time` de apertura/cierre
- Los campos de logo y hero aceptan URL (se recomienda subir primero desde Galería)
- Guarda todos los campos en la única fila de la tabla `site_info` via upsert

## Componentes UI base (`components/ui/`)

| Componente | Uso |
|-----------|-----|
| `Button` | Variantes: primary, secondary, danger, ghost |
| `Input` / `Textarea` | Inputs con label y mensaje de error |
| `Modal` | Diálogos modales con overlay y cierre por Escape |
| `Toast` | Notificaciones de éxito/error en esquina inferior derecha |
| `LoadingSpinner` | Spinner de carga, fullscreen o inline |
| `ImagePicker` | Selector de imagen con preview y botón de borrado |

## Seguridad

- Las rutas protegidas verifican `session` antes de renderizar.
- Si no hay sesión activa, redirige automáticamente a `/login`.
- El token de sesión lo gestiona Supabase (cookies httpOnly en producción).
- Las políticas RLS de Supabase garantizan que la anon key no puede modificar datos.
