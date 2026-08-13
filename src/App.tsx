import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ContactModal } from './components/ContactModal'
import { DentalObject, type DentalObjectVariant } from './components/DentalObject'
import { Logo } from './components/Logo'
import { PriceList } from './components/PriceList'
import { WorksSlider } from './components/WorksSlider'
import { contacts } from './data/services'

type PanelId = 'hero' | 'about' | 'price' | 'works' | 'contacts'

type CardConfig = {
  id: PanelId
  title: string
  aria: string
  variant: DentalObjectVariant
  className: string
  escape: { x?: string; y?: string }
}

const cards: CardConfig[] = [
  { id: 'hero', title: 'STLab', aria: 'STLab — лаборатория с особым подходом', variant: 'hero', className: 'bento-card--hero', escape: { x: '-40vw', y: '-30vh' } },
  { id: 'works', title: 'Наши работы', aria: 'Открыть наши работы', variant: 'works', className: 'bento-card--works', escape: { x: '48vw', y: '-22vh' } },
  { id: 'about', title: 'О лаборатории', aria: 'Открыть информацию о лаборатории', variant: 'about', className: 'bento-card--about', escape: { x: '-45vw', y: '28vh' } },
  { id: 'price', title: 'Прайс лаборатории', aria: 'Открыть прайс лаборатории', variant: 'price', className: 'bento-card--price', escape: { x: '16vw', y: '38vh' } },
  { id: 'contacts', title: 'МЫ В НОВОСИБИРСКЕ', aria: 'Открыть контакты', variant: 'contacts', className: 'bento-card--contacts', escape: { x: '48vw', y: '32vh' } },
]

function Arrow() {
  return (
    <svg className="arrow-icon" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 13 13 3M6 3h7v7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  )
}

function BentoCard({ card, active, onOpen }: { card: CardConfig; active: PanelId | null; onOpen: () => void }) {
  const reduceMotion = useReducedMotion()
  if (active === card.id) return <div className={`bento-placeholder ${card.className}`} aria-hidden="true" />

  const escaping = active !== null
  const isWorks = card.id === 'works'

  return (
    <motion.article
      layoutId={`bento-${card.id}`}
      role="button"
      tabIndex={escaping ? -1 : 0}
      className={`bento-card ${card.className}`}
      aria-label={card.aria}
      aria-hidden={escaping || undefined}
      onClick={escaping ? undefined : onOpen}
      onKeyDown={(event) => {
        if (escaping) return
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onOpen()
        }
      }}
      animate={escaping && !reduceMotion ? { x: card.escape.x ?? 0, y: card.escape.y ?? 0, opacity: 0, scale: .94 } : { x: 0, y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: reduceMotion ? .01 : .58, ease: [0.22, 1, 0.36, 1] }}
      whileTap={reduceMotion || escaping ? undefined : { scale: .985 }}
    >
      {card.id === 'hero' ? (
        <>
          <Logo compact />
          <div className="bento-card__copy hero-copy">
            <h1>Лаборатория<br />с особым подходом</h1>
          </div>
        </>
      ) : !isWorks ? (
        <div className="bento-card__copy">
          <h2>{card.title}</h2>
          {card.id !== 'contacts' && <span className="card-link">Подробнее <Arrow /></span>}
        </div>
      ) : null}
      {!isWorks && <DentalObject variant={card.variant} />}
      {card.id === 'contacts' && <span className="location-meta">Кирова, 276 <Arrow /></span>}
    </motion.article>
  )
}

function ExpandedPanel({ panel, onClose, onContact }: { panel: PanelId; onClose: () => void; onContact: () => void }) {
  const reduceMotion = useReducedMotion()
  const panelRef = useRef<HTMLElement>(null)
  const card = cards.find((item) => item.id === panel)!

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    const oldOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>('.icon-button--close')?.focus())

    const onKey = (event: KeyboardEvent) => {
      if (document.querySelector('.modal-backdrop')) return
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return
      const focusables = Array.from(panelRef.current.querySelectorAll<HTMLElement>('button, a[href], iframe, [tabindex]:not([tabindex="-1"])')).filter((element) => !element.hasAttribute('disabled'))
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = oldOverflow
      previous?.focus()
    }
  }, [onClose])

  return (
    <motion.section
      ref={panelRef}
      layoutId={`bento-${panel}`}
      className={`expanded-panel expanded-panel--${panel}`}
      role="dialog"
      aria-modal="true"
      aria-label={card.aria}
      transition={{ layout: { type: 'spring', stiffness: reduceMotion ? 1000 : 190, damping: reduceMotion ? 100 : 25, mass: .9 } }}
    >
      <div className="expanded-panel__noise" aria-hidden="true" />
      <header className="expanded-panel__header">
        <Logo compact />
        <button className="icon-button icon-button--close" type="button" onClick={onClose} aria-label="Закрыть раздел">×</button>
      </header>
      <DentalObject variant={card.variant} expanded />

      {panel === 'hero' && (
        <div className="expanded-content expanded-content--hero">
          <span className="eyebrow">STLab — Новосибирск</span>
          <h2>Цифровая зуботехническая лаборатория</h2>
          <p>STLab работает с цифровыми диагностическими услугами, изделиями из ZrO2, PMMA и керамокомпозита, Ivoclar IPS E.MAX, титаном, навигационными протоколами и съёмными конструкциями.</p>
          <div className="advantages">
            <article><span className="mini-orb mini-orb--glass" /><strong>Цифровой цикл</strong><small>WAX-UP exo-cad, сканирование, 3D-печать</small></article>
            <article><span className="mini-orb mini-orb--ceramic" /><strong>Материалы</strong><small>ZrO2, E.MAX, Ti, PMMA / керамокомпозит</small></article>
            <article><span className="mini-orb mini-orb--mesh" /><strong>Навигация</strong><small>Пилотный и навигационный протоколы</small></article>
          </div>
          <button className="primary-button" type="button" onClick={onContact}>Связаться с нами</button>
        </div>
      )}

      {panel === 'about' && (
        <div className="expanded-content expanded-content--about">
          <div className="expanded-title"><span className="eyebrow">О лаборатории</span><h2>Лаборатория<br />с особым подходом</h2></div>
          <div className="about-bento">
            <article><span>Специализация</span><strong>Цифровая зуботехническая лаборатория</strong></article>
            <article><span>Подход</span><p>WAX-UP exo-cad, сканирование и 3D-печать входят в перечень услуг STLab.</p></article>
            <article><span>Направления</span><p>ZrO2, E.MAX, титан, PMMA / керамокомпозит, навигационные шаблоны и съёмные конструкции.</p></article>
            <article className="about-bento__cta"><button className="primary-button" type="button" onClick={onContact}>Связаться с нами</button></article>
          </div>
        </div>
      )}

      {panel === 'price' && (
        <div className="expanded-content expanded-content--price">
          <div className="expanded-title"><span className="eyebrow">Прайс 2026</span><h2>Прайс лаборатории</h2></div>
          <PriceList />
        </div>
      )}

      {panel === 'works' && (
        <div className="expanded-content expanded-content--works">
          <div className="expanded-title"><span className="eyebrow">Портфолио</span><h2>Наши работы</h2></div>
          <WorksSlider />
        </div>
      )}

      {panel === 'contacts' && (
        <div className="expanded-content expanded-content--contacts">
          <div className="contacts-copy">
            <span className="eyebrow">Контакты</span>
            <h2>МЫ В<br />НОВОСИБИРСКЕ</h2>
            <p>{contacts.name}</p>
            <dl>
              <div><dt>Адрес</dt><dd>{contacts.cityLine}<br />{contacts.address}</dd></div>
              <div><dt>Телефон</dt><dd><a href={contacts.phoneHref}>{contacts.phoneDisplay}</a></dd></div>
              <div><dt>Email</dt><dd><a href={`mailto:${contacts.email}`}>{contacts.email}</a></dd></div>
            </dl>
            <button className="primary-button" type="button" onClick={onContact}>Связаться с нами</button>
          </div>
          <div className="map-shell">
            <iframe title="Карта: STLab, Новосибирск, ул. Кирова, 276" loading="lazy" src="https://yandex.ru/map-widget/v1/?text=%D0%9D%D0%BE%D0%B2%D0%BE%D1%81%D0%B8%D0%B1%D0%B8%D1%80%D1%81%D0%BA%2C%20%D1%83%D0%BB.%20%D0%9A%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%2C%20276&z=16" />
          </div>
        </div>
      )}
    </motion.section>
  )
}

export default function App() {
  const [active, setActive] = useState<PanelId | null>(null)
  const [contactOpen, setContactOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const open = useCallback((id: PanelId) => {
    setMenuOpen(false)
    setActive(id)
  }, [])
  const closePanel = useCallback(() => setActive(null), [])
  const openContact = useCallback(() => setContactOpen(true), [])
  const closeContact = useCallback(() => setContactOpen(false), [])

  return (
    <LayoutGroup>
      <main className="app-shell">
        <div className="ambient ambient--one" aria-hidden="true" />
        <div className="ambient ambient--two" aria-hidden="true" />
        <header className="site-header">
          <button className="header-logo" type="button" onClick={() => open('hero')} aria-label="Открыть STLab"><Logo compact /></button>
          <nav className="desktop-nav" aria-label="Основная навигация">
            <button aria-pressed={active === 'about'} onClick={() => open('about')}>О нас</button>
            <button aria-pressed={active === 'works'} onClick={() => open('works')}>Кейсы</button>
            <button aria-pressed={active === 'price'} onClick={() => open('price')}>Прайс</button>
            <button aria-pressed={active === 'contacts'} onClick={() => open('contacts')}>Контакты</button>
          </nav>
          <button className="header-cta" type="button" onClick={openContact}><span className="header-cta__wide">Связаться с нами</span><span className="header-cta__short">Связаться</span></button>
          <button className="mobile-menu-button" type="button" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? '×' : 'Меню'}</button>
          <AnimatePresence>
            {menuOpen && (
              <motion.nav id="mobile-menu" className="mobile-nav" aria-label="Мобильная навигация" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <button aria-pressed={active === 'about'} onClick={() => open('about')}>О нас</button>
                <button aria-pressed={active === 'works'} onClick={() => open('works')}>Кейсы</button>
                <button aria-pressed={active === 'price'} onClick={() => open('price')}>Прайс</button>
                <button aria-pressed={active === 'contacts'} onClick={() => open('contacts')}>Контакты</button>
              </motion.nav>
            )}
          </AnimatePresence>
        </header>

        <section className="bento-grid" aria-label="Разделы STLab">
          {cards.map((card) => <BentoCard key={card.id} card={card} active={active} onOpen={() => open(card.id)} />)}
        </section>

        <AnimatePresence mode="sync">
          {active && <ExpandedPanel key={active} panel={active} onClose={closePanel} onContact={openContact} />}
        </AnimatePresence>
        <ContactModal open={contactOpen} onClose={closeContact} />
      </main>
    </LayoutGroup>
  )
}
