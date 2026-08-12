export type ServiceItem = {
  name: string
  price: number
  note?: string
}

export type LabSection = {
  id: string
  number: string
  title: string
  shortTitle: string
  material: string
  tone: 'dark' | 'paper' | 'accent' | 'metal' | 'mist'
  specimen: 'hero' | 'diagnostic' | 'crown' | 'pmma' | 'emax' | 'implant' | 'navigation' | 'arch'
  caption: string
  services: ServiceItem[]
}

export const sections: LabSection[] = [
  {
    id: 'hero',
    number: '01',
    title: 'STLab',
    shortTitle: 'STLab',
    material: 'STLab',
    tone: 'dark',
    specimen: 'hero',
    caption: 'Цифровая зуботехническая лаборатория',
    services: [],
  },
  {
    id: 'diagnostics',
    number: '02',
    title: 'Диагностические услуги',
    shortTitle: 'Диагностические услуги',
    material: 'ПРАЙС ЛИСТ',
    tone: 'paper',
    specimen: 'diagnostic',
    caption: 'WAX-UP exo-cad · 3D-печать модели · Сканирование оттисков',
    services: [
      { name: 'WAX-UP exo-cad', price: 850 },
      { name: '3D-печать модели', price: 1900, note: 'Обработка моделей + 3D-печать' },
      { name: 'Сканирование оттисков', price: 500, note: 'Сканирование слепков, моделей — одна челюсть' },
      { name: 'Индивидуальная ложка', price: 1500, note: '3D-печать — одна челюсть' },
    ],
  },
  {
    id: 'zro2',
    number: '03',
    title: 'Изделия из ZrO2',
    shortTitle: 'Изделия из ZrO2',
    material: 'ZrO2',
    tone: 'mist',
    specimen: 'crown',
    caption: 'Коронка ZrO2 · Индивидуальный ZrO2 абатмент · Десна керамическая',
    services: [
      { name: 'Коронка ZrO2 полная анатомия MIYO', price: 7000 },
      { name: 'Коронка ZrO2 на имплантат', price: 7500, note: 'Без учёта Ti-base' },
      { name: 'Индивидуальный ZrO2 абатмент', price: 5000, note: 'Без учёта Ti-base' },
      { name: 'Десна керамическая', price: 950 },
    ],
  },
  {
    id: 'pmma',
    number: '04',
    title: 'Полиметилметакрилат (PMMA|КЕРАМОКОМПОЗИТ)',
    shortTitle: 'Полиметилметакрилат (PMMA|КЕРАМОКОМПОЗИТ)',
    material: 'PMMA | КЕРАМОКОМПОЗИТ',
    tone: 'accent',
    specimen: 'pmma',
    caption: 'Одиночная коронка КЕРАМОКОМПОЗИТ · Десна КОМПОЗИТ',
    services: [
      { name: 'Одиночная коронка КЕРАМОКОМПОЗИТ', price: 3100 },
      { name: 'Одиночная коронка КЕРАМОКОМПОЗИТ на имплантат', price: 3400, note: 'Без учёта Ti-base' },
      { name: 'Десна КОМПОЗИТ', price: 650 },
    ],
  },
  {
    id: 'emax',
    number: '05',
    title: 'IVOCLAR IPS E.MAX',
    shortTitle: 'IVOCLAR IPS E.MAX',
    material: 'IVOCLAR IPS E.MAX',
    tone: 'paper',
    specimen: 'emax',
    caption: 'Коронка E.MAX · Вкладка',
    services: [
      { name: 'Коронка E.MAX окрашивание', price: 8700 },
      { name: 'Коронка E.MAX нанесение', price: 9800 },
      { name: 'Вкладка', price: 7500 },
    ],
  },
  {
    id: 'titanium',
    number: '06',
    title: 'Изделия из титана (Ti)',
    shortTitle: 'Изделия из титана (Ti)',
    material: 'Ti',
    tone: 'metal',
    specimen: 'implant',
    caption: 'Индивидуальный титановый абатмент · Балка фрезерованная Ti',
    services: [
      { name: 'Индивидуальный титановый абатмент', price: 4500 },
      { name: 'Балка фрезерованная Ti', price: 35000, note: 'С напылением' },
    ],
  },
  {
    id: 'navigation',
    number: '07',
    title: 'Пилотный и навигационный протоколы',
    shortTitle: 'Пилотный и навигационный протоколы',
    material: 'НАВИГАЦИОННЫЕ ШАБЛОНЫ',
    tone: 'dark',
    specimen: 'navigation',
    caption: 'Навигационный шаблон · Печать · Аренда втулки/гильзы',
    services: [
      { name: 'Навигационный шаблон — 1 имплант в сегменте + печать', price: 5100 },
      { name: 'Навигационный шаблон — 2 импланта в сегменте + печать', price: 5600 },
      { name: 'Навигационный шаблон — 3 импланта в сегменте + печать', price: 6100 },
      { name: 'Навигационный шаблон — 4 импланта в сегменте + печать', price: 6600 },
      { name: 'Навигационный шаблон — 5 имплантов в сегменте + печать', price: 7100 },
      { name: 'Навигационный шаблон — 6 имплантов в сегменте + печать', price: 7600 },
      { name: 'Навигационный шаблон — всё на 4-х имплантах, 1 челюсть + печать', price: 15100 },
      { name: 'Навигационный шаблон — всё на 6–8 имплантах, 1 челюсть + печать', price: 18000 },
      { name: 'Аренда втулки/гильзы — 1 шт.', price: 350 },
    ],
  },
  {
    id: 'removable',
    number: '08',
    title: 'Съемное|Условно съемное',
    shortTitle: 'Съемное|Условно съемное',
    material: 'СЪЕМНОЕ | УСЛОВНО СЪЕМНОЕ',
    tone: 'paper',
    specimen: 'arch',
    caption: 'Акрифри · Съемный протез на локаторах · Балочный акриловый протез',
    services: [
      { name: 'Акрифри', price: 11000 },
      { name: 'Съемный протез на локаторах', price: 20000, note: 'Без учёта протетики' },
      { name: 'Балочный акриловый протез на имплантах', price: 35000, note: 'All-on-4 или All-on-6' },
    ],
  },
]

export const contacts = {
  city: 'Новосибирск',
  address: 'ул. Кирова, 276',
  postalCode: '630063',
  phoneDisplay: '+7 923-113-23-33',
  phoneHref: 'tel:+79231132333',
  email: 'stl-lab@inbox.ru',
}

export const formatPrice = (value: number) => `${new Intl.NumberFormat('ru-RU').format(value)} ₽`
