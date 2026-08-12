import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent } from 'react'
import { ContactModal } from './components/ContactModal'
import { Logo } from './components/Logo'
import { PolygonField } from './components/PolygonField'
import { Specimen } from './components/Specimen'
import { contacts, formatPrice, sections, type LabSection } from './data/services'

function ContactButton({ onClick, dark = false }: { onClick: () => void; dark?: boolean }) {
  return (
    <button className={`cta ${dark ? 'cta--light' : ''}`} onClick={(event: MouseEvent<HTMLButtonElement>) => { event.stopPropagation(); onClick() }}>
      Связаться с нами <span aria-hidden="true">↗</span>
    </button>
  )
}

function PreviewPrice({ section }: { section: LabSection }) {
  if (section.id === 'hero') return <span className="preview-price">NSK / 54.98°N</span>
  const min = Math.min(...section.services.map((service) => service.price))
  return <span className="preview-price">от {formatPrice(min)}</span>
}

function BentoCard({
  section,
  index,
  activeId,
  onOpen,
  onContact,
  reduceMotion,
}: {
  section: LabSection
  index: number
  activeId: string | null
  onOpen: (id: string) => void
  onContact: () => void
  reduceMotion: boolean | null
}) {
  const isActive = activeId === section.id
  const hasActive = Boolean(activeId)
  const flyDirection = index < 4 ? -1 : 1
  const isHero = section.id === 'hero'

  return (
    <motion.article
      className={`bento-card bento-card--${section.id} tone--${section.tone} ${hasActive ? 'scene-active' : ''}`}
      layoutId={`card-${section.id}`}
      initial={{ opacity: 0, y: index % 2 === 0 ? 36 : -36 }}
      animate={hasActive && !isActive
        ? (reduceMotion ? { opacity: 0, y: 0 } : { opacity: 1, y: `${flyDirection * 125}vh`, scale: .98 })
        : { opacity: 1, y: 0, scale: 1 }}
      transition={{
        layout: { duration: .72, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: reduceMotion ? .1 : .3 },
        y: { duration: reduceMotion ? .1 : .68, ease: [0.22, 1, 0.36, 1] },
      }}
      role="button"
      tabIndex={0}
      aria-label={`Открыть раздел: ${section.title}`}
      onClick={() => onOpen(section.id)}
      onKeyDown={(event: ReactKeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onOpen(section.id)
        }
      }}
      style={{ pointerEvents: hasActive ? 'none' : 'auto' }}
    >
      <div className="card-no">{section.number}</div>
      <div className="tech-caption">{section.material}</div>
      <div className="crosshair crosshair--a" />
      <div className="crosshair crosshair--b" />

      <div className="card-content">
        {isHero ? <Logo /> : <h2>{section.shortTitle}</h2>}
        <p>{section.caption}</p>
      </div>

      <Specimen type={section.specimen} />

      <div className="card-footer">
        <PreviewPrice section={section} />
        <ContactButton onClick={onContact} dark={section.tone === 'dark' || section.tone === 'accent' || section.tone === 'metal'} />
      </div>

      {section.id === 'removable' && (
        <div className="mini-contact">
          <span>{contacts.phoneDisplay}</span>
          <span>{contacts.email}</span>
        </div>
      )}
    </motion.article>
  )
}

function ExpandedSection({
  section,
  onClose,
  onContact,
  reduceMotion,
}: {
  section: LabSection
  onClose: () => void
  onContact: () => void
  reduceMotion: boolean | null
}) {
  const isHero = section.id === 'hero'

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (document.querySelector('.contact-modal')) return
        onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <motion.article
      className={`expanded-panel tone--${section.tone}`}
      layoutId={`card-${section.id}`}
      transition={{ duration: reduceMotion ? .12 : .72, ease: [0.22, 1, 0.36, 1] }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`expanded-${section.id}`}
    >
      <PolygonField />
      <div className="expanded-panel__chrome">
        <div className="expanded-panel__meta">
          <span>{section.number}</span>
          <span>{section.material}</span>
          <span>STLAB / DIGITAL OBJECT</span>
        </div>
        <button className="icon-button" onClick={onClose} aria-label="Закрыть раздел">×</button>
      </div>

      <div className="expanded-panel__content">
        <div className="expanded-panel__left">
          <div className="eyebrow">{section.caption}</div>
          {isHero ? <Logo /> : <h1 id={`expanded-${section.id}`}>{section.title}</h1>}

          {isHero ? (
            <div className="hero-expanded-copy">
              <p>Цифровая зуботехническая лаборатория STLab.</p>
              <div className="hero-location">
                <span>{contacts.city}, {contacts.postalCode}</span>
                <span>{contacts.address}</span>
                <a href={contacts.phoneHref}>{contacts.phoneDisplay}</a>
                <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
              </div>
            </div>
          ) : (
            <ol className="price-list">
              {section.services.map((service, index) => (
                <motion.li
                  key={service.name}
                  initial={reduceMotion ? false : { opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduceMotion ? 0 : .16 + index * .035 }}
                >
                  <span className="price-list__index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="price-list__name">
                    {service.name}
                    {service.note && <small>{service.note}</small>}
                  </span>
                  <span className="price-list__dots" aria-hidden="true" />
                  <strong>{formatPrice(service.price)}</strong>
                </motion.li>
              ))}
            </ol>
          )}

          <ContactButton onClick={onContact} dark={section.tone === 'dark' || section.tone === 'accent' || section.tone === 'metal'} />
        </div>

        <div className="expanded-panel__visual">
          <Specimen type={section.specimen} expanded />
          <div className="visual-coordinates">
            <span>X 054.980</span>
            <span>Y 082.890</span>
            <span>Z / STL</span>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function App() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [contactOpen, setContactOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  const activeSection = useMemo(
    () => sections.find((section) => section.id === activeId) ?? null,
    [activeId],
  )

  useEffect(() => {
    if (!activeId) return
    const timer = window.setTimeout(() => {
      const button = document.querySelector<HTMLButtonElement>('.expanded-panel .icon-button')
      button?.focus()
    }, reduceMotion ? 20 : 500)
    return () => window.clearTimeout(timer)
  }, [activeId, reduceMotion])

  return (
    <main className="lab-scene">
      <PolygonField />
      <div className="scene-status" aria-hidden="true">
        <span>STLAB / DIGITAL LABORATORY CONSOLE</span>
        <span>STATUS: READY</span>
      </div>

      <section className="bento-grid" aria-label="Направления лаборатории STLab">
        {sections.map((section, index) => (
          <BentoCard
            key={section.id}
            section={section}
            index={index}
            activeId={activeId}
            onOpen={setActiveId}
            onContact={() => setContactOpen(true)}
            reduceMotion={reduceMotion}
          />
        ))}
      </section>

      <AnimatePresence>
        {activeSection && (
          <ExpandedSection
            key={activeSection.id}
            section={activeSection}
            onClose={() => setActiveId(null)}
            onContact={() => setContactOpen(true)}
            reduceMotion={reduceMotion}
          />
        )}
      </AnimatePresence>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  )
}
