# Schema de Supabase — Amigos2

SQL completo para ejecutar en el SQL Editor de Supabase (Dashboard → SQL Editor → New query).

---

## Tablas

### `site_info`

```sql
CREATE TABLE site_info (
  id                 serial PRIMARY KEY,
  restaurant_name    text NOT NULL DEFAULT 'Amigos2',
  slogan             text,
  description        text,
  address            text NOT NULL DEFAULT '',
  phone              text NOT NULL DEFAULT '',
  email              text,
  website            text,
  opening_hours      jsonb NOT NULL DEFAULT '{}',
  social_instagram   text,
  social_facebook    text,
  logo_url           text,
  hero_image_url     text,
  updated_at         timestamptz NOT NULL DEFAULT now()
);

-- Insertar fila inicial (solo hay 1)
INSERT INTO site_info (restaurant_name, slogan, description, address, phone, opening_hours)
VALUES (
  'Amigos2',
  'Tu restaurante de confianza',
  'Bienvenidos a Amigos2. Disfruta de nuestra cocina con productos frescos y de temporada.',
  'Calle Ejemplo 1, Ciudad',
  '+34 600 000 000',
  '{"lun":"13:00-23:00","mar":"13:00-23:00","mie":"13:00-23:00","jue":"13:00-23:00","vie":"13:00-00:00","sab":"13:00-00:00","dom":"cerrado"}'
);
```

### `categories`

```sql
CREATE TABLE categories (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text NOT NULL,
  description   text,
  image_url     text,
  display_order integer NOT NULL DEFAULT 0,
  is_active     boolean NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now()
);
```

### `products`

```sql
CREATE TABLE products (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id   uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name          text NOT NULL,
  description   text,
  price         numeric(10,2) NOT NULL DEFAULT 0,
  image_url     text,
  is_available  boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  allergens     text[],
  created_at    timestamptz NOT NULL DEFAULT now()
);
```

### `posts`

```sql
CREATE TABLE posts (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title            text NOT NULL,
  slug             text NOT NULL UNIQUE,
  content          text NOT NULL DEFAULT '',
  cover_image_url  text,
  is_published     boolean NOT NULL DEFAULT false,
  published_at     timestamptz,
  created_at       timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX posts_slug_idx ON posts (slug);
CREATE INDEX posts_published_idx ON posts (is_published, published_at DESC);
```

### `gallery`

```sql
CREATE TABLE gallery (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url     text NOT NULL,
  alt_text      text,
  display_order integer NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now()
);
```

### `contact_messages`

Recibe los mensajes enviados desde el formulario de contacto de la web pública. El admin los gestiona desde `/messages` en el panel.

```sql
CREATE TABLE contact_messages (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL,
  email      text NOT NULL,
  phone      text,                 -- opcional, formato libre
  message    text NOT NULL,
  is_read    boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX contact_messages_unread_idx ON contact_messages (is_read, created_at DESC);

-- Migración para añadir teléfono sobre la tabla existente
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS phone text;
```

---

### `delivery_links`

Enlaces de la sección “Pedir a domicilio” de la home (Glovo, Uber Eats, Just Eat y teléfono del local). Se gestionan desde `/delivery` en el panel admin. La web pública solo lee los activos con `url` no vacía.

```sql
CREATE TABLE IF NOT EXISTS delivery_links (
  id            bigserial PRIMARY KEY,
  platform      text NOT NULL,            -- 'glovo' | 'ubereats' | 'justeat' | 'phone'
  url           text,                     -- URL del enlace, o número de teléfono si platform='phone'
  is_active     boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now()
);

INSERT INTO delivery_links (platform, url, is_active, display_order) VALUES
  ('glovo',    '', true, 1),
  ('ubereats', '', true, 2),
  ('justeat',  '', true, 3),
  ('phone',    '', true, 4);

-- RLS: lectura pública, escritura solo autenticados (admin)
ALTER TABLE delivery_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "delivery_links lectura pública"
ON delivery_links FOR SELECT
USING (true);

CREATE POLICY "delivery_links escritura autenticada"
ON delivery_links FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');
```

---

### `hero_media`

Imagen o vídeo de fondo del hero de la home. Si no hay fila activa (o `media_type='none'`), la web usa el gradiente + blobs por defecto. Se gestiona desde `/hero` en el admin.

```sql
CREATE TABLE IF NOT EXISTS hero_media (
  id          bigserial PRIMARY KEY,
  media_type  text NOT NULL CHECK (media_type IN ('image','video','none')),
  media_url   text,
  is_active   boolean NOT NULL DEFAULT true,
  created_at  timestamptz NOT NULL DEFAULT now()
);

INSERT INTO hero_media (media_type, media_url, is_active)
VALUES ('none', NULL, true);

-- RLS: lectura pública, escritura solo autenticados (admin)
ALTER TABLE hero_media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "hero_media lectura pública"
ON hero_media FOR SELECT
USING (true);

CREATE POLICY "hero_media escritura autenticada"
ON hero_media FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');
```

---

## Row Level Security (RLS)

```sql
-- Habilitar RLS en todas las tablas
ALTER TABLE site_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Lectura pública para la web (anon key)
CREATE POLICY "Lectura pública site_info" ON site_info FOR SELECT USING (true);
CREATE POLICY "Lectura pública categories" ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "Lectura pública products" ON products FOR SELECT USING (true);
CREATE POLICY "Lectura pública posts" ON posts FOR SELECT USING (is_published = true);
CREATE POLICY "Lectura pública gallery" ON gallery FOR SELECT USING (true);

-- Escritura solo para usuarios autenticados (admin)
CREATE POLICY "Admin site_info" ON site_info FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin categories" ON categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin products" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin posts" ON posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin gallery" ON gallery FOR ALL USING (auth.role() = 'authenticated');

-- contact_messages: la web pública solo puede insertar; el admin puede leer, actualizar y borrar
CREATE POLICY "Insertar mensaje contacto" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin contact_messages" ON contact_messages FOR ALL USING (auth.role() = 'authenticated');
```

---

## Storage Buckets

```sql
-- Crear bucket público para imágenes de la web
INSERT INTO storage.buckets (id, name, public)
VALUES ('public-images', 'public-images', true);

-- Policy de lectura pública
CREATE POLICY "Lectura pública public-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'public-images');

-- Policy de escritura solo para autenticados
CREATE POLICY "Upload autenticado public-images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'public-images' AND auth.role() = 'authenticated');

CREATE POLICY "Delete autenticado public-images"
ON storage.objects FOR DELETE
USING (bucket_id = 'public-images' AND auth.role() = 'authenticated');
```

---

## Usuario admin

Crear desde Supabase Dashboard → Authentication → Users → Add user.
O vía SQL:

```sql
-- NO usar este método en producción — usar el dashboard de Supabase Auth
-- Solo como referencia:
SELECT auth.create_user('{"email":"admin@amigos2.com","password":"TuPasswordSeguro123!"}');
```
