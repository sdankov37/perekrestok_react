import { useEffect, useRef, useState } from 'react';

/**
 * Обёртка для плавного появления контента при прокрутке.
 * Рендерит тот же тег, что и раньше (as="section" и т.п.), без лишних обёрток в DOM.
 * Задержка delay (мс) позволяет делать каскадное появление соседних элементов.
 * При prefers-reduced-motion контент показывается сразу, без анимации.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null);
  // '' | 'visible' | 'done'
  const [state, setState] = useState('');

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setState('done');
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('visible');
          observer.disconnect(); // анимация проигрывается один раз
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // После завершения анимации снимаем классы: transform больше не создаёт
  // containing block и не ломает position: sticky у дочерних элементов.
  function handleAnimationEnd(e) {
    if (e.target === ref.current) setState('done');
  }

  const classes = [
    state === '' && 'scroll-reveal',
    state === 'visible' && 'scroll-reveal scroll-reveal--visible',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      ref={ref}
      className={classes || undefined}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
      onAnimationEnd={state === 'visible' ? handleAnimationEnd : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}