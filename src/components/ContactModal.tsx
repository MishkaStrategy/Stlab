import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { contacts } from '../data/services'
import { Logo } from './Logo'
import { PolygonField } from './PolygonField'

type ContactModalProps = {
  open: boolean
  onClose: () => void
}

type SubmitState = 'default' | 'loading' | 'success'

export function ContactModal({ open, onClose }: ContactModalProps) {
  const [submitState, setSubmitState] = useState<SubmitState>('default')
  const reduceMotion = useReducedMotion()
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const timer = window.setTimeout(() => nameRef.current?.focus(), 80)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(timer)
    }
  }, [open, onClose])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitState('loading')
    window.setTimeout(() => setSubmitState('success'), 700)
  }

  const close = () => {
    setSubmitState('default')
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="contact-modal"
          initial={reduceMotion ? { opacity: 0 } : { clipPath: 'inset(48% 48% 48% 48%)', opacity: .8 }}
          animate={reduceMotion ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { clipPath: 'inset(48% 48% 48% 48%)', opacity: .7 }}
          transition={{ duration: reduceMotion ? .12 : .62, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-title"
        >
          <PolygonField />
          <div className="contact-modal__chrome">
            <Logo compact />
            <button className="icon-button" onClick={close} aria-label="Закрыть форму обратной связи">×</button>
          </div>

          <div className="contact-modal__grid">
            <div className="contact-modal__intro">
              <div className="eyebrow">CONTACT / STLAB / NSK</div>
              <h2 id="contact-title">Связаться<br />с лабораторией</h2>
              <p>Оставьте контакты или свяжитесь напрямую. В этой демонстрационной версии форма не отправляет данные на сервер.</p>
              <div className="contact-modal__direct">
                <a href={contacts.phoneHref}>{contacts.phoneDisplay}</a>
                <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
                <span>{contacts.city}, {contacts.address}</span>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                <span>01 / Имя</span>
                <input ref={nameRef} name="name" autoComplete="name" required />
              </label>
              <label>
                <span>02 / Телефон</span>
                <input name="phone" inputMode="tel" autoComplete="tel" required />
              </label>
              <label>
                <span>03 / Email</span>
                <input name="email" type="email" autoComplete="email" />
              </label>
              <label>
                <span>04 / Комментарий</span>
                <textarea name="comment" rows={3} />
              </label>
              <button className="cta cta--light contact-form__submit" type="submit" disabled={submitState === 'loading'}>
                {submitState === 'default' && 'Отправить заявку'}
                {submitState === 'loading' && 'Проверяем форму…'}
                {submitState === 'success' && 'Готово — демо без отправки'}
                <span aria-hidden="true">↗</span>
              </button>
              {submitState === 'success' && <p className="contact-form__note">Данные остались только в браузере и не были отправлены.</p>}
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
