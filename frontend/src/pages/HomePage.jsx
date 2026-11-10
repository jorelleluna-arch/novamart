import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl p-8">
      <section className="rounded-2xl bg-blue-700 px-8 py-16 text-white">
        <h1 className="text-4xl font-bold md:text-5xl">
          Discover Your Next Favorite
        </h1>
        <p className="mt-4 max-w-xl text-blue-100">
          Shop electronics, outdoor equipment, and everyday essentials.
        </p>
        <Link
          to="/shop"
          className="mt-7 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-blue-700"
        >
          Shop Now
        </Link>
      </section>
    </main>
  );
}