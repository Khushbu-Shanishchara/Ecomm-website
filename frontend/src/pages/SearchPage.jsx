import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../api.js";
import ProductGrid from "../components/ProductGrid.jsx";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `Search: ${query} — CT Ecomm Web Demo`;
    setLoading(true);
    api
      .getProducts({ search: query })
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="container section">
      <h1>Search results for "{query}"</h1>
      <p className="result-count">{products.length} product(s) found</p>
      <ProductGrid
        products={products}
        loading={loading}
        emptyMessage={`No products matched "${query}". Try a different keyword.`}
      />
    </div>
  );
}
