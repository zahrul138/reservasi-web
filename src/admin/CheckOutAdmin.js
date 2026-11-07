import { useEffect, useState } from "react";
import axios from "axios";
import { Check } from "lucide-react";
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
  approveBtn: {
    backgroundColor: "#4caf50",
  },
  rejectBtn: {
    backgroundColor: "#f44336",
  },
  detailBtn: {
    backgroundColor: "#1976d2",
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
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "20px",
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
  closeBtn: {
    position: "absolute",
    top: "15px",
    right: "15px",
    background: "transparent",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
  },
  badge: {
    display: "inline-block",
    padding: "4px 8px",
    borderRadius: "4px",
    fontWeight: "bold",
    fontSize: "12px",
    color: "#fff",
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

const CheckOutAdmin = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [notice, setNotice] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/Booking`);
      setBookings(response.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleApprove = async () => {
    if (!notice?.booking || isProcessing) return;
    const { booking } = notice;
    setIsProcessing(true);
    try {
      const bookingToApprove = bookings.find((item) => item.id === booking.id);
      if (!bookingToApprove) {
        setNotice({
          type: "error",
          title: "Booking not found",
          message: "This booking could not be found. Please refresh the page.",
        });
        return;
      }

      await axios.patch(`${API_BASE_URL}/api/Booking/${booking.id}`, {
        status: "Completed",
        paymentStatus: "Completed",
        checkOutApprovedDate: new Date().toISOString(),
      });

      await axios.patch(`${API_BASE_URL}/api/Room/restore-quantity`, {
        roomType: bookingToApprove.roomType,
      });

      setBookings((prev) => prev.filter((item) => item.id !== booking.id));
      setSelectedBooking(null);
      setNotice({
        type: "success",
        title: "Check-out approved",
        message: "Check-out is complete and the room quantity was restored.",
      });
    } catch (error) {
      console.error("Error approving checkout:", error);
      setNotice({
        type: "error",
        title: "Check-out failed",
        message: "The check-out could not be approved. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const activeBookings = bookings.filter(
    (b) => b.status?.toLowerCase() === "active",
  );

  return (
    <div style={style.container}>
      <SidebarAdmin />
      <main style={style.main}>
        <h1 style={style.title}>Check Out Approval</h1>
        <div style={style.tableContainer}>
          <table style={style.table}>
            <thead>
              <tr>
                <th style={style.th}>No</th>
                <th style={style.th}>Name</th>
                <th style={style.th}>Room</th>
                <th style={style.th}>Check-in Date</th>
                <th style={style.th}>Check-out Date</th>
                <th style={style.th}>Status</th>
                <th style={style.th}>Action</th>
                <th style={style.th}>Detail</th>
              </tr>
            </thead>
            <tbody>
              {activeBookings.length > 0 ? (
                activeBookings.map((booking, index) => (
                  <tr key={booking.id}>
                    <td style={style.td}>{index + 1}</td>
                    <td style={style.td}>{booking.fullname}</td>
                    <td style={style.td}>{booking.roomType}</td>
                    <td style={style.td}>{formatDate(booking.checkinDate)}</td>
                    <td style={style.td}>{formatDate(booking.checkoutDate)}</td>
                    <td style={style.td}>
                      <span
                        style={{
                          ...style.badge,
                          backgroundColor: "#4caf50",
                        }}
                      >
                        Active
                      </span>
                    </td>
                    <td style={style.td}>
                      <button
                        style={{ ...style.actionBtn, ...style.approveBtn }}
                        onClick={() => setNotice({ type: "confirm", booking })}
                      >
                        <Check size={16} color="#fff" /> &nbsp; Check Out
                      </button>
                    </td>
                    <td style={style.td}>
                      <button
                        style={{ ...style.actionBtn, ...style.detailBtn }}
                        onClick={() => setSelectedBooking(booking)}
                      >
                        More
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    style={{
                      ...style.td,
                      textAlign: "center",
                      padding: "30px",
                    }}
                  >
                    No active guests currently staying
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
                  <span style={style.label}>Guest Name</span>
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
                  <span style={style.label}>Room</span>
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
                  <span style={style.label}>Check-in Approved At</span>
                  <span style={style.value}>
                    {selectedBooking.checkInApprovedDate
                      ? formatDate(selectedBooking.checkInApprovedDate)
                      : "-"}
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
              <div style={style.modalActions}>
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
                  style={{ ...style.actionBtn, ...style.approveBtn }}
                  onClick={() => setNotice({ type: "confirm", booking: selectedBooking })}
                >
                  <Check size={16} color="#fff" /> &nbsp; Complete Check Out
                </button>
              </div>
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
              aria-labelledby="checkout-notice-title"
              aria-describedby="checkout-notice-description"
            >
              <div
                style={{
                  ...style.noticeIcon,
                  backgroundColor:
                    notice.type === "success"
                      ? "#eaf7ed"
                      : notice.type === "error"
                        ? "#fff1f0"
                        : "#fff7e6",
                  color:
                    notice.type === "success"
                      ? "#2e7d32"
                      : notice.type === "error"
                        ? "#d32f2f"
                        : "#b7791f",
                }}
              >
                {notice.type === "success" ? (
                  <Check size={30} />
                ) : (
                  <span style={{ fontSize: "28px", fontWeight: 700 }}>!</span>
                )}
              </div>
              <h2 id="checkout-notice-title" style={style.noticeTitle}>
                {notice.type === "confirm"
                  ? "Approve check-out?"
                  : notice.title}
              </h2>
              <p id="checkout-notice-description" style={style.noticeText}>
                {notice.type === "confirm"
                  ? `Confirm check-out for ${notice.booking.fullname}? The booking will be marked completed and the room quantity restored.`
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
                        backgroundColor: "#4caf50",
                        color: "#fff",
                        opacity: isProcessing ? 0.7 : 1,
                      }}
                      onClick={handleApprove}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : "Confirm"}
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

export default CheckOutAdmin;
