import React from "react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-col">
          <h4>CT Ecomm Web Demo</h4>
          <p>
            A demo ecommerce experience built for showcasing search, browsing,
            cart and checkout flows. Not a real store — no real payments are
            processed.
          </p>
        </div>
        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            <li>Sarees</li>
            <li>Lehengas</li>
            <li>Jewellery</li>
            <li>Men's Wear</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Help</h4>
          <ul>
            <li>Track Order</li>
            <li>Returns</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">© 2026 CT Ecomm Web Demo. All rights reserved.</div>
    </footer>
  );
}
