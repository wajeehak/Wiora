import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

function Product() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🌿 FETCH SINGLE PRODUCT FROM FIRESTORE
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }

      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p style={{ padding: "50px" }}>Loading product...</p>;
  }

  if (!product) {
    return <p style={{ padding: "50px" }}>Product not found 🌷</p>;
  }

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

      <p style={{ margin: "10px 0", color: "#666" }}>
        {product.description}
      </p>

      <button
        onClick={() => addToCart(product)}
        style={{
          width: "250px",
          padding: "12px",
          background: "#f7c6d9",
          border: "none",
          borderRadius: "20px",
          cursor: "pointer",
          marginTop: "10px"
        }}
      >
        Add to Cart 🧺
      </button>
    </motion.div>
  );
}

export default Product;