import { useState } from 'react'
import { contactService } from '../../services/contactService'

const INITIAL = { name: '', email: '', message: '' }

export default function ContactForm() {
  const [form,   setForm]   = useState(INITIAL)
  const [status, setStatus] = useState('idle')

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

  if (status === 'success') {
    return (
      <div className="contact-success">
        <p className="text-4xl mb-4">✓</p>
        <p className="font-heading text-white text-xl text-shadow-neo">¡Mensaje enviado!</p>
        <p className="font-sans text-white/60 mt-2 text-sm">Te respondemos pronto.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form-card">
      <div className="contact-field">
        <label className="contact-label" htmlFor="name">Nombre</label>
        <input
          id="name" name="name" type="text" required
          value={form.name} onChange={handleChange}
          placeholder="Tu nombre"
          className="contact-input"
        />
      </div>

      <div className="contact-field">
        <label className="contact-label" htmlFor="email">Email</label>
        <input
          id="email" name="email" type="email" required
          value={form.email} onChange={handleChange}
          placeholder="tu@email.com"
          className="contact-input"
        />
      </div>

      <div className="contact-field">
        <label className="contact-label" htmlFor="message">Mensaje</label>
        <textarea
          id="message" name="message" required rows={4}
          value={form.message} onChange={handleChange}
          placeholder="¿En qué podemos ayudarte?"
          className="contact-input"
          style={{ resize: 'none' }}
        />
      </div>

      {status === 'error' && (
        <p className="contact-error">Hubo un error al enviar. Inténtalo de nuevo.</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="contact-submit-btn"
      >
        {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
      </button>
    </form>
  )
}
