import { motion } from "framer-motion";

function ProductCard({ product }) {
  return (
    <motion.div
      className="product-card"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      {/* IMAGE WRAPPER */}
      <div className="image-wrapper">
        <img src={product.image} alt={product.name} />
      </div>

      {/* INFO */}
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">Rs {product.price}</p>

        <button className="add-btn">
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}

export default ProductCard;