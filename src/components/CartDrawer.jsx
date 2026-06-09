import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

function CartDrawer({ open, setOpen }) {
  const {
  cart,
  isCartOpen,
  setIsCartOpen,
  increaseQty,
  decreaseQty,
  removeFromCart,
  getTotal,
} = useCart();

  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* 🌑 BACKDROP */}
          <motion.div
            className="cart-backdrop"
            onClick={() => setIsCartOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* 🧺 DRAWER */}
          <motion.div
            className="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween" }}
          >
            <h2>My Basket 🧺</h2>

            {cart.length === 0 ? (
              <p>Your cart is empty 🌷</p>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">

                      <img src={item.image} alt={item.name} />

                      <div className="cart-info">
                        <p className="name">{item.name}</p>
                        <p className="price">Rs {item.price}</p>

                        {/* ➕➖ QUANTITY CONTROLS */}
                        <div className="qty-controls">
                          <button onClick={() => decreaseQty(item.id)}>
                            −
                          </button>

                          <span>{item.qty}</span>

                          <button onClick={() => increaseQty(item.id)}>
                            +
                          </button>
                        </div>

                        <button
                          className="remove-btn"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 💰 TOTAL */}
                <div className="cart-total">
                  <h3>Total: Rs {getTotal()}</h3>

                  <button
                    className="checkout-btn"
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate("/checkout");
                    }}
                  >
                    Checkout ✨
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CartDrawer;