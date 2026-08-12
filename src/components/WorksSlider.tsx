import { useRef } from 'react'

const base = import.meta.env.BASE_URL

const slides = [
  {
    src: `${base}stlab-work-01.jpg`,
    title: 'Работа STLab',
    description: 'Фотография из портфолио STLab.',
  },
]

export function WorksSlider() {
  const ref = useRef<HTMLDivElement>(null)
  const drag = useRef<{ active: boolean; startX: number; scrollLeft: number }>({ active: false, startX: 0, scrollLeft: 0 })
  const hasMultipleSlides = slides.length > 1

  const move = (direction: 1 | -1) => {
    const node = ref.current
    if (!node || !hasMultipleSlides) return
    node.scrollBy({ left: direction * node.clientWidth * .86, behavior: 'smooth' })
  }

  return (
    <div className={`works-slider-shell ${hasMultipleSlides ? '' : 'works-slider-shell--single'}`}>
      {hasMultipleSlides && (
        <div className="works-slider-controls" aria-label="Навигация по работам">
          <button className="icon-button" type="button" onClick={() => move(-1)} aria-label="Предыдущая работа">←</button>
          <button className="icon-button" type="button" onClick={() => move(1)} aria-label="Следующая работа">→</button>
        </div>
      )}
      <div
        className="works-slider"
        ref={ref}
        tabIndex={hasMultipleSlides ? 0 : -1}
        onPointerDown={(event) => {
          if (!hasMultipleSlides || event.pointerType !== 'mouse' || event.button !== 0) return
          drag.current = { active: true, startX: event.clientX, scrollLeft: event.currentTarget.scrollLeft }
          event.currentTarget.setPointerCapture(event.pointerId)
          event.currentTarget.style.cursor = 'grabbing'
        }}
        onPointerMove={(event) => {
          if (!hasMultipleSlides || !drag.current.active || event.pointerType !== 'mouse') return
          event.currentTarget.scrollLeft = drag.current.scrollLeft - (event.clientX - drag.current.startX)
        }}
        onPointerUp={(event) => {
          if (!drag.current.active) return
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
          if (!hasMultipleSlides) return
          if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) event.currentTarget.scrollLeft += event.deltaY
        }}
        aria-label="Галерея работ STLab"
      >
        {slides.map((slide) => (
          <article className="work-slide" key={slide.src}>
            <div className="work-slide__media">
              <img className="work-image" src={slide.src} alt="Зуботехническая работа STLab из портфолио" loading="eager" />
            </div>
            <div className="work-slide__copy">
              <span className="eyebrow">Портфолио</span>
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
