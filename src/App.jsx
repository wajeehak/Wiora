import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OrderSuccess from "./pages/OrderSuccess";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";

import { useAdminAuth } from "./context/AdminAuthContext";

// 🔐 Protected route wrapper
function ProtectedAdmin({ children }) {
  const { isAdmin } = useAdminAuth();

  if (!isAdmin) {
    return <AdminLogin />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>

          {/* 🌷 Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/success" element={<OrderSuccess />} />

          {/* 🔐 Protected Admin Route */}
          <Route
            path="/admin"
            element={
              <ProtectedAdmin>
                <Admin />
              </ProtectedAdmin>
            }
          />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App; 