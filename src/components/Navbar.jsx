import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import logo from "../assets/logo.png";

function Navbar() {
  const { cart, setIsCartOpen } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">

          {/* Mobile Hamburger */}
          <button
            className="menu-btn"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>

          {/* Brand */}
          <Link
            to="/"
            className="navbar-brand"
          >
            <img
              src={logo}
              alt="WIORA"
              className="navbar-logo"
            />

            <div>
              <h2 className="brand-title">
                WIORA
              </h2>

              <p className="brand-subtitle">
                handmade with love
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-links">

            <Link
              className="nav-link"
              to="/"
            >
              Home
            </Link>

            <Link
              className="nav-link"
              to="/shop"
            >
              Shop
            </Link>

            <Link
              className="nav-link"
              to="/about"
            >
              About
            </Link>

            <Link
              className="nav-link"
              to="/contact"
            >
              Contact
            </Link>

            <button
              id="cart-icon"
              onClick={() => setIsCartOpen(true)}
              className="cart-button"
            >
              🧺

              {cartCount > 0 && (
                <span className="cart-badge">
                  {cartCount}
                </span>
              )}
            </button>

          </div>

          {/* Mobile Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="mobile-cart-btn"
          >
            🧺

            {cartCount > 0 && (
              <span className="cart-badge">
                {cartCount}
              </span>
            )}
          </button>

        </div>
      </nav>

      {/* Mobile Sidebar */}
      {menuOpen && (
        <>
          <div
            className="mobile-overlay"
            onClick={() => setMenuOpen(false)}
          />

          <div className="mobile-sidebar">

            <button
              className="close-menu"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              to="/shop"
              onClick={() => setMenuOpen(false)}
            >
              Shop
            </Link>

            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>

            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>

          </div>
        </>
      )}
    </>
  );
}

export default Navbar;