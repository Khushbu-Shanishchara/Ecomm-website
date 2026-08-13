import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-media">
        <img src={product.images[0]} alt={product.name} loading="lazy" />
        <span className="discount-tag">{product.discountPercent}% OFF</span>
      </Link>
      <div className="product-card-body">
        <Link to={`/product/${product.id}`} className="product-name">
          {product.name}
        </Link>
        <div className="product-rating">
          ⭐ {product.rating} <span className="reviews">({product.reviews})</span>
        </div>
        <div className="price-row">
          <span className="price">₹{product.price.toLocaleString("en-IN")}</span>
          <span className="mrp">₹{product.mrp.toLocaleString("en-IN")}</span>
        </div>
        <button className="btn btn-outline add-to-cart-btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
