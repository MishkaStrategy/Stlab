type LogoProps = {
  compact?: boolean
  className?: string
}

export function Logo({ compact = false, className = '' }: LogoProps) {
  return (
    <svg
      className={`brand-logo ${className}`}
      viewBox="0 0 440 112"
      role="img"
      aria-label="STLab"
    >
      <g className="brand-logo__stl" fill="currentColor">
        <g aria-hidden="true">
          <rect x="8" y="14" width="108" height="13" />
          <rect x="8" y="26" width="20" height="18" />
          <rect x="8" y="42" width="108" height="13" />
          <rect x="96" y="54" width="20" height="18" />
          <rect x="8" y="70" width="108" height="13" />
        </g>
        <path d="M132 14h112v18h-45v51h-20V32h-47V14Z" />
        <path d="M260 14h20v51h67v18h-87V14Z" />
      </g>
      <rect className="brand-logo__accent" x="280" y="65" width="72" height="13" />
      <text x="352" y="82" className="brand-logo__lab">ab</text>
      {!compact && (
        <text x="9" y="108" className="brand-logo__caption">
          ЦИФРОВАЯ ЗУБОТЕХНИЧЕСКАЯ ЛАБОРАТОРИЯ
        </text>
      )}
    </svg>
  )
}
