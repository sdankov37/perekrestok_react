// Каталог товаров «Перекрёсток» — данные из server/main.go (массив products).
export const products = [
  { id: 1,  title: 'Молоко «Простоквашино»',      category: 'dairy',   price: 89,  image: 'milk.jpg',       unit: '3,2%, 1 л' },
  { id: 2,  title: 'Хлеб «Бородинский»',          category: 'bakery',  price: 55,  image: 'bread.png',      unit: '400 г, нарезной' },
  { id: 3,  title: 'Яблоки «Гренни Смит»',        category: 'fruits',  price: 149, image: 'apples.jpg',     unit: '1 кг' },
  { id: 4,  title: 'Сыр «Российский»',            category: 'dairy',   price: 399, image: 'cheese.jpg',     unit: '45%, 200 г' },
  { id: 5,  title: 'Кофе «Jacobs Monarch»',       category: 'drinks',  price: 259, image: 'coffee.jpg',     unit: 'Растворимый, 150 г' },
  { id: 6,  title: 'Шоколад «Алёнка»',            category: 'sweets',  price: 99,  image: 'choko.jpg',      unit: 'Молочный, 100 г' },
  { id: 7,  title: 'Кефир «Простоквашино»',       category: 'dairy',   price: 79,  image: 'kefir.jpg',      unit: '1%, 930 мл' },
  { id: 8,  title: 'Бананы',                      category: 'fruits',  price: 99,  image: 'banana.jpg',     unit: '1 кг' },
  { id: 9,  title: 'Сок «Добрый» апельсиновый',   category: 'drinks',  price: 129, image: 'juice.jpg',      unit: '1 л' },
  { id: 10, title: 'Печенье «Юбилейное»',         category: 'sweets',  price: 89,  image: 'cookies.jpg',    unit: '112 г' },
  { id: 11, title: 'Сметана «Простоквашино»',     category: 'dairy',   price: 119, image: 'sour-cream.jpg', unit: '20%, 300 г' },
  { id: 12, title: 'Батон нарезной',              category: 'bakery',  price: 45,  image: 'baguette.jpg',   unit: '400 г' },
];

export function findProduct(id) {
  return products.find((p) => p.id === Number(id));
}