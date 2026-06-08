import { motion } from "framer-motion";

function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        padding: "40px 20px 80px",
      }}
    >
      {/* 🌷 HERO */}
      <section className="section bg-pink">
        <h1
          style={{
            fontSize: "2.8rem",
            marginBottom: "20px",
          }}
        >
          About WIORA 🌷
        </h1>

        <p
          style={{
            maxWidth: "650px",
            color: "var(--text-muted)",
            fontSize: "1.1rem",
            lineHeight: "1.8",
          }}
        >
          WIORA is a small handmade crochet studio built around
          softness, slow living, and thoughtful craftsmanship.
          Every piece is created carefully by hand, turning simple
          yarn into something meaningful and lasting.
        </p>
      </section>

      {/* 🌿 OUR STORY */}
      <section className="section bg-white">
        <h2>Our Story</h2>

        <p
          style={{
            maxWidth: "700px",
            color: "var(--text-muted)",
          }}
        >
          What started as a creative hobby slowly became a space for
          making beautiful handmade pieces that bring comfort and joy.
          Crochet became more than a craft. It became a way to slow
          down, create intentionally, and celebrate the beauty of
          handmade work.
        </p>
      </section>

      {/* 🧶 VALUES */}
      <section className="section bg-matcha">
        <h2>What Makes WIORA Different</h2>

        <div className="why-grid">
          <div className="collection-card">
            🧶 Handmade from start to finish
          </div>

          <div className="collection-card">
            🌷 Small-batch creations
          </div>

          <div className="collection-card">
            🎀 Thoughtful gifting experience
          </div>

          <div className="collection-card">
            🤍 Made with patience and care
          </div>
        </div>
      </section>

      {/* 🌸 MISSION */}
      <section className="section bg-butter">
        <h2>Our Mission</h2>

        <p
          style={{
            maxWidth: "700px",
            color: "var(--text-muted)",
          }}
        >
          We believe handmade items carry a warmth that mass-produced
          products never can. Our goal is to create soft, beautiful,
          and meaningful crochet pieces that make everyday moments feel
          a little more special.
        </p>
      </section>
    </motion.div>
  );
}

export default About;