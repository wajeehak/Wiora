import { useParams } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

function Product() {
  const { id } = useParams();
  const product = products.find((p) => p.id == id);

  const { addToCart } = useCart();

  if (!product) return <p>Not found</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ padding: "50px", textAlign: "center" }}
    >
      <img
        src={product.image}
        width="250"
        style={{ borderRadius: "20px", marginBottom: "20px" }}
      />

      <h2>{product.name}</h2>
      <p>Rs {product.price}</p>

      <button
        onClick={() => addToCart(product)}
        style={{
          width: "250px",
          padding: "12px",
          background: "#f7c6d9",
          border: "none",
          borderRadius: "20px",
          cursor: "pointer"
        }}
      >
        Add to Cart 🧺
      </button>
    </motion.div>
  );
}

export default Product;