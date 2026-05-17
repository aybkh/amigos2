import { useSiteInfo } from '../../hooks/useSiteInfo'
import { useLanguage } from '../../hooks/useLanguage'
import { t } from '../../lib/i18n'

const DAY_KEYS_DOW  = ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab']
const PREV_DAY_KEYS = ['sab', 'dom', 'lun', 'mar', 'mie', 'jue', 'vie']
const DISPLAY_ORDER = ['lun', 'mar', 'mie', 'jue', 'vie', 'sab', 'dom']

function formatHours(val) {
  if (!val || val === 'cerrado') return { closed: true }
  if (typeof val === 'object' && val.t1) {
    return { closed: false, turno1: val.t1, turno2: val.t2 || null }
  }
  return { closed: false, turno1: String(val), turno2: null }
}

function isOpenNow(hours) {
  if (!hours) return false
  const now       = new Date()
  const totalMins = now.getHours() * 60 + now.getMinutes()
  const dayKey    = DAY_KEYS_DOW[now.getDay()]
  const prevKey   = PREV_DAY_KEYS[now.getDay()]
  const todayH    = hours[dayKey]
  const prevH     = hours[prevKey]

  if (totalMins < 180) {
    const prevT2 = typeof prevH === 'object' ? prevH?.t2 : null
    if (prevT2) {
      const endStr = prevT2.split('-')[1]
      const [endH] = endStr.split(':').map(Number)
      if (endH <= 3) return true
    }
  }

  const t1 = typeof todayH === 'object' ? todayH?.t1 : (todayH && todayH !== 'cerrado' ? todayH : null)
  if (t1) {
    const [startH, startM] = t1.split('-')[0].split(':').map(Number)
    if (totalMins >= startH * 60 + (startM || 0)) return true
  }

  return false
}

function getNextOpenTime(hours) {
  if (!hours) return null
  const dow    = new Date().getDay()
  const dayKey = DAY_KEYS_DOW[dow]
  const today  = hours[dayKey]
  const t1     = typeof today === 'object' ? today?.t1 : (today && today !== 'cerrado' ? today : null)
  return t1 ? t1.split('-')[0] : null
}

function getStatus(hours, lang) {
  if (!hours) return null
  if (isOpenNow(hours)) return { label: t(lang, 'ui.hours.open_now'), color: 'var(--color-neon)' }
  const nextOpen = getNextOpenTime(hours)
  if (nextOpen) return {
    label: t(lang, 'ui.hours.opens_at').replace('{time}', nextOpen),
    color: '#f59e0b',
  }
  return { label: t(lang, 'ui.hours.closed_today'), color: '#ef4444' }
}

export default function HoursSection() {
  const { siteInfo } = useSiteInfo()
  const { lang } = useLanguage()
  const hours    = siteInfo?.opening_hours
  const status   = getStatus(hours, lang)
  const todayKey = DAY_KEYS_DOW[new Date().getDay()]

  if (!hours) return null

  return (
    <section
      id="horarios"
      style={{
        background: 'linear-gradient(160deg, #071a10, #0a2a1a)',
        padding: '80px 24px',
      }}
    >
      <div style={{ maxWidth: 600, margin: '0 auto' }}>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{
            fontFamily: "'Black Ops One', cursive",
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            color: 'var(--color-cream)', margin: 0, letterSpacing: '0.04em',
          }}>
            {t(lang, 'ui.hours.title')}
          </h2>
        </div>

        {/* Glass card */}
        <div className="glass-neon" style={{ borderRadius: 16, overflow: 'hidden' }}>

          {/* Status */}
          <div style={{
            padding: '18px 24px',
            borderBottom: '1px solid rgba(0,230,118,0.15)',
            display: 'flex', justifyContent: 'center',
          }}>
            <span style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700, fontSize: '0.90rem', letterSpacing: '0.06em',
              color: status?.color ?? 'var(--color-cream)',
            }}>
              {status?.label ?? '—'}
            </span>
          </div>

          {/* Day rows */}
          <div>
            {DISPLAY_ORDER.map(key => {
              const fmt     = formatHours(hours[key])
              const isToday = key === todayKey
              return (
                <div
                  key={key}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '12px 24px',
                    borderLeft: isToday ? '3px solid var(--color-neon)' : '3px solid transparent',
                    background: isToday ? 'rgba(0,230,118,0.05)' : 'transparent',
                    borderBottom: '1px solid rgba(245,240,232,0.05)',
                    gap: 12,
                  }}
                >
                  <span style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: isToday ? 700 : 500,
                    fontSize: '0.88rem', flexShrink: 0,
                    color: isToday ? 'var(--color-neon)' : 'rgba(245,240,232,0.70)',
                  }}>
                    {t(lang, `ui.hours.days.${key}`)}
                  </span>

                  {fmt.closed ? (
                    <span style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 600, fontSize: '0.85rem',
                      color: 'rgba(239,68,68,0.70)',
                    }}>{t(lang, 'ui.hours.closed')}</span>
                  ) : (
                    <div style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2,
                    }}>
                      <span style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 600, fontSize: '0.85rem',
                        color: isToday ? 'var(--color-cream)' : 'rgba(245,240,232,0.80)',
                      }}>{fmt.turno1}</span>
                      {fmt.turno2 && (
                        <span style={{
                          fontFamily: 'Montserrat, sans-serif',
                          fontWeight: 600, fontSize: '0.80rem',
                          color: isToday ? 'rgba(245,240,232,0.75)' : 'rgba(245,240,232,0.55)',
                        }}>{fmt.turno2}</span>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
