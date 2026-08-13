const base = import.meta.env.BASE_URL

export function WorksSlider() {
  return (
    <div className="works-slider-shell works-slider-shell--single">
      <div className="works-slider" aria-label="Галерея работ STLab">
        <article className="work-slide">
          <div
            className="work-slide__media"
            role="img"
            aria-label="Зуботехническая работа STLab из портфолио"
            style={{
              backgroundColor: '#05090d',
              backgroundImage: `linear-gradient(180deg, rgba(4,10,15,.04), rgba(4,10,15,.12)), url('${base}stlab-work-02.jpg')`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '132% auto',
              backgroundPosition: 'center 46%',
            }}
          />
          <div className="work-slide__copy">
            <span className="eyebrow">Портфолио</span>
            <h3>Наши работы</h3>
            <p>Фрагмент портфолио STLab.</p>
          </div>
        </article>
      </div>
    </div>
  )
}
