import { useLanguage } from '../../hooks/useLanguage'
import { t } from '../../lib/i18n'

const GoogleIcon = ({ size = 22 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
)

// lang = código de idioma del texto de la reseña → icono SVG en /public/icons
const REVIEWS = [
  { name: 'Deborah Green',          stars: 5, lang: 'en', text: 'Just had a delicious pizza here, one of the best I have ever had. The staff are very friendly and helpful. Very clean compared to some places in Lloret.' },
  { name: 'Danilo Manco',           stars: 5, lang: 'it', text: 'EL RE del kebab di Lloret. Lloret de Mar è pieno di posti del genere, ma la gentilezza e simpatia lo rendono unico. Menu estremamente vario, perfetto per un pre serata. Menzione speciale per la sangria!' },
  { name: 'Oskar Kaliszer',         stars: 5, lang: 'en', text: 'Amazing restaurant, delicious food - I can recommend Plato kebab, Pita kebab and durum. Owner is the nicest guy I have ever met in a restaurant, cheap and big portions!' },
  { name: 'Amanda Pitter',          stars: 5, lang: 'es', text: 'Muy buena atención, muy bien servicio lo recomiendo. He comido y bebido y el precio ha sido bajo para lo bien que se come. Aquí está el mejor café con leche de Lloret.' },
  { name: 'Samuel Penazzato',       stars: 5, lang: 'it', text: "Cameriere preciso e professionale, capace di comprendere più lingue. Cibo pronto in pochissimi secondi (e pure buono!). Propietaria super disponibile e sorridente, non vedo l'ora di tornare." },
  { name: 'GR Guzman',              stars: 5, lang: 'it', text: 'Un posto che merita! Cucina deliziosa con ingredienti freschi, servizio rapido e sorridente. Ottimo rapporto qualità-prezzo. Da provare assolutamente!' },
  { name: 'Marc-Alexander Jonen',   stars: 5, lang: 'de', text: 'Zu später Stunde noch einen Snack bekommen. Es war sehr lecker. Sehr nette Leute und ein super Preis-Leistungs-Verhältnis.' },
  { name: 'Tamara Simchuk',         stars: 5, lang: 'en', text: 'We enjoyed atmosphere with a tasty meal. Owner is so friendly. Thanks for a lovely time and delicious paella!' },
  { name: 'Jheycer Reynier Mujica', stars: 5, lang: 'es', text: 'Excelente servicio, empleados y dueños muy atentos, muy amigables y la comida muy buena. Lo recomiendo.' },
  { name: 'gurshan singh',          stars: 5, lang: 'it', text: "Ottimo ristorante! Piatti curati e gustosi, servizio attento e cordiale. L'ambiente è accogliente e ci si sente subito a proprio agio. Ci tornerò sicuramente." },
  { name: 'Victor Giraldo',         stars: 5, lang: 'es', text: 'Excelente servicio atendido por sus propios dueños muy atentos. Lo recomiendo. Comida deliciosa, el café muy bueno recomendado.' },
  { name: 'Małgorzata G',           stars: 5, lang: 'pl', text: 'Przepyszna paella! W bardzo korzystnej cenie z przemiłą obsługą.' },
  { name: 'Andrey Rostov',          stars: 5, lang: 'es', text: 'Uno de los mejores kebabs del mundo! El propietario es maravilloso!' },
  { name: 'Charles Harris',         stars: 5, lang: 'es', text: 'La mejor pizza que he comido nunca, un buen servicio y una gran relación calidad-precio.' },
  { name: 'Román Soria',            stars: 5, lang: 'es', text: 'Muy amigables, serviciales, atentos... y buena comida con buenas bebidas. Zulia un genio!' },
]

function ReviewCard({ review }) {
  return (
    <div className="review-card" style={{
      position: 'relative',
      background: '#ffffff',
      borderRadius: 14, padding: '20px 22px',
      display: 'flex', flexDirection: 'column', gap: 10,
      boxShadow: '0 4px 15px rgba(0,0,0,0.12)',
    }}>
      <span style={{ position: 'absolute', top: 18, right: 18 }}>
        <GoogleIcon size={22} />
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingRight: 32 }}>
        <img
          src={`/icons/${review.lang}.svg`}
          alt={review.lang}
          width={22}
          height={16}
          style={{ borderRadius: 3, objectFit: 'cover', flexShrink: 0, boxShadow: '0 0 0 1px rgba(0,0,0,0.10)' }}
        />
        <p style={{
          margin: 0,
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700, fontSize: '0.85rem',
          color: '#071a10',
        }}>{review.name}</p>
      </div>

      <div style={{ display: 'flex', gap: 2 }}>
        {[1,2,3,4,5].map(i => (
          <span key={i} style={{ color: i <= review.stars ? '#fbbc05' : '#e0e0e0', fontSize: '0.9rem' }}>★</span>
        ))}
      </div>

      <p style={{
        margin: 0,
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '0.82rem', lineHeight: 1.55,
        color: '#2d2926',
        display: '-webkit-box',
        WebkitLineClamp: 4,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        "{review.text}"
      </p>
    </div>
  )
}

export default function ReviewsSection() {
  const { lang } = useLanguage()

  const header = (
    <div style={{ textAlign: 'center', marginBottom: 40, padding: '0 24px' }}>
      <p style={{
        margin: '0 0 8px',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700, fontSize: '0.75rem',
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: 'var(--color-neon)',
      }}>
        {t(lang, 'ui.reviews.rating')}
      </p>
      <h2 style={{
        fontFamily: "'Black Ops One', cursive",
        fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
        color: 'var(--color-cream)', margin: 0, letterSpacing: '0.04em',
      }}>
        {t(lang, 'ui.reviews.title')}{' '}
        <span style={{ color: 'var(--color-neon)' }}>{t(lang, 'ui.reviews.title_highlight')}</span>
      </h2>
    </div>
  )

  return (
    <section style={{ background: '#040d07', padding: '48px 0', overflow: 'hidden' }}>
      {header}

      {/* Array duplicado → bucle infinito sin saltos (CSS marquee) */}
      <div className="reviews-marquee">
        {[...REVIEWS, ...REVIEWS].map((r, i) => <ReviewCard key={i} review={r} />)}
      </div>
    </section>
  )
}
