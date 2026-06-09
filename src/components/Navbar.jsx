import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import logo from "../assets/logo.png";

function Navbar() {
  const {
    cart,
    setIsCartOpen,
  } = useCart();

  const cartCount = cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
        background: "#d4e4dc",
        borderBottom: "1px solid #d7e8db",
        padding: "22px 48px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* 🌷 LOGO */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
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

        {/* 🌷 NAVIGATION */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
          }}
        >
          <Link className="nav-link" to="/">
            Home
          </Link>

          <Link className="nav-link" to="/shop">
            Shop
          </Link>

          <Link className="nav-link" to="/about">
            About
          </Link>

          <Link className="nav-link" to="/contact">
            Contact
          </Link>

          {/* 🧺 CART BUTTON */}
          <button
            id="cart-icon"
            onClick={() => setIsCartOpen(true)}
            style={{
              position: "relative",
              fontSize: "1.5rem",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              padding: 0,
              transition: "transform 0.2s ease",
            }}
          >
            🧺

            {cartCount > 0 && (
              <span className="cart-badge">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;