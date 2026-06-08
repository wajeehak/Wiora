import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Cart() {
  const { cart, removeFromCart, getTotal } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{ padding: "40px" }}
    >
     <div className="container">
      <h2>Your Cozy Cart 🧺</h2>

      {cart.length === 0 ? (
        <p>Your basket is empty… like a soft little shelf waiting 🌷</p>
      ) : (
        <>
          {cart.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                marginBottom: "15px",
                background: "#fff",
                padding: "10px",
                borderRadius: "12px"
              }}
            >
              <img src={item.image} width="60" />

              <div style={{ flex: 1 }}>
                <p>{item.name}</p>
                <p>Rs {item.price} × {item.qty}</p>
              </div>

              <button onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </motion.div>
          ))}

          <h3>Total: Rs {getTotal()}</h3>

          <Link to="/checkout">
            <button
              style={{
                padding: "10px 20px",
                background: "#cfe8d5",
                border: "none",
                borderRadius: "10px"
              }}
            >
              Proceed to Checkout 🌸
            </button>
          </Link>
        </>
      )}
      </div>
    </motion.div>
  );
}

export default Cart;