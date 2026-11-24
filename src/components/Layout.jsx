import { useState, useEffect } from 'react';
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';
import MiniCart from './MiniCart.jsx';

const navClass = ({ isActive }) =>
  'site-nav__link' + (isActive ? ' site-nav__link--active' : '');

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Закрываем мобильное меню при переходе на другую страницу.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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
              width={32}
              height={32}
            />
            <span>Перекрёсток</span>
          </Link>

          <nav
            className={'site-nav' + (menuOpen ? ' site-nav--open' : '')}
            aria-label="Основная навигация"
          >
            <ul className="site-nav__list">
              <li><NavLink to="/" className={navClass} end>Главная</NavLink></li>
              <li><NavLink to="/catalog" className={navClass}>Каталог</NavLink></li>
              <li><NavLink to="/about" className={navClass}>О магазине</NavLink></li>
              <li><NavLink to="/contacts" className={navClass}>Контакты</NavLink></li>
              <li><NavLink to="/account" className={navClass}>Кабинет</NavLink></li>
              <li className="site-nav__cart"><MiniCart /></li>
            </ul>
          </nav>

          <div className="site-header__actions">
            <div className="site-header__cart-slot"><MiniCart variant="header" /></div>
            <button
              type="button"
              className={'site-header__burger' + (menuOpen ? ' site-header__burger--open' : '')}
              aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="site-header__burger-line" />
              <span className="site-header__burger-line" />
              <span className="site-header__burger-line" />
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="site-footer__inner">
          {/* Левая колонка: Логотип и слоган */}
          <div className="site-footer__col site-footer__brand">
            <Link to="/" className="site-header__logo">
              <img
                src="/images/perek_logo.jpg"
                alt="Логотип Перекрёсток"
                className="logo-img"
                width={32}
                height={32}
              />
              <span>Перекрёсток</span>
            </Link>
            <p className="site-footer__slogan">Свежие продукты каждый день</p>
            <p className="site-footer__copy">© 2026 Магазин «Перекрёсток». Все права защищены.</p>
          </div>

          {/* Центральная колонка: Навигация */}
          <div className="site-footer__col">
            <h3 className="site-footer__heading">Навигация</h3>
            <ul className="site-footer__nav">
              <li><Link to="/">Главная</Link></li>
              <li><Link to="/catalog">Каталог</Link></li>
              <li><Link to="/about">О магазине</Link></li>
            </ul>
          </div>

          {/* Правая колонка: Контакты */}
          <div className="site-footer__col">
            <h3 className="site-footer__heading">Контакты</h3>
            <ul className="site-footer__contacts">
              <li><strong>Адрес:</strong> г. Москва, пр-т Вернадского, д. 78</li>
              <li><strong>Телефон:</strong> <a href="tel:+78002009555">8 (800) 200-95-55</a></li>
              <li><strong>Часы работы:</strong> Ежедневно с 08:00 до 23:00</li>
              <li><strong>Почта:</strong> <a href="mailto:info@perekrestok-edu.ru">info@perekrestok-edu.ru</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}