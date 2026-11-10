import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProducts } from "../services/api";

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [brand, setBrand] = useState("");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProducts({
      ...(slug ? { category: slug } : {}),
      brand: brand || undefined,
      sort,
    })
      .then((response) => setProducts(response.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug, brand, sort]);

  const heading = slug ? slug.replaceAll("-", " ") : "All Products";

  return (
    <main className="mx-auto max-w-7xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold capitalize">{heading}</h1>
        <select
          className="rounded-lg border bg-white p-2"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr]">
        <aside className="h-fit rounded-xl border bg-white p-5">
          <h2 className="mb-4 font-bold">Filters</h2>
          <label className="mb-2 block text-sm font-medium">Brand</label>
          <select
            className="w-full rounded border p-2"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
            <option value="">All Brands</option>
            <option value="AeroFlow">AeroFlow</option>
            <option value="Outdoor Pro">Outdoor Pro</option>
            <option value="TravelLite">TravelLite</option>
          </select>
        </aside>

        <section>
          {loading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="rounded-xl border bg-white p-3 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="mb-3 aspect-square w-full rounded-lg bg-gray-50 object-contain"
                  />
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="mt-2 font-bold">${Number(product.price).toFixed(2)}</p>
                  <p className="mt-1 text-sm text-amber-500">
                    ★★★★★ <span className="text-gray-600">{Number(product.rating).toFixed(1)}</span>
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}