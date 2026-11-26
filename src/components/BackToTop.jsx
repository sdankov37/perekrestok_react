import { useEffect, useRef, useState } from 'react';

// Порог появления кнопки (px прокрутки).
const SHOW_AFTER = 300;

// Кнопка «Наверх»: появляется после прокрутки, плавно скроллит страницу в начало.
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleScroll = () => {
      const show = window.scrollY > SHOW_AFTER;
      // Обновляем состояние только при пересечении порога, чтобы не ре-рендерить на каждый скролл.
      if (show !== visibleRef.current) {
        visibleRef.current = show;
        setVisible(show);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion.current ? 'auto' : 'smooth',
    });
  };

  return (
    <button
      type="button"
      className={'back-to-top' + (visible ? ' back-to-top--visible' : '')}
      onClick={scrollToTop}
      aria-label="Наверх"
      tabIndex={visible ? 0 : -1}
    >
      <svg
        className="back-to-top__icon"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
      <span className="back-to-top__label">Наверх</span>
    </button>
  );
}