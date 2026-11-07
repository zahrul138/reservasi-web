import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarAdmin from "../components/SidebarAdmin";
import { getAllUsers } from "../services/userService";
import { API_BASE_URL } from "../services/apiConfig";

const style = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', sans-serif",
  },
  main: {
    flex: 1,
    padding: "30px",
    backgroundColor: "#f5f2db",
    marginLeft: "var(--admin-sidebar-width, 232px)",
    transition: "margin-left 0.25s ease",
    minHeight: "100vh",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "30px",
  },
  tableContainer: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#d0b375",
    padding: "14px",
    textAlign: "left",
    fontWeight: "bold",
    color: "#333",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #eee",
    color: "#444",
  },
  actionBtn: {
    padding: "8px 16px",
    marginRight: "8px",
    cursor: "pointer",
    borderRadius: "6px",
    border: "none",
    fontWeight: "bold",
    color: "#fff",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  editBtn: {
    backgroundColor: "#1976d2",
  },
  deleteBtn: {
    backgroundColor: "#d32f2f",
  },
  noticeOverlay: {
    position: "fixed",
    inset: 0,
    padding: "20px",
    backgroundColor: "rgba(17, 24, 39, 0.55)",
    backdropFilter: "blur(3px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1100,
  },
  noticeDialog: {
    width: "100%",
    maxWidth: "420px",
    padding: "32px",
    backgroundColor: "#fff",
    borderRadius: "18px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
    textAlign: "center",
  },
  noticeIcon: {
    width: "64px",
    height: "64px",
    margin: "0 auto 18px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    fontWeight: 700,
  },
  noticeTitle: {
    margin: "0 0 10px",
    color: "#252525",
    fontSize: "22px",
  },
  noticeText: {
    margin: "0 0 24px",
    color: "#666",
    lineHeight: 1.6,
  },
  noticeActions: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
  },
  noticeButton: {
    minWidth: "120px",
    padding: "11px 18px",
    border: "none",
    borderRadius: "8px",
    fontWeight: 600,
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100vw",
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    padding: "40px",
    borderRadius: "16px",
    width: "700px",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  heading: {
    fontSize: "26px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "10px",
    textAlign: "center",
    borderBottom: "2px solid #e0c68b",
    paddingBottom: "10px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    fontSize: "15px",
    color: "#444",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "4px",
    color: "#555",
  },
  value: {
    backgroundColor: "#f9f9f9",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
  },
  closeBtn: {
    position: "absolute",
    top: "15px",
    right: "15px",
    background: "transparent",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
  },
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) return "Invalid Date";

  const day = date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const time = date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${day} at ${time}`;
};

const GuestList = () => {
  const [guests, setGuests] = useState([]);
  const [editingGuest, setEditingGuest] = useState(null);
  const [notice, setNotice] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const users = await getAllUsers();
        setGuests(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchGuests();
  }, []);

  const handleEditGuest = async (event) => {
    event.preventDefault();
    const updatedGuest = {
      ...editingGuest,
      fullname: editingGuest.fullname.trim(),
      email: editingGuest.email.trim(),
    };

    if (!updatedGuest.fullname || !updatedGuest.email) {
      setNotice({
        type: "error",
        title: "Required fields",
        message: "Name and email cannot be empty.",
      });
      return;
    }

    setIsProcessing(true);
    try {
      await axios.put(
        `${API_BASE_URL}/api/user/${updatedGuest.id}`,
        updatedGuest,
      );
      setGuests((guests) =>
        guests.map((guest) =>
          guest.id === updatedGuest.id ? updatedGuest : guest,
        ),
      );
      setEditingGuest(null);
      setNotice({
        type: "success",
        title: "Guest updated",
        message: "Guest information has been successfully updated.",
      });
    } catch (error) {
      console.error("Failed to update guest:", error);
      setNotice({
        type: "error",
        title: "Update failed",
        message: "Guest information could not be updated. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteGuest = async () => {
    if (!notice?.guest || isProcessing) return;

    const { guest } = notice;
    setIsProcessing(true);
    try {
      await axios.delete(`${API_BASE_URL}/api/user/${guest.id}`);
      setGuests((currentGuests) =>
        currentGuests.filter((item) => item.id !== guest.id),
      );
      setNotice({
        type: "success",
        title: "Guest deleted",
        message: "The guest account has been successfully deleted.",
      });
    } catch (error) {
      console.error("Failed to delete guest:", error);
      setNotice({
        type: "error",
        title: "Delete failed",
        message: "The guest account could not be deleted. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={style.container}>
      <SidebarAdmin />

      <main style={style.main}>
        <h1 style={style.title}>Account List</h1>
        <div style={style.tableContainer}>
          <table style={style.table}>
            <thead>
              <tr>
                <th style={style.th}>No</th>
                <th style={style.th}>Name</th>
                <th style={style.th}>Email</th>
                <th style={style.th}>Created</th>
                <th style={style.th}>Role</th>
                <th style={style.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {guests.length > 0 ? (
                guests.map((guest, index) => (
                  <tr key={`${guest.id}-${index}`}>
                    <td style={style.td}>{index + 1}</td>
                    <td style={style.td}>{guest.fullname || "N/A"}</td>
                    <td style={style.td}>{guest.email || "N/A"}</td>
                    <td style={style.td}>{formatDate(guest.createtime)}</td>
                    <td style={style.td}>{guest.role || "Guest"}</td>
                    <td style={style.td}>
                      <button
                        style={{ ...style.actionBtn, ...style.editBtn }}
                        onClick={() =>
                          setEditingGuest({
                            ...guest,
                            role:
                              guest.role?.toLowerCase() === "admin"
                                ? "Admin"
                                : "Guest",
                          })
                        }
                      >
                        Edit
                      </button>
                      <button
                        style={{ ...style.actionBtn, ...style.deleteBtn }}
                        onClick={() => setNotice({ type: "confirm", guest })}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td style={style.td} colSpan="6" align="center">
                    No guest data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {editingGuest && (
          <div style={style.modalOverlay}>
            <div style={style.modal}>
              <button
                type="button"
                onClick={() => setEditingGuest(null)}
                style={style.closeBtn}
                disabled={isProcessing}
              >
                ✖
              </button>
              <div style={style.heading}>Edit Guest</div>
              <form
                onSubmit={handleEditGuest}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <label style={style.field}>
                  <span style={style.label}>Name</span>
                  <input
                    style={style.value}
                    type="text"
                    value={editingGuest.fullname || ""}
                    onChange={(event) =>
                      setEditingGuest({
                        ...editingGuest,
                        fullname: event.target.value,
                      })
                    }
                    required
                  />
                </label>
                 <label style={style.field}>
                  <span style={style.label}>Password</span>
                  <input
                    style={style.value}
                    type="text"
                    value={editingGuest.password || ""}
                    onChange={(event) =>
                      setEditingGuest({
                        ...editingGuest,
                        password: event.target.value,
                      })
                    }
                    required
                  />
                </label>
                <label style={style.field}>
                  <span style={style.label}>Email</span>
                  <input
                    style={style.value}
                    type="email"
                    value={editingGuest.email || ""}
                    onChange={(event) =>
                      setEditingGuest({
                        ...editingGuest,
                        email: event.target.value,
                      })
                    }
                    required
                  />
                </label>
                 <label style={style.field}>
                   <span style={style.label}>Role</span>
                   <select
                     style={style.value}
                     value={editingGuest.role}
                     onChange={(event) =>
                       setEditingGuest({
                         ...editingGuest,
                        role: event.target.value,
                      })
                    }
                  >
                    <option value="Admin">Admin</option>
                    <option value="Guest">Guest</option>
                  </select>
                </label>
                <div>
                  <button
                    type="submit"
                    style={{ ...style.actionBtn, ...style.editBtn }}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    style={{ ...style.actionBtn, ...style.deleteBtn }}
                    onClick={() => setEditingGuest(null)}
                    disabled={isProcessing}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {notice && (
          <div
            style={style.noticeOverlay}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget && !isProcessing) {
                setNotice(null);
              }
            }}
          >
            <div
              style={style.noticeDialog}
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="guest-notice-title"
              aria-describedby="guest-notice-description"
            >
              <div
                style={{
                  ...style.noticeIcon,
                  backgroundColor:
                    notice.type === "success"
                      ? "#eaf7ed"
                      : notice.type === "error"
                        ? "#fff1f0"
                        : "#fff1f0",
                  color:
                    notice.type === "success"
                      ? "#2e7d32"
                      : "#d32f2f",
                }}
              >
                {notice.type === "success"
                  ? "✓"
                  : notice.type === "confirm"
                    ? "!"
                    : "×"}
              </div>
              <h2 id="guest-notice-title" style={style.noticeTitle}>
                {notice.type === "confirm"
                  ? "Delete guest account?"
                  : notice.title}
              </h2>
              <p id="guest-notice-description" style={style.noticeText}>
                {notice.type === "confirm"
                  ? `This will permanently delete ${notice.guest.fullname || "this guest"}'s account. This action cannot be undone.`
                  : notice.message}
              </p>
              <div style={style.noticeActions}>
                {notice.type === "confirm" ? (
                  <>
                    <button
                      type="button"
                      style={{
                        ...style.noticeButton,
                        backgroundColor: "#f1f1f1",
                        color: "#444",
                      }}
                      onClick={() => setNotice(null)}
                      disabled={isProcessing}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      style={{
                        ...style.noticeButton,
                        backgroundColor: "#d32f2f",
                        color: "#fff",
                        opacity: isProcessing ? 0.7 : 1,
                      }}
                      onClick={handleDeleteGuest}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Deleting..." : "Delete"}
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    style={{
                      ...style.noticeButton,
                      backgroundColor: "#d0b375",
                      color: "#fff",
                    }}
                    onClick={() => setNotice(null)}
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
export default GuestList;
