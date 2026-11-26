import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import Reveal from '../components/Reveal.jsx';
import { useCart } from '../context/CartContext.jsx';
import { products, findProduct } from '../data/products.js';
import { img } from '../utils/asset.js';

export default function ProductPage() {
  const { id } = useParams();
  const product = findProduct(id);
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [reviews, setReviews] = useState([
    { author: 'Мария Т.', text: 'Отличный товар, свежий и качественный. Заказываю не первый раз — всегда доволен покупкой и быстрой доставкой.', rating: 5 },
    { author: 'Олег Н.', text: 'Привезли в аккуратной упаковке, всё соответствует описанию. Рекомендую этот магазин.', rating: 5 },
  ]);
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);

  useEffect(() => {
    document.title = `${product?.title || 'Товар'} — Перекрёсток`;
  }, [product]);

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

  function handleSubmit(e) {
    e.preventDefault();
    if (!author.trim() || !text.trim()) return;
    setReviews(prev => [...prev, { author: author.trim(), text: text.trim(), rating }]);
    setAuthor(''); setText(''); setRating(5);
  }

  return (
    <>
      <nav className="breadcrumbs" aria-label="Хлебные крошки">
        <Link to="/" className="breadcrumbs__link">Главная</Link>
        <span className="breadcrumbs__current"><Link to="/catalog" className="breadcrumbs__link">Каталог</Link></span>
        <span className="breadcrumbs__current">{product.title}</span>
      </nav>

      <Reveal className="product-layout">
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
      </Reveal>

      <Reveal as="section" className="section">
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
      </Reveal>

      <section className="section">
        <Reveal><h2 className="section__title">Отзывы покупателей</h2></Reveal>
        <div className="reviews-list">
          {reviews.map((r, i) => (
            <article className="review" key={i}>
              <div className="review__header">
                <span className="review__author">{r.author}</span>
                <span className="review__rating" role="img" aria-label={`Оценка ${r.rating} из 5`}>
                  {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                </span>
              </div>
              <p className="review__text">{r.text}</p>
            </article>
          ))}
        </div>

        <form className="review-form" onSubmit={handleSubmit}>
          <h3 className="review-form__title">Оставить отзыв</h3>
          <label className="review-form__label">
            Имя
            <input type="text" value={author} onChange={e => setAuthor(e.target.value)}
                   required minLength={2} placeholder="Ваше имя" />
          </label>
          <label className="review-form__label">
            Оценка
            <select value={rating} onChange={e => setRating(Number(e.target.value))}>
              {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} ★</option>)}
            </select>
          </label>
          <label className="review-form__label">
            Отзыв
            <textarea value={text} onChange={e => setText(e.target.value)}
                      required minLength={5} rows={4} placeholder="Поделитесь впечатлением" />
          </label>
          <button type="submit" className="button button--primary">Отправить отзыв</button>
        </form>
      </section>

      <Reveal as="section" className="section">
        <h2 className="section__title">Похожие товары</h2>
        <div className="products-grid">
          {similar.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Reveal>
    </>
  );
}