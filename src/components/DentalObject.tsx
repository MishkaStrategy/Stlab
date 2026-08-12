export type DentalObjectVariant = 'hero' | 'about' | 'price' | 'works' | 'contacts'

export function DentalObject({ variant, expanded = false }: { variant: DentalObjectVariant; expanded?: boolean }) {
  return (
    <div className={`dental-object dental-object--${variant} ${expanded ? 'is-expanded' : ''}`} aria-hidden="true">
      <span className="dental-object__halo" />
      <span className="dental-object__core" />
      <span className="dental-object__ring dental-object__ring--one" />
      <span className="dental-object__ring dental-object__ring--two" />
      <span className="dental-object__detail dental-object__detail--one" />
      <span className="dental-object__detail dental-object__detail--two" />
    </div>
  )
}
