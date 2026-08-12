# STLab — Digital Laboratory Console

Интерактивный сайт-презентация цифровой зуботехнической лаборатории STLab. Интерфейс построен как spatial bento-console: восемь блоков образуют одну композицию, а выбранный блок физически раздвигает сцену и раскрывается почти на весь viewport.

## Стек

- React + TypeScript + Vite
- Framer Motion для shared-layout и spatial transition
- SVG / CSS pseudo-3D вместо тяжёлого WebGL
- GitHub Actions + GitHub Pages

## Локальный запуск

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## GitHub Pages

Vite настроен с `base: '/Stlab/'`. Workflow `.github/workflows/deploy.yml` собирает `dist` и публикует его через GitHub Pages.

Для первого запуска Pages в настройках репозитория выберите **Settings → Pages → Source: GitHub Actions**, если источник ещё не задан для репозитория.

## Контент

В интерфейсе используются реальные контакты STLab и позиции прайс-листа 2026 из материалов проекта. Форма обратной связи работает только как демонстрационное frontend-состояние и не отправляет данные на несуществующий endpoint.

## UX / accessibility

- keyboard activation для карточек;
- `Escape` закрывает раскрытую карточку и контактный overlay;
- заметные focus-states;
- `prefers-reduced-motion` упрощает анимации;
- отдельная mobile-композиция и `100svh`;
- touch-friendly CTA и sticky CTA в раскрытом mobile-состоянии.
