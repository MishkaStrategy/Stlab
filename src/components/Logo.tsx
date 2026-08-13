type LogoProps = {
  className?: string
  compact?: boolean
}

export function Logo({ className = '', compact = false }: LogoProps) {
  return (
    <div className={`brand-lockup ${compact ? 'brand-lockup--compact' : ''} ${className}`}>
      <span className="brand-wordmark" aria-label="STLab">
        <span className="brand-wordmark__st">ST</span>
        <span className="brand-wordmark__l">L</span>
        <span className="brand-wordmark__ab">ab</span>
        <span className="brand-wordmark__accent" aria-hidden="true" />
      </span>
      {!compact && <span className="brand-descriptor">Цифровая зуботехническая лаборатория</span>}
    </div>
  )
}
