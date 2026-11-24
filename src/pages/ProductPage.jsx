import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { useCart } from '../context/CartContext.jsx';
import { products, findProduct } from '../data/products.js';
import { img } from '../utils/asset.js';

export default function ProductPage() {
  const { id } = useParams();
  const product = findProduct(id);
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  if (!product) return <Navigate to="/catalog" replace />;

  const similar = products.filter((p) => p.id !== product.id).slice(0, 3);

  async function handleAdd() {
    try {
      await add(product.id);
      setAdded(true);
      setTimeout(() => setAdded(false), 1200);
    } catch {
      alert(
        'Не удалось добавить в корзину.\n' +
        'Проверьте, что Go-сервер запущен: cd server && go run .'
      );
    }
  }

  return (
    <>
      <nav className="breadcrumbs" aria-label="Хлебные крошки">
        <Link to="/" className="breadcrumbs__link">Главная</Link>
        <span className="breadcrumbs__current"><Link to="/catalog" className="breadcrumbs__link">Каталог</Link></span>
        <span className="breadcrumbs__current">{product.title}</span>
      </nav>

      <div className="product-layout">
        <div className="product-gallery">
          <img
            src={img(product.image)}
            alt={product.title}
            className="product-gallery__main"
            width={600}
            height={600}
          />
        </div>

        <div className="product-info">
          <h1 className="product-info__title">{product.title}, {product.unit}</h1>
          <p className="product-info__price">{product.price} ₽</p>
          <p className="product-info__description">
            {product.title} — свежий товар категории «{product.category}» от проверенных производителей.
            Строгий контроль качества и сроков годности, бережная упаковка и быстрая доставка до двери.
          </p>
          <div className="product-info__actions">
            <button type="button" className="button button--primary" onClick={handleAdd} disabled={added}>
              {added ? 'Добавлено ✓' : 'Добавить в корзину'}
            </button>
            <button type="button" className="button button--secondary" onClick={() => window.dispatchEvent(new CustomEvent('open-mini-cart'))}>
              Перейти в корзину
            </button>
          </div>
        </div>

        <aside className="product-aside" aria-label="Условия покупки">
          <h2 className="product-aside__title">Дополнительно</h2>
          <ul className="product-aside__list">
            <li>Акция недели: скидка при заказе на сайте</li>
            <li>Доставка: бережная упаковка без повреждений</li>
            <li>Оплата: банковской картой онлайн или при получении</li>
          </ul>
        </aside>
      </div>

      <section className="section">
        <h2 className="section__title">Характеристики</h2>
        <div className="table-wrap">
          <table className="spec-table">
            <caption>Технические характеристики товара</caption>
            <thead>
              <tr>
                <th scope="col">Параметр</th>
                <th scope="col">Значение</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Наименование</td>
                <td>{product.title}</td>
              </tr>
              <tr>
                <td>Категория</td>
                <td>{product.category}</td>
              </tr>
              <tr>
                <td>Фасовка</td>
                <td>{product.unit}</td>
              </tr>
              <tr>
                <td>Цена</td>
                <td>{product.price} ₽</td>
              </tr>
              <tr>
                <td>Условия хранения</td>
                <td>От +2 °C до +8 °C в сухом прохладном месте</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">Отзывы покупателей</h2>
        <div className="reviews-list">
          <article className="review">
            <div className="review__header">
              <span className="review__author">Мария Т.</span>
              <span className="review__rating" aria-label="Оценка 5 из 5">★★★★★</span>
            </div>
            <p className="review__text">Отличный товар, свежий и качественный. Заказываю не первый раз — всегда доволен покупкой и быстрой доставкой.</p>
          </article>

          <article className="review">
            <div className="review__header">
              <span className="review__author">Олег Н.</span>
              <span className="review__rating" aria-label="Оценка 5 из 5">★★★★★</span>
            </div>
            <p className="review__text">Привезли в аккуратной упаковке, всё соответствует описанию. Рекомендую этот магазин.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">Похожие товары</h2>
        <div className="products-grid">
          {similar.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}