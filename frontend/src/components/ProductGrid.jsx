import React from "react";
import ProductCard from "./ProductCard.jsx";

export default function ProductGrid({ products, loading, emptyMessage }) {
  if (loading) {
    return <div className="state-message">Loading products…</div>;
  }
  if (!products || products.length === 0) {
    return <div className="state-message">{emptyMessage || "No products found."}</div>;
  }
  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
