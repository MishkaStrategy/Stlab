import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { allServices, contacts } from '../data/services'
import { submitLead } from '../lib/contact'

type Props = { open: boolean; onClose: () => void }

type FormState = { name: string; phone: string; service: string }
type FormErrors = Partial<Record<keyof FormState, string>>

const initialForm: FormState = { name: '', phone: '', service: '' }

function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (!digits) return ''
  const normalized = digits[0] === '8' ? `7${digits.slice(1)}` : digits[0] === '7' ? digits : `7${digits}`
  const d = normalized.slice(0, 11)
  let result = '+7'
  if (d.length > 1) result += ` ${d.slice(1, 4)}`
  if (d.length > 4) result += ` ${d.slice(4, 7)}`
  if (d.length > 7) result += `-${d.slice(7, 9)}`
  if (d.length > 9) result += `-${d.slice(9, 11)}`
  return result
}

export function ContactModal({ open, onClose }: Props) {
  const reduceMotion = useReducedMotion()
  const dialogRef = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'unconfigured' | 'error'>('idle')

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLElement>('input, select, button')?.focus())

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusables = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button, input, select, a[href], [tabindex]:not([tabindex="-1"])')).filter((el) => !el.hasAttribute('disabled'))
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previous?.focus()
    }
  }, [open, onClose])

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    if (status === 'unconfigured' || status === 'error') setStatus('idle')
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    const nextErrors: FormErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Укажите имя.'
    if (form.phone.replace(/\D/g, '').length < 11) nextErrors.phone = 'Укажите полный номер телефона.'
    if (!form.service) nextErrors.service = 'Выберите услугу из прайса.'
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus())
      return
    }
    setStatus('sending')
    const result = await submitLead(form)
    if (result.ok) {
      setStatus('success')
      setErrors({})
      setForm(initialForm)
    } else {
      setStatus(result.reason === 'not-configured' ? 'unconfigured' : 'error')
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : .2 }}
          onMouseDown={(event) => { if (event.currentTarget === event.target) onClose() }}
        >
          <motion.div
            ref={dialogRef}
            className="contact-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: .98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: .985 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          >
            <div className="contact-modal__top">
              <div>
                <span className="eyebrow">Заявка</span>
                <h2 id="contact-modal-title">Связаться с нами</h2>
              </div>
              <button className="icon-button" type="button" onClick={onClose} aria-label="Закрыть форму">×</button>
            </div>

            {status === 'success' ? (
              <div className="form-state" role="status">
                <strong>Заявка отправлена.</strong>
                <p>Спасибо. Форма получила подтверждение от подключенного обработчика.</p>
                <button className="primary-button" type="button" onClick={onClose}>Закрыть</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <label>
                  <span>Имя</span>
                  <input required name="name" autoComplete="name" value={form.name} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} onChange={(e) => updateField('name', e.target.value)} />
                  {errors.name && <small className="field-error" id="name-error">{errors.name}</small>}
                </label>
                <label>
                  <span>Телефон</span>
                  <input required name="phone" inputMode="tel" autoComplete="tel" placeholder="+7 923 000-00-00" value={form.phone} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} onChange={(e) => updateField('phone', normalizePhone(e.target.value))} />
                  {errors.phone && <small className="field-error" id="phone-error">{errors.phone}</small>}
                </label>
                <label>
                  <span>Услуга</span>
                  <select required name="service" value={form.service} aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? 'service-error' : undefined} onChange={(e) => updateField('service', e.target.value)}>
                    <option value="">Выберите услугу</option>
                    {allServices.map((service) => <option value={service} key={service}>{service}</option>)}
                  </select>
                  {errors.service && <small className="field-error" id="service-error">{errors.service}</small>}
                </label>
                <button className="primary-button" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Отправляем…' : 'Отправить заявку'}
                </button>
                {status === 'unconfigured' && (
                  <p className="form-message" role="status">Онлайн-отправка пока не подключена. Можно связаться по телефону <a href={contacts.phoneHref}>{contacts.phoneDisplay}</a> или по email <a href={`mailto:${contacts.email}`}>{contacts.email}</a>.</p>
                )}
                {status === 'error' && <p className="form-message form-message--error" role="alert">Не удалось отправить заявку. Попробуйте позже или используйте телефон/email.</p>}
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
