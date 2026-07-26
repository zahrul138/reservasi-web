import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaUser, FaEnvelope, FaEyeSlash, FaEye, FaPen } from "react-icons/fa";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { API_BASE_URL } from "../services/apiConfig";

const styles = {
  container: {
    minHeight: "95vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1.5rem",
    fontFamily: "Segoe UI, Roboto, Helvetica Neue, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "880px",
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    display: "flex",
  },
  sidebar: {
    width: "280px",
    flexShrink: 0,
    background: "linear-gradient(160deg, #87723b, #d09500)",
    padding: "2.5rem 1.75rem",
    textAlign: "center",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarCircle: {
    width: "88px",
    height: "88px",
    borderRadius: "50%",
    backgroundColor: "white",
    color: "#87723b",
    fontSize: "2rem",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
  headerName: {
    fontSize: "1.3rem",
    fontWeight: 700,
    marginBottom: "0.35rem",
    wordBreak: "break-word",
  },
  headerEmail: {
    fontSize: "0.8rem",
    opacity: 0.9,
    wordBreak: "break-word",
  },
  roleBadge: {
    display: "inline-block",
    backgroundColor: "rgba(255,255,255,0.25)",
    fontSize: "0.75rem",
    fontWeight: 600,
    padding: "0.25rem 0.85rem",
    borderRadius: "20px",
    marginTop: "0.85rem",
  },
  body: {
    flex: 1,
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  fieldsRow: {
    display: "flex",
    gap: "1rem",
  },
  formField: {
    marginBottom: "1.1rem",
    flex: 1,
    minWidth: 0,
  },
  label: {
    display: "block",
    fontSize: "0.8rem",
    fontWeight: 600,
    marginBottom: "0.4rem",
    color: "#87723b",
  },
  inputWrapper: {
    position: "relative",
    borderRadius: "8px",
    overflow: "hidden",
  },
  fieldIcon: {
    position: "absolute",
    left: "1rem",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#d09500",
    fontSize: "0.875rem",
    pointerEvents: "none",
  },
  input: {
    width: "100%",
    padding: "0.7rem 1rem 0.7rem 2.75rem",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "0.9rem",
    outline: "none",
    boxSizing: "border-box",
    backgroundColor: "white",
  },
  inputDisabled: {
    backgroundColor: "#f3f4f6",
    color: "#888",
    cursor: "not-allowed",
    borderColor: "#e2e8f0",
  },
  togglePassword: {
    position: "absolute",
    right: "0.75rem",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    color: "#b8860b",
  },
  divider: {
    border: "none",
    borderTop: "1px solid #e2e8f0",
    margin: "0.25rem 0 1.1rem",
  },
  sectionLabel: {
    fontSize: "0.78rem",
    fontWeight: 600,
    color: "#333",
    marginBottom: "0.85rem",
  },
  editButton: {
    width: "100%",
    padding: "0.8rem 1rem",
    backgroundColor: "white",
    color: "#d09500",
    border: "2px solid #d09500",
    borderRadius: "8px",
    fontSize: "0.95rem",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
  },
  actionsRow: {
    display: "flex",
    gap: "0.75rem",
  },
  saveButton: {
    flex: 1,
    padding: "0.8rem 1rem",
    backgroundColor: "#d09500",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "0.95rem",
    fontWeight: 600,
    cursor: "pointer",
  },
  cancelButton: {
    flex: 1,
    padding: "0.8rem 1rem",
    backgroundColor: "white",
    color: "#666",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "0.95rem",
    fontWeight: 600,
    cursor: "pointer",
  },
};

styles.inputPassword = { ...styles.input, paddingRight: "2.5rem" };
styles.inputEmailDisabled = { ...styles.input, ...styles.inputDisabled };
styles.inputFullnameDisabled = {
  ...styles.input,
  ...styles.inputDisabled,
};
styles.inputPasswordDisabled = {
  ...styles.inputPassword,
  ...styles.inputDisabled,
};

function Profile() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const [fullname, setFullname] = useState("");
  const [originalFullname, setOriginalFullname] = useState("");
  const [fullnameReadOnly, setFullnameReadOnly] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");

    if (!storedEmail) {
      navigate("/signin");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/user/byemail/${storedEmail}`,
        );
        const result = await response.json();

        if (response.ok) {
          setUserId(result.id);
          setFullname(result.fullname || "");
          setOriginalFullname(result.fullname || "");
          setEmail(result.email || "");
          setRole(result.role || "");
        } else {
          alert("Failed to load profile data.");
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred while loading your profile.");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setFullname(originalFullname);
    setNewPassword("");
    setConfirmPassword("");
    setIsEditing(false);
  };

  const handleSubmit = async () => {
    if (newPassword && newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/user/${userId}/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullname: fullname,
            password: newPassword || null,
          }),
        },
      );

      if (response.ok) {
        localStorage.setItem("fullname", fullname);
        window.dispatchEvent(new Event("storage"));
        setOriginalFullname(fullname);
        setNewPassword("");
        setConfirmPassword("");
        setIsEditing(false);
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while updating your profile.");
    } finally {
      setIsLoading(false);
    }
  };

  const initial = fullname ? fullname.charAt(0).toUpperCase() : "?";

  return (
    <div style={styles.container}>
      <Helmet>
        <title>My Profile</title>
      </Helmet>
      <motion.div
        style={styles.card}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div style={styles.sidebar}>
          <div style={styles.avatarCircle}>{initial}</div>
          <div style={styles.headerName}>{fullname}</div>
          <div style={styles.headerEmail}>{email}</div>
          {role && <div style={styles.roleBadge}>{role}</div>}
        </div>

        <div style={styles.body}>
          <div>
            <div style={styles.fieldsRow}>
              <div style={styles.formField}>
                <label style={styles.label}>Full Name</label>
                <div style={styles.inputWrapper}>
                  <div style={styles.fieldIcon}>
                    <FaUser />
                  </div>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    name="fullname-field"
                    title={fullname}
                    readOnly={fullnameReadOnly}
                    onFocus={() => setFullnameReadOnly(false)}
                    onBlur={() => setFullnameReadOnly(true)}
                    value={fullname}
                    disabled={!isEditing}
                    onChange={(e) => setFullname(e.target.value)}
                    style={
                      isEditing ? styles.input : styles.inputFullnameDisabled
                    }
                  />
                </div>
              </div>

              <div style={styles.formField}>
                <label style={styles.label}>Email Address</label>
                <div style={styles.inputWrapper}>
                  <div style={styles.fieldIcon}>
                    <FaEnvelope />
                  </div>
                  <input
                    type="email"
                    title={email}
                    value={email}
                    disabled
                    style={styles.inputEmailDisabled}
                  />
                </div>
              </div>
            </div>

            {isEditing && (
              <>
                <hr style={styles.divider} />
                <p style={styles.sectionLabel}>
                  Change Password (leave blank to keep current password)
                </p>

                <div style={styles.fieldsRow}>
                  <div style={styles.formField}>
                    <label style={styles.label}>New Password</label>
                    <div style={styles.inputWrapper}>
                      <span style={styles.fieldIcon}>
                        <FaLock />
                      </span>
                      <input
                        type={passwordVisible ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={styles.inputPassword}
                      />
                      {newPassword && (
                        <span
                          onClick={() => setPasswordVisible(!passwordVisible)}
                          style={styles.togglePassword}
                        >
                          {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={styles.formField}>
                    <label style={styles.label}>Confirm New Password</label>
                    <div style={styles.inputWrapper}>
                      <span style={styles.fieldIcon}>
                        <FaLock />
                      </span>
                      <input
                        type={confirmPasswordVisible ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={styles.inputPassword}
                      />
                      {confirmPassword && (
                        <span
                          onClick={() =>
                            setConfirmPasswordVisible(!confirmPasswordVisible)
                          }
                          style={styles.togglePassword}
                        >
                          {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            {isEditing ? (
              <div style={styles.actionsRow}>
                <button
                  type="button"
                  onClick={handleCancelClick}
                  style={styles.cancelButton}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  style={styles.saveButton}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleEditClick}
                style={styles.editButton}
              >
                <FaPen /> Edit Profile
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Profile;