// Pantalla hero de categoría — imagen a pantalla completa con nombre, descripción y partículas
const PARTICLES = [1, 2, 3, 4, 5, 6]

export default function TvHeroScreen({ category }) {
  const hasImage = Boolean(category.image_url)

  return (
    <div className="tv-hero">
      {/* Fondo: imagen de categoría o gradiente radial animado */}
      <div
        className={`tv-hero-bg ${hasImage ? '' : 'tv-hero-radial'}`}
        style={hasImage ? { backgroundImage: `url(${category.image_url})` } : undefined}
      />

      {/* Overlay degradado para legibilidad del texto */}
      <div className="tv-hero-overlay" />

      {/* Partículas flotantes */}
      {PARTICLES.map((n) => (
        <div key={n} className={`tv-particle tv-particle-${n}`} />
      ))}

      {/* Contenido */}
      <div className="tv-hero-content">
        <p
          className="tv-bebas tracking-widest mb-3"
          style={{ fontSize: '2.5rem', color: 'var(--tv-accent)', letterSpacing: '12px' }}
        >
          Nuestra selección
        </p>

        <h2
          className="tv-bebas leading-none"
          style={{
            fontSize: 'clamp(6rem, 12vw, 11rem)',
            color: '#fff',
            letterSpacing: '12px',
            textShadow: '0 10px 50px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.7)',
            textTransform: 'uppercase',
          }}
        >
          {category.name}
        </h2>

        {category.description && (
          <p
            className="mt-6 font-light text-center max-w-4xl mx-auto"
            style={{
              fontSize: '2rem',
              color: 'rgba(255,255,255,0.88)',
              textShadow: '0 2px 10px rgba(0,0,0,0.7)',
              lineHeight: 1.35,
            }}
          >
            {category.description}
          </p>
        )}
      </div>
    </div>
  )
}
