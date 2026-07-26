import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    minHeight: "95vh",
    display: "flex",
    justifyContent: "center",
    padding: "3rem 1rem",
    fontFamily: "Segoe UI, Roboto, Helvetica Neue, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "800px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    padding: "2.5rem",
  },
  title: {
    fontSize: "1.9rem",
    fontWeight: 700,
    marginBottom: "0.5rem",
    color: "#333",
  },
  updated: {
    fontSize: "0.85rem",
    color: "#888",
    marginBottom: "2rem",
  },
  sectionTitle: {
    fontSize: "1.15rem",
    fontWeight: 600,
    color: "#87723b",
    marginTop: "1.75rem",
    marginBottom: "0.5rem",
  },
  paragraph: {
    fontSize: "0.95rem",
    color: "#4a5568",
    lineHeight: 1.7,
    marginBottom: "0.75rem",
  },
  backLink: {
    display: "inline-block",
    marginTop: "2rem",
    color: "#d09500",
    fontWeight: 600,
    textDecoration: "none",
  },
};

const sections = [
  {
    heading: "1. Information We Collect",
    text: "We collect information you provide directly to us, such as your full name, email address, and password when you create an account, as well as booking details when you make a reservation.",
  },
  {
    heading: "2. How We Use Your Information",
    text: "We use your information to process reservations, communicate with you about your bookings, improve our services, and maintain the security of your account.",
  },
  {
    heading: "3. Information Sharing",
    text: "We do not sell your personal information. We may share your information with trusted service providers solely for the purpose of operating our website and fulfilling your reservations.",
  },
  {
    heading: "4. Data Security",
    text: "We take reasonable measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is completely secure.",
  },
  {
    heading: "5. Your Rights",
    text: "You may access, update, or request deletion of your personal information by contacting us through our Contact page.",
  },
  {
    heading: "6. Changes to This Policy",
    text: "We may update this Privacy Policy from time to time. Continued use of our website after changes are posted constitutes your acceptance of the revised policy.",
  },
  {
    heading: "7. Contact Us",
    text: "If you have any questions about this Privacy Policy, please reach out to us through our Contact page.",
  },
];

function PrivacyPolicy() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div style={styles.container}>
      <Helmet>
        <title>Privacy Policy</title>
      </Helmet>
      <motion.div
        style={styles.card}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.h1
          style={styles.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Privacy Policy
        </motion.h1>
        <p style={styles.updated}>Last updated: July 2026</p>

        <motion.p
          style={styles.paragraph}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Royal Gold values your privacy. This Privacy Policy explains how we
          collect, use, and protect your personal information when you use our
          website and services.
        </motion.p>

        {sections.map((section, index) => (
          <motion.div
            key={section.heading}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
          >
            <h2 style={styles.sectionTitle}>{section.heading}</h2>
            <p style={styles.paragraph}>{section.text}</p>
          </motion.div>
        ))}

        <button
          onClick={() => navigate(-1)}
          style={{
            ...styles.backLink,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>
      </motion.div>
    </div>
  );
}

export default PrivacyPolicy;
