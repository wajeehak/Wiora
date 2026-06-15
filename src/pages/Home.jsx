import products from "../data/products";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { fadeUp } from "../utils/animations";

function Home() {
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  // 🌷 Auto scrolling carousel (unchanged but stable)
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationId;
    let paused = false;

    const speed = 0.4;

    const animate = () => {
      if (!paused) {
        carousel.scrollLeft += speed;

        const singleSetWidth = carousel.scrollWidth / 3;

        if (carousel.scrollLeft >= singleSetWidth) {
          carousel.scrollLeft -= singleSetWidth;
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const pause = () => (paused = true);
    const resume = () => (paused = false);

    carousel.addEventListener("mouseenter", pause);
    carousel.addEventListener("mouseleave", resume);
    carousel.addEventListener("touchstart", pause);
    carousel.addEventListener("touchend", resume);

    return () => cancelAnimationFrame(animationId);
  }, []);

  const featuredProducts = [...products, ...products, ...products];

  // 🌷 category mapping (IMPORTANT)
  const categories = [
    { label: "🧷 Keychains & Bag Charms", value: "keychains" },
    { label: "👜 Bags", value: "bags" },
    { label: "🌸 Flowers & Bouquets", value: "flowers" },
    { label: "☕ Coasters", value: "coasters" },
  ];

  return (
    <div style={{ paddingBottom: "40px" }}>

      {/* HERO */}
      <section className="home-hero">
        <motion.h1 variants={fadeUp} initial="hidden" animate="show">
          Soft things, made slowly 🌷
        </motion.h1>

        <motion.p variants={fadeUp} initial="hidden" animate="show">
          WIORA is a handmade crochet space where every piece is crafted with care.
        </motion.p>
      </section>

      {/* CAROUSEL */}
      <section className="section bg-pink">
        <motion.h2>Most Loved Pieces</motion.h2>

        <div className="carousel-wrapper">
          <div className="carousel" ref={carouselRef}>
            {featuredProducts.map((p, i) => (
              <div key={`${p.id}-${i}`} className="carousel-card">
                <img src={p.image} alt={p.name} />
                <p className="name">{p.name}</p>
                <p className="price">Rs {p.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🌿 CATEGORIES (CLICKABLE FIXED) */}
      <section className="section bg-matcha">
        <motion.h2>Browse Collections</motion.h2>

        <div className="collection-grid">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              className="collection-card"
              style={{ cursor: "pointer" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(`/shop?category=${cat.value}`)}
            >
              {cat.label}
            </motion.div>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section className="section bg-white">
        <motion.h2>Our Story</motion.h2>
        <p style={{ maxWidth: "600px", color: "var(--text-muted)" }}>
          WIORA started as a slow creative space where crochet became calm expression.
        </p>
      </section>

      {/* WHY */}
      <section className="section bg-butter">
        <motion.h2>Why WIORA</motion.h2>

        <div className="why-grid">
          {[
            "🧶 Handmade with care",
            "🌷 Limited pieces only",
            "🧺 Slow crafted aesthetic",
            "🎀 Soft gifting experience",
          ].map((item, i) => (
            <div key={i} className="collection-card">
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <motion.h2>Find something soft for yourself 🌷</motion.h2>

        <motion.button onClick={() => navigate("/shop")}>
          Shop Now
        </motion.button>
      </section>
    </div>
  );
}

export default Home;