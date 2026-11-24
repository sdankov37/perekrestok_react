import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { findProduct } from '../data/products.js';

const CartContext = createContext(null);

// На GitHub Pages нет бэкенда — корзина живёт в localStorage.
// Локально (vite dev) работаем через Go API /api/cart, как раньше.
const LOCAL_MODE = import.meta.env.PROD;
const STORAGE_KEY = 'perek-cart';

const readLocal = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

const writeLocal = (items) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  return items;
};

// [{ product_id, quantity }] → полный вид, как отдаёт Go-сервер
const expand = (raw) =>
  raw
    .map(({ product_id, quantity }) => {
      const p = findProduct(product_id);
      return p && { product_id, quantity, title: p.title, price: p.price, image: p.image };
    })
    .filter(Boolean);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // GET /api/cart — загрузить корзину (или localStorage на Pages)
  const load = useCallback(async () => {
    if (LOCAL_MODE) {
      setItems(expand(readLocal()));
      return;
    }
    const res = await fetch('/api/cart');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    setItems(data.items || []);
  }, []);

  // Добавить товар (quantity: 1)
  const add = useCallback(async (id) => {
    if (LOCAL_MODE) {
      const raw = readLocal();
      const found = raw.find((it) => it.product_id === Number(id));
      if (found) found.quantity += 1;
      else raw.push({ product_id: Number(id), quantity: 1 });
      writeLocal(raw);
      await load();
      return;
    }
    const res = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: Number(id), quantity: 1 }),
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    await load();
  }, [load]);

  // Удалить товар
  const remove = useCallback(async (id) => {
    if (LOCAL_MODE) {
      writeLocal(readLocal().filter((it) => it.product_id !== Number(id)));
      await load();
      return;
    }
    const res = await fetch('/api/cart/' + id, { method: 'DELETE' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    await load();
  }, [load]);

  // Очистить корзину
  const clear = useCallback(async () => {
    if (LOCAL_MODE) {
      writeLocal([]);
      await load();
      return;
    }
    const res = await fetch('/api/cart', { method: 'DELETE' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    await load();
  }, [load]);

  useEffect(() => {
    // сервер может быть не запущен — бейдж просто останется скрытым
    load().catch(() => {});
  }, [load]);

  const value = useMemo(() => {
    const count = items.reduce((sum, it) => sum + it.quantity, 0);
    const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
    return { items, count, total, load, add, remove, clear };
  }, [items, load, add, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart должен вызываться внутри <CartProvider>');
  return ctx;
}