# Перекрёсток — React SPA

Учебный интернет-магазин: Vite + React 18 + React Router v6 (JavaScript, без TS).
Корзина хранится на Go-бэкенде (`server/`), фронтенд ходит в `/api/cart` через proxy Vite.

## Запуск (два терминала)

1. Бэкенд:
   ```bash
   cd server
   go run .
   ```
   Поднимется на http://localhost:8080 (отдаёт и старый статичный сайт из `../`, если он есть — для SPA не обязательно).

2. Фронтенд:
   ```bash
   npm install
   npm run dev
   ```
   Откройте http://localhost:5173 — Vite проксирует `/api` на :8080.

## Сборка

```bash
npm run build     # dist/
npm run preview
```

Для прод-раздачи `dist/` нужен бэкенд на :8080 или другой proxy для `/api`.

## Структура

- `src/pages/` — Home, Catalog (фильтры в памяти), ProductPage, Account, Contacts, About
- `src/components/` — Layout, ProductCard, MiniCart (drawer), ScrollToTop
- `src/context/CartContext.jsx` — корзина: load / add / remove / clear
- `src/data/products.js` — 12 товаров (данные из `server/main.go`)
- `src/styles/` — style.css, shop.css (из статичного проекта), animations.css
- `server/` — Go API: товары + сессионная корзина (cookie `session`)
