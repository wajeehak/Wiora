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
    <nav className="navbar">
  <div className="navbar-inner">

    <Link to="/" className="navbar-brand">
      <img
        src={logo}
        alt="WIORA"
        className="navbar-logo"
      />

      <div>
        <h2 className="brand-title">WIORA</h2>
        <p className="brand-subtitle">
          handmade with love
        </p>
      </div>
    </Link>

    <div className="navbar-links">
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

  </div>
</nav>
  );
}

export default Navbar;