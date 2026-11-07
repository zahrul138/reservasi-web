import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import SidebarAdmin from "../components/SidebarAdmin";
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
    overflowX: "auto",
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
    whiteSpace: "nowrap",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #eee",
    color: "#444",
  },
  detailButton: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#1976d2",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#d32f2f",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "8px",
  },
  message: {
    padding: "30px",
    textAlign: "center",
    color: "#666",
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
    position: "relative",
    background: "#fff",
    padding: "40px",
    borderRadius: "16px",
    width: "700px",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  heading: {
    fontSize: "26px",
    fontWeight: 600,
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
    minWidth: 0,
  },
  closeBtn: {
    position: "absolute",
    top: "15px",
    right: "15px",
    border: "none",
    background: "transparent",
    fontSize: "20px",
    cursor: "pointer",
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
    overflowWrap: "anywhere",
    whiteSpace: "pre-wrap",
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
};

const formatDate = (dateValue) => {
  if (!dateValue) return "-";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "Invalid Date";
  return date.toLocaleString("id-ID");
};

const FeedbackAdmin = () => {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [deleteNotice, setDeleteNotice] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/feedback`);
        if (!response.ok) {
          throw new Error(`Failed to load feedback (HTTP ${response.status})`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("The feedback API returned an unexpected response.");
        }

        setFeedbackItems(data);
      } catch (fetchError) {
        console.error("Error fetching feedback:", fetchError);
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const handleDeleteFeedback = async () => {
    if (isDeleting || !deleteNotice?.feedback) return;

    const feedback = deleteNotice.feedback;
    if (feedback.id === undefined || feedback.id === null) {
      setDeleteNotice({
        type: "error",
        message: "This feedback cannot be deleted because it has no ID.",
      });
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/feedback/${encodeURIComponent(feedback.id)}`,
        { method: "DELETE" },
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          errorMessage || `Failed to delete feedback (HTTP ${response.status})`,
        );
      }

      setFeedbackItems((items) =>
        items.filter((item) => String(item.id) !== String(feedback.id)),
      );
      setSelectedFeedback(null);
      setDeleteNotice({
        type: "success",
        message: "The feedback message has been deleted.",
      });
    } catch (deleteError) {
      console.error("Error deleting feedback:", deleteError);
      setDeleteNotice({
        type: "error",
        message: deleteError.message || "Failed to delete feedback.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div style={style.container}>
      <SidebarAdmin />
      <main style={style.main}>
        <h1 style={style.title}>Feedback</h1>
        <div style={style.tableContainer}>
          <table style={style.table}>
            <thead>
              <tr>
                <th style={style.th}>No</th>
                <th style={style.th}>Email</th>
                <th style={style.th}>Name</th>
                <th style={style.th}>Inquiry Type</th>
                <th style={style.th}>Submitted</th>
                <th style={style.th}>Details</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td style={style.message} colSpan={7}>
                    Loading feedback...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td style={style.message} colSpan={7}>
                    {error}
                  </td>
                </tr>
              ) : feedbackItems.length === 0 ? (
                <tr>
                  <td style={style.message} colSpan={7}>
                    No feedback messages found.
                  </td>
                </tr>
              ) : (
                feedbackItems.map((feedback, index) => (
                  <tr key={feedback.id || `${feedback.email}-${index}`}>
                    <td style={style.td}>{index + 1}</td>
                    <td style={style.td}>{feedback.email || "-"}</td>
                    <td style={style.td}>{feedback.name || "-"}</td>
                    <td style={style.td}>{feedback.inquiryType || "-"}</td>
                    <td style={style.td}>
                      {formatDate(feedback.createdAt || feedback.submittedAt)}
                    </td>
                    <td style={style.td}>
                      <button
                        type="button"
                        style={style.detailButton}
                        onClick={() => setSelectedFeedback(feedback)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {selectedFeedback && (
          <div
            style={style.modalOverlay}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setSelectedFeedback(null);
              }
            }}
          >
            <section
              style={style.modal}
              role="dialog"
              aria-modal="true"
              aria-labelledby="feedback-detail-title"
            >
              <button
                type="button"
                style={style.closeBtn}
                aria-label="Close feedback details"
                onClick={() => setSelectedFeedback(null)}
              >
                ×
              </button>
              <h2 id="feedback-detail-title" style={style.heading}>
                Feedback Details
              </h2>
              <div style={style.grid}>
                <div style={style.field}>
                  <span style={style.label}>Name</span>
                  <span style={style.value}>{selectedFeedback.name || "-"}</span>
                </div>
                <div style={style.field}>
                  <span style={style.label}>Phone</span>
                  <span style={style.value}>{selectedFeedback.phone || "-"}</span>
                </div>
                <div style={style.field}>
                  <span style={style.label}>Email</span>
                  <span style={style.value}>{selectedFeedback.email || "-"}</span>
                </div>
                <div style={style.field}>
                  <span style={style.label}>Inquiry Type</span>
                  <span style={style.value}>
                    {selectedFeedback.inquiryType || "-"}
                  </span>
                </div>
                <div style={style.field}>
                  <span style={style.label}>Subject</span>
                  <span style={style.value}>
                    {selectedFeedback.subject || "-"}
                  </span>
                </div>
                <div style={style.field}>
                  <span style={style.label}>Submitted</span>
                  <span style={style.value}>
                    {formatDate(
                      selectedFeedback.createdAt || selectedFeedback.submittedAt,
                    )}
                  </span>
                </div>
                <div style={{ ...style.field, gridColumn: "span 2" }}>
                  <span style={style.label}>Message</span>
                  <span style={style.value}>
                    {selectedFeedback.message || "-"}
                  </span>
                </div>
              </div>
              <div style={style.modalActions}>
                <button
                  type="button"
                  style={style.deleteButton}
                  onClick={() =>
                    setDeleteNotice({
                      type: "confirm",
                      feedback: selectedFeedback,
                    })
                  }
                >
                  Delete
                </button>
              </div>
            </section>
          </div>
        )}

        {deleteNotice && (
          <div
            style={style.noticeOverlay}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget && !isDeleting) {
                setDeleteNotice(null);
              }
            }}
          >
            <section
              style={style.noticeDialog}
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="feedback-delete-title"
              aria-describedby="feedback-delete-description"
            >
              <div
                style={{
                  ...style.noticeIcon,
                  backgroundColor:
                    deleteNotice.type === "success" ? "#eaf7ed" : "#fff1f0",
                  color:
                    deleteNotice.type === "success" ? "#2e7d32" : "#d32f2f",
                }}
              >
                {deleteNotice.type === "success" ? (
                  <span style={{ fontSize: "30px" }}>✓</span>
                ) : (
                  <FiTrash2 size={28} />
                )}
              </div>
              <h2 id="feedback-delete-title" style={style.noticeTitle}>
                {deleteNotice.type === "confirm"
                  ? "Delete feedback?"
                  : deleteNotice.type === "success"
                    ? "Feedback deleted"
                    : "Could not delete feedback"}
              </h2>
              <p id="feedback-delete-description" style={style.noticeText}>
                {deleteNotice.type === "confirm"
                  ? `Permanently delete the feedback from ${deleteNotice.feedback.name || deleteNotice.feedback.email || "this user"}? This action cannot be undone.`
                  : deleteNotice.message}
              </p>
              <div style={style.noticeActions}>
                {deleteNotice.type === "confirm" ? (
                  <>
                    <button
                      type="button"
                      style={{
                        ...style.noticeButton,
                        backgroundColor: "#f1f1f1",
                        color: "#444",
                      }}
                      onClick={() => setDeleteNotice(null)}
                      disabled={isDeleting}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      style={{
                        ...style.noticeButton,
                        backgroundColor: "#d32f2f",
                        color: "#fff",
                        opacity: isDeleting ? 0.7 : 1,
                      }}
                      onClick={handleDeleteFeedback}
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
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
                    onClick={() => setDeleteNotice(null)}
                  >
                    Close
                  </button>
                )}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default FeedbackAdmin;