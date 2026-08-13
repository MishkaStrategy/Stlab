import chunk1 from './works-render/chunk1.txt?raw'
import chunk2 from './works-render/chunk2.txt?raw'
import chunk3 from './works-render/chunk3.txt?raw'
import chunk4 from './works-render/chunk4.txt?raw'
import chunk5 from './works-render/chunk5.txt?raw'
import chunk6 from './works-render/chunk6.txt?raw'
import chunk7 from './works-render/chunk7.txt?raw'
import chunk8 from './works-render/chunk8.txt?raw'

const renderSrc = `data:image/webp;base64,${[
  chunk1,
  chunk2,
  chunk3,
  chunk4,
  chunk5,
  chunk6,
  chunk7,
  chunk8,
].join('')}`

export default function WorksConceptPage() {
  return (
    <main className="works-render-page">
      <div className="works-render-frame">
        <img
          className="works-render-image"
          src={renderSrc}
          alt="Концепт страницы «Наши работы» цифровой зуботехнической лаборатории STLab"
          draggable={false}
        />
        <a
          className="works-render-close"
          href="/Stlab/"
          aria-label="Вернуться на главную STLab"
          title="Вернуться на главную"
        />
      </div>
    </main>
  )
}
