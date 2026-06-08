import Navbar from "./Navbar";
import CartDrawer from "./CartDrawer";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="layout">
      {/* 🌷 TOP NAV */}
      <Navbar />

      {/* 🧺 CART OVERLAY (should sit above everything) */}
      <CartDrawer />

      {/* 📄 PAGE CONTENT */}
      <main className="page-content">
        {children}
      </main>

      {/* 🌸 FOOTER (always last) */}
      <Footer />
    </div>
  );
}

export default Layout;