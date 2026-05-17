import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../../hooks/useLanguage'
import { t } from '../../lib/i18n'

const REVIEWS = [
  { name: 'Deborah Green',          stars: 5, lang: '🇬🇧', text: 'Just had a delicious pizza here, one of the best I have ever had. The staff are very friendly and helpful. Very clean compared to some places in Lloret.' },
  { name: 'Danilo Manco',           stars: 5, lang: '🇮🇹', text: 'EL RE del kebab di Lloret. Lloret de Mar è pieno di posti del genere, ma la gentilezza e simpatia lo rendono unico. Menu estremamente vario, perfetto per un pre serata. Menzione speciale per la sangria!' },
  { name: 'Oskar Kaliszer',         stars: 5, lang: '🇵🇱', text: 'Amazing restaurant, delicious food - I can recommend Plato kebab, Pita kebab and durum. Owner is the nicest guy I have ever met in a restaurant, cheap and big portions!' },
  { name: 'Amanda Pitter',          stars: 5, lang: '🇪🇸', text: 'Muy buena atención, muy bien servicio lo recomiendo. He comido y bebido y el precio ha sido bajo para lo bien que se come. Aquí está el mejor café con leche de Lloret.' },
  { name: 'Samuel Penazzato',       stars: 5, lang: '🇮🇹', text: "Cameriere preciso e professionale, capace di comprendere più lingue. Cibo pronto in pochissimi secondi (e pure buono!). Propietaria super disponibile e sorridente, non vedo l'ora di tornare." },
  { name: 'GR Guzman',              stars: 5, lang: '🇮🇹', text: 'Un posto che merita! Cucina deliziosa con ingredienti freschi, servizio rapido e sorridente. Ottimo rapporto qualità-prezzo. Da provare assolutamente!' },
  { name: 'Marc-Alexander Jonen',   stars: 5, lang: '🇩🇪', text: 'Zu später Stunde noch einen Snack bekommen. Es war sehr lecker. Sehr nette Leute und ein super Preis-Leistungs-Verhältnis.' },
  { name: 'Tamara Simchuk',         stars: 5, lang: '🇺🇦', text: 'We enjoyed atmosphere with a tasty meal. Owner is so friendly. Thanks for a lovely time and delicious paella!' },
  { name: 'Jheycer Reynier Mujica', stars: 5, lang: '🇻🇪', text: 'Excelente servicio, empleados y dueños muy atentos, muy amigables y la comida muy buena. Lo recomiendo.' },
  { name: 'gurshan singh',          stars: 5, lang: '🇮🇹', text: "Ottimo ristorante! Piatti curati e gustosi, servizio attento e cordiale. L'ambiente è accogliente e ci si sente subito a proprio agio. Ci tornerò sicuramente." },
  { name: 'Victor Giraldo',         stars: 5, lang: '🇨🇴', text: 'Excelente servicio atendido por sus propios dueños muy atentos. Lo recomiendo. Comida deliciosa, el café muy bueno recomendado.' },
  { name: 'Małgorzata G',           stars: 5, lang: '🇵🇱', text: 'Przepyszna paella! W bardzo korzystnej cenie z przemiłą obsługą.' },
  { name: 'Andrey Rostov',          stars: 5, lang: '🇷🇺', text: 'Uno de los mejores kebabs del mundo! El propietario es maravilloso!' },
  { name: 'Charles Harris',         stars: 5, lang: '🇬🇧', text: 'La mejor pizza que he comido nunca, un buen servicio y una gran relación calidad-precio.' },
  { name: 'Román Soria',            stars: 5, lang: '🇪🇸', text: 'Muy amigables, serviciales, atentos... y buena comida con buenas bebidas. Zulia un genio!' },
]

function ReviewCard({ review }) {
  return (
    <div className="review-card" style={{
      background: '#ffffff',
      borderRadius: 14, padding: '20px 22px',
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 2 }}>
          {[1,2,3,4,5].map(i => (
            <span key={i} style={{ color: '#f59e0b', fontSize: '0.85rem' }}>★</span>
          ))}
        </div>
        <span style={{ fontSize: '1.25rem', lineHeight: 1 }} aria-hidden="true">
          {review.lang}
        </span>
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

      <p style={{
        margin: 0,
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700, fontSize: '0.78rem',
        color: '#071a10',
      }}>{review.name}</p>
    </div>
  )
}

export default function ReviewsSection() {
  const { lang } = useLanguage()
  const scrollRef = useRef(null)
  const autoplayRef = useRef(null)
  const resumeRef = useRef(null)
  const [isPaused, setIsPaused] = useState(false)

  // Autoplay: avanza una review cada 5s, vuelve al inicio al llegar al final
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const scrollNext = () => {
      const cardWidth = container.firstChild?.offsetWidth || 300
      const gap = 16
      const scrollAmount = cardWidth + gap

      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    }

    if (!isPaused) {
      autoplayRef.current = setInterval(scrollNext, 5000)
    }
    return () => clearInterval(autoplayRef.current)
  }, [isPaused])

  // Limpia el temporizador de reanudación al desmontar
  useEffect(() => () => clearTimeout(resumeRef.current), [])

  // Al interactuar (swipe/drag/hover) pausa el autoplay y lo reanuda tras 8s
  const pauseTemporarily = () => {
    setIsPaused(true)
    clearTimeout(resumeRef.current)
    resumeRef.current = setTimeout(() => setIsPaused(false), 8000)
  }

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
    <section style={{ background: '#040d07', padding: '72px 0', overflow: 'hidden' }}>
      {header}

      <div
        ref={scrollRef}
        className="reviews-scroll"
        onTouchStart={pauseTemporarily}
        onMouseDown={pauseTemporarily}
      >
        {REVIEWS.map((r, i) => <ReviewCard key={i} review={r} />)}
      </div>
    </section>
  )
}
