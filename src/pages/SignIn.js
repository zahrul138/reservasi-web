import { useState, useEffect } from "react";
import { FaLock, FaEnvelope, FaEyeSlash, FaEye } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
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
    maxWidth: "400px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    padding: "2.5rem",
    textAlign: "center",
  },
  logo: {
    width: "75px",
    height: "75px",
  },
  title: {
    fontSize: "1.7rem",
    fontWeight: 700,
    marginBottom: "0.5rem",
  },
  subtitle: {
    fontSize: "0.9rem",
    color: "#666",
    marginBottom: "2rem",
  },
  formField: {
    marginBottom: "1.25rem",
    textAlign: "left",
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
    color: "red",
    marginBottom: "1rem",
    fontSize: "0.9rem",
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
  },
  signinLink: {
    marginTop: "1.5rem",
    fontSize: "0.95rem",
  },
  link: {
    color: "#d09500",
    fontWeight: 600,
    textDecoration: "none",
    marginLeft: "0.25rem",
  },
};

styles.inputPassword = { ...styles.input, paddingRight: "2.5rem" };
styles.buttonHover = { ...styles.button, backgroundColor: "#87723b" };

function SignIn() {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonHover, setButtonHover] = useState(false);

  useEffect(() => {
    if (location.state?.from?.pathname?.startsWith("/admin")) {
      alert("You must log in as an admin to access this page!");
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        const user = result.user;
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("fullname", user.fullname || "");
        sessionStorage.setItem("id", user.id || "");
        sessionStorage.setItem("avatar", user.avatar || "");
        sessionStorage.setItem("email", user.email || "");
        sessionStorage.setItem("role", user.role || "");

        window.dispatchEvent(new Event("storage"));

        navigate("/home");
      } else {
        setErrorMessage(result.message || "Wrong email or password!");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <motion.div
        style={styles.card}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <img src={Logo} alt="Logo" style={styles.logo} />
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Sign in to your account</p>

        <form onSubmit={handleSubmit}>
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
                required
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.formField}>
            <label htmlFor="password" style={styles.label}>
              Password
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

          {errorMessage && <div style={styles.errorText}>{errorMessage}</div>}

          <button
            type="submit"
            disabled={isLoading}
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
            style={buttonHover ? styles.buttonHover : styles.button}
          >
            {isLoading ? "Login..." : "Login"}
          </button>
        </form>

        <div style={styles.signinLink}>
          <span>Don't have an account?</span>{" "}
          <a href="/signup" style={styles.link}>
            Create a new account
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default SignIn;
