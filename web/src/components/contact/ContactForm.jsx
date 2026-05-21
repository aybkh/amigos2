import { useState, useRef } from 'react'
import { contactService } from '../../services/contactService'

const INITIAL = { name: '', email: '', message: '' }

// Rate limiting client-side: 1 mensaje cada 60s
const RATE_LIMIT_MS = 60000
const MESSAGE_MAX = 1000

// Acepta letras de cualquier idioma + espacios y separadores de nombre
const NAME_RE  = /^[\p{L}\p{M}\s'.-]+$/u
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateForm({ name, email, message }) {
  const errors = {}
  const n = name.trim()
  const m = message.trim()

  if (!n)                    errors.name = 'El nombre es obligatorio'
  else if (n.length < 2)     errors.name = 'El nombre debe tener al menos 2 caracteres'
  else if (n.length > 100)   errors.name = 'El nombre no puede exceder 100 caracteres'
  else if (!NAME_RE.test(n)) errors.name = 'El nombre solo puede contener letras'

  if (!email.trim())                     errors.email = 'El email es obligatorio'
  else if (!EMAIL_RE.test(email.trim())) errors.email = 'Email no válido'
  else if (email.length > 255)           errors.email = 'El email es demasiado largo'

  if (!m)                          errors.message = 'El mensaje es obligatorio'
  else if (m.length < 10)          errors.message = 'El mensaje debe tener al menos 10 caracteres'
  else if (m.length > MESSAGE_MAX) errors.message = `El mensaje no puede exceder ${MESSAGE_MAX} caracteres`

  return errors
}

export default function ContactForm() {
  const [form,   setForm]   = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const lastSubmit = useRef(0)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})

    // 1. Validación de inputs
    const validationErrors = validateForm(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // 2. Rate limiting
    const elapsed = Date.now() - lastSubmit.current
    if (elapsed < RATE_LIMIT_MS) {
      const wait = Math.ceil((RATE_LIMIT_MS - elapsed) / 1000)
      setErrors({ submit: `Por favor espera ${wait} segundos antes de enviar otro mensaje.` })
      return
    }

    // 3. Envío
    setStatus('sending')
    try {
      await contactService.send({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        message: form.message.trim(),
      })
      lastSubmit.current = Date.now()
      setForm(INITIAL)
      setStatus('success')
    } catch {
      setStatus('error')
      setErrors({ submit: 'Hubo un error al enviar. Inténtalo de nuevo.' })
    }
  }

  if (status === 'success') {
    return (
      <div className="contact-success">
        <p className="text-4xl mb-4">✓</p>
        <p className="font-heading text-white text-xl text-shadow-neo">¡Mensaje enviado!</p>
        <p className="font-sans text-white/60 mt-2 text-sm">Te respondemos pronto.</p>
      </div>
    )
  }

  const sending = status === 'sending'

  return (
    <form onSubmit={handleSubmit} className="contact-form-card" noValidate>
      <div className="contact-field">
        <label className="contact-label" htmlFor="name">Nombre</label>
        <input
          id="name" name="name" type="text"
          value={form.name} onChange={handleChange}
          placeholder="Tu nombre"
          maxLength={100}
          disabled={sending}
          className={`contact-input${errors.name ? ' contact-input--error' : ''}`}
        />
        {errors.name && <span className="contact-field-error">{errors.name}</span>}
      </div>

      <div className="contact-field">
        <label className="contact-label" htmlFor="email">Email</label>
        <input
          id="email" name="email" type="email"
          value={form.email} onChange={handleChange}
          placeholder="tu@email.com"
          maxLength={255}
          disabled={sending}
          className={`contact-input${errors.email ? ' contact-input--error' : ''}`}
        />
        {errors.email && <span className="contact-field-error">{errors.email}</span>}
      </div>

      <div className="contact-field">
        <label className="contact-label" htmlFor="message">Mensaje</label>
        <textarea
          id="message" name="message" rows={4}
          value={form.message} onChange={handleChange}
          placeholder="¿En qué podemos ayudarte?"
          maxLength={MESSAGE_MAX}
          disabled={sending}
          className={`contact-input${errors.message ? ' contact-input--error' : ''}`}
          style={{ resize: 'none' }}
        />
        <div className="contact-field-meta">
          {errors.message
            ? <span className="contact-field-error">{errors.message}</span>
            : <span />}
          <span className="contact-char-count">{form.message.length}/{MESSAGE_MAX}</span>
        </div>
      </div>

      {errors.submit && <p className="contact-error">{errors.submit}</p>}

      <button type="submit" disabled={sending} className="contact-submit-btn">
        {sending ? 'Enviando...' : 'Enviar mensaje'}
      </button>
    </form>
  )
}
