import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, subtotal } = useCart();
  const shipping = subtotal === 0 || subtotal >= 100 ? 0 : 10;
  const total = subtotal + shipping;

  if (items.length === 0)
    return (
      <main className="mx-auto max-w-5xl p-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <p className="mt-5">Your cart is empty.</p>
        <Link to="/shop" className="mt-4 inline-block text-blue-700">
          Continue shopping
        </Link>
      </main>
    );

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
      <div className="grid gap-6 md:grid-cols-[1fr_320px]">
        <section className="space-y-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="flex flex-wrap items-center gap-4 rounded-xl border bg-white p-4"
            >
              <img
                src={item.image_url}
                alt={item.name}
                className="h-24 w-24 rounded-lg bg-gray-50 object-contain"
              />
              <div className="min-w-40 flex-1">
                <h2 className="font-semibold">{item.name}</h2>
                <p>${Number(item.price).toFixed(2)}</p>
                <button
                  className="mt-2 text-sm text-red-600"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="rounded border px-3 py-1"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="rounded border px-3 py-1"
                  disabled={item.quantity >= item.stock}
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <strong>${(Number(item.price) * item.quantity).toFixed(2)}</strong>
            </article>
          ))}
        </section>
        <aside className="h-fit rounded-xl border bg-white p-5">
          <h2 className="mb-5 text-xl font-bold">Order Summary</h2>
          <div className="flex justify-between py-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="mt-3 flex justify-between border-t pt-4 text-lg font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            className="mt-5 block rounded-lg bg-blue-700 p-3 text-center font-semibold text-white"
          >
            Proceed to Checkout
          </Link>
        </aside>
      </div>
    </main>
  );
}