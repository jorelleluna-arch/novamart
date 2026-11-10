import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import { CartProvider, useCart } from "./context/CartContext";

function AppLayout() {
  const { cartCount, addToCart } = useCart();
  return (
    <>
      <Navbar cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<CategoryPage />} />
        <Route path="/categories/:slug" element={<CategoryPage />} />
        <Route path="/products/:id" element={<ProductPage addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin/orders" element={<AdminOrdersPage />} />
        <Route path="*" element={<p className="p-8">Page not found.</p>} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </CartProvider>
  );
}