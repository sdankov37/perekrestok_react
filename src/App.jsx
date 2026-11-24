import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Contacts from './pages/Contacts.jsx';
import About from './pages/About.jsx';
import Catalog from './pages/Catalog.jsx';
import ProductPage from './pages/ProductPage.jsx';
import Account from './pages/Account.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/account" element={<Account />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}