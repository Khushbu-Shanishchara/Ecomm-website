import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../api.js";

export default function Header() {
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { totalItems } = useCart();
  const { user, isLoggedIn, logout } = useAuth();

  useEffect(() => {
    api.getCategories().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  function handleSearch(e) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="container topbar-inner">
          <Link to="/" className="logo">
            <span className="logo-badge">CT</span>
            <span className="logo-text">
              CT Ecomm Web Demo
            </span>
          </Link>

          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for products, categories..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" aria-label="Search">
              🔍
            </button>
          </form>

          <div className="header-actions">
            {isLoggedIn ? (
              <div className="account-menu">
                <span className="account-greeting">
                  👤 Hi, {user.userId}
                </span>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="login-link">
                👤 Login
              </Link>
            )}

            <Link to="/cart" className="cart-link">
              <span className="cart-icon">🛒</span>
              <span>Cart</span>
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </Link>
          </div>
        </div>
      </div>

      <nav className="category-nav">
        <div className="container category-nav-inner">
          {categories.map((c) => (
            <Link key={c.id} to={`/category/${c.id}`} className="category-nav-link">
              <span className="cat-icon">{c.icon}</span> {c.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
