import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

function MyOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(`${API_URL}/orders/myorders`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Unable to fetch orders");
        }

        setOrders(result.data || []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Unable to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loading) {
    return (
      <main className="orders-page">
        <h2>My Orders</h2>
        <p>Loading orders...</p>
      </main>
    );
  }

  return (
    <main className="orders-page">
      <h2>My Orders</h2>

      {error && <p className="error">{error}</p>}

      {!error && orders.length === 0 && (
        <div>
          <p>You have not placed any orders yet.</p>

          <button onClick={() => navigate("/")}>Continue Shopping</button>
        </div>
      )}

      <div className="orders-list">
        {orders.map((order) => (
          <article className="order-card" key={order._id}>
            <div className="order-header">
              <div>
                <h3>Order #{order._id.slice(-6)}</h3>

                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>

              <strong className={`order-status ${order.status}`}>
                {order.status}
              </strong>
            </div>

            <div className="order-products">
              {order.products.map((item, index) => (
                <div
                  className="order-product"
                  key={`${item.product?._id || index}-${index}`}
                >
                  <div>
                    <h4>{item.product?.name || "Product"}</h4>

                    <p>Quantity: {item.quantity}</p>
                  </div>

                  <strong>
                    ₹
                    {item.product?.price
                      ? Number(item.product.price) * Number(item.quantity)
                      : 0}
                  </strong>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <strong>Total: ₹{order.totalPrice}</strong>

              <p>Payment: {order.paymentMethod || "Cash on Delivery"}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export default MyOrders;
