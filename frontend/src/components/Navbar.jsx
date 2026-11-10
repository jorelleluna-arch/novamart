import { Link } from "react-router-dom";
import { Search, ShoppingCart, UserRound } from "lucide-react";

export default function Navbar({ cartCount = 0 }) {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
        <Link to="/" className="text-2xl font-bold text-blue-700">
          NovaMart
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/categories/outdoor-gear">Categories</Link>
          <Link to="/login">Account</Link>
        </nav>
        <div className="flex items-center gap-4">
          <button aria-label="Search products"><Search size={21} /></button>
          <Link to="/login" aria-label="Account"><UserRound size={21} /></Link>
          <Link to="/cart" className="relative" aria-label="Shopping cart">
            <ShoppingCart size={23} />
            <span className="absolute -right-3 -top-3 rounded-full bg-blue-700 px-1.5 text-xs text-white">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}