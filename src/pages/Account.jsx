import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import Reveal from '../components/Reveal.jsx';
import { useCart } from '../context/CartContext.jsx';
import { findProduct } from '../data/products.js';

const FREE_DELIVERY_THRESHOLD = 1500;

// Данные пользователя (захардкожены, как в account.html)
const USER = {
  name: 'Иван Петров',
  phone: '+7 (900) 123-45-67',
  phoneHref: 'tel:+79001234567',
  email: 'ivan@example.com',
  points: 240,
  level: 'Серебряный',
  ordersCount: 12,
  toGold: 750,
  loyalty: {
    discount: '24 ₽',
    totalEarned: '1 850',
    spent: '1 610',
  },
  addresses: [
    { icon: '🏠', label: 'Основной', primary: true, lines: ['г. Москва,', 'пр-т Вернадского, 78, кв. 15'] },
    { icon: '📍', label: null, primary: false, lines: ['г. Москва,', 'ул. Тверская, 12, кв. 5'] },
  ],
  orders: [
    { number: 'Заказ №1001', date: '15 ноября 2026', modifier: 'success', badge: 'badge--success', status: '✓ Доставлен', body: 'Молоко, хлеб, яблоки — 3 товара на 293 ₽', productIds: [1, 2, 3] },
    { number: 'Заказ №0987', date: '8 ноября 2026', modifier: 'info', badge: 'badge--info', status: '🚚 В пути', body: 'Кофе, печенье — 2 товара на 348 ₽', productIds: [5, 10] },
    { number: 'Заказ №0954', date: '1 ноября 2026', modifier: 'warning', badge: 'badge--warning', status: '✕ Отменён', body: 'Сыр, батон — 2 товара на 444 ₽', productIds: [4, 12] },
  ],
  favoriteIds: [1, 2, 5],
  promos: [
    { code: 'PEREK10', desc: 'Скидка 10% на первый заказ' },
    { code: 'BDAY500', desc: '500 ₽ на день рождения' },
  ],
};

const TABS = [
  { href: '#cart', label: '🛒 Корзина' },
  { href: '#loyalty', label: '⭐ Клуб' },
  { href: '#addresses', label: '📍 Адреса' },
  { href: '#orders', label: '📦 Заказы' },
  { href: '#favorites', label: '❤ Избранное' },
  { href: '#settings', label: '🎁 Промокоды' },
];

function DeliveryProgress({ total }) {
  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - total);
  const percent = Math.min(100, (total / FREE_DELIVERY_THRESHOLD) * 100);
  const isFree = total >= FREE_DELIVERY_THRESHOLD;

  return (
    <div className="delivery-progress">
      <div className="delivery-progress__bar">
        <div className="delivery-progress__fill"
             style={{ width: `${percent}%` }}
             role="progressbar"
             aria-valuenow={Math.round(percent)}
             aria-valuemin={0}
             aria-valuemax={100}
             aria-label="Прогресс до бесплатной доставки" />
      </div>
      <p className="delivery-progress__text">
        {isFree
          ? <strong>Бесплатная доставка ✓</strong>
          : <>До бесплатной доставки осталось <strong>{remaining} ₽</strong></>}
      </p>
    </div>
  );
}

export default function Account() {
  const { items, total, add, remove } = useCart();
  const [delivery, setDelivery] = useState('courier');
  const [newsletter, setNewsletter] = useState(true);
  const [repeatState, setRepeatState] = useState({}); // number → 'loading' | 'done'
  const [copiedCode, setCopiedCode] = useState(null);

  useEffect(() => {
    document.title = 'Личный кабинет — Перекрёсток';
  }, []);

  async function handleRepeat(order) {
    setRepeatState((s) => ({ ...s, [order.number]: 'loading' }));
    try {
      for (const id of order.productIds) {
        await add(id);
      }
      setRepeatState((s) => ({ ...s, [order.number]: 'done' }));
      setTimeout(() => setRepeatState((s) => ({ ...s, [order.number]: undefined })), 1500);
    } catch {
      setRepeatState((s) => ({ ...s, [order.number]: undefined }));
      alert('Не удалось повторить заказ. Проверьте, что Go-сервер запущен.');
    }
  }

  async function handleCopyPromo(code) {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 1200);
    } catch {
      // clipboard недоступен — оставляем текст кнопки без изменений
    }
  }

  return (
    <>
      {/* ===== HERO-ПРОФИЛЬ ===== */}
      <Reveal as="section" className="account-hero">
        <div className="account-hero__inner">
          <div className="account-hero__emoji" aria-hidden="true">🧑</div>
          <div className="account-hero__info">
            <h1 className="account-hero__name">{USER.name}</h1>
            <p className="account-hero__meta">
              <a href={USER.phoneHref}>{USER.phone}</a>
              <span className="account-hero__dot">·</span>
              <a href={'mailto:' + USER.email}>{USER.email}</a>
            </p>
            <button type="button" className="account-hero__edit">✎ Редактировать</button>
          </div>
        </div>

        <ul className="account-hero__stats">
          <li><strong>{USER.points}</strong><span>баллов</span></li>
          <li><strong>{USER.level}</strong><span>уровень</span></li>
          <li><strong>{USER.ordersCount}</strong><span>заказов</span></li>
          <li><strong>{USER.toGold}</strong><span>до Gold</span></li>
        </ul>
      </Reveal>

      {/* ===== ЛИПКАЯ НАВИГАЦИЯ ПО РАЗДЕЛАМ ===== */}
      <nav className="account-tabs" aria-label="Разделы кабинета">
        {TABS.map((tab) => (
          <a key={tab.href} href={tab.href} className="account-tabs__link">{tab.label}</a>
        ))}
      </nav>

      {/* ===== КОРЗИНА ===== */}
      <Reveal as="section" className="section account-section" id="cart">
        <div className="account-section__head">
          <h2 className="account-section__title">🛒 Активная корзина</h2>
          <Link to="/catalog" className="account-section__aside-link">+ Добавить товары</Link>
        </div>

        <DeliveryProgress total={total} />

        <p className="cart-empty" hidden={items.length > 0}>
          Ваша корзина пуста. <Link to="/catalog">Перейти в каталог</Link>
        </p>

        <div className="cart-wrap">
          <table className="cart-table">
            <caption className="visually-hidden">Товары в корзине</caption>
            <thead>
              <tr>
                <th scope="col">Товар</th>
                <th scope="col">Цена</th>
                <th scope="col">Кол-во</th>
                <th scope="col">Сумма</th>
                <th scope="col"><span className="visually-hidden">Действия</span></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.product_id}>
                  <td>{item.title}</td>
                  <td>{item.price} ₽</td>
                  <td>{item.quantity}</td>
                  <td>{item.price * item.quantity} ₽</td>
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
        </div>

        <div className="cart-total-row">
          <span>Итого:</span>
          <strong>{total} ₽</strong>
        </div>

        <div className="account-method">
          <p className="account-method__label">Способ получения</p>
          <div className="account-method__options">
            <label className="account-method__option">
              <input
                type="radio"
                name="delivery"
                value="courier"
                checked={delivery === 'courier'}
                onChange={() => setDelivery('courier')}
              />
              <span className="account-method__card">
                <span className="account-method__icon">🚚</span>
                <strong>Курьером</strong>
                <small>на сохранённый адрес</small>
              </span>
            </label>
            <label className="account-method__option">
              <input
                type="radio"
                name="delivery"
                value="pickup"
                checked={delivery === 'pickup'}
                onChange={() => setDelivery('pickup')}
              />
              <span className="account-method__card">
                <span className="account-method__icon">🏪</span>
                <strong>Самовывоз</strong>
                <small>пр-т Вернадского, 78</small>
              </span>
            </label>
          </div>
        </div>

        <div className="cart-actions">
          <Link to="/catalog" className="button button--secondary">Продолжить покупки</Link>
          <button type="button" className="button button--primary">Оформить заказ</button>
        </div>
      </Reveal>

      {/* ===== КЛУБ ПЕРЕКРЁСТОК ===== */}
      <Reveal as="section" className="section account-section" id="loyalty">
        <div className="account-section__head">
          <h2 className="account-section__title">⭐ Клуб Перекрёсток</h2>
        </div>

        <div className="loyalty-grid">
          <div className="loyalty-tile loyalty-tile--accent">
            <div className="loyalty-tile__value">{USER.points}</div>
            <div className="loyalty-tile__label">баллов на счету</div>
          </div>
          <div className="loyalty-tile">
            <div className="loyalty-tile__value">{USER.loyalty.discount}</div>
            <div className="loyalty-tile__label">в пересчёте на скидку</div>
          </div>
          <div className="loyalty-tile">
            <div className="loyalty-tile__value">{USER.loyalty.totalEarned}</div>
            <div className="loyalty-tile__label">всего накоплено</div>
          </div>
          <div className="loyalty-tile">
            <div className="loyalty-tile__value">{USER.loyalty.spent}</div>
            <div className="loyalty-tile__label">потрачено баллов</div>
          </div>
        </div>

        <div className="loyalty-level">
          <div className="loyalty-level__badge">🥈 {USER.level}</div>
          <div className="loyalty-level__track">
            <div className="loyalty-level__fill" />
          </div>
          <div className="loyalty-level__hint">Ещё {USER.toGold} баллов — и вы получите золотой уровень</div>
        </div>

        <p className="loyalty-actions">
          <button type="button" className="button button--primary">Списать баллы при заказе</button>
        </p>
      </Reveal>

      {/* ===== АДРЕСА ===== */}
      <Reveal as="section" className="section account-section" id="addresses">
        <div className="account-section__head">
          <h2 className="account-section__title">📍 Мои адреса</h2>
          <button type="button" className="button button--secondary button--sm">+ Добавить адрес</button>
        </div>

        <div className="address-grid">
          {USER.addresses.map((addr, i) => (
            <div key={i} className={'address-card' + (addr.primary ? ' address-card--primary' : '')}>
              <div className="address-card__head">
                <span className="address-card__icon">{addr.icon}</span>
                {addr.label && <span className="address-card__label">{addr.label}</span>}
              </div>
              <p className="address-card__text">
                {addr.lines[0]}<br />{addr.lines[1]}
              </p>
              <button type="button" className="button button--secondary button--sm">Изменить</button>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ===== ИСТОРИЯ ЗАКАЗОВ ===== */}
      <Reveal as="section" className="section account-section" id="orders">
        <div className="account-section__head">
          <h2 className="account-section__title">📦 История заказов</h2>
        </div>

        <div className="order-history">
          {USER.orders.map((order) => (
            <article key={order.number} className={'order-card order-card--' + order.modifier}>
              <div className="order-card__head">
                <div className="order-card__meta">
                  <div className="order-card__number">{order.number}</div>
                  <div className="order-card__date">{order.date}</div>
                </div>
                <span className={'badge ' + order.badge}>{order.status}</span>
              </div>
              <p className="order-card__body">{order.body}</p>
              <div className="order-card__actions">
                <button
                  type="button"
                  className="button button--secondary button--sm"
                  onClick={() => handleRepeat(order)}
                  disabled={repeatState[order.number] === 'loading'}
                >
                  {repeatState[order.number] === 'loading' ? 'Добавляем…'
                    : repeatState[order.number] === 'done' ? 'Добавлено ✓'
                    : '↻ Повторить'}
                </button>
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      {/* ===== ИЗБРАННОЕ ===== */}
      <Reveal as="section" className="section account-section" id="favorites">
        <div className="account-section__head">
          <h2 className="account-section__title">❤ Любимые продукты</h2>
        </div>

        <div className="products-grid">
          {USER.favoriteIds.map((id) => (
            <ProductCard key={id} product={findProduct(id)} />
          ))}
        </div>
      </Reveal>

      {/* ===== ПРОМОКОДЫ И УВЕДОМЛЕНИЯ ===== */}
      <Reveal as="section" className="section account-section" id="settings">
        <div className="account-section__head">
          <h2 className="account-section__title">🎁 Промокоды и уведомления</h2>
        </div>

        <div className="promo-grid">
          {USER.promos.map((promo) => (
            <div key={promo.code} className="promo-card">
              <div className="promo-card__body">
                <div className="promo-card__code">{promo.code}</div>
                <p className="promo-card__desc">{promo.desc}</p>
              </div>
              <button
                type="button"
                className="promo-card__copy"
                onClick={() => handleCopyPromo(promo.code)}
              >
                {copiedCode === promo.code ? 'Скопировано ✓' : 'Скопировать'}
              </button>
            </div>
          ))}
        </div>

        <label className="checkbox-toggle">
          <input
            type="checkbox"
            checked={newsletter}
            onChange={(e) => setNewsletter(e.target.checked)}
          />
          <span>Получать рассылку акций и персональных скидок</span>
        </label>
      </Reveal>
    </>
  );
}