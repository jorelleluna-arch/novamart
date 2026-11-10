import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../services/api";

export default function ProductPage({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getProduct(id)
      .then((response) => setProduct(response.data))
      .catch(console.error);
  }, [id]);

  if (!product) return <p className="p-8">Loading product...</p>;

  return (
    <main className="mx-auto max-w-6xl p-6">
      <p className="mb-5 text-sm text-gray-500">
        Home / Shop / {product.category_name}
      </p>
      <div className="grid gap-10 rounded-2xl bg-white p-6 md:grid-cols-2">
        <img
          src={product.image_url}
          alt={product.name}
          className="aspect-square w-full rounded-xl bg-gray-50 object-contain"
        />
        <section>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-3 text-2xl font-bold text-blue-700">
            ${Number(product.price).toFixed(2)}
          </p>
          <p className="mt-4 text-amber-500">
            ★★★★★ {Number(product.rating).toFixed(1)}
          </p>
          <p className="mt-5 leading-7 text-gray-600">{product.description}</p>
          <p className="mt-4 text-sm text-gray-500">
            Color: {product.color || "Standard"}
          </p>
          <p className="mt-2 text-sm">
            {product.stock > 0 ? `${product.stock} items in stock` : "Out of stock"}
          </p>
          <div className="mt-6 flex items-center gap-4">
            <button
              className="rounded border px-4 py-2"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              className="rounded border px-4 py-2"
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              disabled={quantity >= product.stock}
            >
              +
            </button>
          </div>
          <button
            disabled={product.stock < 1}
            onClick={() => addToCart(product, quantity)}
            className="mt-6 w-full rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
          >
            Add to Cart
          </button>
        </section>
      </div>
    </main>
  );
}