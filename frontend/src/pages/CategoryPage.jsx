import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api.js";
import ProductGrid from "../components/ProductGrid.jsx";

export default function CategoryPage() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCategories().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    api
      .getProducts({ category: categoryId, sort })
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [categoryId, sort]);

  const category = categories.find((c) => c.id === categoryId);

  useEffect(() => {
    document.title = category
      ? `${category.name} — CT Ecomm Web Demo`
      : "CT Ecomm Web Demo";
  }, [category]);

  return (
    <div className="container section">
      <div className="listing-header">
        <h1>
          {category ? `${category.icon} ${category.name}` : "Category"}
        </h1>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="sort-select">
          <option value="">Sort: Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <ProductGrid products={products} loading={loading} emptyMessage="No products in this category yet." />
    </div>
  );
}
