# CT Ecomm Web Demo

A full-stack demo ecommerce website (UI inspired by mirraw.com) with product
search, category browsing, cart, and a simulated checkout — no real payment
gateway is integrated. Checkout ends in a "Complete Payment" popup with
**Simulate Success** / **Simulate Failure** buttons that mark the order
`PLACED` or `FAILED` accordingly.

## Stack

- **Backend**: Node.js + Express (in-memory catalog & order store) — `backend/`
- **Frontend**: React + Vite + React Router — `frontend/`

## Features

- Search products by name/category/description
- Browse by category (Sarees, Lehengas, Salwar Kameez, Kurtis & Kurtas,
  Jewellery, Men's Wear, Footwear, Home Decor)
- Product detail page with gallery, quantity selector, related products
- Cart with quantity update / remove, persisted to `localStorage`
- Checkout: shipping address form → order created (`PENDING`) → payment popup
  → **Simulate Success** marks the order `PLACED` and clears the cart;
  **Simulate Failure** marks it `FAILED` and keeps the cart for retry
- Order confirmation page showing final status and order summary

## Running locally

**1. Backend** (http://localhost:5050)

```bash
cd backend
npm install
npm start
```

**2. Frontend** (http://localhost:5173, proxies `/api` to the backend)

```bash
cd frontend
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## Notes

- Product images are placeholder photos from picsum.photos (seeded per
  product, so they're stable across reloads) — swap `backend/data/products.js`
  image URLs for real product photography if needed.
- Orders live in memory on the backend and reset when the server restarts —
  swap in a real database for persistence beyond a demo.
