import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { api } from "../api.js";
import { useCart } from "../context/CartContext.jsx";
import ProductGrid from "../components/ProductGrid.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    api
      .getProduct(id)
      .then((p) => {
        setProduct(p);
        setActiveImage(0);
        setQty(1);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (product) document.title = `${product.name} — CT Ecomm Web Demo`;
  }, [product]);

  if (loading) return <div className="container section state-message">Loading…</div>;
  if (notFound || !product)
    return (
      <div className="container section state-message">
        Product not found. <Link to="/">Go back home</Link>
      </div>
    );

  function handleAddToCart() {
    addToCart(product, qty);
  }

  function handleBuyNow() {
    addToCart(product, qty);
    navigate("/cart");
  }

  return (
    <div className="container section">
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to={`/category/${product.category}`}>{product.category}</Link> / {product.name}
      </div>

      <div className="product-detail">
        <div className="pd-gallery">
          <div className="pd-main-image">
            <img src={product.images[activeImage]} alt={product.name} />
          </div>
          <div className="pd-thumbs">
            {product.images.map((img, idx) => (
              <button
                key={img}
                className={`pd-thumb ${idx === activeImage ? "active" : ""}`}
                onClick={() => setActiveImage(idx)}
              >
                <img src={img} alt={`${product.name} ${idx + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="pd-info">
          <h1>{product.name}</h1>
          <div className="product-rating">
            ⭐ {product.rating} <span className="reviews">({product.reviews} reviews)</span>
          </div>
          <div className="price-row large">
            <span className="price">₹{product.price.toLocaleString("en-IN")}</span>
            <span className="mrp">₹{product.mrp.toLocaleString("en-IN")}</span>
            <span className="discount-badge">{product.discountPercent}% OFF</span>
          </div>
          <p className="pd-description">{product.description}</p>
          <p className="pd-stock">
            {product.stock > 0 ? `✅ In stock (${product.stock} left)` : "❌ Out of stock"}
          </p>

          <div className="qty-selector">
            <span>Quantity</span>
            <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
            <span className="qty-value">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)}>+</button>
          </div>

          <div className="pd-actions">
            <button className="btn btn-outline" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="btn btn-primary" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {product.related?.length > 0 && (
        <div className="section">
          <h2 className="section-title">You may also like</h2>
          <ProductGrid products={product.related} />
        </div>
      )}
    </div>
  );
}
