import { motion } from 'framer-motion'
import type { LabSection } from '../data/services'

type SpecimenProps = {
  type: LabSection['specimen']
  expanded?: boolean
}

const common = {
  vectorEffect: 'non-scaling-stroke' as const,
}

export function Specimen({ type, expanded = false }: SpecimenProps) {
  return (
    <motion.div
      className={`specimen specimen--${type} ${expanded ? 'is-expanded' : ''}`}
      layoutId={`specimen-${type}`}
      transition={{ duration: .72, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 420 420">
        <defs>
          <linearGradient id={`metal-${type}`} x1="0" x2="1">
            <stop offset="0" stopColor="#74787d" />
            <stop offset=".28" stopColor="#f0f0ef" />
            <stop offset=".55" stopColor="#8b8f93" />
            <stop offset=".82" stopColor="#d9dadd" />
            <stop offset="1" stopColor="#5d6165" />
          </linearGradient>
          <radialGradient id={`glass-${type}`} cx="35%" cy="28%" r="75%">
            <stop offset="0" stopColor="rgba(255,255,255,.96)" />
            <stop offset=".62" stopColor="rgba(230,232,234,.38)" />
            <stop offset="1" stopColor="rgba(126,132,138,.08)" />
          </radialGradient>
          <filter id={`blur-${type}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        <ellipse cx="210" cy="330" rx="135" ry="44" className="specimen__glow" filter={`url(#blur-${type})`} />

        {type === 'hero' && (
          <g className="wire-object">
            <path d="M110 92c27-45 72-61 103-57 42 5 87 27 102 72 19 58-9 86-20 123-10 35-11 90-38 116-16 15-34 2-41-34l-8-48c-3-21-18-31-34-29-17 2-28 15-29 36l-1 45c-1 37-19 54-38 37-31-27-26-91-37-126-13-42-28-80-4-135 11-24 27-44 45-50Z" fill="url(#glass-hero)" />
            {[[117,91,210,36],[210,36,315,107],[117,91,185,153],[185,153,315,107],[185,153,145,271],[185,153,273,231],[273,231,315,107],[145,271,210,231],[210,231,273,231],[145,271,107,353],[273,231,255,346]].map((p,i)=><line key={i} x1={p[0]} y1={p[1]} x2={p[2]} y2={p[3]} {...common} />)}
            {[ [117,91],[210,36],[315,107],[185,153],[145,271],[210,231],[273,231],[107,353],[255,346] ].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="4" />)}
          </g>
        )}

        {type === 'diagnostic' && (
          <g className="scan-object">
            <path d="M105 104 220 49l103 71-118 59Z" className="scan-object__plane" />
            <path d="m105 104 10 158 91 62-1-145Z" className="scan-object__face" />
            <path d="m205 179 118-59-17 150-100 54Z" className="scan-object__side" />
            {[84,118,152,186,220,254].map((y,i)=><line key={i} x1="72" y1={y} x2="350" y2={y+28} className="scan-object__beam" />)}
          </g>
        )}

        {type === 'crown' && (
          <g className="crown-object">
            <path d="M92 146c5-68 57-105 121-108 70-3 125 40 127 112 1 38-22 59-34 91-12 31-11 75-32 101-18 22-44 17-51-21l-9-48c-5-31-39-31-45 1l-9 48c-7 37-34 44-52 20-21-28-15-75-28-107-12-28-11-54-8-89Z" fill="url(#glass-crown)" />
            <path d="M112 140c15-46 48-70 101-74 48-3 86 25 104 71" className="crown-object__ridge" />
            <path d="M96 176c72 29 170 25 240-6" className="crown-object__ridge crown-object__ridge--soft" />
          </g>
        )}

        {type === 'pmma' && (
          <g className="pmma-object">
            <path d="M91 150c0-72 52-112 119-112s120 41 120 113c0 37-22 66-31 94-11 33-6 91-39 111-27 16-36-25-39-52l-5-41c-4-33-47-33-51 1l-5 43c-3 31-17 62-39 47-32-22-26-78-38-112-10-28-12-57-12-92Z" className="pmma-object__shell" />
            <path d="M120 122 174 78l77 1 49 45-33 57-111 4Z" className="pmma-object__facet" />
          </g>
        )}

        {type === 'emax' && (
          <g className="emax-object">
            <path d="m112 106 97-61 103 73-44 181-96 70-84-82Z" fill="url(#glass-emax)" />
            <path d="m112 106 92 75 108-63M204 181l-32 188m32-188 64 118m-156-193-24 181m224-169-44 181M88 287l84-33 96 45" className="emax-object__cut" />
          </g>
        )}

        {type === 'implant' && (
          <g className="implant-object">
            <rect x="162" y="49" width="96" height="62" rx="10" fill={`url(#metal-implant)`} />
            <path d="M178 111h64l23 46-15 29 12 24-14 27 10 23-15 30 4 34-39 58-38-58 4-34-14-30 10-23-14-27 12-24-15-29Z" fill={`url(#metal-implant)`} />
            {[138,164,192,220,248,276,304].map((y,i)=><path key={i} d={`M159 ${y}c32 19 69 19 102 0`} className="implant-object__thread" />)}
            <path d="M181 75h58M191 92h38" className="implant-object__slot" />
          </g>
        )}

        {type === 'navigation' && (
          <g className="guide-object">
            <path d="M62 223c20-94 87-150 151-152 75-3 134 54 146 148-35 70-86 111-147 113-61 1-114-37-150-109Z" fill="url(#glass-navigation)" />
            <path d="M91 214c20-60 68-99 122-101 58-2 106 37 124 101-35 28-77 44-123 45-46 1-89-15-123-45Z" className="guide-object__cut" />
            {[135,183,231,279].map((x,i)=><g key={i}><circle cx={x} cy={205 + (i%2)*8} r="24" className="guide-object__ring" /><circle cx={x} cy={205 + (i%2)*8} r="10" /></g>)}
            <path d="M83 305c74 54 180 53 257-4" className="guide-object__wire" />
          </g>
        )}

        {type === 'arch' && (
          <g className="arch-object">
            <path d="M66 170c27-79 85-123 146-123 64 0 122 45 148 123-13 99-67 164-147 166-80 1-136-64-147-166Z" fill="url(#glass-arch)" />
            <path d="M109 177c19-54 58-82 103-83 47 0 87 29 104 83-27 40-61 60-103 61-42 0-77-20-104-61Z" className="arch-object__void" />
            {[118,149,181,213,245,277,308].map((x,i)=><path key={i} d={`M${x} ${120 + Math.abs(3-i)*7}v48`} className="arch-object__tooth" />)}
          </g>
        )}
      </svg>
    </motion.div>
  )
}
