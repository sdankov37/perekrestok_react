import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { products } from '../data/products.js';

const popular = [1, 2, 3].map((id) => products.find((p) => p.id === id));

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">Свежие продукты каждый день</h1>
          <p className="hero__text">
            «Перекрёсток» — современный супермаркет и интернет-магазин продуктов.
            Мы объединяем строгий контроль свежести, удобный онлайн-каталог и быструю доставку до двери.
          </p>
          <Link className="button button--primary" to="/catalog">Перейти в каталог</Link>
        </div>
        <div className="hero__media">
          <img
            className="hero__image"
            src="/images/perek_logo.jpg"
            srcSet="/images/perek_logo.jpg 800w"
            sizes="(min-width: 900px) 50vw, 100vw"
            alt="Продуктовая композиция: молоко, хлеб, фрукты и сыр"
            width={800}
            height={800}
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">Популярные товары</h2>
        <div className="products-grid">
          {popular.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="section" id="faq">
        <h2 className="section__title">Часто задаваемые вопросы</h2>
        <div className="faq-list">
          <details className="faq-item">
            <summary className="faq-item__question">Как оформить заказ?</summary>
            <p className="faq-item__answer">
              Выберите нужные продукты в каталоге и перейдите на страницу понравившегося товара
              с помощью кнопки «Подробнее». После этого заполните короткую форму заявки,
              указав контактные данные и удобное время получения.
            </p>
          </details>

          <details className="faq-item">
            <summary className="faq-item__question">Есть ли доставка?</summary>
            <p className="faq-item__answer">
              Да, мы доставляем свежие продукты по Москве и Московской области курьером прямо
              до двери в день оформления заказа. Доставка в другие регионы России занимает
              от 2 до 5 рабочих дней в зависимости от выбранной транспортной компании.
            </p>
          </details>

          <details className="faq-item">
            <summary className="faq-item__question">Можно ли вернуть товар?</summary>
            <p className="faq-item__answer">
              Вы можете вернуть товар ненадлежащего качества или оформить возврат
              непродовольственных позиций в течение 14 дней с момента покупки.
              Для оформления возврата необходимо сохранить целостность заводской упаковки и кассовый чек.
            </p>
          </details>
        </div>
      </section>
    </>
  );
}