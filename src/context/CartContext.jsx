import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // GET /api/cart — загрузить корзину с Go-бэкенда
  const load = useCallback(async () => {
    const res = await fetch('/api/cart');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    setItems(data.items || []);
  }, []);

  // POST /api/cart — добавить товар (quantity: 1)
  const add = useCallback(async (id) => {
    const res = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: Number(id), quantity: 1 }),
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    await load();
  }, [load]);

  // DELETE /api/cart/:id — удалить товар
  const remove = useCallback(async (id) => {
    const res = await fetch('/api/cart/' + id, { method: 'DELETE' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    await load();
  }, [load]);

  // DELETE /api/cart — очистить корзину
  const clear = useCallback(async () => {
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