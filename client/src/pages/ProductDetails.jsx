import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        return res.json();
      })
      .then((result) => {
        setProduct(result.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load product");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error || !product) {
    return <p className="error">{error || "Product not found"}</p>;
  }

  return (
    <main className="product-details">
      <Link to="/#products">← Back to Products</Link>

      <div className="details-card">
        <div className="product-image">
          {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <span>No Image</span>
          )}
        </div>

        <div className="details-info">
          <p className="category">{product.category}</p>

          <h1>{product.name}</h1>

          <p className="description">{product.description}</p>

          <h2>₹{product.price}</h2>

          <p>Stock: {product.stock}</p>

          <button type="button">Add to Cart</button>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
