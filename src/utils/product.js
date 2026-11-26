export function formatPrice(price) {
  return `${price} ₽`;
}

export function calculateDiscount(price, discountPercent) {
  const discountValue = price * discountPercent / 100;
  const finalPrice = price - discountValue;
  return { discountValue, finalPrice };
}

export function getStockStatus(product) {
  const STOCK_THRESHOLD = 5;
  if (!product.isAvailable) return 'Нет в наличии';
  if (product.stockCount > 0 && product.stockCount <= STOCK_THRESHOLD) {
    return `Мало на складе (осталось ${product.stockCount} шт.)`;
  }
  return 'В наличии';
}

export function getShortDescription(product) {
  return `${product.title} — ${formatPrice(product.price)}. ${getStockStatus(product)}.`;
}