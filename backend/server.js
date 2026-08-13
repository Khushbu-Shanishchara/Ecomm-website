const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const { categories, products } = require("./data/products");

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

// In-memory order store (demo only — resets on server restart)
const orders = new Map();

// In-memory session store (demo only — no real auth/password check)
const sessions = new Map();

// ---------- Categories ----------
app.get("/api/categories", (req, res) => {
  const withCounts = categories.map((c) => ({
    ...c,
    productCount: products.filter((p) => p.category === c.id).length,
  }));
  res.json(withCounts);
});

// ---------- Products ----------
app.get("/api/products", (req, res) => {
  const { category, search, sort } = req.query;
  let result = [...products];

  if (category && category !== "all") {
    result = result.filter((p) => p.category === category);
  }

  if (search) {
    const q = String(search).toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
  if (sort === "rating") result.sort((a, b) => b.rating - a.rating);

  res.json(result);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  res.json({ ...product, related });
});

// ---------- Orders / Checkout ----------
// Create an order (status: PENDING) from the cart before "payment"
app.post("/api/orders", (req, res) => {
  const { items, address, customerName, phone } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  let subtotal = 0;
  const resolvedItems = items.map((item) => {
    const product = products.find((p) => p.id === item.id);
    if (!product) throw new Error("Invalid product in cart");
    const qty = Math.max(1, Number(item.qty) || 1);
    subtotal += product.price * qty;
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      qty,
      image: product.images[0],
    };
  });

  const shipping = subtotal > 1999 ? 0 : 99;
  const total = subtotal + shipping;

  const order = {
    id: `CT${crypto.randomBytes(4).toString("hex").toUpperCase()}`,
    items: resolvedItems,
    subtotal,
    shipping,
    total,
    address: address || null,
    customerName: customerName || "Guest",
    phone: phone || null,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  };

  orders.set(order.id, order);
  res.status(201).json(order);
});

// Simulated payment popup result: mark order success or failure
app.post("/api/orders/:id/pay", (req, res) => {
  const order = orders.get(req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });

  const { result } = req.body; // "success" | "failure"
  if (!["success", "failure"].includes(result)) {
    return res.status(400).json({ error: "result must be 'success' or 'failure'" });
  }

  order.status = result === "success" ? "PLACED" : "FAILED";
  order.paidAt = new Date().toISOString();
  orders.set(order.id, order);

  res.json(order);
});

app.get("/api/orders/:id", (req, res) => {
  const order = orders.get(req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
});

// ---------- Auth (demo only) ----------
// No password / OTP check — supplying userId, email & mobile logs you in.
app.post("/api/auth/login", (req, res) => {
  const { userId, email, mobile } = req.body || {};

  if (!userId || !String(userId).trim()) {
    return res.status(400).json({ error: "User ID is required" });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Enter a valid email address" });
  }
  if (!mobile || !/^[0-9]{10}$/.test(mobile)) {
    return res.status(400).json({ error: "Enter a valid 10-digit mobile number" });
  }

  const token = crypto.randomBytes(16).toString("hex");
  const user = {
    userId: String(userId).trim(),
    email: String(email).trim(),
    mobile: String(mobile).trim(),
    loggedInAt: new Date().toISOString(),
  };
  sessions.set(token, user);

  res.json({ token, user });
});

app.post("/api/auth/logout", (req, res) => {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, "");
  if (token) sessions.delete(token);
  res.json({ success: true });
});

app.get("/api/auth/me", (req, res) => {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, "");
  const user = token ? sessions.get(token) : null;
  if (!user) return res.status(401).json({ error: "Not logged in" });
  res.json({ user });
});

app.get("/api/health", (req, res) => res.json({ status: "ok", site: "CT Ecomm Web Demo" }));

app.listen(PORT, () => {
  console.log(`CT Ecomm Web Demo API running on http://localhost:${PORT}`);
});
