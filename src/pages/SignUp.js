import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaEnvelope, FaUser, FaEyeSlash, FaEye } from "react-icons/fa";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Logo from "../assets/images/LogoRG3.png";
import { API_BASE_URL } from "../services/apiConfig";

const styles = {
  container: {
    minHeight: "95vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    fontFamily: "Segoe UI, Roboto, Helvetica Neue, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "1000px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
  },
  signupForm: {
    width: "50%",
    padding: "2.5rem",
    backgroundColor: "white",
  },
  title: {
    fontSize: "1.7rem",
    fontWeight: 700,
    textAlign: "center",
    marginBottom: "0.5rem",
  },
  subtitle: {
    fontSize: "0.9rem",
    color: "#666",
    textAlign: "center",
    marginBottom: "2rem",
  },
  formField: {
    marginBottom: "1.25rem",
  },
  label: {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: 600,
    marginBottom: "0.5rem",
    color: "#87723b",
  },
  inputWrapper: {
    position: "relative",
    borderRadius: "6px",
    overflow: "hidden",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  },
  fieldIcon: {
    position: "absolute",
    left: "1rem",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#d09500",
    fontSize: "0.875rem",
  },
  input: {
    width: "100%",
    padding: "0.75rem 1rem 0.75rem 2.75rem",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    fontSize: "0.95rem",
    outline: "none",
    boxSizing: "border-box",
  },
  togglePassword: {
    position: "absolute",
    right: "0.75rem",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    color: "#b8860b",
  },
  errorText: {
    color: "#e53e3e",
    fontSize: "0.75rem",
    marginTop: "0.5rem",
  },
  consentCheckbox: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "1rem",
  },
  consentLabel: {
    fontSize: "0.875rem",
    color: "#4a5568",
    lineHeight: 1.4,
  },
  consentLink: {
    color: "#d09500",
    textDecoration: "none",
    fontWeight: 600,
  },
  button: {
    width: "100%",
    padding: "0.875rem 1rem",
    backgroundColor: "#d09500",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(208, 149, 0, 0.2)",
    marginTop: "1rem",
  },
  buttonDisabled: {
    opacity: 0.7,
    cursor: "not-allowed",
    boxShadow: "none",
  },
  signinLink: {
    marginTop: "1.5rem",
    textAlign: "center",
    fontSize: "0.95rem",
  },
  benefitsPanel: {
    width: "50%",
    background: "linear-gradient(135deg, #87723b, #d09500)",
    padding: "2.5rem",
    color: "white",
    display: "flex",
    flexDirection: "column",
  },
  benefitsTitle: {
    fontSize: "1.75rem",
    fontWeight: 700,
    marginBottom: "2rem",
  },
  promoBox: {
    background: "rgba(255, 255, 255, 0.2)",
    padding: "15px",
    borderRadius: "5px",
    marginBottom: "20px",
  },
  popUpOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popUp: {
    background: "#fff",
    padding: "24px",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "360px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
  },
  popUpText: {
    fontSize: "1rem",
    marginBottom: "1.5rem",
    color: "#333",
  },
  popUpButton: {
    backgroundColor: "#d09500",
    color: "#fff",
    padding: "10px 24px",
    border: "none",
    borderRadius: "6px",
    fontSize: "0.95rem",
    fontWeight: 600,
    cursor: "pointer",
  },
};

styles.inputPassword = { ...styles.input, paddingRight: "2.5rem" };
styles.inputError = { ...styles.input, borderColor: "#e53e3e" };
styles.inputPasswordError = { ...styles.inputPassword, borderColor: "#e53e3e" };
styles.buttonEnabled = { ...styles.button };
styles.buttonDisabledFinal = { ...styles.button, ...styles.buttonDisabled };

function SignUp() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showError, setShowError] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "confirmPassword") {
      setShowError(false);
    }
  };

  useEffect(() => {
    if (formData.confirmPassword === "") {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(formData.password === formData.confirmPassword);
    }
  }, [formData.password, formData.confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setPopupMessage("Registration successful!");
        setShowPopup(true);
        setFormData({
          fullname: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setPopupMessage("Registration failed. Please try again.");
        setShowPopup(true);
      }
    } catch (error) {
      setPopupMessage("An error occurred while submitting the data. Please try again.");
      setShowPopup(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    if (popupMessage === "Registration successful!") {
      navigate("/signin");
    }
  };

  return (
    <div style={styles.container}>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <div style={styles.card}>
        <motion.div
          style={styles.signupForm}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src={Logo}
            alt="Logo"
            style={{
              width: "70px",
              height: "70px",
              display: "block",
              margin: "0 auto",
            }}
          />
          <h1 style={styles.title}>Create Your Account</h1>
          <p style={styles.subtitle}>Sign up for a better booking experience</p>

          <form onSubmit={handleSubmit}>
            <div style={styles.formField}>
              <label htmlFor="fullname" style={styles.label}>
                Full Name
              </label>
              <div style={styles.inputWrapper}>
                <div style={styles.fieldIcon}>
                  <FaUser />
                </div>
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  required
                  value={formData.fullname}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.formField}>
              <label htmlFor="email" style={styles.label}>
                Email Address
              </label>
              <div style={styles.inputWrapper}>
                <div style={styles.fieldIcon}>
                  <FaEnvelope />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.formField}>
              <label htmlFor="password" style={styles.label}>
                Create Password
              </label>
              <div style={styles.inputWrapper}>
                <span style={styles.fieldIcon}>
                  <FaLock />
                </span>
                <input
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  style={styles.inputPassword}
                />
                {formData.password && (
                  <span
                    title={
                      passwordVisible
                        ? "Sembunyikan password"
                        : "Tampilkan password"
                    }
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    style={styles.togglePassword}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                )}
              </div>
            </div>

            <div style={styles.formField}>
              <label htmlFor="confirmPassword" style={styles.label}>
                Confirm Password
              </label>
              <div style={styles.inputWrapper}>
                <span style={styles.fieldIcon}>
                  <FaLock />
                </span>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={confirmPasswordVisible ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={() => setShowError(true)}
                  style={
                    !passwordMatch && showError
                      ? styles.inputPasswordError
                      : styles.inputPassword
                  }
                />
                {formData.confirmPassword && (
                  <span
                    title={
                      confirmPasswordVisible
                        ? "Sembunyikan password"
                        : "Tampilkan password"
                    }
                    onClick={() =>
                      setConfirmPasswordVisible(!confirmPasswordVisible)
                    }
                    style={styles.togglePassword}
                  >
                    {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                )}
              </div>
              {!passwordMatch && showError && (
                <p style={styles.errorText}>Passwords do not match</p>
              )}
            </div>

            <div style={styles.consentCheckbox}>
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                style={{ marginRight: "0.75rem", marginTop: "0.25rem" }}
              />
              <label htmlFor="terms" style={styles.consentLabel}>
                I agree to the{" "}
                <a href="/termsOfService" style={styles.consentLink}>
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacyPolicy" style={styles.consentLink}>
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading || !passwordMatch}
              style={
                isLoading || !passwordMatch
                  ? styles.buttonDisabledFinal
                  : styles.buttonEnabled
              }
            >
              {isLoading ? "Creating your account..." : "Create Account"}
            </button>

            <div style={styles.signinLink}>
              <span>Already have an account?</span>{" "}
              <a href="/signin" style={styles.consentLink}>
                Sign in to your account
              </a>
            </div>
          </form>
        </motion.div>

        <motion.div
          style={styles.benefitsPanel}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <h2 style={styles.benefitsTitle}>Why Create an Account ?</h2>
          <div style={styles.promoBox}>
            <h4>
              <i className="bi bi-wifi" style={{ marginRight: "8px" }}></i>Free
              WiFi
            </h4>
            <p>
              Get a free Wifi, and stay connected anytime, anywhere with our
              internet access.
            </p>
          </div>
          <div style={styles.promoBox}>
            <h4>
              <i
                className="bi bi-brightness-alt-high-fill"
                style={{ marginRight: "8px" }}
              ></i>
              Complimentary Breakfast
            </h4>
            <p>
              Start your day with a free delicious breakfast, freshly prepared
              in morning.
            </p>
          </div>
          <div style={styles.promoBox}>
            <h4>
              <i className="bi bi-gift" style={{ marginRight: "8px" }}></i>
              Exclusive Offer
            </h4>
            <p>
              Get more exclusive offers and exciting features in our hotel
              website
            </p>
          </div>
        </motion.div>
      </div>

      {showPopup && (
        <div style={styles.popUpOverlay}>
          <div style={styles.popUp}>
            <p style={styles.popUpText}>{popupMessage}</p>
            <button style={styles.popUpButton} onClick={handleClosePopup}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;
