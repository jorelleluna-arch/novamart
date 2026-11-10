import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/orders/admin")
      .then((response) => setOrders(response.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredOrders = orders.filter((order) =>
    `${order.id} ${order.customer_name}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const money = (amount) => `$${Number(amount).toFixed(2)}`;

  const sales = orders
    .filter((order) => order.payment_status === "Paid")
    .reduce((sum, order) => sum + Number(order.total_amount), 0);

  const pending = orders.filter(
    (order) => order.fulfillment_status === "Pending"
  ).length;

  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="text-3xl font-bold">Admin Dashboard Order Management</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-blue-700 p-5 text-white">
          <p>Recorded Paid Sales</p>
          <p className="mt-2 text-3xl font-bold">{money(sales)}</p>
        </div>
        <div className="rounded-xl border bg-white p-5">
          <p>Pending Orders</p>
          <p className="mt-2 text-3xl font-bold">{pending}</p>
        </div>
        <div className="rounded-xl border bg-white p-5">
          <p>Total Orders</p>
          <p className="mt-2 text-3xl font-bold">{orders.length}</p>
        </div>
      </div>

      <section className="mt-6 rounded-xl border bg-white p-5">
        <div className="mb-5 flex flex-wrap justify-between gap-3">
          <h2 className="text-xl font-bold">Orders</h2>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders..."
            className="rounded-lg border px-4 py-2"
          />
        </div>
        {loading ? (
          <p>Loading orders...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Fulfillment</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-t">
                    <td className="p-3">#{order.id}</td>
                    <td className="p-3">{order.customer_name}</td>
                    <td className="p-3">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-3">{money(order.total_amount)}</td>
                    <td className="p-3">{order.payment_status}</td>
                    <td className="p-3">{order.fulfillment_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}