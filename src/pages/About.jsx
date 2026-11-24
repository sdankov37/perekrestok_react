import { Link } from 'react-router-dom';

export default function About() {
  return (
    <>
      <nav className="breadcrumbs" aria-label="Хлебные крошки">
        <Link to="/" className="breadcrumbs__link">Главная</Link>
        <span className="breadcrumbs__current">О магазине</span>
      </nav>

      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">О магазине «Перекрёсток»</h1>
          <p className="hero__text">
            «Перекрёсток» — современный супермаркет и интернет-магазин продуктов.
            Мы объединяем строгий контроль свежести, удобный онлайн-каталог и быструю доставку до двери.
          </p>
          <Link to="/catalog" className="button button--primary">Перейти в каталог</Link>
        </div>
        <div className="hero__media">
          <img src="/images/hero.jpg" alt="Супермаркет Перекрёсток" width={500} height={500} />
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">Наши преимущества</h2>
        <ul className="delivery-list">
          <li className="delivery-list__item">
            <h3 className="delivery-list__title">Ежедневные поставки</h3>
            <p className="delivery-list__text">
              Свежие молочные продукты, горячий хлеб, сезонные овощи и фрукты поступают на полки
              магазина каждое утро напрямую от проверенных фермерских хозяйств и производителей.
            </p>
          </li>
          <li className="delivery-list__item">
            <h3 className="delivery-list__title">Контроль качества</h3>
            <p className="delivery-list__text">
              Мы строго следим за температурным режимом хранения и сроками годности каждой партии,
              чтобы вы получали только безопасные и натуральные продукты.
            </p>
          </li>
          <li className="delivery-list__item">
            <h3 className="delivery-list__title">Удобный сервис</h3>
            <p className="delivery-list__text">
              Оформить заказ на сайте можно за пару минут: выберите нужные позиции в каталоге,
              укажите удобное время и получите покупки с курьером или самовывозом.
            </p>
          </li>
        </ul>
      </section>

      <section className="section">
        <h2 className="section__title">Цифры и стандарты работы</h2>
        <div className="table-wrap">
          <table className="spec-table">
            <caption>Ключевые показатели нашего магазина</caption>
            <thead>
              <tr>
                <th scope="col">Показатель</th>
                <th scope="col">Значение</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ассортимент товаров</td>
                <td>Более 5 000 наименований свежих продуктов и товаров для дома</td>
              </tr>
              <tr>
                <td>Поставщики</td>
                <td>Свыше 120 локальных фермерских хозяйств и крупных брендов</td>
              </tr>
              <tr>
                <td>Время сборки заказа</td>
                <td>От 20 минут с проверкой сроков годности каждого товара</td>
              </tr>
              <tr>
                <td>География доставки</td>
                <td>Москва и ближайшее Подмосковье без выходных</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section" id="faq">
        <h2 className="section__title">Часто задаваемые вопросы</h2>
        <div className="faq-list">
          <details className="faq-item">
            <summary className="faq-item__question">Как вы проверяете свежесть продуктов перед отправкой?</summary>
            <p className="faq-item__answer">
              При сборке каждого заказа сотрудники магазина проверяют целостность упаковки и остаточный
              срок годности. Мы отбираем только те товары, у которых прошло не более половины
              установленного производителем срока хранения.
            </p>
          </details>

          <details className="faq-item">
            <summary className="faq-item__question">Можно ли оформить самовывоз из магазина?</summary>
            <p className="faq-item__answer">
              Да, вы можете бесплатно забрать собранный заказ в нашем магазине по адресу
              г. Москва, пр-т Вернадского, д. 78. Заказ хранится в специальной зоне
              с соблюдением температурного режима в течение 24 часов.
            </p>
          </details>

          <details className="faq-item">
            <summary className="faq-item__question">Как связаться со службой поддержки покупателей?</summary>
            <p className="faq-item__answer">
              Вы можете позвонить нам по единому номеру 8 (800) 200-95-55 ежедневно с 08:00 до 23:00
              или написать на электронную почту. Наши специалисты оперативно помогут решить
              любой вопрос по заказу или возврату.
            </p>
          </details>
        </div>
      </section>
    </>
  );
}