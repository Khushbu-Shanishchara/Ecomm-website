import React, { useState } from "react";

export default function PaymentPopup({ order, onResult, processing }) {
  const [chosen, setChosen] = useState(null);

  function handleClick(result) {
    setChosen(result);
    onResult(result);
  }

  return (
    <div className="modal-overlay">
      <div className="modal-panel payment-panel" onClick={(e) => e.stopPropagation()}>
        <h2>Complete Payment</h2>
        <p className="payment-sub">Demo Payment Gateway · Order #{order.id}</p>

        <div className="payment-amount">
          <span>Amount Payable</span>
          <strong>₹{order.total.toLocaleString("en-IN")}</strong>
        </div>

        <div className="payment-note">
          This is a simulated checkout for demo purposes. No real payment gateway
          is connected — choose an outcome below to continue.
        </div>

        <div className="payment-actions">
          <button
            className="btn btn-success btn-block"
            disabled={processing}
            onClick={() => handleClick("success")}
          >
            {processing && chosen === "success" ? "Processing..." : "✅ Simulate Success"}
          </button>
          <button
            className="btn btn-danger btn-block"
            disabled={processing}
            onClick={() => handleClick("failure")}
          >
            {processing && chosen === "failure" ? "Processing..." : "❌ Simulate Failure"}
          </button>
        </div>
      </div>
    </div>
  );
}
