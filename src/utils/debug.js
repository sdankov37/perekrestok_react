import { products } from '../data/products';
import { formatPrice, calculateDiscount, getStockStatus, getShortDescription } from './product';

export function runProductChecks() {
  console.group('Проверка функций товара');
  const p = products[0];
  console.table(p);
  console.log('formatPrice:', formatPrice(p.price));
  const d = calculateDiscount(p.price, p.discountPercent || 15);
  console.log(`Скидка ${p.discountPercent}%: −${formatPrice(d.discountValue)}, итог ${formatPrice(d.finalPrice)}`);
  console.log('Статус:', getStockStatus(p));
  console.log('Краткое описание:', getShortDescription(p));
  console.groupEnd();
}