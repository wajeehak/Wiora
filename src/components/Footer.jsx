import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* 🌷 BRAND */}
        <div className="footer-brand">
          <img
            src={logo}
            alt="WIORA"
            className="footer-logo"
          />

          <h3>WIORA</h3>

          <p>
            Handmade crochet creations crafted with warmth,
            care, and lots of love.
          </p>
        </div>

        {/* 🧺 QUICK LINKS */}
        <div className="footer-column">
          <h4>Explore</h4>

          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* 🌸 CONTACT */}
        <div className="footer-column">
          <h4>Get in Touch</h4>

          <p>hello@wiora.com</p>
          <p>Custom Orders Available</p>
          <p>Made with love & yarn 🌷</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} WIORA. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;