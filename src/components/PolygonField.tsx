import { useEffect, useRef } from 'react'

const points = [
  [2, 16], [10, 4], [19, 18], [29, 8], [38, 22], [47, 5], [57, 17], [66, 7], [78, 19], [90, 6], [99, 16],
  [5, 44], [15, 32], [26, 48], [36, 34], [49, 46], [59, 31], [70, 43], [81, 34], [95, 46],
  [1, 75], [14, 63], [24, 78], [35, 61], [45, 75], [56, 59], [68, 73], [79, 58], [91, 74], [99, 61],
  [8, 96], [20, 87], [31, 98], [43, 87], [55, 96], [66, 86], [78, 98], [89, 87],
]

const lines = [
  [0,1],[0,11],[1,2],[1,12],[2,3],[2,12],[2,13],[3,4],[3,13],[4,5],[4,14],[5,6],[5,15],[6,7],[6,15],[6,16],[7,8],[7,16],[8,9],[8,17],[9,10],[9,18],[10,18],
  [11,12],[11,20],[12,13],[12,21],[13,14],[13,22],[14,15],[14,23],[15,16],[15,24],[16,17],[16,25],[17,18],[17,26],[18,19],[18,27],[19,28],
  [20,21],[20,30],[21,22],[21,30],[21,31],[22,23],[22,31],[23,24],[23,32],[24,25],[24,33],[25,26],[25,34],[26,27],[26,35],[27,28],[27,36],[28,29],[28,37],[29,37],
  [30,31],[31,32],[32,33],[33,34],[34,35],[35,36],[36,37]
]

export function PolygonField() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (event: PointerEvent) => {
      if (window.matchMedia('(pointer: coarse)').matches) return
      const x = event.clientX / window.innerWidth - 0.5
      const y = event.clientY / window.innerHeight - 0.5
      el.style.setProperty('--mesh-x', `${x * 11}px`)
      el.style.setProperty('--mesh-y', `${y * 8}px`)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div ref={ref} className="polygon-field" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        {lines.map(([a,b], index) => (
          <line key={index} x1={points[a][0]} y1={points[a][1]} x2={points[b][0]} y2={points[b][1]} />
        ))}
        {points.map(([x,y], index) => <circle key={index} cx={x} cy={y} r={index % 3 === 0 ? .45 : .28} />)}
      </svg>
    </div>
  )
}
