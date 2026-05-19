import { useLanguage } from '../../hooks/useLanguage'
import { t } from '../../lib/i18n'

export default function StatsBar() {
  const { lang } = useLanguage()

  const stats = [
    { value: '15',      label: t(lang, 'ui.stats.categories') },
    { value: '131',     label: t(lang, 'ui.stats.dishes') },
    { value: '3:00 AM', label: t(lang, 'ui.stats.closing') },
    { value: '4.5★',   label: t(lang, 'ui.stats.google') },
  ]

  return (
    <div style={{
      background: 'rgba(0,230,118,0.05)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(0,230,118,0.15)',
      borderBottom: '1px solid rgba(0,230,118,0.15)',
      padding: '20px 24px',
    }}>
      <div className="stats-grid" style={{ maxWidth: 900, margin: '0 auto', gap: 0 }}>
        {stats.map(({ value, label }, i) => (
          <div
            key={label}
            style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 4,
              padding: '8px 12px',
              borderRight: i < stats.length - 1
                ? '1px solid rgba(0,230,118,0.15)'
                : 'none',
            }}
          >
            <span style={{
              fontFamily: "'Black Ops One', cursive",
              fontSize: 'clamp(1.3rem, 3vw, 1.9rem)',
              color: 'var(--color-neon)',
              letterSpacing: '0.04em',
              lineHeight: 1,
            }}>
              {value}
            </span>
            <span style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600, fontSize: '0.68rem',
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(245,240,232,0.45)',
            }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
