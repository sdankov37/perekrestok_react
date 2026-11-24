// Путь к картинке из public/images с учётом base (GitHub Pages: /perekrestok_react/).
export const img = (name) => import.meta.env.BASE_URL + 'images/' + name;