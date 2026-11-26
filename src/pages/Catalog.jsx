import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import Reveal from '../components/Reveal.jsx';
import { products } from '../data/products.js';

const CATEGORIES = [
  { value: 'dairy', label: 'Молочное' },
  { value: 'bakery', label: 'Хлеб' },
  { value: 'fruits', label: 'Фрукты' },
  { value: 'drinks', label: 'Напитки' },
  { value: 'sweets', label: 'Сладости' },
];

const ALL_CATEGORIES = new Set(CATEGORIES.map((c) => c.value));

export default function Catalog() {
  // Черновик формы — меняется при вводе, применяется по кнопке
  const [draftCategories, setDraftCategories] = useState(new Set(ALL_CATEGORIES));
  const [draftMin, setDraftMin] = useState('');
  const [draftMax, setDraftMax] = useState('');

  // Применённые фильтры
  const [filters, setFilters] = useState({
    categories: new Set(ALL_CATEGORIES),
    minPrice: 0,
    maxPrice: Infinity,
  });

  useEffect(() => {
    document.title = 'Каталог — Перекрёсток';
  }, []);

  function toggleCategory(value) {
    setDraftCategories((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const min = parseFloat(draftMin);
    const max = parseFloat(draftMax);
    setFilters({
      categories: new Set(draftCategories),
      minPrice: isNaN(min) ? 0 : min,
      maxPrice: isNaN(max) ? Infinity : max,
    });
  }

  const visible = useMemo(
    () =>
      products.filter((p) => {
        const matchCat = filters.categories.size === 0 || filters.categories.has(p.category);
        const matchPrice = p.price >= filters.minPrice && p.price <= filters.maxPrice;
        return matchCat && matchPrice;
      }),
    [filters]
  );

  return (
    <>
      <nav className="breadcrumbs" aria-label="Хлебные крошки">
        <Link to="/" className="breadcrumbs__link">Главная</Link>
        <span className="breadcrumbs__current">Каталог</span>
      </nav>

      <Reveal as="section" className="section">
        <h1 className="section__title">Каталог товаров</h1>
        <p className="hero__text">Выберите категорию и диапазон цены — сетка товаров адаптируется под ширину экрана.</p>
      </Reveal>

      <div className="catalog-layout">
        <Reveal as="aside" className="catalog-filters" aria-label="Фильтры каталога">
          <h2 className="visually-hidden">Фильтры</h2>
          <form className="filters-form" onSubmit={handleSubmit}>
            <fieldset className="filters-form__group">
              <legend className="filters-form__legend">Категория</legend>
              {CATEGORIES.map((cat) => (
                <label key={cat.value} className="filters-form__check">
                  <input
                    type="checkbox"
                    name="category"
                    value={cat.value}
                    checked={draftCategories.has(cat.value)}
                    onChange={() => toggleCategory(cat.value)}
                  />
                  <span>{cat.label}</span>
                </label>
              ))}
            </fieldset>

            <fieldset className="filters-form__group">
              <legend className="filters-form__legend">Цена, ₽</legend>
              <div className="filters-form__row">
                <div>
                  <label htmlFor="price-min" className="filters-form__text-label">От</label>
                  <input
                    type="number"
                    id="price-min"
                    name="price-min"
                    className="filters-form__input"
                    min="0"
                    placeholder="0"
                    value={draftMin}
                    onChange={(e) => setDraftMin(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="price-max" className="filters-form__text-label">До</label>
                  <input
                    type="number"
                    id="price-max"
                    name="price-max"
                    className="filters-form__input"
                    min="0"
                    placeholder="1000"
                    value={draftMax}
                    onChange={(e) => setDraftMax(e.target.value)}
                  />
                </div>
              </div>
            </fieldset>

            <button type="submit" className="button button--primary button--block">Применить</button>
          </form>
        </Reveal>

        <Reveal className="products-grid products-grid--catalog" delay={100}>
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Reveal>
      </div>

      <p className="catalog-no-results" hidden={visible.length > 0}>
        По выбранным фильтрам товаров не найдено.
      </p>
    </>
  );
}