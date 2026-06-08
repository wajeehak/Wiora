import { useCart } from "../context/CartContext";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cart, getTotal, clearCart } = useCart();
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();

    clearCart();
    navigate("/success");
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
      {/* 🌷 MAIN WRAPPER */}
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: "40px",
        }}
      >
        {/* 🌸 LEFT: FORM */}
        <div
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "24px",
            boxShadow: "0 12px 30px rgba(44,39,36,0.06)",
          }}
        >
          <h2 style={{ marginBottom: "12px" }}>
            Checkout 🌸
          </h2>

          <p
            style={{
              color: "var(--text-muted)",
              marginBottom: "28px",
              lineHeight: "1.7",
              fontSize: "0.95rem",
            }}
          >
            Almost there ✨ Enter your details below and we'll prepare your
            handmade pieces with care.
          </p>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <h3 style={{ marginBottom: "8px" }}>
              Contact Information
            </h3>

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <h3
              style={{
                marginTop: "20px",
                marginBottom: "8px",
              }}
            >
              Delivery Information
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "14px",
              }}
            >
              <input
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                required
                style={inputStyle}
              />

              <input
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <input
              name="mobile"
              placeholder="Mobile Number"
              value={form.mobile}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <textarea
              name="address"
              placeholder="Street Address"
              value={form.address}
              onChange={handleChange}
              required
              style={{
                ...inputStyle,
                height: "90px",
                resize: "none",
              }}
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "14px",
              }}
            >
              <input
                name="country"
                placeholder="Country"
                value={form.country}
                onChange={handleChange}
                required
                style={inputStyle}
              />

              <select
                  name="province"
                  value={form.province}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                >
                  <option value="">Select Province</option>

                  <option value="Sindh">Sindh</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Khyber Pakhtunkhwa">
                    Khyber Pakhtunkhwa
                  </option>
                  <option value="Balochistan">
                    Balochistan
                  </option>
                  <option value="Gilgit Baltistan">
                    Gilgit Baltistan
                  </option>
                  <option value="Azad Kashmir">
                    Azad Kashmir
                  </option>
                </select>
            </div>

            <input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <button
              type="submit"
              style={buttonStyle}
            >
              Place Order 🌷
            </button>
          </form>
        </div>

        {/* 🌿 RIGHT: ORDER SUMMARY */}
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
          <h3 style={{ marginBottom: "16px" }}>
            Order Summary 🧺
          </h3>

          {cart.length === 0 ? (
            <p style={{ color: "#777" }}>
              Your basket is empty 🌷
            </p>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginBottom: "16px",
                }}
              >
                {cart.map((item) => (
  <div
    key={item.id}
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "12px",
      paddingBottom: "12px",
      borderBottom: "1px solid #f1f1f1",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <img
        src={item.image}
        alt={item.name}
        style={{
          width: "52px",
          height: "52px",
          objectFit: "cover",
          borderRadius: "12px",
        }}
      />

      <div>
        <p
          style={{
            fontWeight: "600",
            margin: 0,
            fontSize: "0.92rem",
          }}
        >
          {item.name}
        </p>

        <p
          style={{
            margin: "4px 0 0",
            color: "#777",
            fontSize: "0.85rem",
          }}
        >
          Qty: {item.qty}
        </p>
      </div>
    </div>

    <strong>
      Rs {item.price * item.qty}
    </strong>
  </div>
))}
              </div>

              <hr style={{ margin: "10px 0" }} />

              <h3 style={{ marginTop: "10px" }}>
                Total: Rs {getTotal()}
              </h3>
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
  fontFamily: "Quicksand",
  background: "#fff",
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
  transition: "0.25s ease",
};

export default Checkout;