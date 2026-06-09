import Navbar from "./Navbar";
import CartDrawer from "./CartDrawer";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div
      className="page-wrapper"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      <CartDrawer />

      <div
        className="page-container"
        style={{
          flex: 1,
        }}
      >
        {children}
      </div>

      <Footer />
    </div>
  );
}

export default Layout;