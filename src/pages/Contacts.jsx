import { Link } from 'react-router-dom';
import { img } from '../utils/asset.js';

export default function Contacts() {
  return (
    <>
      <nav className="breadcrumbs" aria-label="Хлебные крошки">
        <Link className="breadcrumbs__link" to="/">Главная</Link>
        <span className="breadcrumbs__current" aria-current="page">Контакты</span>
      </nav>

      <section className="section">
        <h1 className="section__title">Контакты</h1>
        <p>Контактная информация интернет-магазина «Перекрёсток»: адрес магазина, телефон, время работы, карта и условия доставки.</p>
      </section>

      {/* 1. О магазине */}
      <section className="section about">
        <div className="about__content">
          <h2 className="section__title">О магазине</h2>
          <p>«Перекрёсток» — сеть супермаркетов. В ассортименте — свежие молочные продукты, хлеб, фрукты, напитки и сладости от проверенных производителей.</p>
          <p>
            Мы работаем каждый день и доставляем заказы по Москве и ближайшему Подмосковью.
            Вопросы по заказу, доставке или качеству товара — звоните или оформляйте заявку на странице{' '}
            <Link to="/order">оформления заявки</Link>.
          </p>
          <ul className="about__facts">
            <li className="about__fact"><strong data-count="12" data-suffix=" лет">12 лет</strong><span>на рынке</span></li>
            <li className="about__fact"><strong data-count="10000" data-suffix="+">10 000+</strong><span>товаров в каталоге</span></li>
            <li className="about__fact"><strong data-count="98" data-suffix="%">98%</strong><span>довольных клиентов</span></li>
          </ul>
        </div>
        <img
          className="about__image"
          src={img('store.jpg')}
          alt="Торговый зал супермаркета «Перекрёсток»"
          width={800}
          height={600}
          loading="lazy"
          decoding="async"
        />
      </section>

      {/* 2. Контактный телефон и адрес */}
      <section className="section">
        <h2 className="section__title">Контактный телефон и адрес</h2>
        <ul className="contacts-list">
          <li className="contacts-list__item"><strong>Адрес магазина:</strong> г. Москва, ул. Тверская, 12, стр. 1</li>
          <li className="contacts-list__item"><strong>Телефон:</strong> <a href="tel:+79000000000">+7 (800) 200 95-55</a></li>
          <li className="contacts-list__item"><strong>Время работы:</strong> Ежедневно с 08:00 до 23:00</li>
          <li className="contacts-list__item"><strong>E-mail:</strong> <a href="mailto:info@perekrestok-edu.ru">info@perekrestok-edu.ru</a></li>
        </ul>
      </section>

      {/* 3. Карта */}
      <section className="section">
        <h2 className="section__title">Как нас найти</h2>
        <p>Магазин находится на ул. Тверская, 12 — 3 минуты пешком от метро «Тверская». Вход со стороны улицы, рядом парковка.</p>
        <div className="map-wrapper">
          {/*
            Карта через OpenStreetMap: не требует API-ключа.
            Если нужен Яндекс.Карты — замените src на:
            https://yandex.ru/map-widget/v1/?ll=37.6105%2C55.7615&z=16&pt=37.6105%2C55.7615
          */}
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=37.6040%2C55.7575%2C37.6170%2C55.7655&layer=mapnik&marker=55.7615%2C37.6105"
            title="Карта: магазин «Перекрёсток» на ул. Тверская, 12 в Москве"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p className="map-actions">
          <a
            className="button button--secondary"
            href="https://www.openstreetmap.org/?mlat=55.7615&mlon=37.6105#map=16/55.7615/37.6105"
            target="_blank"
            rel="noopener noreferrer"
          >
            Открыть на карте
          </a>
        </p>
      </section>

      {/* 4. Доставка */}
      <section className="section">
        <h2 className="section__title">Доставка</h2>
        <p>Доставляем продукты по Москве и ближайшему Подмосковью. Бесплатно — при заказе от 1500 ₽.</p>
        <ul className="delivery-list">
          <li className="delivery-list__item">
            <h3 className="delivery-list__title">Курьером по Москве</h3>
            <p className="delivery-list__text">В день заказа — 299 ₽, в течение 2 часов — 399 ₽. Бесплатно при заказе от 1500 ₽.</p>
          </li>
          <li className="delivery-list__item">
            <h3 className="delivery-list__title">По Подмосковью</h3>
            <p className="delivery-list__text">От 2 до 5 дней в зависимости от расстояния. Стоимость — от 399 ₽.</p>
          </li>
          <li className="delivery-list__item">
            <h3 className="delivery-list__title">Самовывоз</h3>
            <p className="delivery-list__text">Бесплатно. Забрать заказ можно в магазине на ул. Тверская, 12 с 8:00 до 22:00.</p>
          </li>
        </ul>
      </section>

      {/* 5. Обратная связь */}
      <section className="section">
        <h2 className="section__title">Обратная связь</h2>
        <p>Оформить заявку или задать вопрос можно на странице оформления.</p>
        <Link className="button button--primary" to="/order">Перейти к форме заявки</Link>
      </section>
    </>
  );
}