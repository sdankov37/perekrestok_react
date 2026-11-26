import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FlexCarousel from '../components/FlexCarousel/FlexCarousel';
import Reveal from '../components/Reveal.jsx';
import { products } from '../data/products.js';
import { img } from '../utils/asset.js';

const popularItems = [1, 2, 3].map((id) => products.find((p) => p.id === id));

const carouselItems = popularItems.map((p) => ({
  src: img(p.image),
  alt: p.title,
  title: p.title,
  subtitle: `${p.unit} · ${p.price} ₽`,
  id: p.id
}));

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Главная — Перекрёсток';
  }, []);

  return (
    <>
      <Reveal as="section" className="hero">
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
            src={img('perek_logo.jpg')}
            srcSet={`${img('perek_logo.jpg')} 800w`}
            sizes="(min-width: 900px) 50vw, 100vw"
            alt="Продуктовая композиция: молоко, хлеб, фрукты и сыр"
            width={800}
            height={800}
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </Reveal>

      <Reveal as="section" className="section">
        <h2 className="section__title">Популярные товары</h2>
        <div style={{ width: '100%', maxWidth: '560px', height: '360px', position: 'relative', margin: '0 auto' }}>
          <FlexCarousel
            items={carouselItems}
            preset="liquid"
            intro="rise"
            cardHeight={0.62}
            gap={14}
            squeeze={0.2}
            lensWidth={0.85}
            lensHeight={0.7}
            focusOnClick={false}
            captions
            onSelect={(index, item) => navigate(`/product/${item.id}`)}
          />
        </div>
      </Reveal>

      <section className="section" id="faq">
        <Reveal><h2 className="section__title">Часто задаваемые вопросы</h2></Reveal>
        <div className="faq-list">
          <Reveal as="details" className="faq-item">
            <summary className="faq-item__question">Как оформить заказ?</summary>
            <p className="faq-item__answer">
              Выберите нужные продукты в каталоге и перейдите на страницу понравившегося товара
              с помощью кнопки «Подробнее». После этого заполните короткую форму заявки,
              указав контактные данные и удобное время получения.
            </p>
          </Reveal>

          <Reveal as="details" className="faq-item" delay={100}>
            <summary className="faq-item__question">Есть ли доставка?</summary>
            <p className="faq-item__answer">
              Да, мы доставляем свежие продукты по Москве и Московской области курьером прямо
              до двери в день оформления заказа. Доставка в другие регионы России занимает
              от 2 до 5 рабочих дней в зависимости от выбранной транспортной компании.
            </p>
          </Reveal>

          <Reveal as="details" className="faq-item" delay={200}>
            <summary className="faq-item__question">Можно ли вернуть товар?</summary>
            <p className="faq-item__answer">
              Вы можете вернуть товар ненадлежащего качества или оформить возврат
              непродовольственных позиций в течение 14 дней с момента покупки.
              Для оформления возврата необходимо сохранить целостность заводской упаковки и кассовый чек.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}