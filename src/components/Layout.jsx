import Navbar from "./Navbar";
import CartDrawer from "./CartDrawer";

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <CartDrawer />

      <div className="page-container">
        {children}
      </div>
    </div>
  );
}

export default Layout;