import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { api } from "../api.js";
import CheckoutModal from "../components/CheckoutModal.jsx";
import PaymentPopup from "../components/PaymentPopup.jsx";

export default function CartPage() {
  const { items, updateQty, removeFromCart, subtotal, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [order, setOrder] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const shipping = subtotal > 1999 || subtotal === 0 ? 0 : 99;

  async function handleCheckoutSubmit(address) {
    setSubmitting(true);
    setError("");
    try {
      const created = await api.createOrder({
        items: items.map((i) => ({ id: i.id, qty: i.qty })),
        address,
        customerName: address.name,
        phone: address.phone,
      });
      setOrder(created);
      setShowCheckout(false);
    } catch (err) {
      setError(err.message || "Could not create order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handlePaymentResult(result) {
    setProcessing(true);
    try {
      const updated = await api.payOrder(order.id, result);
      setTimeout(() => {
        if (result === "success") clearCart();
        setOrder(null);
        setProcessing(false);
        navigate(`/order/${updated.id}`);
      }, 700);
    } catch (err) {
      setProcessing(false);
      setError(err.message || "Payment step failed. Please try again.");
      setOrder(null);
    }
  }

  if (items.length === 0) {
    return (
      <div className="container section state-message">
        <p>Your cart is empty.</p>
        <Link to="/" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container section">
      <h1>My Cart ({items.length})</h1>
      {error && <div className="alert alert-error">{error}</div>}

      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <Link to={`/product/${item.id}`}>
                <img src={item.image} alt={item.name} />
              </Link>
              <div className="cart-item-info">
                <Link to={`/product/${item.id}`} className="product-name">
                  {item.name}
                </Link>
                <div className="price">₹{item.price.toLocaleString("en-IN")}</div>
                <div className="qty-selector">
                  <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                  <span className="qty-value">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                </div>
              </div>
              <div className="cart-item-total">
                ₹{(item.price * item.qty).toLocaleString("en-IN")}
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                🗑️
              </button>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="row">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString("en-IN")}</span>
          </div>
          <div className="row">
            <span>Shipping</span>
            <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
          </div>
          <div className="row total-row">
            <span>Total</span>
            <span>₹{(subtotal + shipping).toLocaleString("en-IN")}</span>
          </div>
          <button className="btn btn-primary btn-block" onClick={() => setShowCheckout(true)}>
            Proceed to Checkout
          </button>
        </div>
      </div>

      {showCheckout && (
        <CheckoutModal
          subtotal={subtotal}
          shipping={shipping}
          submitting={submitting}
          onClose={() => setShowCheckout(false)}
          onSubmit={handleCheckoutSubmit}
        />
      )}

      {order && (
        <PaymentPopup order={order} processing={processing} onResult={handlePaymentResult} />
      )}
    </div>
  );
}
