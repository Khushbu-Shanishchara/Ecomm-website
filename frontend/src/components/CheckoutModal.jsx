import React, { useState } from "react";

export default function CheckoutModal({ subtotal, shipping, onClose, onSubmit, submitting }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    line1: "",
    city: "",
    state: "",
    pincode: "",
  });

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  const total = subtotal + shipping;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <h2>Shipping Details</h2>
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Full Name
              <input
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Jane Doe"
              />
            </label>
            <label>
              Phone Number
              <input
                required
                pattern="[0-9]{10}"
                title="Enter a 10-digit phone number"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="9876543210"
              />
            </label>
          </div>
          <label>
            Address Line
            <input
              required
              value={form.line1}
              onChange={(e) => update("line1", e.target.value)}
              placeholder="House no, street, area"
            />
          </label>
          <div className="form-row">
            <label>
              City
              <input required value={form.city} onChange={(e) => update("city", e.target.value)} />
            </label>
            <label>
              State
              <input required value={form.state} onChange={(e) => update("state", e.target.value)} />
            </label>
            <label>
              Pincode
              <input
                required
                pattern="[0-9]{6}"
                title="Enter a 6-digit pincode"
                value={form.pincode}
                onChange={(e) => update("pincode", e.target.value)}
              />
            </label>
          </div>

          <div className="order-summary-mini">
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
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
            {submitting ? "Placing Order..." : `Continue to Pay ₹${total.toLocaleString("en-IN")}`}
          </button>
        </form>
      </div>
    </div>
  );
}
