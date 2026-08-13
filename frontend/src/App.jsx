import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Toast from "./components/Toast.jsx";
import Home from "./pages/Home.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import CartPage from "./pages/CartPage.jsx";
import OrderConfirmation from "./pages/OrderConfirmation.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order/:id" element={<OrderConfirmation />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Toast />
    </div>
  );
}
