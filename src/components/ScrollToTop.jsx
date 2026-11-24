import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// При смене роута прокручиваем страницу наверх (кроме переходов по якорю).
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
