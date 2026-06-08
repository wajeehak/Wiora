import { useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { flyToCart } from "../utils/flyToCart";
import { useCart } from "../context/CartContext";

function Shop() {
  const { addToCart } = useCart();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="shop-container">

        {/* 🌷 HEADER */}
        <div className="shop-header">
          <h1>Shop Collection</h1>
          <p>Each piece is handmade in small, slow batches 🌷</p>
        </div>

        {/* 🧺 BOUTIQUE GRID */}
        <div className="shop-grid">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              className="shop-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => setSelectedProduct(p)}
              style={{ cursor: "pointer" }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* 🌸 QUICK PREVIEW MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
              />

              <h2>{selectedProduct.name}</h2>

              <p className="modal-price">
                Rs {selectedProduct.price}
              </p>

              <p className="modal-desc">
                Handmade crochet piece crafted slowly with care,
                softness, and intention 🌷
              </p>

              {/* 🧺 ADD TO CART */}
              <button
                className="modal-btn"
                onClick={() => {
                  flyToCart(selectedProduct.image, () => {

                    // Add item to cart
                    addToCart(selectedProduct);

                    // Show toast
                    setToast("Added to basket ✨");

                    setTimeout(() => {
                      setToast(null);
                    }, 1200);

                    // Close modal
                    setSelectedProduct(null);
                  });
                }}
              >
                Add to Cart
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌸 TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="cart-toast"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Shop;