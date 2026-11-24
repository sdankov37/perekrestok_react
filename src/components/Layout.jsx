import { NavLink, Link, Outlet } from 'react-router-dom';
import MiniCart from './MiniCart.jsx';

const navClass = ({ isActive }) =>
  'site-nav__link' + (isActive ? ' site-nav__link--active' : '');

export default function Layout() {
  return (
    <>
      <a href="#main" className="skip-link">Перейти к содержимому</a>

      <header className="site-header">
        <div className="site-header__inner">
          <Link to="/" className="site-header__logo">
            <img
              src="/images/perek_logo.jpg"
              alt="Логотип Перекрёсток"
              className="logo-img"
              width={36}
              height={36}
            />
            <span>Перекрёсток</span>
          </Link>

          <nav className="site-nav" aria-label="Основная навигация">
            <ul className="site-nav__list">
              <li><NavLink to="/" className={navClass} end>Главная</NavLink></li>
              <li><NavLink to="/catalog" className={navClass}>Каталог</NavLink></li>
              <li><NavLink to="/about" className={navClass}>О магазине</NavLink></li>
              <li><NavLink to="/contacts" className={navClass}>Контакты</NavLink></li>
              <li><NavLink to="/account" className={navClass}>Кабинет</NavLink></li>
              <li><MiniCart /></li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <p className="site-footer__slogan">Перекрёсток — продукты рядом с домом.</p>
          <nav className="site-footer__nav" aria-label="Навигация в футере">
            <Link to="/catalog">Каталог</Link>
            <Link to="/about">О магазине</Link>
            <Link to="/contacts">Контакты</Link>
            <Link to="/account">Кабинет</Link>
          </nav>
          <p className="site-footer__contacts">Москва, ул. Примерная, 1 · +7 (495) 000-00-00</p>
          <p className="site-footer__copy">© 2026 Перекрёсток. Учебный проект.</p>
        </div>
      </footer>
    </>
  );
}