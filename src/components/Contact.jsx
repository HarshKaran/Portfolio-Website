import { useState } from 'react'
import Reveal from './Reveal'
import SectionHead from './SectionHead'
import SectionBackground from './SectionBackground'
import Socials from './Socials'
import { FiMail, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import { profile } from '../data/content'
import './Contact.css'

// Messages are delivered to your inbox via Web3Forms (https://web3forms.com).
// Set VITE_WEB3FORMS_KEY in .env locally and in your host's environment variables.
// The key is public-safe. Without it, the form falls back to opening the visitor's email client.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  // 'idle' | 'sending' | 'sent' | 'error'
  const [status, setStatus] = useState('idle')
  // honeypot: hidden from humans, bots fill it in and Web3Forms drops the submission
  const [botcheck, setBotcheck] = useState(false)

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const reset = () => {
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setStatus('idle'), 4000)
  }

  const submit = async (e) => {
    e.preventDefault()

    if (!WEB3FORMS_KEY) {
      const subject = encodeURIComponent(`Portfolio contact from ${form.name}`)
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio contact from ${form.name}`,
          from_name: 'Portfolio Website',
          replyto: form.email,
          botcheck: botcheck,
          ...form,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message || `Web3Forms responded ${res.status}`)
      setStatus('sent')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section contact-section">
      <SectionBackground variant="contact" />
      <div className="container">
        <SectionHead eyebrow="05 — Contact" title="Let's build something" center />
        <Reveal className="contact-sub-wrap" variant="blur" delay={0.2}>
          <p className="contact-sub">
            Have a project, a role, or just want to say hi? My inbox is open.
          </p>
        </Reveal>

        <div className="contact-grid">
          <Reveal className="contact-aside" variant="left">
            <a href={`mailto:${profile.email}`} className="contact-email card">
              <FiMail />
              <span>{profile.email}</span>
            </a>
            <div className="contact-socials">
              <p>Find me on</p>
              <Socials size="md" />
            </div>
          </Reveal>

          <Reveal className="contact-form-wrap" delay={0.12} variant="right">
            <form className="contact-form card" onSubmit={submit}>
              <input
                type="checkbox"
                name="botcheck"
                checked={botcheck}
                onChange={(e) => setBotcheck(e.target.checked)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ display: 'none' }}
              />
              <div className="field">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" value={form.name} onChange={update} required placeholder="Your name" />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" value={form.email} onChange={update} required placeholder="you@email.com" />
              </div>
              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" value={form.message} onChange={update} required placeholder="Tell me about it..." />
              </div>
              <button
                type="submit"
                className="btn btn-primary contact-submit"
                disabled={status === 'sending' || status === 'sent'}
              >
                {status === 'sent' ? (<><FiCheckCircle /> Sent!</>)
                  : status === 'sending' ? (<><FiSend /> Sending...</>)
                  : (<><FiSend /> Send Message</>)}
              </button>
              {status === 'error' && (
                <p className="contact-error" role="alert">
                  <FiAlertCircle /> Something went wrong — please email me directly at {profile.email}.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
