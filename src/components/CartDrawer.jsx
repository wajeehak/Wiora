import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function CartDrawer() {
  const {
    cart,
    addToCart,
    decreaseQty,
    removeFromCart,
    getTotal,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* 🌫️ Overlay */}
          <motion.div
            className="drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />

          {/* 🧺 Drawer */}
          <motion.div
            className="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 28,
            }}
          >
            {/* Header */}
            <div className="drawer-header">
              <h2>Your Basket 🧺</h2>

              <button onClick={() => setIsCartOpen(false)}>
                ✕
              </button>
            </div>

            {/* Empty state */}
            {cart.length === 0 ? (
              <p className="empty-cart">
                Your basket is empty 🌷
              </p>
            ) : (
              <>
                {/* Items */}
                <div className="drawer-items">
                  {cart.map((item) => (
                    <div key={item.id} className="drawer-item">
                      <img src={item.image} alt={item.name} />

                      <div className="item-info">
                        <h4>{item.name}</h4>

                        <p>Rs {item.price}</p>

                        {/* Quantity controls */}
                        <div className="qty-controls">
                          <button
                            onClick={() => decreaseQty(item.id)}
                          >
                            −
                          </button>

                          <span>{item.qty}</span>

                          <button
                            onClick={() => addToCart(item)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Remove item */}
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="drawer-footer">
                  <h3>Total: Rs {getTotal()}</h3>

                  <p className="drawer-note">
                    Shipping & taxes calculated at checkout ✨
                  </p>

                  <button
                    className="checkout-btn"
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate("/checkout");
                    }}
                  >
                    Go to Checkout 🌷
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