import React, { useState, useEffect } from "react";
import { Check, X } from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "../services/apiConfig";
import SidebarAdmin from "../components/SidebarAdmin";

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
};

const CheckInAdmin = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/Booking`);

        const filteredBookings = res.data.filter((b) => {
          const status = b.status?.toLowerCase();
          return status === "pending" || status === "confirmed";
        });
        setBookings(filteredBookings);
      } catch (err) {
        console.error("Gagal memuat booking:", err);
      }
    };

    fetchBookings();
  }, []);

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

  const handleApprove = async (id) => {
    try {
      await axios.patch(`${API_BASE_URL}/api/Booking/${id}`, {
        status: "active",
        checkInApprovedDate: new Date().toISOString(),
      });

      setBookings((prev) => prev.filter((b) => b.id !== id));
      setSelectedBooking(null);
      setNotice({
        type: "success",
        title: "Booking approved",
        message: "The booking has been approved and is now active.",
      });
    } catch (err) {
      console.error(err);
      setNotice({
        type: "error",
        title: "Approval failed",
        message: "The booking could not be approved. Please try again.",
      });
    }
  };

  const handleReject = async (id) => {
    try {
      const bookingToReject = bookings.find((b) => b.id === id);

      if (!bookingToReject) {
        setNotice({
          type: "error",
          title: "Booking not found",
          message: "This booking could not be found. Please refresh the page.",
        });
        return;
      }

      await axios.patch(`${API_BASE_URL}/api/Booking/${id}`, {
        status: "Cancelled",
        paymentStatus: "Cancelled",
      });

      await axios.patch(`${API_BASE_URL}/api/Room/restore-quantity`, {
        roomType: bookingToReject.roomType,
      });

      setBookings((prev) => prev.filter((b) => b.id !== id));
      setSelectedBooking(null);
      setNotice({
        type: "success",
        title: "Booking cancelled",
        message: "The booking was rejected and room quantity was restored.",
      });
    } catch (err) {
      console.error(err);
      setNotice({
        type: "error",
        title: "Cancellation failed",
        message: "The booking could not be cancelled. Please try again.",
      });
    }
  };

  const handleConfirmAction = () => {
    if (!confirmation) return;

    const { action, booking } = confirmation;
    setConfirmation(null);

    if (action === "approve") {
      handleApprove(booking.id);
    } else {
      handleReject(booking.id);
    }
  };

  return (
    <div style={style.container}>
      <SidebarAdmin />
      <main style={style.main}>
        <h1 style={style.title}>Check In Approval</h1>
        <div style={style.tableContainer}>
          <table style={style.table}>
            <thead>
              <tr>
                <th style={style.th}>No</th>
                <th style={style.th}>Name</th>
                <th style={style.th}>Booking Date</th>
                <th style={style.th}>Room Type</th>
                <th style={style.th}>Check-in Date</th>
                <th style={style.th}>Guest</th>
                <th style={style.th}>Detail</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking, index) => (
                  <tr key={booking.id}>
                    <td style={style.td}>{index + 1}</td>
                    <td style={style.td}>{booking.fullname}</td>
                    <td style={style.td}>{formatDate(booking.createdAt)}</td>
                    <td style={style.td}>{booking.roomType}</td>
                    <td style={style.td}>{formatDate(booking.checkinDate)}</td>
                    <td style={style.td}>
                      {booking.adultGuests} Adults, {booking.childGuests}{" "}
                      Children
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
                    colSpan={7}
                    style={{ padding: "30px", textAlign: "center" }}
                  >
                    No guests currently checked in
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
                  <span style={style.label}>Booking Date</span>
                  <span style={style.value}>
                    {formatDate(selectedBooking.createdAt)}
                  </span>
                </div>
                <div style={style.field}>
                  <span style={style.label}>Guest</span>
                  <span style={style.value}>
                    {selectedBooking.adultGuests} Adults,{" "}
                    {selectedBooking.childGuests} Children
                  </span>
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
                  <span style={style.label}>Room Type</span>
                  <span style={style.value}>{selectedBooking.roomType}</span>
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
                <div style={style.field}>
                  <span style={style.label}>Payment Method</span>
                  <span style={style.value}>
                    {selectedBooking.paymentMethod}
                  </span>
                </div>
                <div style={style.field}>
                  <span style={style.label}>Payment Status</span>
                  <span style={style.value}>
                    {selectedBooking.paymentStatus}
                  </span>
                </div>
                <div style={style.field}>
                  <span style={style.label}>Address</span>
                  <span style={style.value}>{selectedBooking.address}</span>
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
                  style={{ ...style.actionBtn, ...style.approveBtn }}
                  onClick={() =>
                    setConfirmation({
                      action: "approve",
                      booking: selectedBooking,
                    })
                  }
                >
                  <Check size={16} color="#fff" /> &nbsp; Completed
                </button>
                <button
                  style={{ ...style.actionBtn, ...style.rejectBtn }}
                  onClick={() =>
                    setConfirmation({
                      action: "cancel",
                      booking: selectedBooking,
                    })
                  }
                >
                  <X size={16} color="#fff" /> &nbsp; Cancelled
                </button>
              </div>
            </div>
          </div>
        )}

        {confirmation && (
          <div style={style.noticeOverlay}>
            <div
              style={style.noticeDialog}
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="checkin-confirmation-title"
              aria-describedby="checkin-confirmation-description"
            >
              <div
                style={{
                  ...style.noticeIcon,
                  backgroundColor:
                    confirmation.action === "approve" ? "#eaf7ed" : "#fff1f0",
                  color:
                    confirmation.action === "approve" ? "#2e7d32" : "#d32f2f",
                }}
              >
                {confirmation.action === "approve" ? (
                  <Check size={30} />
                ) : (
                  <X size={30} />
                )}
              </div>
              <h2 id="checkin-confirmation-title" style={style.noticeTitle}>
                {confirmation.action === "approve"
                  ? "Confirm booking?"
                  : "Cancel booking?"}
              </h2>
              <p
                id="checkin-confirmation-description"
                style={style.noticeText}
              >
                {confirmation.action === "approve"
                  ? `Approve the booking for ${confirmation.booking.fullname}?`
                  : `Cancel the booking for ${confirmation.booking.fullname}? This action cannot be undone.`}
              </p>
              <div style={style.noticeActions}>
                <button
                  type="button"
                  style={{
                    ...style.noticeButton,
                    backgroundColor: "#eee",
                    color: "#444",
                  }}
                  onClick={() => setConfirmation(null)}
                >
                  Back
                </button>
                <button
                  type="button"
                  style={{
                    ...style.noticeButton,
                    backgroundColor:
                      confirmation.action === "approve" ? "#4caf50" : "#f44336",
                    color: "#fff",
                  }}
                  onClick={handleConfirmAction}
                >
                  {confirmation.action === "approve"
                    ? "Confirm"
                    : "Yes, cancel"}
                </button>
              </div>
            </div>
          </div>
        )}

        {notice && (
          <div
            style={style.noticeOverlay}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setNotice(null);
            }}
          >
            <div
              style={style.noticeDialog}
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="checkin-notice-title"
              aria-describedby="checkin-notice-description"
            >
              <div
                style={{
                  ...style.noticeIcon,
                  backgroundColor:
                    notice.type === "success" ? "#eaf7ed" : "#fff1f0",
                  color: notice.type === "success" ? "#2e7d32" : "#d32f2f",
                }}
              >
                {notice.type === "success" ? (
                  <Check size={30} />
                ) : (
                  <X size={30} />
                )}
              </div>
              <h2 id="checkin-notice-title" style={style.noticeTitle}>
                {notice.title}
              </h2>
              <p
                id="checkin-notice-description"
                style={style.noticeText}
              >
                {notice.message}
              </p>
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
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CheckInAdmin;
