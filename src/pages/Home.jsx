import products from "../data/products";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fadeUp } from "../utils/animations";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ paddingBottom: "40px" }}>

      {/* 🌸 HERO SECTION */}
      <section className="home-hero">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          Soft things, made slowly 🌷
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.1 }}
        >
          WIORA is a handmade crochet space where every piece is crafted with care,
          warmth, and slow living energy.
        </motion.p>
      </section>

      {/* 🧺 BEST SELLERS SECTION */}
      <section className="section bg-pink">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          Most Loved Pieces
        </motion.h2>

        <div className="grid">
          {products.slice(0, 3).map((p, i) => (
            <motion.div
              key={p.id}
              className="card"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.08 }}
            >
              <img src={p.image} alt={p.name} />

              <p className="name">
                {p.name}
              </p>

              <p className="price">
                Rs {p.price}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🌿 COLLECTIONS SECTION */}
      <section className="section bg-matcha">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          Browse Collections
        </motion.h2>

        <div className="collection-grid">
          {[
            "🌷 Hair Accessories",
            "🧵 Keychains",
            "☕ Coasters",
            "🎁 Gift Sets",
          ].map((item, i) => (
            <motion.div
              key={i}
              className="collection-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: i * 0.05,
              }}
            >
              {item}
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🌿 OUR STORY SECTION */}
      <section className="section bg-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Story
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{
            fontSize: "1.2rem",
            maxWidth: "580px",
            color: "var(--text-muted)",
            margin: "0",
          }}
        >
          WIORA started as a slow creative space where crochet became a way to
          express calm, softness, and intentional living. Every piece tells a
          story of patience.
        </motion.p>
      </section>

      {/* 🧵 WHY CHOOSE US SECTION */}
      <section className="section bg-butter">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Why WIORA
        </motion.h2>

        <div className="why-grid">
          {[
            "🧶 Handmade with care",
            "🌷 Limited pieces only",
            "🧺 Slow crafted aesthetic",
            "🎀 Soft gifting experience",
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="collection-card"
              style={{
                cursor: "default",
                padding: "24px 15px",
                fontSize: "1rem",
              }}
            >
              {item}
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🌷 CALL TO ACTION */}
      <section className="cta">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Find something soft for yourself 🌷
        </motion.h2>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/shop")}
        >
          Shop Now
        </motion.button>
      </section>

    </div>
  );
}

export default Home;