import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { img } from '../utils/asset.js';

// Карточка товара. props: { product } — объект из src/data/products.js
export default function ProductCard({ product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  // Анимация появления — только при первом монтировании карточки,
  // чтобы повторный рендер (фильтры, смена состояния) её не перезапускал.
  const [entrance] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  async function handleAdd() {
    try {
      await add(product.id);
      setAdded(true);
      document.dispatchEvent(new CustomEvent('cart:added'));
      setTimeout(() => setAdded(false), 1200);
    } catch {
      alert(
        'Не удалось добавить в корзину.\n' +
        'Проверьте, что Go-сервер запущен: cd server && go run .'
      );
    }
  }

  return (
    <article
      className={'product-card' + (entrance ? ' reveal-in' : '')}
      data-category={product.category}
      data-price={product.price}
    >
      <Link to={'/product/' + product.id}>
        <img
          className="product-card__image"
          src={img(product.image)}
          alt={product.title}
        />
      </Link>
      <h3 className="product-card__title">
        <Link to={'/product/' + product.id}>{product.title}</Link>
      </h3>
      <p className="product-card__description">{product.unit}</p>
      <p className="product-card__price">{product.price} ₽</p>
      <button
        type="button"
        className="button button--primary product-card__button"
        onClick={handleAdd}
        disabled={added}
      >
        {added ? 'Добавлено ✓' : 'В корзину'}
      </button>
    </article>
  );
}