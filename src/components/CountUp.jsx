import { useEffect, useRef, useState } from 'react';

const formatter = new Intl.NumberFormat('ru-RU');

/**
 * Счётчик с анимацией роста числа от 0 до end.
 * Запускается, когда элемент появляется в зоне видимости.
 * При prefers-reduced-motion сразу показывает итоговое значение.
 */
export default function CountUp({ end, suffix = '', duration = 1500 }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    let rafId;
    const animate = () => {
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        setValue(Math.round(end * eased));
        if (progress < 1) rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      setValue(end);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          animate();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [end, duration]);

  return (
    <strong ref={ref}>
      {formatter.format(value)}
      {suffix}
    </strong>
  );
}