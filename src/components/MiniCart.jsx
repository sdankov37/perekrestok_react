import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

// Мини-корзина: кнопка 🛒 с бейджем в навбаре + выдвижная панель справа.
// variant='header' — только кнопка для мобильной шапки (панель живёт в nav-экземпляре).
export default function MiniCart({ variant }) {
  const { items, count, total, remove, clear } = useCart();
  const [open, setOpen] = useState(false);

  // Другие страницы могут открыть панель событием (например, «Перейти в корзину»).
  useEffect(() => {
    if (variant === 'header') return undefined;
    const openDrawer = () => setOpen(true);
    window.addEventListener('open-mini-cart', openDrawer);
    return () => window.removeEventListener('open-mini-cart', openDrawer);
  }, [variant]);

  return (
    <>
      <button
        type="button"
        className="site-header__cart site-header__cart--button"
        aria-label="Корзина"
        onClick={() =>
          variant === 'header'
            ? window.dispatchEvent(new Event('open-mini-cart'))
            : setOpen(true)
        }
      >
        🛒
        <span className="site-nav__badge" data-cart-count hidden={count === 0}>
          {count}
        </span>
      </button>

      {variant !== 'header' && open && createPortal(
        <>
          <div className="minicart-overlay" onClick={() => setOpen(false)} />
          <aside className="minicart" aria-label="Мини-корзина">
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
        </>,
        document.body
      )}
    </>
  );
}