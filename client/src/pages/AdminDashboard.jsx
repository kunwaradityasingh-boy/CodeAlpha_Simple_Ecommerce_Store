import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState("");

  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
    stock: "",
  });

  const token = localStorage.getItem("token");

  // =========================
  // FETCH ORDERS
  // =========================
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setOrders(data.data || []);
      } else {
        console.error("Failed to fetch orders:", data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH PRODUCTS
  // =========================
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);

      const data = await response.json();

      if (data.success) {
        setProducts(data.data || []);
      } else {
        console.error("Failed to fetch products:", data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // =========================
  // DELETE ORDER
  // =========================
  const deleteOrder = async (orderId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?",
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete order");
      }

      alert("Order deleted successfully!");

      fetchOrders();
    } catch (error) {
      console.error("Delete order error:", error);
      alert(error.message || "Unable to delete order");
    }
  };

  // =========================
  // UPDATE ORDER STATUS
  // =========================
  const updateOrderStatus = async (orderId, status) => {
    try {
      setUpdating(orderId);

      const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to update order status");
      }

      alert("Order status updated successfully!");

      fetchOrders();
    } catch (error) {
      console.error(error);
      alert(error.message || "Unable to update order status");
    } finally {
      setUpdating("");
    }
  };

  // =========================
  // PRODUCT FORM CHANGE
  // =========================
  const handleProductChange = (e) => {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // ADD / UPDATE PRODUCT
  // =========================
  const handleProductSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editingProduct
        ? `${API_URL}/products/${editingProduct._id}`
        : `${API_URL}/products`;

      const method = editingProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: productForm.name,
          price: Number(productForm.price),
          description: productForm.description,
          image: productForm.image,
          category: productForm.category,
          stock: Number(productForm.stock),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to save product");
      }

      alert(
        editingProduct
          ? "Product updated successfully!"
          : "Product added successfully!",
      );

      setProductForm({
        name: "",
        price: "",
        description: "",
        image: "",
        category: "",
        stock: "",
      });

      setEditingProduct(null);
      setShowProductForm(false);

      fetchProducts();
    } catch (error) {
      console.error(error);
      alert(error.message || "Unable to save product");
    }
  };

  // =========================
  // EDIT PRODUCT
  // =========================
  const editProduct = (product) => {
    setEditingProduct(product);

    setProductForm({
      name: product.name || "",
      price: product.price || "",
      description: product.description || "",
      image: product.image || "",
      category: product.category || "",
      stock: product.stock || "",
    });

    setShowProductForm(true);
  };

  // =========================
  // DELETE PRODUCT
  // =========================
  const deleteProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete product");
      }

      alert("Product deleted successfully!");

      fetchProducts();
    } catch (error) {
      console.error(error);
      alert(error.message || "Unable to delete product");
    }
  };

  // =========================
  // LOAD DATA
  // =========================
  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  if (loading) {
    return <h2>Loading admin dashboard...</h2>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {/* =========================
          ORDER STATS
      ========================= */}
      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p>{orders.length}</p>
        </div>

        <div className="stat-card">
          <h3>Pending Orders</h3>
          <p>{orders.filter((order) => order.status === "Pending").length}</p>
        </div>

        <div className="stat-card">
          <h3>Shipped Orders</h3>
          <p>{orders.filter((order) => order.status === "Shipped").length}</p>
        </div>

        <div className="stat-card">
          <h3>Delivered Orders</h3>
          <p>{orders.filter((order) => order.status === "Delivered").length}</p>
        </div>
      </div>

      {/* =========================
          PRODUCT MANAGEMENT
      ========================= */}
      <section className="admin-products">
        <h2>Product Management</h2>

        <button
          type="button"
          onClick={() => {
            setEditingProduct(null);

            setProductForm({
              name: "",
              price: "",
              description: "",
              image: "",
              category: "",
              stock: "",
            });

            setShowProductForm(!showProductForm);
          }}
        >
          {showProductForm ? "Close Form" : "Add Product"}
        </button>

        {showProductForm && (
          <form onSubmit={handleProductSubmit}>
            <h3>{editingProduct ? "Edit Product" : "Add New Product"}</h3>

            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={productForm.name}
              onChange={handleProductChange}
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={productForm.price}
              onChange={handleProductChange}
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              value={productForm.description}
              onChange={handleProductChange}
              required
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={productForm.image}
              onChange={handleProductChange}
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={productForm.category}
              onChange={handleProductChange}
              required
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={productForm.stock}
              onChange={handleProductChange}
              required
            />

            <button type="submit">
              {editingProduct ? "Update Product" : "Add Product"}
            </button>
          </form>
        )}

        <h3>All Products</h3>

        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product) => (
            <div className="admin-product-card" key={product._id}>
              {product.image && (
                <img src={product.image} alt={product.name} width="150" />
              )}

              <h3>{product.name}</h3>

              <p>Category: {product.category}</p>

              <p>Price: ₹{product.price}</p>

              <p>Stock: {product.stock}</p>

              <p>{product.description}</p>

              <button type="button" onClick={() => editProduct(product)}>
                Edit Product
              </button>

              <button
                type="button"
                onClick={() => deleteProduct(product._id)}
                className="delete-order-button"
              >
                Delete Product
              </button>
            </div>
          ))
        )}
      </section>

      {/* =========================
          ORDERS
      ========================= */}
      <h2>All Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div className="admin-order-card" key={order._id}>
            <h3>Order #{order._id.slice(-6)}</h3>

            <p>
              <strong>Customer:</strong> {order.user?.name || "Unknown"}
            </p>

            <p>
              <strong>Email:</strong> {order.user?.email || "N/A"}
            </p>

            <p>
              <strong>Status:</strong> {order.status}
            </p>

            <p>
              <strong>Total:</strong> ₹{order.totalPrice}
            </p>

            <p>
              <strong>Payment:</strong>{" "}
              {order.paymentMethod || "Cash on Delivery"}
            </p>

            <p>
              <strong>Name:</strong> {order.name}
            </p>

            <p>
              <strong>Phone:</strong> {order.phone}
            </p>

            <p>
              <strong>Address:</strong> {order.address}
            </p>

            <div className="admin-status-control">
              <select
                value={order.status}
                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                disabled={updating === order._id}
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>

              <button
                type="button"
                onClick={() => updateOrderStatus(order._id, order.status)}
                disabled={updating === order._id}
              >
                {updating === order._id ? "Updating..." : "Update Status"}
              </button>

              <button
                type="button"
                onClick={() => deleteOrder(order._id)}
                className="delete-order-button"
              >
                Delete Order
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminDashboard;
