import { motion } from "framer-motion";
import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      "Thank you for reaching out 🌷 We'll get back to you soon!"
    );

    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        padding: "40px 20px 80px",
      }}
    >
      {/* 🌸 HERO */}
      <section className="section bg-pink">
        <h1
          style={{
            fontSize: "2.7rem",
            marginBottom: "18px",
          }}
        >
          Contact Us 🌸
        </h1>

        <p
          style={{
            maxWidth: "620px",
            color: "var(--text-muted)",
            lineHeight: "1.8",
          }}
        >
          We'd love to hear from you. Whether you're interested in a
          custom crochet order, gifting ideas, collaborations, or simply
          want to say hello, our inbox is always open.
        </p>
      </section>

      {/* 🌷 CONTACT CARD */}
      <section className="section bg-white">
        <div
          style={{
            width: "100%",
            maxWidth: "700px",
          }}
        >
          <h2
            style={{
              marginBottom: "12px",
            }}
          >
            Send a Message ✨
          </h2>

          <p
            style={{
              color: "var(--text-muted)",
              marginBottom: "30px",
            }}
          >
            Custom orders and inquiries are always welcome.
          </p>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <textarea
              name="message"
              placeholder="Tell us about your inquiry..."
              value={form.message}
              onChange={handleChange}
              required
              style={{
                ...inputStyle,
                height: "140px",
                resize: "none",
              }}
            />

            <button
              type="submit"
              style={buttonStyle}
            >
              Send Message 🌷
            </button>
          </form>
        </div>
      </section>

      {/* 🌿 CONTACT INFO */}
      <section className="section bg-matcha">
        <h2>Get in Touch</h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            marginTop: "20px",
          }}
        >
          <p>
            📧 bywiora
          </p>

          <p>
            🌷 Handmade crochet creations crafted with warmth and care
          </p>

          <p>
            🎀 Custom orders available upon request
          </p>
        </div>
      </section>
    </motion.div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "14px",
  border: "1px solid #e6e6e6",
  outline: "none",
  fontSize: "0.95rem",
  fontFamily: "Quicksand",
};

const buttonStyle = {
  marginTop: "8px",
  padding: "14px",
  borderRadius: "999px",
  border: "none",
  background: "var(--matcha)",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
};

export default Contact;