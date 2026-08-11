import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api";

function App() {
  const [products, setProducts] = useState([]);
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

  return (
    <div className="app">
      <header className="navbar">
        <div className="brand">CodeAlpha Store</div>

        <nav>
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#login">Login</a>
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

                  <div className="product-bottom">
                    <strong>₹{product.price}</strong>
                    <span>Stock: {product.stock}</span>
                  </div>

                  <button type="button">Add to Cart</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <p>© 2026 CodeAlpha Simple E-Commerce Store</p>
      </footer>
    </div>
  );
}

export default App;
