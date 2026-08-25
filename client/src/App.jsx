import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyOrders from "./pages/MyOrders";

const API_URL = "http://localhost:5000/api";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((result) => {
        setProducts(result.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load products");
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    setCart((currentCart) => [...currentCart, product]);
    alert(`${product.name} added to cart`);
  };

  return (
    <BrowserRouter>
      <div className="app">
        <header className="navbar">
          <div className="brand">CodeAlpha Store</div>

          <nav>
            <a href="#home">Home</a>
            <a href="#products">Products</a>
            <Link to="/my-orders">My Orders</Link>
            <Link to="/login">Login</Link>
            <a href="#cart">Cart({cart.length})</a>
          </nav>
        </header>

        <main>
          <section id="home" className="hero-section">
            <div>
              <p className="eyebrow">CODEALPHA E-COMMERCE</p>
              <h1>Simple. Modern. Powerful.</h1>
              <p className="hero-text">
                Discover quality products from our simple e-commerce store.
              </p>
              <a href="#products" className="shop-button">
                Shop Now
              </a>
            </div>
          </section>

          <section id="products" className="products-section">
            <h2>Our Products</h2>

            {loading && <p>Loading products...</p>}

            {error && <p className="error">{error}</p>}

            {!loading && !error && products.length === 0 && (
              <p>No products available.</p>
            )}

            <div className="products-grid">
              {products.map((product) => (
                <article className="product-card" key={product._id}>
                  <div className="product-image">
                    {product.image ? (
                      <img src={product.image} alt={product.name} />
                    ) : (
                      <span>No Image</span>
                    )}
                  </div>

                  <div className="product-info">
                    <p className="category">{product.category}</p>
                    <h3>{product.name}</h3>
                    <p className="description">{product.description}</p>

                    <Link
                      to={`/products/${product._id}`}
                      className="view-details"
                    >
                      View Details
                    </Link>

                    <div className="product-bottom">
                      <strong>₹{product.price}</strong>
                      <span>Stock: {product.stock}</span>
                    </div>

                    <button type="button" onClick={() => addToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section id="cart" className="cart-section">
            <h2>Your Cart</h2>

            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item, index) => (
                    <div className="cart-item" key={`${item._id}-${index}`}>
                      <div>
                        <h3>{item.name}</h3>
                        <p>₹{item.price}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setCart((currentCart) =>
                            currentCart.filter((_, i) => i !== index),
                          );
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-total">
                  <strong>
                    Total: ₹
                    {cart.reduce(
                      (total, item) => total + Number(item.price),
                      0,
                    )}
                  </strong>

                  <Link to="/checkout" className="checkout-button">
                    Checkout
                  </Link>
                </div>
              </>
            )}
          </section>
        </main>

        <Routes>
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route
            path="/checkout"
            element={<Checkout cart={cart} setCart={setCart} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-orders" element={<MyOrders />} />
        </Routes>

        <footer>
          <p>© 2026 CodeAlpha Simple E-Commerce Store</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
