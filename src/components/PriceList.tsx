import { formatPrice, priceSections } from '../data/services'

export function PriceList() {
  return (
    <div className="price-list" tabIndex={0} aria-label="Прайс-лист STLab">
      {priceSections.map((section) => (
        <section className="price-list__section" key={section.id}>
          <h3>{section.title}</h3>
          <ol>
            {section.services.map((service) => (
              <li key={service.name}>
                <span>{service.name}</span>
                <strong>{formatPrice(service.price)}</strong>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  )
}
