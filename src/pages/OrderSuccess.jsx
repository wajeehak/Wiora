import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  // 🌷 simple order id generator
  const orderId = "WIORA-" + Math.floor(100000 + Math.random() * 900000);

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
        background: "linear-gradient(180deg, #fff7f9, #ffffff)",
      }}
    >
      {/* 🌷 Success Animation */}
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

      {/* ORDER ID */}
      <p
        style={{
          color: "var(--text-muted)",
          marginBottom: "14px",
          fontSize: "0.95rem",
        }}
      >
        Order ID: <strong>{orderId}</strong>
      </p>

      <p
        style={{
          color: "var(--text-muted)",
          maxWidth: "460px",
          lineHeight: "1.7",
        }}
      >
        Your handmade pieces are now being carefully prepared in our slow studio.
        Each item is packed with care, patience, and soft intention 🧵✨
      </p>

      {/* 🌿 PROCESS STEPS */}
      <div
        style={{
          marginTop: "28px",
          display: "flex",
          gap: "18px",
          flexWrap: "wrap",
          justifyContent: "center",
          color: "#555",
          fontSize: "0.9rem",
        }}
      >
        <span>🧺 Order received</span>
        <span>→</span>
        <span>🧵 Being handmade</span>
        <span>→</span>
        <span>📦 Packing</span>
        <span>→</span>
        <span>🚚 On the way</span>
      </div>

      {/* BUTTONS */}
      <div style={{ display: "flex", gap: "12px", marginTop: "30px" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "12px 22px",
            borderRadius: "999px",
            border: "none",
            background: "var(--strawberry)",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Continue Shopping 🌷
        </button>

        <button
          onClick={() => navigate("/shop")}
          style={{
            padding: "12px 22px",
            borderRadius: "999px",
            border: "1px solid #ddd",
            background: "white",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Explore More
        </button>
      </div>
    </motion.div>
  );
}

export default OrderSuccess;