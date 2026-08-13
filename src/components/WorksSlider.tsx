import { useId, useRef } from 'react'

const base = import.meta.env.BASE_URL

type VisualVariant = 'prosthesis' | 'emax' | 'navigation'

type Slide = {
  variant: VisualVariant
  eyebrow: string
  title: string
  aria: string
  description: string
}

const slides: Slide[] = [
  {
    variant: 'prosthesis',
    eyebrow: 'Съёмное / условно съёмное',
    title: 'Протез на имплантах',
    aria: 'Визуализация полного зубного протеза на имплантах',
    description: 'Визуальная сцена протеза на имплантах для портфолио STLab.',
  },
  {
    variant: 'emax',
    eyebrow: 'Направление',
    title: 'IPS E.MAX',
    aria: 'Абстрактная визуализация коронки IPS E.MAX',
    description: 'Визуальная сцена керамической реставрации IPS E.MAX.',
  },
  {
    variant: 'navigation',
    eyebrow: 'Направление',
    title: 'Навигационный протокол',
    aria: 'Абстрактная визуализация навигационного шаблона',
    description: 'Визуальная сцена навигационного шаблона и цифрового протокола.',
  },
]

function VectorVisual({ variant, aria }: { variant: Exclude<VisualVariant, 'prosthesis'>; aria: string }) {
  const uid = useId().replace(/:/g, '')
  const ceramic = `portfolio-ceramic-${uid}`
  const glass = `portfolio-glass-${uid}`
  const metal = `portfolio-metal-${uid}`
  const glow = `portfolio-glow-${uid}`

  return (
    <svg className="work-visual" viewBox="0 0 920 620" role="img" aria-label={aria} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={ceramic} x1="190" y1="95" x2="720" y2="550" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fffdf4" />
          <stop offset=".4" stopColor="#e7e7df" />
          <stop offset=".72" stopColor="#aebfca" />
          <stop offset="1" stopColor="#667f90" />
        </linearGradient>
        <linearGradient id={glass} x1="120" y1="80" x2="760" y2="560" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#effaff" stopOpacity=".88" />
          <stop offset=".45" stopColor="#8cc5e2" stopOpacity=".32" />
          <stop offset="1" stopColor="#2d607d" stopOpacity=".62" />
        </linearGradient>
        <linearGradient id={metal} x1="230" y1="90" x2="710" y2="530" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f7fbfc" />
          <stop offset=".24" stopColor="#6f8592" />
          <stop offset=".48" stopColor="#edf4f7" />
          <stop offset=".76" stopColor="#4e6471" />
          <stop offset="1" stopColor="#bdcbd2" />
        </linearGradient>
        <radialGradient id={glow} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(570 275) rotate(90) scale(360 430)">
          <stop stopColor="#4ea9dc" stopOpacity=".23" />
          <stop offset="1" stopColor="#08131e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="920" height="620" fill="#06101a" />
      <rect width="920" height="620" fill={`url(#${glow})`} />
      <path d="M26 500C211 399 398 378 576 412c121 23 215 63 322 139" fill="none" stroke="#173d58" strokeWidth="2" opacity=".72" />
      <path d="M54 544c163-75 329-89 480-57 122 26 231 73 344 120" fill="none" stroke="#0e293d" strokeWidth="1.5" opacity=".86" />

      {variant === 'emax' && (
        <>
          <ellipse cx="535" cy="493" rx="250" ry="58" fill="#02070b" opacity=".42" />
          <g transform="translate(340 122) rotate(6 165 190)">
            <path d="M72 69c10-38 42-58 87-54 18 2 36 12 50 25 15-11 35-18 55-16 44 5 70 39 67 84-4 60-42 164-87 205-16 15-35 8-41-14l-18-68c-5-19-32-21-40-3l-28 65c-9 21-29 25-43 8-37-45-64-171-2-232Z" fill={`url(#${ceramic})`} />
            <path d="M102 82c36-38 76-42 111-11 26-21 63-20 91 6" fill="none" stroke="#fff" strokeWidth="7" opacity=".52" />
            <path d="M119 150c40-18 85-22 137-4" fill="none" stroke="#a7cfe7" strokeWidth="3" opacity=".52" />
          </g>
          <g transform="translate(176 288) rotate(-16 110 55)">
            <rect width="222" height="112" rx="14" fill={`url(#${glass})`} stroke="#acd9f2" strokeWidth="1.3" opacity=".5" />
            <path d="M28 31h166M28 56h141M28 81h112" stroke="#dff3fc" strokeWidth="2" opacity=".45" />
          </g>
          <g transform="translate(690 356) rotate(12)">
            <path d="M0 16h112v28H0z" fill={`url(#${metal})`} />
            <path d="m112 8 61 22-61 22Z" fill={`url(#${metal})`} />
          </g>
        </>
      )}

      {variant === 'navigation' && (
        <>
          <ellipse cx="530" cy="493" rx="302" ry="66" fill="#02070b" opacity=".38" />
          <g transform="translate(220 126)">
            <path d="M50 77C132 24 279 12 409 57c64 22 118 61 150 108-62 61-146 101-244 105C201 275 105 237 36 164 29 128 33 99 50 77Z" fill={`url(#${glass})`} stroke="#bfe3f6" strokeWidth="2" opacity=".72" />
            <path d="M86 101c111-45 238-48 358-8 33 11 62 26 88 45" fill="none" stroke="#d9f1fc" strokeWidth="3" opacity=".5" />
            <path d="M84 160c110 48 235 55 356 15" fill="none" stroke="#72a9c8" strokeWidth="2" opacity=".52" />
            {[150, 265, 378].map((x) => (
              <g key={x} transform={`translate(${x} 115)`}>
                <ellipse rx="37" ry="25" fill="#07131e" opacity=".74" />
                <ellipse rx="25" ry="16" fill={`url(#${metal})`} />
                <ellipse rx="12" ry="8" fill="#0c1c28" />
                <path d="M-23 0h46M0-15v30" stroke="#f2f8fb" strokeWidth="1.2" opacity=".4" />
              </g>
            ))}
          </g>
          <g transform="translate(683 343)">
            <path d="M0 0h56v145H0z" fill={`url(#${metal})`} />
            <ellipse cx="28" cy="0" rx="28" ry="13" fill="#edf3f5" />
            <ellipse cx="28" cy="0" rx="12" ry="6" fill="#182a35" />
            <path d="M10 37h36M10 63h36M10 89h36M10 115h36" stroke="#526671" strokeWidth="2" />
          </g>
        </>
      )}
    </svg>
  )
}

export function WorksSlider() {
  const ref = useRef<HTMLDivElement>(null)
  const drag = useRef<{ active: boolean; startX: number; scrollLeft: number }>({ active: false, startX: 0, scrollLeft: 0 })

  const move = (direction: 1 | -1) => {
    const node = ref.current
    if (!node) return
    node.scrollBy({ left: direction * node.clientWidth * .9, behavior: 'smooth' })
  }

  return (
    <div className="works-slider-shell">
      <div className="works-slider-controls" aria-label="Навигация по визуализациям">
        <button className="icon-button" type="button" onClick={() => move(-1)} aria-label="Предыдущая визуализация">←</button>
        <button className="icon-button" type="button" onClick={() => move(1)} aria-label="Следующая визуализация">→</button>
      </div>
      <div
        className="works-slider"
        ref={ref}
        tabIndex={0}
        onPointerDown={(event) => {
          if (event.pointerType !== 'mouse' || event.button !== 0) return
          drag.current = { active: true, startX: event.clientX, scrollLeft: event.currentTarget.scrollLeft }
          event.currentTarget.setPointerCapture(event.pointerId)
          event.currentTarget.style.cursor = 'grabbing'
        }}
        onPointerMove={(event) => {
          if (!drag.current.active || event.pointerType !== 'mouse') return
          event.currentTarget.scrollLeft = drag.current.scrollLeft - (event.clientX - drag.current.startX)
        }}
        onPointerUp={(event) => {
          drag.current.active = false
          event.currentTarget.style.cursor = 'grab'
          if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
        }}
        onPointerCancel={(event) => {
          drag.current.active = false
          event.currentTarget.style.cursor = 'grab'
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') move(-1)
          if (event.key === 'ArrowRight') move(1)
        }}
        onWheel={(event) => {
          if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) event.currentTarget.scrollLeft += event.deltaY
        }}
        aria-label="Визуальная галерея направлений STLab"
      >
        {slides.map((slide) => (
          <article className="work-slide" key={slide.variant}>
            <div className="work-slide__media">
              {slide.variant === 'prosthesis' ? (
                <img
                  className="work-image work-image--prosthesis"
                  src={`${base}stlab-prosthesis.webp`}
                  alt={slide.aria}
                  loading="eager"
                  decoding="async"
                  style={{ objectPosition: 'center 56%' }}
                />
              ) : (
                <VectorVisual variant={slide.variant} aria={slide.aria} />
              )}
            </div>
            <div className="work-slide__copy">
              <span className="eyebrow">{slide.eyebrow}</span>
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
