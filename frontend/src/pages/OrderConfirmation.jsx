import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api.js";

export default function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    api
      .getOrder(id)
      .then(setOrder)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    document.title = "Order Status — CT Ecomm Web Demo";
  }, []);

  if (loading) return <div className="container section state-message">Loading order…</div>;
  if (notFound || !order)
    return (
      <div className="container section state-message">
        Order not found. <Link to="/">Go back home</Link>
      </div>
    );

  const isSuccess = order.status === "PLACED";
  const isFailed = order.status === "FAILED";

  return (
    <div className="container section order-confirmation">
      <div className={`order-status-card ${isSuccess ? "success" : isFailed ? "failed" : ""}`}>
        <div className="status-icon">{isSuccess ? "✅" : isFailed ? "❌" : "⏳"}</div>
        <h1>
          {isSuccess && "Order Placed Successfully!"}
          {isFailed && "Payment Failed"}
          {!isSuccess && !isFailed && "Order Pending"}
        </h1>
        <p className="order-id">Order ID: <strong>{order.id}</strong></p>
        {isSuccess && (
          <p>Thank you, {order.customerName}! Your order has been placed and will be shipped soon.</p>
        )}
        {isFailed && (
          <p>Your payment could not be processed. Please try checking out again.</p>
        )}

        <div className="order-items-list">
          {order.items.map((item) => (
            <div key={item.id} className="order-item-row">
              <img src={item.image} alt={item.name} />
              <div className="order-item-info">
                <div>{item.name}</div>
                <div className="muted">Qty: {item.qty}</div>
              </div>
              <div>₹{(item.price * item.qty).toLocaleString("en-IN")}</div>
            </div>
          ))}
        </div>

        <div className="order-summary-mini">
          <div className="row">
            <span>Subtotal</span>
            <span>₹{order.subtotal.toLocaleString("en-IN")}</span>
          </div>
          <div className="row">
            <span>Shipping</span>
            <span>{order.shipping === 0 ? "FREE" : `₹${order.shipping}`}</span>
          </div>
          <div className="row total-row">
            <span>Total</span>
            <span>₹{order.total.toLocaleString("en-IN")}</span>
          </div>
        </div>

        <div className="order-actions">
          {isFailed && (
            <Link to="/cart" className="btn btn-primary">
              Retry Checkout
            </Link>
          )}
          <Link to="/" className="btn btn-outline">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
