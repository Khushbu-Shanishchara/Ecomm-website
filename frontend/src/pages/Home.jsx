import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";
import ProductGrid from "../components/ProductGrid.jsx";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "CT Ecomm Web Demo — Ethnic Wear, Jewellery & More";
    Promise.all([api.getCategories(), api.getProducts({ sort: "rating" })])
      .then(([cats, prods]) => {
        setCategories(cats);
        setProducts(prods);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>CT Ecomm Web Demo</h1>
          <p>Ethnic wear, jewellery & lifestyle — a demo storefront for search, cart & checkout.</p>
        </div>
      </section>

      <section className="container section">
        <h2 className="section-title">Shop by Category</h2>
        <div className="category-tiles">
          {categories.map((c) => (
            <Link key={c.id} to={`/category/${c.id}`} className="category-tile">
              <span className="tile-icon">{c.icon}</span>
              <span className="tile-name">{c.name}</span>
              <span className="tile-count">{c.productCount} items</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section">
        <h2 className="section-title">Trending Now</h2>
        <ProductGrid products={products} loading={loading} />
      </section>
    </div>
  );
}
