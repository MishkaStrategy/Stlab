import { useId } from 'react'

export type DentalObjectVariant = 'hero' | 'about' | 'price' | 'works' | 'contacts'

const toothPath = 'M42 45C47 27 61 18 78 24c10 4 13 4 23 0 17-6 31 3 36 21 7 26-4 70-18 89-6 8-13 7-17-4l-9-24c-3-8-13-8-16 0l-9 24c-4 11-11 12-17 4-14-19-25-63-19-89Z'

export function DentalObject({ variant, expanded = false }: { variant: DentalObjectVariant; expanded?: boolean }) {
  const uid = useId().replace(/:/g, '')
  const ceramic = `ceramic-${uid}`
  const glass = `glass-${uid}`
  const chrome = `chrome-${uid}`

  return (
    <div className={`dental-object dental-object--${variant} ${expanded ? 'is-expanded' : ''}`} aria-hidden="true">
      <svg className="dental-object__svg" viewBox="0 0 160 160" focusable="false">
        <defs>
          <linearGradient id={ceramic} x1="18" y1="18" x2="142" y2="142" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#f8fcff" />
            <stop offset="0.42" stopColor="#c7d7e3" />
            <stop offset="1" stopColor="#496b84" />
          </linearGradient>
          <linearGradient id={glass} x1="28" y1="22" x2="132" y2="142" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#e9f8ff" stopOpacity="0.92" />
            <stop offset="0.5" stopColor="#7eb5d7" stopOpacity="0.5" />
            <stop offset="1" stopColor="#1d4a69" stopOpacity="0.72" />
          </linearGradient>
          <linearGradient id={chrome} x1="20" y1="20" x2="140" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.28" stopColor="#aebfcb" />
            <stop offset="0.56" stopColor="#eef5f8" />
            <stop offset="1" stopColor="#657783" />
          </linearGradient>
        </defs>

        {variant === 'hero' && (
          <>
            <path d={toothPath} fill={`url(#${ceramic})`} />
            <path d="M53 47c8-13 19-16 31-10 8 4 14 4 23 0 10-5 19-3 27 7" fill="none" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="3" />
            <path d="M63 76c14-10 30-11 49-2" fill="none" stroke="#8fc8e9" strokeOpacity="0.55" strokeWidth="2" />
          </>
        )}

        {variant === 'about' && (
          <>
            <path d="M80 20 136 53 123 119 80 143 34 116 24 56 80 20Z" fill={`url(#${glass})`} />
            <path d="m80 20 0 123M24 56l112-3M34 116l89 3M24 56l99 63M136 53 34 116" fill="none" stroke="#e9f8ff" strokeOpacity="0.45" strokeWidth="1.4" />
            <circle cx="80" cy="20" r="5" fill="#f6fbff" /><circle cx="136" cy="53" r="5" fill="#d8eefb" /><circle cx="123" cy="119" r="5" fill="#9ec7df" /><circle cx="34" cy="116" r="5" fill="#b8d7e8" />
          </>
        )}

        {variant === 'price' && (
          <>
            <path d="m36 42 75-20 22 23-76 22-21-25Z" fill={`url(#${chrome})`} />
            <path d="m28 72 76-20 27 27-78 22-25-29Z" fill={`url(#${ceramic})`} />
            <path d="m24 105 78-21 31 30-81 23-28-32Z" fill={`url(#${glass})`} />
            <path d="m46 47 53-14M42 79l53-14M39 112l54-15" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" />
          </>
        )}

        {variant === 'works' && (
          <>
            <g transform="translate(2 26) scale(.62)">
              <path d={toothPath} fill={`url(#${glass})`} opacity=".72" />
            </g>
            <g transform="translate(42 9) scale(.72)">
              <path d={toothPath} fill={`url(#${ceramic})`} />
              <path d="M54 47c7-11 18-14 30-9 7 3 13 3 21-1 10-4 19-2 26 6" fill="none" stroke="#ffffff" strokeOpacity=".58" strokeWidth="3" />
            </g>
            <g transform="translate(82 30) scale(.56)">
              <path d={toothPath} fill={`url(#${chrome})`} opacity=".82" />
            </g>
            <path d="M28 126c33 9 70 9 104 0" fill="none" stroke="#cfe9f7" strokeOpacity=".42" strokeWidth="2" />
          </>
        )}

        {variant === 'contacts' && (
          <>
            <path d="M80 18c29 0 52 23 52 52 0 38-52 74-52 74S28 108 28 70c0-29 23-52 52-52Z" fill={`url(#${glass})`} />
            <circle cx="80" cy="69" r="22" fill="#eef8fd" fillOpacity="0.84" />
            <circle cx="80" cy="69" r="10" fill="#5f96b7" fillOpacity="0.82" />
            <path d="M55 43c15-14 35-18 54-5" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="3" />
          </>
        )}
      </svg>
    </div>
  )
}
