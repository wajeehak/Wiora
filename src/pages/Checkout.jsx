import { useCart } from "../context/CartContext";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Checkout() {
  const { cart, getTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    mobile: "",
    address: "",
    country: "",
    province: "",
    city: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) return;

    setLoading(true);

    try {
      const orderData = {
        customer: form,
        items: cart,
        total: getTotal(),
        createdAt: serverTimestamp(),
        status: "pending",
      };

      const docRef = await addDoc(
        collection(db, "orders"),
        orderData
      );

      console.log("Order ID:", docRef.id);

      clearCart();
      navigate("/success", {
          state: {
            order: {
              id: docRef.id,
              items: cart,
              total: getTotal()
            }
          }
        });
    } catch (error) {
      console.error("Order failed:", error);
      alert("Something went wrong while placing order.");
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        padding: "60px 20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: "40px",
        }}
      >

        {/* 🌸 LEFT */}
        <div
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "24px",
            boxShadow: "0 12px 30px rgba(44,39,36,0.06)",
          }}
        >
          <h2>Checkout 🌸</h2>

          <p
            style={{
              color: "var(--text-muted)",
              marginBottom: "28px",
              lineHeight: "1.7",
              fontSize: "0.95rem",
            }}
          >
            Almost there ✨ Enter your details below and we'll prepare your handmade pieces with care.
          </p>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >

            <input name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required style={inputStyle} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required style={inputStyle} />
              <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required style={inputStyle} />
            </div>

            <input name="mobile" placeholder="Mobile Number" value={form.mobile} onChange={handleChange} required style={inputStyle} />

            <textarea name="address" placeholder="Street Address" value={form.address} onChange={handleChange} required style={{ ...inputStyle, height: "90px" }} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <input name="country" placeholder="Country" value={form.country} onChange={handleChange} required style={inputStyle} />

              <select name="province" value={form.province} onChange={handleChange} required style={inputStyle}>
                <option value="">Select Province</option>
                <option value="Sindh">Sindh</option>
                <option value="Punjab">Punjab</option>
                <option value="KPK">Khyber Pakhtunkhwa</option>
                <option value="Balochistan">Balochistan</option>
                <option value="Gilgit Baltistan">Gilgit Baltistan</option>
                <option value="Azad Kashmir">Azad Kashmir</option>
              </select>
            </div>

            <input name="city" placeholder="City" value={form.city} onChange={handleChange} required style={inputStyle} />

            <button type="submit" style={buttonStyle} disabled={loading}>
              {loading ? "Placing Order..." : "Place Order 🌷"}
            </button>
          </form>
        </div>

        {/* 🌿 RIGHT */}
        <div
          style={{
            position: "sticky",
            top: "100px",
            height: "fit-content",
            background: "#fff",
            padding: "24px",
            borderRadius: "24px",
            boxShadow: "0 12px 30px rgba(44,39,36,0.06)",
          }}
        >
          <h3>Order Summary 🧺</h3>

          {cart.length === 0 ? (
            <p>Your basket is empty 🌷</p>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <img src={item.image} style={{ width: 45, height: 45, borderRadius: 10 }} />
                    <div>
                      <p style={{ margin: 0, fontWeight: 600 }}>{item.name}</p>
                      <p style={{ margin: 0, fontSize: 12, color: "#777" }}>Qty: {item.qty}</p>
                    </div>
                  </div>

                  <strong>Rs {item.price * item.qty}</strong>
                </div>
              ))}

              <hr />

              <h3>Total: Rs {getTotal()}</h3>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

const inputStyle = {
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1px solid #e6e6e6",
  outline: "none",
  fontSize: "0.95rem",
  width: "100%",
};

const buttonStyle = {
  marginTop: "10px",
  padding: "14px",
  borderRadius: "999px",
  border: "none",
  background: "#4f5d52",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
};

export default Checkout;