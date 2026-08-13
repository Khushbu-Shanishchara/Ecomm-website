import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [form, setForm] = useState({ userId: "", email: "", mobile: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from || "/";

  useEffect(() => {
    document.title = "Login — CT Ecomm Web Demo";
    if (isLoggedIn) navigate(redirectTo, { replace: true });
  }, [isLoggedIn]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(form);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed. Please check your details.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container section auth-page">
      <div className="auth-card">
        <h1>Login to CT Ecomm Web Demo</h1>
        <p className="auth-sub">
          Demo login — enter any User ID, email & mobile number to sign in. No
          password or OTP required.
        </p>

        {error && <div className="alert alert-error">{error}</div>}

        <form className="checkout-form" onSubmit={handleSubmit}>
          <label>
            User ID
            <input
              required
              value={form.userId}
              onChange={(e) => update("userId", e.target.value)}
              placeholder="e.g. khushbu123"
            />
          </label>
          <label>
            Email
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@example.com"
            />
          </label>
          <label>
            Mobile Number
            <input
              required
              pattern="[0-9]{10}"
              title="Enter a 10-digit mobile number"
              value={form.mobile}
              onChange={(e) => update("mobile", e.target.value)}
              placeholder="9876543210"
            />
          </label>

          <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
            {submitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
