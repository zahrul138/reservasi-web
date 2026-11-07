import { useState, useEffect } from "react";
import axios from "axios";
import SidebarAdmin from "../components/SidebarAdmin";
import { API_BASE_URL } from "../services/apiConfig";
import { FiTrash2 } from "react-icons/fi";

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
  detailBtn: {
    backgroundColor: "#1976d2",
  },
  deleteBtn: {
    backgroundColor: "#d32f2f",
  },
  deleteOverlay: {
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
  deleteDialog: {
    width: "100%",
    maxWidth: "420px",
    padding: "32px",
    backgroundColor: "#fff",
    borderRadius: "18px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
    textAlign: "center",
  },
  deleteIcon: {
    width: "64px",
    height: "64px",
    margin: "0 auto 18px",
    borderRadius: "50%",
    backgroundColor: "#fff1f0",
    color: "#d32f2f",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteDialogTitle: {
    margin: "0 0 10px",
    color: "#252525",
    fontSize: "22px",
  },
  deleteDialogText: {
    margin: "0 0 24px",
    color: "#666",
    lineHeight: 1.6,
  },
  deleteDialogActions: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
  },
  deleteDialogButton: {
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

const HistoryAdmin = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [sortOrder, setSortOrder] = useState("newest");
  const [deleteDialog, setDeleteDialog] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/booking`);
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to retrieve bookings:", err);
      }
    };

    fetchBookings();
  }, []);

  const completedBookings = bookings
    .filter(
      (booking) =>
        booking.status?.toLowerCase() === "completed" ||
        booking.status?.toLowerCase() === "cancelled",
    )
    .sort((a, b) => {
      const dateA = new Date(a.createdAt || a.checkinDate).getTime();
      const dateB = new Date(b.createdAt || b.checkinDate).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  const handleDeleteHistory = async () => {
    if (!deleteDialog?.booking || isDeleting) return;

    const { booking } = deleteDialog;
    setIsDeleting(true);
    try {
      await axios.delete(`${API_BASE_URL}/api/booking/${booking.id}`);
      setBookings((currentBookings) =>
        currentBookings.filter((item) => item.id !== booking.id),
      );
      setDeleteDialog({ type: "success", booking });
    } catch (error) {
      console.error("Failed to delete booking history:", error);
      setDeleteDialog({ type: "error", booking });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div style={style.container}>
      <SidebarAdmin />
      <main style={style.main}>
        <h1 style={style.title}>History Booking</h1>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "16px",
          }}
        >
          Sort by:
          <select
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
            style={{ padding: "8px", borderRadius: "6px" }}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </label>
        <div style={style.tableContainer}>
          <table style={style.table}>
            <thead>
              <tr>
                <th style={style.th}>No</th>
                <th style={style.th}>Name</th>
                <th style={style.th}>Room</th>
                <th style={style.th}>Check-in</th>
                <th style={style.th}>Check-out</th>
                <th style={style.th}>Status</th>
                <th style={style.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {completedBookings.length > 0 ? (
                completedBookings.map((booking, index) => (
                  <tr key={booking.id}>
                    <td style={style.td}>{index + 1}</td>
                    <td style={style.td}>{booking.fullname}</td>
                    <td style={style.td}>{booking.roomType}</td>
                    <td style={style.td}>{formatDate(booking.checkinDate)}</td>
                    <td style={style.td}>{formatDate(booking.checkoutDate)}</td>
                    <td style={style.td}>{booking.status}</td>
                    <td style={style.td}>
                      <button
                        style={{ ...style.actionBtn, ...style.detailBtn }}
                        onClick={() => setSelectedBooking(booking)}
                      >
                        Details
                      </button>
                      <button
                        style={{ ...style.actionBtn, ...style.deleteBtn }}
                        onClick={() =>
                          setDeleteDialog({ type: "confirm", booking })
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    style={{
                      ...style.td,
                      textAlign: "center",
                      padding: "30px",
                    }}
                  >
                    No completed or cancelled bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selectedBooking && (
          <div style={style.modalOverlay}>
            <div style={style.modal}>
              <button
                onClick={() => setSelectedBooking(null)}
                style={style.closeBtn}
              >
                ✖
              </button>
              <div style={style.heading}>Booking Details</div>
              <div style={style.grid}>
                <div style={style.field}>
                  <span style={style.label}>Full Name</span>
                  <span style={style.value}>{selectedBooking.fullname}</span>
                </div>
                <div style={style.field}>
                  <span style={style.label}>Phone</span>
                  <span style={style.value}>{selectedBooking.phoneNumber}</span>
                </div>
                <div style={style.field}>
                  <span style={style.label}>Email</span>
                  <span style={style.value}>{selectedBooking.email}</span>
                </div>
                <div style={style.field}>
                  <span style={style.label}>Room Type</span>
                  <span style={style.value}>{selectedBooking.roomType}</span>
                </div>
                <div style={style.field}>
                  <span style={style.label}>Check-in Date</span>
                  <span style={style.value}>
                    {formatDate(selectedBooking.checkinDate)}
                  </span>
                </div>
                <div style={style.field}>
                  <span style={style.label}>Check-out Date</span>
                  <span style={style.value}>
                    {formatDate(selectedBooking.checkoutDate)}
                  </span>
                </div>
                <div style={style.field}>
                  <span style={style.label}>Guest</span>
                  <span style={style.value}>
                    {selectedBooking.adultGuests} Adult,{" "}
                    {selectedBooking.childGuests} Child
                  </span>
                </div>
                <div style={style.field}>
                  <span style={style.label}>Total Payment</span>
                  <span style={style.value}>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(selectedBooking.totalPrice)}
                  </span>
                </div>
                <div style={{ ...style.field, gridColumn: "span 2" }}>
                  <span style={style.label}>Special Request</span>
                  <span style={style.value}>
                    {selectedBooking.specialRequest || "-"}
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "8px",
                }}
              >
                <button
                  type="button"
                  style={{ ...style.actionBtn, ...style.detailBtn }}
                  onClick={() =>
                    window.open(
                      `${window.location.origin}/invoice?bookingId=${encodeURIComponent(selectedBooking.id)}`,
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                >
                  See Invoice
                </button>
                <button
                  type="button"
                  style={{ ...style.actionBtn, ...style.deleteBtn }}
                  onClick={() => {
                    setDeleteDialog({
                      type: "confirm",
                      booking: selectedBooking,
                    });
                    setSelectedBooking(null);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {deleteDialog && (
          <div
            style={style.deleteOverlay}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget && !isDeleting) {
                setDeleteDialog(null);
              }
            }}
          >
            <div
              style={style.deleteDialog}
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="delete-dialog-title"
              aria-describedby="delete-dialog-description"
            >
              <div style={style.deleteIcon}>
                <FiTrash2 size={28} />
              </div>
              <h2 id="delete-dialog-title" style={style.deleteDialogTitle}>
                {deleteDialog.type === "confirm"
                  ? "Delete booking history?"
                  : deleteDialog.type === "success"
                    ? "Booking history deleted"
                    : "Could not delete booking"}
              </h2>
              <p id="delete-dialog-description" style={style.deleteDialogText}>
                {deleteDialog.type === "confirm"
                  ? `This will permanently delete the booking history for ${deleteDialog.booking.fullname}. This action cannot be undone.`
                  : deleteDialog.type === "success"
                    ? "The booking history has been successfully deleted."
                    : "The booking history could not be deleted. Please try again."}
              </p>
              <div style={style.deleteDialogActions}>
                {deleteDialog.type === "confirm" ? (
                  <>
                    <button
                      type="button"
                      style={{
                        ...style.deleteDialogButton,
                        backgroundColor: "#f1f1f1",
                        color: "#444",
                      }}
                      onClick={() => setDeleteDialog(null)}
                      disabled={isDeleting}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      style={{
                        ...style.deleteDialogButton,
                        backgroundColor: "#d32f2f",
                        color: "#fff",
                        opacity: isDeleting ? 0.7 : 1,
                      }}
                      onClick={handleDeleteHistory}
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    style={{
                      ...style.deleteDialogButton,
                      backgroundColor: "#d0b375",
                      color: "#fff",
                    }}
                    onClick={() => setDeleteDialog(null)}
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

export default HistoryAdmin;
