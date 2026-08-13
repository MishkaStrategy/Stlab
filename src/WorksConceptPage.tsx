import { useEffect, useRef, useState } from 'react'

const cases = [
  {
    id: '01',
    kicker: 'ZrO2',
    title: 'Керамические конструкции',
    text: 'Полная анатомия и конструкции на имплантатах из ZrO2.',
    scene: 'zirconia',
  },
  {
    id: '02',
    kicker: 'IPS E.MAX',
    title: 'Эстетические реставрации',
    text: 'Коронки IPS E.MAX с окрашиванием и нанесением.',
    scene: 'emax',
  },
  {
    id: '03',
    kicker: 'Навигация',
    title: 'Цифровые шаблоны',
    text: 'Пилотный и навигационный протоколы с 3D-печатью.',
    scene: 'guide',
  },
  {
    id: '04',
    kicker: 'Ti',
    title: 'Титановые решения',
    text: 'Индивидуальные титановые абатменты и фрезерованные балки.',
    scene: 'titanium',
  },
] as const

type SceneName = (typeof cases)[number]['scene']

function Wordmark() {
  return (
    <div className="wc-wordmark" aria-label="STLab">
      <span>STL</span><span className="wc-wordmark__light">ab</span><i aria-hidden="true" />
    </div>
  )
}

function Tooth({ x, y, scale = 1, rotate = 0, tone = 'ivory' }: { x: number; y: number; scale?: number; rotate?: number; tone?: 'ivory' | 'glass' | 'blue' }) {
  const fill = tone === 'glass' ? 'url(#wcGlass)' : tone === 'blue' ? 'url(#wcBlue)' : 'url(#wcIvory)'
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path d="M5 57C7 23 28 3 57 6c13 1 20 9 27 9s14-8 27-9c29-3 50 17 53 51 3 31-7 72-26 95-9 11-22 8-27-6l-12-37c-4-13-22-13-27 0l-12 37c-5 14-18 17-27 6C15 129 2 88 5 57Z" fill={fill} stroke="rgba(218,240,253,.45)" strokeWidth="1.2" />
      <path d="M24 48c16-24 37-31 59-18 16 10 30 10 45 0 13-8 25-7 36 2" fill="none" stroke="rgba(255,255,255,.66)" strokeWidth="4" strokeLinecap="round" />
      <path d="M29 66c18 14 39 18 59 10 20-8 40-8 62 0" fill="none" stroke="rgba(111,169,204,.28)" strokeWidth="2" />
    </g>
  )
}

function Scene({ name }: { name: SceneName }) {
  return (
    <svg className="wc-scene-svg" viewBox="0 0 900 610" role="img" aria-label="Абстрактная digital dentistry визуализация">
      <defs>
        <linearGradient id="wcBg" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#07111d"/><stop offset=".56" stopColor="#0b2134"/><stop offset="1" stopColor="#07101a"/></linearGradient>
        <linearGradient id="wcIvory" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fffdf6"/><stop offset=".38" stopColor="#e9e1ce"/><stop offset=".7" stopColor="#b8c7cf"/><stop offset="1" stopColor="#6c879a"/></linearGradient>
        <linearGradient id="wcGlass" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ecf9ff" stopOpacity=".72"/><stop offset=".5" stopColor="#75b9dd" stopOpacity=".25"/><stop offset="1" stopColor="#1f5372" stopOpacity=".1"/></linearGradient>
        <linearGradient id="wcBlue" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#d8f4ff"/><stop offset=".4" stopColor="#6cb6df"/><stop offset="1" stopColor="#1d4967"/></linearGradient>
        <linearGradient id="wcMetal" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ecf4f8"/><stop offset=".22" stopColor="#637887"/><stop offset=".48" stopColor="#d9e5eb"/><stop offset=".75" stopColor="#334754"/><stop offset="1" stopColor="#9badb8"/></linearGradient>
        <radialGradient id="wcGlow"><stop stopColor="#1f9eea" stopOpacity=".22"/><stop offset="1" stopColor="#1f9eea" stopOpacity="0"/></radialGradient>
        <filter id="wcShadow"><feDropShadow dx="0" dy="24" stdDeviation="18" floodColor="#000" floodOpacity=".42"/></filter>
      </defs>
      <rect width="900" height="610" fill="url(#wcBg)"/>
      <circle cx="180" cy="100" r="220" fill="url(#wcGlow)"/>
      <circle cx="760" cy="520" r="260" fill="url(#wcGlow)" opacity=".45"/>
      <g opacity=".28" stroke="#2c8cc5" fill="none">
        <path d="M0 415C148 333 264 332 380 393S628 496 900 365"/>
        <path d="M0 465C154 388 289 388 417 446s288 81 483-4"/>
        <path d="M90 120 179 70l88 52 80-34 116 72"/>
        <circle cx="179" cy="70" r="4" fill="#52b9f0"/><circle cx="347" cy="88" r="4" fill="#52b9f0"/><circle cx="463" cy="160" r="4" fill="#52b9f0"/>
      </g>
      {name === 'zirconia' && (
        <g filter="url(#wcShadow)">
          <ellipse cx="480" cy="461" rx="288" ry="58" fill="#02060a" opacity=".48"/>
          <rect x="240" y="356" width="500" height="82" rx="38" fill="#08111a" stroke="#203d52"/>
          <Tooth x={262} y={190} scale={1.35} rotate={-10}/><Tooth x={388} y={165} scale={1.43} rotate={-4}/><Tooth x={520} y={170} scale={1.4} rotate={5}/><Tooth x={646} y={195} scale={1.3} rotate={10}/>
          <Tooth x={500} y={365} scale={.8} rotate={4}/>
          <g transform="translate(710 326)"><rect x="0" y="55" width="86" height="105" rx="18" fill="url(#wcMetal)"/><rect x="18" y="0" width="50" height="78" rx="12" fill="url(#wcMetal)"/><ellipse cx="43" cy="56" rx="27" ry="11" fill="#07131c" stroke="#c8d8e2" strokeWidth="5"/></g>
        </g>
      )}
      {name === 'emax' && (
        <g filter="url(#wcShadow)">
          <path d="M152 395C273 255 439 185 686 207" fill="none" stroke="#0c1822" strokeWidth="70" strokeLinecap="round"/>
          <Tooth x={260} y={210} scale={1.55} rotate={-15}/><Tooth x={405} y={168} scale={1.58} rotate={-3}/><Tooth x={555} y={182} scale={1.5} rotate={9}/>
          <g transform="translate(690 118) rotate(18)"><path d="M0 36h170l-30 28H0Z" fill="url(#wcMetal)"/><path d="m8 35 48-20 75 18-75 18Z" fill="#b7c7d0"/></g>
          <path d="M185 125c190-93 395-89 602 15" fill="none" stroke="#348ec2" strokeDasharray="6 8" opacity=".42"/>
        </g>
      )}
      {name === 'guide' && (
        <g filter="url(#wcShadow)">
          <path d="M202 211c95-111 278-125 431-62 99 41 155 117 116 193-48 92-185 134-329 119-154-16-294-110-218-250Z" fill="url(#wcGlass)" stroke="#9bd8f7" strokeWidth="3"/>
          {[0,1,2,3,4].map((i) => <g key={i} transform={`translate(${310+i*88} ${270+(i%2)*28})`}><ellipse rx="39" ry="31" fill="#1e3342" stroke="#b8d8e8" strokeWidth="9"/><ellipse rx="19" ry="15" fill="#06111a" stroke="#e4f3fb" strokeWidth="3"/><path d="M-18 0h36M0-14v28" stroke="#5f9cbc" opacity=".5"/></g>)}
          <path d="M228 329c144 93 330 94 490-5" fill="none" stroke="#b9e6fb" strokeWidth="3" opacity=".58"/>
          <g opacity=".34" stroke="#53b7e9"><path d="M155 123h605M153 455h610"/><path d="M238 86v398M674 82v402"/></g>
        </g>
      )}
      {name === 'titanium' && (
        <g filter="url(#wcShadow)">
          <ellipse cx="455" cy="459" rx="280" ry="55" fill="#02070b" opacity=".44"/>
          {[0,1,2].map((i) => <g key={i} transform={`translate(${250+i*190} ${170+i*24})`}><path d="M70 0h58l22 63-25 176H72L48 63Z" fill="url(#wcMetal)"/><ellipse cx="99" cy="63" rx="50" ry="23" fill="#172631" stroke="#dbe6ec" strokeWidth="7"/><ellipse cx="99" cy="63" rx="24" ry="11" fill="#061019"/><path d="M73 132h54M69 158h58M66 184h62" stroke="#d9e4e9" opacity=".32"/></g>)}
          <path d="M191 416C324 351 545 339 725 418" fill="none" stroke="#4bb8ec" strokeWidth="2" opacity=".4"/>
        </g>
      )}
    </svg>
  )
}

export default function WorksConceptPage() {
  const [active, setActive] = useState(0)
  const touchStart = useRef<number | null>(null)
  const current = cases[active]

  const change = (next: number) => setActive((next + cases.length) % cases.length)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') change(active - 1)
      if (event.key === 'ArrowRight') change(active + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  return (
    <main className="wc-page">
      <div className="wc-noise" aria-hidden="true" />
      <section className="wc-shell">
        <aside className="wc-sidebar">
          <a className="wc-back" href="/Stlab/" aria-label="Вернуться на главную STLab">← STLab</a>
          <div className="wc-sidebar-copy">
            <span className="wc-eyebrow">Портфолио · концепт</span>
            <h1>Наши<br />работы</h1>
            <p>Визуальная подача направлений цифровой зуботехнической лаборатории STLab.</p>
          </div>
          <div className="wc-counter"><strong>{current.id}</strong><span>—</span><span>04</span></div>
          <div className="wc-arrows">
            <button onClick={() => change(active - 1)} aria-label="Предыдущая работа">←</button>
            <button onClick={() => change(active + 1)} aria-label="Следующая работа">→</button>
          </div>
          <div className="wc-mesh" aria-hidden="true" />
        </aside>

        <div className="wc-stage">
          <header className="wc-header"><Wordmark /><span>Цифровая зуботехническая лаборатория</span><a href="/Stlab/">Закрыть ×</a></header>
          <div className="wc-hero" onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null }} onTouchEnd={(event) => { const end = event.changedTouches[0]?.clientX; if (touchStart.current == null || end == null) return; const delta = end - touchStart.current; if (Math.abs(delta) > 45) change(active + (delta < 0 ? 1 : -1)); touchStart.current = null }}>
            <Scene name={current.scene} />
            <div className="wc-hero-label"><span>{current.kicker}</span><strong>{current.title}</strong></div>
          </div>
          <div className="wc-cards" role="tablist" aria-label="Направления работ">
            {cases.map((item, index) => (
              <button key={item.id} className={index === active ? 'is-active' : ''} onClick={() => setActive(index)} role="tab" aria-selected={index === active}>
                <span className="wc-card-number">{item.id}</span>
                <span className={`wc-card-art wc-card-art--${item.scene}`} aria-hidden="true"><i/><i/><i/></span>
                <strong>{item.title}</strong>
                <small>{item.text}</small>
              </button>
            ))}
          </div>
          <div className="wc-progress" aria-hidden="true"><i style={{ transform: `translateX(${active * 100}%)` }} /></div>
        </div>
      </section>
    </main>
  )
}
