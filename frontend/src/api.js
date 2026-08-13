const BASE = "/api";

async function handle(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  return res.json();
}

export const api = {
  getCategories: () => fetch(`${BASE}/categories`).then(handle),

  getProducts: ({ category, search, sort } = {}) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (search) params.set("search", search);
    if (sort) params.set("sort", sort);
    return fetch(`${BASE}/products?${params.toString()}`).then(handle);
  },

  getProduct: (id) => fetch(`${BASE}/products/${id}`).then(handle),

  createOrder: (payload) =>
    fetch(`${BASE}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(handle),

  payOrder: (orderId, result) =>
    fetch(`${BASE}/orders/${orderId}/pay`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ result }),
    }).then(handle),

  getOrder: (orderId) => fetch(`${BASE}/orders/${orderId}`).then(handle),

  login: ({ userId, email, mobile }) =>
    fetch(`${BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, email, mobile }),
    }).then(handle),

  logout: (token) =>
    fetch(`${BASE}/auth/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }).then(handle),
};
