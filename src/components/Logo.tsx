type LogoProps = {
  className?: string
  compact?: boolean
}

export function Logo({ className = '', compact = false }: LogoProps) {
  const src = `${import.meta.env.BASE_URL}stlab-logo-white.png`
  return (
    <div className={`brand-lockup ${compact ? 'brand-lockup--compact' : ''} ${className}`}>
      <img src={src} alt="STLab" width="492" height="126" />
      {!compact && <span>Цифровая зуботехническая лаборатория</span>}
    </div>
  )
}
