import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

// Мини-корзина: кнопка 🛒 с бейджем в навбаре + выдвижная панель справа.
export default function MiniCart() {
  const { items, count, total, remove, clear } = useCart();
  const [open, setOpen] = useState(false);

  // Другие страницы могут открыть панель событием (например, «Перейти в корзину»).
  useEffect(() => {
    const openDrawer = () => setOpen(true);
    window.addEventListener('open-mini-cart', openDrawer);
    return () => window.removeEventListener('open-mini-cart', openDrawer);
  }, []);

  return (
    <>
      <button
        type="button"
        className="site-header__cart"
        aria-label="Корзина"
        onClick={() => setOpen(true)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
      >
        🛒
        <span className="site-nav__badge" data-cart-count hidden={count === 0}>
          {count}
        </span>
      </button>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, .4)',
              zIndex: 900,
            }}
          />
          <aside
            aria-label="Мини-корзина"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'min(360px, 90vw)',
              background: 'var(--color-white, #fff)',
              zIndex: 901,
              display: 'flex',
              flexDirection: 'column',
              padding: 'var(--space-md, 16px)',
              gap: 'var(--space-sm, 12px)',
              overflowY: 'auto',
              boxShadow: '-4px 0 16px rgba(0, 0, 0, .15)',
            }}
          >
            <div className="account-section__head">
              <h2 className="account-section__title">Корзина</h2>
              <button
                type="button"
                className="button button--secondary button--sm"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>

            {items.length === 0 ? (
              <p className="cart-empty">Ваша корзина пуста.</p>
            ) : (
              <>
                <table className="cart-table">
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.product_id}>
                        <td>
                          <img
                            className="cart-table__img"
                            src={'/images/' + item.image}
                            alt={item.title}
                            width={64}
                            height={64}
                          />
                        </td>
                        <td>
                          {item.title}
                          <br />
                          {item.quantity} × {item.price} ₽
                        </td>
                        <td>
                          <button
                            type="button"
                            className="button button--secondary button--sm"
                            onClick={() => remove(item.product_id)}
                          >
                            Удалить
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="cart-total-row">
                  <span>Итого:</span>
                  <strong>{total} ₽</strong>
                </div>

                <div className="cart-actions">
                  <Link
                    to="/account"
                    className="button button--primary button--block"
                    onClick={() => setOpen(false)}
                  >
                    Оформить
                  </Link>
                  <button
                    type="button"
                    className="button button--secondary button--block"
                    onClick={() => clear()}
                  >
                    Очистить корзину
                  </button>
                </div>
              </>
            )}
          </aside>
        </>
      )}
    </>
  );
}