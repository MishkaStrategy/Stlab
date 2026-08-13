import { useId, useRef } from 'react'

const base = import.meta.env.BASE_URL

type VisualVariant = 'zirconia' | 'emax' | 'prosthesis'

type Slide = {
  variant: VisualVariant
  eyebrow: string
  title: string
  aria: string
  description: string
}

const slides: Slide[] = [
  {
    variant: 'zirconia',
    eyebrow: 'Направление',
    title: 'ZrO2',
    aria: 'Абстрактная визуализация керамических коронок ZrO2',
    description: 'Визуальная сцена керамических конструкций ZrO2.',
  },
  {
    variant: 'emax',
    eyebrow: 'Ivoclar IPS E.MAX',
    title: 'Керамическая реставрация',
    aria: 'Визуализация керамической реставрации IPS E.MAX',
    description: 'Керамическая реставрация IPS E.MAX в цифровом рабочем процессе.',
  },
  {
    variant: 'prosthesis',
    eyebrow: 'Съёмное / условно съёмное',
    title: 'Протез на имплантах',
    aria: 'Визуализация полного зубного протеза на имплантах',
    description: 'Визуальная сцена протеза на имплантах для портфолио STLab.',
  },
]

function ZirconiaVisual({ aria }: { aria: string }) {
  const uid = useId().replace(/:/g, '')
  const ceramic = `portfolio-ceramic-${uid}`
  const glass = `portfolio-glass-${uid}`
  const glow = `portfolio-glow-${uid}`

  return (
    <svg className="work-visual" viewBox="0 0 920 620" role="img" aria-label={aria} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={ceramic} x1="180" y1="90" x2="700" y2="560" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.38" stopColor="#e8eef1" />
          <stop offset="0.68" stopColor="#bccbd4" />
          <stop offset="1" stopColor="#728a9a" />
        </linearGradient>
        <linearGradient id={glass} x1="130" y1="70" x2="760" y2="560" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#eefaff" stopOpacity=".9" />
          <stop offset=".45" stopColor="#9bc9e4" stopOpacity=".38" />
          <stop offset="1" stopColor="#326783" stopOpacity=".64" />
        </linearGradient>
        <radialGradient id={glow} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(585 260) rotate(90) scale(360 430)">
          <stop stopColor="#5aa6d5" stopOpacity=".26" />
          <stop offset="1" stopColor="#0a1722" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="920" height="620" fill="#06101a" />
      <rect width="920" height="620" fill={`url(#${glow})`} />
      <path d="M36 495C205 401 387 373 571 406c115 20 208 56 313 135" fill="none" stroke="#183d58" strokeWidth="2" opacity=".78" />
      <path d="M54 535c156-71 314-86 463-58 119 23 231 70 350 118" fill="none" stroke="#0f2a3e" strokeWidth="1.5" opacity=".9" />
      <g opacity=".24" stroke="#6aa0bf" strokeWidth="1">
        <path d="M82 96 174 58l92 78-48 94-112-9-24-125Z" />
        <path d="m174 58 44 172m48-94L106 221m-24-125 184 40" />
        <circle cx="174" cy="58" r="4" fill="#8fc5e4" stroke="none" />
        <circle cx="266" cy="136" r="4" fill="#8fc5e4" stroke="none" />
        <circle cx="106" cy="221" r="4" fill="#8fc5e4" stroke="none" />
      </g>

      <ellipse cx="526" cy="482" rx="302" ry="72" fill="#02070b" opacity=".45" />
      <g transform="translate(245 140)">
        <g transform="translate(0 38) rotate(-13 90 150)">
          <path d="M19 76C24 36 49 14 80 17c17 2 25 11 34 11 10 0 18-10 34-11 32-2 55 22 58 63 2 39-12 88-33 116-9 12-20 9-26-6l-16-43c-6-16-27-16-33 0l-16 43c-6 15-17 18-26 6C34 168 15 117 19 76Z" fill={`url(#${ceramic})`} />
          <path d="M42 69c19-28 43-34 67-20 18 11 33 11 51 1 16-9 31-6 43 7" fill="none" stroke="#fff" strokeWidth="5" opacity=".46" />
        </g>
        <g transform="translate(145 4) rotate(-4 90 150)">
          <path d="M19 76C24 36 49 14 80 17c17 2 25 11 34 11 10 0 18-10 34-11 32-2 55 22 58 63 2 39-12 88-33 116-9 12-20 9-26-6l-16-43c-6-16-27-16-33 0l-16 43c-6 15-17 18-26 6C34 168 15 117 19 76Z" fill={`url(#${ceramic})`} />
          <path d="M42 69c19-28 43-34 67-20 18 11 33 11 51 1 16-9 31-6 43 7" fill="none" stroke="#fff" strokeWidth="5" opacity=".58" />
        </g>
        <g transform="translate(293 30) rotate(9 90 150)">
          <path d="M19 76C24 36 49 14 80 17c17 2 25 11 34 11 10 0 18-10 34-11 32-2 55 22 58 63 2 39-12 88-33 116-9 12-20 9-26-6l-16-43c-6-16-27-16-33 0l-16 43c-6 15-17 18-26 6C34 168 15 117 19 76Z" fill={`url(#${ceramic})`} />
          <path d="M42 69c19-28 43-34 67-20 18 11 33 11 51 1 16-9 31-6 43 7" fill="none" stroke="#fff" strokeWidth="5" opacity=".45" />
        </g>
      </g>
      <path d="M676 184 791 145l42 111-118 43Z" fill={`url(#${glass})`} stroke="#bfe4f8" strokeWidth="1.3" opacity=".44" />
      <path d="m700 195 74-25m-64 55 75-26m-64 57 76-26" stroke="#d8effb" strokeWidth="1.2" opacity=".55" />
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
              {slide.variant === 'emax' ? (
                <img
                  className="work-image work-image--emax"
                  src={`${base}stlab-emax.jpg`}
                  alt={slide.aria}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: 'center 54%' }}
                />
              ) : slide.variant === 'prosthesis' ? (
                <img
                  className="work-image work-image--prosthesis"
                  src={`${base}stlab-prosthesis.webp`}
                  alt={slide.aria}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: 'center 56%' }}
                />
              ) : (
                <ZirconiaVisual aria={slide.aria} />
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
