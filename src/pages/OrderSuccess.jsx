import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🌷 order data coming from checkout (if passed)
  const order = location.state?.order;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "40px",
      }}
    >
      {/* 🎉 ICON */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        style={{
          fontSize: "4rem",
          marginBottom: "20px",
        }}
      >
        🎉
      </motion.div>

      <h1 style={{ marginBottom: "10px" }}>
        Order Confirmed 🌷
      </h1>

      <p
        style={{
          color: "var(--text-muted)",
          maxWidth: "420px",
          lineHeight: "1.6",
        }}
      >
        Your handmade pieces are being prepared with love and care.
      </p>

      {/* 🌿 ORDER DETAILS BOX */}
      {order && (
        <div
          style={{
            marginTop: "25px",
            background: "#fff",
            padding: "20px",
            borderRadius: "18px",
            boxShadow: "0 12px 30px rgba(44,39,36,0.06)",
            width: "100%",
            maxWidth: "420px",
            textAlign: "left",
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>
            Order Details 🧺
          </h3>

          <p><strong>Order ID:</strong> {order.id}</p>

          <p style={{ marginTop: "10px" }}>
            <strong>Total:</strong> Rs {order.total}
          </p>

          <div style={{ marginTop: "12px" }}>
            <strong>Items:</strong>

            {order.items.map((item) => (
              <p
                key={item.id}
                style={{
                  margin: "6px 0",
                  fontSize: "0.9rem",
                  color: "#555",
                }}
              >
                {item.name} × {item.qty}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* 🌷 BUTTON */}
      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "30px",
          padding: "12px 24px",
          borderRadius: "999px",
          border: "none",
          background: "var(--strawberry)",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        Back to Home 🌷
      </button>
    </motion.div>
  );
}

export default OrderSuccess;