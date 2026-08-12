import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState, type MouseEvent } from 'react'
import { ArrowIcon } from './components/ArrowIcon'
import { ContactModal } from './components/ContactModal'
import { Logo } from './components/Logo'
import { PolygonField } from './components/PolygonField'
import { Specimen } from './components/Specimen'
import { contacts, formatPrice, sections } from './data/services'

type PanelId = 'about' | 'works' | 'price' | 'contacts'

function ContactButton({ onClick, light = false }: { onClick: () => void; light?: boolean }) {
  return (
    <button
      className={`landing-contact ${light ? 'landing-contact--light' : ''}`}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        onClick()
      }}
    >
      Связаться с нами
      <ArrowIcon />
    </button>
  )
}

function FolderVisual() {
  return (
    <svg className="folder-visual" viewBox="0 0 320 250" aria-hidden="true">
      <defs>
        <linearGradient id="folderBack" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff3658" />
          <stop offset="1" stopColor="#cf002a" />
        </linearGradient>
        <linearGradient id="folderFront" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff203f" />
          <stop offset="1" stopColor="#c90028" />
        </linearGradient>
      </defs>
      <path d="M36 76h87l25 25h136v105H36z" fill="url(#folderBack)" />
      <path d="M54 94h216v103H54z" fill="#f6f5f2" opacity=".96" />
      <path d="M68 107h188v86H68z" fill="#e7e8e8" />
      <path d="M30 112h255l-14 111H43z" fill="url(#folderFront)" />
      <path d="M42 122h231" stroke="#ff6b80" strokeWidth="3" opacity=".7" />
    </svg>
  )
}

function PriceVisual() {
  return (
    <svg className="price-visual" viewBox="0 0 330 270" aria-hidden="true">
      <defs>
        <linearGradient id="bill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#dedfe0" />
          <stop offset="1" stopColor="#8f9499" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3].map((index) => (
        <g key={index} transform={`translate(${58 + index * 18} ${84 - index * 12}) rotate(${index * 3 - 6} 100 60)`}>
          <rect width="190" height="105" fill="url(#bill)" />
          <rect x="14" y="14" width="162" height="77" fill="none" stroke="#747a80" strokeWidth="2" />
          <circle cx="95" cy="52" r="23" fill="#c6c8ca" stroke="#777d82" strokeWidth="2" />
          <path d="M23 29h38M129 76h38" stroke="#777d82" strokeWidth="3" />
        </g>
      ))}
    </svg>
  )
}

function PinIcon() {
  return (
    <svg className="pin-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s6-5.2 6-11A6 6 0 1 0 6 10c0 5.8 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  )
}

function LandingTile({
  className,
  label,
  onClick,
  children,
}: {
  className: string
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <motion.button
      className={`landing-tile ${className}`}
      type="button"
      aria-label={label}
      onClick={onClick}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .58, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.006 }}
      whileTap={{ scale: .995 }}
    >
      {children}
    </motion.button>
  )
}

function DetailPanel({
  panel,
  onClose,
  onContact,
}: {
  panel: PanelId
  onClose: () => void
  onContact: () => void
}) {
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <motion.section
      className="detail-panel"
      role="dialog"
      aria-modal="true"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(8% 8% 8% 8%)' }}
      animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(8% 8% 8% 8%)' }}
      transition={{ duration: reduceMotion ? .12 : .48, ease: [0.22, 1, 0.36, 1] }}
    >
      <PolygonField />
      <div className="detail-panel__top">
        <Logo compact />
        <button className="detail-panel__close" type="button" onClick={onClose} aria-label="Закрыть раздел">×</button>
      </div>

      {panel === 'about' && (
        <div className="detail-panel__body detail-panel__body--about">
          <div>
            <div className="detail-kicker">О нашей организации</div>
            <h2>Лаборатория<br />с особым подходом</h2>
          </div>
          <div className="about-copy">
            <p>STLab — цифровая зуботехническая лаборатория.</p>
            <div className="source-contact-list">
              <span>г. {contacts.city}, {contacts.postalCode}</span>
              <span>{contacts.address}</span>
              <a href={contacts.phoneHref}>{contacts.phoneDisplay}</a>
              <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
            </div>
            <ContactButton onClick={onContact} light />
          </div>
        </div>
      )}

      {panel === 'works' && (
        <div className="detail-panel__body detail-panel__body--works">
          <div className="detail-heading-row">
            <div className="detail-kicker">Кейсы</div>
            <h2>Наши работы</h2>
          </div>
          <div className="works-grid">
            <article className="work-card">
              <span>Изделия из ZrO2</span>
              <Specimen type="crown" expanded />
            </article>
            <article className="work-card">
              <span>IVOCLAR IPS E.MAX</span>
              <Specimen type="emax" expanded />
            </article>
            <article className="work-card">
              <span>Изделия из титана (Ti)</span>
              <Specimen type="implant" expanded />
            </article>
          </div>
        </div>
      )}

      {panel === 'price' && (
        <div className="detail-panel__body detail-panel__body--price">
          <div className="detail-heading-row">
            <div className="detail-kicker">Прайс лист</div>
            <h2>Прайс лаборатории</h2>
          </div>
          <div className="full-price-list">
            {sections.filter((section) => section.id !== 'hero').map((section) => (
              <section className="price-group" key={section.id}>
                <h3>{section.title}</h3>
                <ol>
                  {section.services.map((service) => (
                    <li key={service.name}>
                      <span>
                        {service.name}
                        {service.note && <small>{service.note}</small>}
                      </span>
                      <strong>{formatPrice(service.price)}</strong>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        </div>
      )}

      {panel === 'contacts' && (
        <div className="detail-panel__body detail-panel__body--contacts">
          <div>
            <div className="detail-kicker">Контакты</div>
            <h2>Мы в<br />Новосибирске</h2>
          </div>
          <div className="contacts-plate">
            <PinIcon />
            <span>г. {contacts.city}, {contacts.postalCode}</span>
            <span>{contacts.address}</span>
            <a href={contacts.phoneHref}>{contacts.phoneDisplay}</a>
            <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
            <ContactButton onClick={onContact} light />
          </div>
        </div>
      )}
    </motion.section>
  )
}

export default function App() {
  const [panel, setPanel] = useState<PanelId | null>(null)
  const [contactOpen, setContactOpen] = useState(false)

  const openContact = () => setContactOpen(true)

  return (
    <main className="landing-page">
      <PolygonField />
      <section className="landing-grid" aria-label="STLab — цифровая зуботехническая лаборатория">
        <header className="landing-topbar">
          <nav className="landing-nav" aria-label="Основная навигация">
            <button type="button" onClick={() => setPanel('about')}>О нас</button>
            <button type="button" onClick={() => setPanel('works')}>Кейсы</button>
            <button type="button" onClick={() => setPanel('price')}>Прайс</button>
            <button type="button" onClick={() => setPanel('contacts')}>Контакты</button>
          </nav>
          <button className="landing-topbar__contact" type="button" onClick={openContact}>Связаться с нами</button>
        </header>

        <LandingTile className="landing-tile--hero" label="О нашей организации" onClick={() => setPanel('about')}>
          <Logo compact />
          <h1>Лаборатория<br />с особым подходом</h1>
          <div className="hero-mesh" aria-hidden="true" />
        </LandingTile>

        <LandingTile className="landing-tile--works" label="Наши работы" onClick={() => setPanel('works')}>
          <h2>Наши<br />работы</h2>
          <Specimen type="arch" />
          <div className="works-link">Смотреть все <ArrowIcon /></div>
        </LandingTile>

        <LandingTile className="landing-tile--about" label="О нашей организации" onClick={() => setPanel('about')}>
          <h2>О нашей<br />организации</h2>
          <FolderVisual />
        </LandingTile>

        <LandingTile className="landing-tile--price" label="Прайс лаборатории" onClick={() => setPanel('price')}>
          <h2>Прайс<br />лаборатории</h2>
          <PriceVisual />
        </LandingTile>

        <LandingTile className="landing-tile--location" label="Мы в Новосибирске" onClick={() => setPanel('contacts')}>
          <PinIcon />
          <h2>Мы в Новосибирске</h2>
        </LandingTile>
      </section>

      <AnimatePresence>
        {panel && (
          <DetailPanel
            key={panel}
            panel={panel}
            onClose={() => setPanel(null)}
            onContact={openContact}
          />
        )}
      </AnimatePresence>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  )
}
