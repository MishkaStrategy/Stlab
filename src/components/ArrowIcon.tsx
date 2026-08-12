type ArrowIconProps = {
  className?: string
}

export function ArrowIcon({ className = '' }: ArrowIconProps) {
  return (
    <svg
      className={`arrow-icon ${className}`}
      viewBox="0 0 24 12"
      width="24"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M1 6h20M16 1l5 5-5 5" />
    </svg>
  )
}
