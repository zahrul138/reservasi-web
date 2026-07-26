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
    heading: "1. Account Registration",
    text: "You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account.",
  },
  {
    heading: "2. Reservations and Payments",
    text: "All room reservations are subject to availability and confirmation. Rates displayed at the time of booking are final unless otherwise stated. Payment must be completed according to the method and schedule specified during the booking process.",
  },
  {
    heading: "3. Cancellations and Refunds",
    text: "Cancellation policies may vary depending on the room type and rate selected. Please review the applicable cancellation policy shown at the time of booking. Refunds, if applicable, will be processed within a reasonable timeframe.",
  },
  {
    heading: "4. User Conduct",
    text: "You agree not to misuse our services, including but not limited to submitting false information, attempting unauthorized access to our systems, or engaging in any activity that disrupts the normal operation of our website.",
  },
  {
    heading: "5. Limitation of Liability",
    text: "Royal Gold is not liable for any indirect, incidental, or consequential damages arising from your use of our website or services, to the extent permitted by applicable law.",
  },
  {
    heading: "6. Changes to These Terms",
    text: "We may update these Terms of Service from time to time. Continued use of our website after changes are posted constitutes your acceptance of the revised terms.",
  },
  {
    heading: "7. Contact Us",
    text: "If you have any questions about these Terms of Service, please reach out to us through our Contact page.",
  },
];

function TermsOfService() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div style={styles.container}>
      <Helmet>
        <title>Terms of Service</title>
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
          Terms of Service
        </motion.h1>
        <p style={styles.updated}>Last updated: July 2026</p>

        <motion.p
          style={styles.paragraph}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Welcome to Royal Gold. By creating an account, making a reservation,
          or otherwise using our website and services, you agree to be bound by
          the following Terms of Service. Please read them carefully before
          proceeding.
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

export default TermsOfService;
