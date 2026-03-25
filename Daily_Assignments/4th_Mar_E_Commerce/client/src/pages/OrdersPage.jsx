import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Loader from "../components/Loader.jsx";
import { orderService } from "../services/api.js";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const { data } = await orderService.list();
        setOrders(data || []);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <Helmet>
        <title>Orders | ShopSphere</title>
      </Helmet>
      <h1 className="mb-4 text-2xl font-bold">Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <article
            key={order._id}
            className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="mb-2 flex flex-wrap justify-between gap-2">
              <p className="font-semibold">Order ID: {order._id}</p>
              <span className="rounded bg-slate-200 px-2 py-1 text-xs dark:bg-slate-700">{order.status}</span>
            </div>
            <p className="mb-2 text-sm text-slate-500 dark:text-slate-300">Total: ₹{order.total.toFixed(2)}</p>
            <ul className="list-inside list-disc text-sm">
              {order.items.map((item) => (
                <li key={item.product}>{item.name} × {item.quantity}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </>
  );
};

export default OrdersPage;
