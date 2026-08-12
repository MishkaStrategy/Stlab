export type ServiceItem = {
  name: string
  price: number
}

export type PriceSection = {
  id: string
  title: string
  services: ServiceItem[]
}

export const priceSections: PriceSection[] = [
  {
    id: 'diagnostics',
    title: 'Диагностические услуги',
    services: [
      { name: 'WAX-UP exo-cad', price: 850 },
      { name: '3D-печать модели. Обработка моделей + 3D-печать', price: 1900 },
      { name: 'Сканирование оттисков. Сканирование слепков, моделей (одна челюсть)', price: 500 },
      { name: 'Индивидуальная ложка (3D-печать, одна челюсть)', price: 1500 },
    ],
  },
  {
    id: 'zro2',
    title: 'Изделия из ZrO2',
    services: [
      { name: 'Коронка ZrO2 полная анатомия MIYO', price: 7000 },
      { name: 'Коронка ZrO2 на имплантат (без учёта Ti-base)', price: 7500 },
      { name: 'Индивидуальный ZrO2 абатмент (без учёта Ti-base)', price: 5000 },
      { name: 'Десна керамическая', price: 950 },
    ],
  },
  {
    id: 'pmma',
    title: 'Полиметилметакрилат / керамокомпозит',
    services: [
      { name: 'Одиночная коронка КЕРАМОКОМПОЗИТ', price: 3100 },
      { name: 'Одиночная коронка КЕРАМОКОМПОЗИТ на имплантат (без учёта Ti-base)', price: 3400 },
      { name: 'Десна КОМПОЗИТ', price: 650 },
    ],
  },
  {
    id: 'emax',
    title: 'Ivoclar IPS E.MAX',
    services: [
      { name: 'Коронка E.MAX окрашивание', price: 8700 },
      { name: 'Коронка E.MAX нанесение', price: 9800 },
      { name: 'Вкладка', price: 7500 },
    ],
  },
  {
    id: 'titanium',
    title: 'Изделия из титана (Ti)',
    services: [
      { name: 'Индивидуальный титановый абатмент', price: 4500 },
      { name: 'Балка фрезерованная Ti (с напылением)', price: 35000 },
    ],
  },
  {
    id: 'navigation',
    title: 'Пилотный и навигационный протоколы',
    services: [
      { name: 'Навигационный шаблон (1 имплант в сегменте) + печать', price: 5100 },
      { name: 'Навигационный шаблон (2 импланта в сегменте) + печать', price: 5600 },
      { name: 'Навигационный шаблон (3 импланта в сегменте) + печать', price: 6100 },
      { name: 'Навигационный шаблон (4 импланта в сегменте) + печать', price: 6600 },
      { name: 'Навигационный шаблон (5 имплантов в сегменте) + печать', price: 7100 },
      { name: 'Навигационный шаблон (6 имплантов в сегменте) + печать', price: 7600 },
      { name: 'Навигационный шаблон (всё на 4-х имплантах, 1 челюсть) + печать', price: 15100 },
      { name: 'Навигационный шаблон (всё на 6–8 имплантах, 1 челюсть) + печать', price: 18000 },
      { name: 'Аренда втулки/гильзы (1 шт.)', price: 350 },
    ],
  },
  {
    id: 'removable',
    title: 'Съёмное / условно съёмное',
    services: [
      { name: 'Акрифри', price: 11000 },
      { name: 'Съёмный протез на локаторах (без учёта протетики)', price: 20000 },
      { name: 'Балочный акриловый протез на имплантах (All-on-4 или All-on-6)', price: 35000 },
    ],
  },
]

export const allServices = priceSections.flatMap((section) => section.services.map((service) => service.name))

export const contacts = {
  name: 'STLab — цифровая зуботехническая лаборатория',
  cityLine: 'г. Новосибирск, 630063',
  address: 'ул. Кирова, 276',
  phoneDisplay: '+7 923-113-23-33',
  phoneHref: 'tel:+79231132333',
  email: 'stl-lab@inbox.ru',
}

export const formatPrice = (value: number) => `${new Intl.NumberFormat('ru-RU').format(value)} ₽`
