import { useState } from 'react'
import { contactService } from '../../services/contactService'
import { useLanguage } from '../../hooks/useLanguage'
import { t } from '../../lib/i18n'

const INITIAL = { name: '', email: '', message: '' }

const inputStyle = {
  width: '100%',
  background: 'rgba(7,26,16,0.80)',
  border: '1px solid rgba(245,240,232,0.12)',
  borderRadius: 8,
  padding: '12px 14px',
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '0.88rem', color: 'var(--color-cream)',
  outline: 'none', transition: 'border-color 0.2s',
  boxSizing: 'border-box',
}

const labelStyle = {
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 700, fontSize: '0.70rem',
  letterSpacing: '0.15em', textTransform: 'uppercase',
  color: 'rgba(245,240,232,0.45)',
  marginBottom: 6, display: 'block',
}

export default function ContactSection() {
  const [form,   setForm]   = useState(INITIAL)
  const [status, setStatus] = useState('idle')
  const { lang } = useLanguage()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await contactService.send(form)
      setStatus('success')
      setForm(INITIAL)
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contacto"
      style={{
        background: 'var(--color-bg-dark)',
        padding: '80px 24px',
      }}
    >
      <div style={{ maxWidth: 550, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{
            fontFamily: "'Black Ops One', cursive",
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            color: 'var(--color-cream)', margin: '0 0 10px', letterSpacing: '0.04em',
          }}>
            {t(lang, 'ui.contact.title')}
          </h2>
          <p style={{
            margin: 0,
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.88rem', color: 'rgba(245,240,232,0.50)',
          }}>
            {t(lang, 'ui.contact.subtitle')}
          </p>
        </div>

        {/* Glass card */}
        <div className="glass" style={{ borderRadius: 16, padding: '32px 28px' }}>

          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <p style={{ fontSize: '2.5rem', margin: '0 0 12px' }}>✓</p>
              <p style={{
                fontFamily: "'Black Ops One', cursive",
                fontSize: '1.3rem', color: 'var(--color-neon)',
                margin: '0 0 8px',
              }}>{t(lang, 'ui.contact.success_title')}</p>
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.85rem', color: 'rgba(245,240,232,0.50)',
                margin: 0,
              }}>{t(lang, 'ui.contact.success_body')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label htmlFor="cf-name" style={labelStyle}>{t(lang, 'ui.contact.name')}</label>
                <input
                  id="cf-name" name="name" type="text" required
                  value={form.name} onChange={handleChange}
                  placeholder={t(lang, 'ui.contact.name_placeholder')}
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = 'rgba(0,230,118,0.50)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(245,240,232,0.12)')}
                />
              </div>

              <div>
                <label htmlFor="cf-email" style={labelStyle}>{t(lang, 'ui.contact.email')}</label>
                <input
                  id="cf-email" name="email" type="email" required
                  value={form.email} onChange={handleChange}
                  placeholder="tu@email.com"
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = 'rgba(0,230,118,0.50)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(245,240,232,0.12)')}
                />
              </div>

              <div>
                <label htmlFor="cf-message" style={labelStyle}>{t(lang, 'ui.contact.message')}</label>
                <textarea
                  id="cf-message" name="message" required rows={4}
                  value={form.message} onChange={handleChange}
                  placeholder={t(lang, 'ui.contact.message_placeholder')}
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(0,230,118,0.50)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(245,240,232,0.12)')}
                />
              </div>

              {status === 'error' && (
                <p style={{
                  margin: 0,
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.83rem', color: '#ef4444',
                  textAlign: 'center',
                }}>
                  {t(lang, 'ui.contact.error')}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                style={{
                  width: '100%',
                  background: status === 'sending' ? 'var(--color-neon-dim)' : 'var(--color-neon)',
                  color: 'var(--color-bg-dark)',
                  border: 'none', borderRadius: 8,
                  padding: '14px',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 800, fontSize: '0.88rem',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.opacity = '0.85' }}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                {status === 'sending' ? t(lang, 'ui.contact.sending') : t(lang, 'ui.contact.send')}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
