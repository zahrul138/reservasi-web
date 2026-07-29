import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { API_BASE_URL } from "../services/apiConfig";

const GOLD = "#D09500";
const GOLD_DARK = "#87723B";

const styles = {
  bookingProcess: {
    minHeight: "100vh",
    backgroundColor: "#f8f5f0",
    padding: "3rem 1rem",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "2rem",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    fontWeight: 700,
    color: GOLD_DARK,
    marginBottom: "0.5rem",
  },
  subtitle: {
    color: "#666",
  },
  progressBar: {
    marginBottom: "2.5rem",
  },
  steps: {
    display: "flex",
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  step: {
    position: "relative",
    flex: 1,
  },
  stepContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stepCircle: {
    width: "2rem",
    height: "2rem",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "0.5rem",
    zIndex: 1,
    fontSize: "0.9rem",
  },
  stepCircleComplete: {
    backgroundColor: GOLD,
    color: "white",
  },
  stepCircleCurrent: {
    border: `2px solid ${GOLD}`,
    backgroundColor: "white",
  },
  stepCircleUpcoming: {
    border: "2px solid #e2e8f0",
    backgroundColor: "white",
  },
  stepDot: {
    width: "0.625rem",
    height: "0.625rem",
    borderRadius: "50%",
    backgroundColor: GOLD,
  },
  stepDotUpcoming: {
    backgroundColor: "transparent",
  },
  stepLine: {
    position: "absolute",
    top: "1rem",
    left: "50%",
    width: "100%",
    height: "2px",
    backgroundColor: "#e2e8f0",
    zIndex: 0,
  },
  stepLineComplete: {
    backgroundColor: GOLD,
  },
  stepName: {
    fontSize: "0.875rem",
    color: "#666",
    fontWeight: 500,
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "2rem",
    alignItems: "start",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "2rem",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  },
  cardTitle: {
    fontSize: "1.25rem",
    fontWeight: 700,
    color: GOLD_DARK,
    marginBottom: "0.25rem",
  },
  cardSubtitle: {
    color: "#666",
    fontSize: "0.9rem",
    marginBottom: "1.5rem",
  },
  formGroup: {
    marginBottom: "1.25rem",
  },
  label: {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: 600,
    marginBottom: "0.5rem",
    color: GOLD_DARK,
  },
  input: {
    width: "100%",
    padding: "0.75rem 1rem",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    fontSize: "0.95rem",
    outline: "none",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "0.75rem 1rem",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    fontSize: "0.95rem",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    resize: "vertical",
  },
  select: {
    width: "100%",
    padding: "0.75rem 1rem",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    fontSize: "0.95rem",
    outline: "none",
    backgroundColor: "white",
  },
  submitButton: {
    padding: "0.875rem 2rem",
    backgroundColor: GOLD,
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.5rem 0",
    fontSize: "0.9rem",
    color: "#374151",
  },
  divider: {
    border: "none",
    borderTop: "1px solid #e2e8f0",
    margin: "0.5rem 0",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.75rem 0",
    fontWeight: 700,
    color: GOLD_DARK,
  },
  benefitItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.85rem",
    color: "#374151",
    marginBottom: "0.5rem",
  },
  paymentOption: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "1rem",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    marginBottom: "0.75rem",
    cursor: "pointer",
  },
  paymentOptionSelected: {
    borderColor: GOLD,
    backgroundColor: "#fdf8ee",
  },
  infoItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.5rem",
    fontSize: "0.85rem",
    color: "#374151",
    marginBottom: "0.5rem",
  },
  termsRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.5rem",
    margin: "1.5rem 0",
    fontSize: "0.875rem",
  },
  backButton: {
    padding: "0.875rem 2rem",
    backgroundColor: "white",
    color: "#666",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    marginRight: "0.75rem",
  },
  successWrapper: {
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center",
  },
  successIcon: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "#e6f9ee",
    color: "#2ecc71",
    fontSize: "2.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1.5rem",
  },
  successTitle: {
    fontSize: "1.6rem",
    fontWeight: 700,
    color: GOLD_DARK,
    marginBottom: "0.5rem",
  },
  successSubtitle: {
    color: "#666",
    marginBottom: "2rem",
  },
  successDetailRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.6rem 0",
    fontSize: "0.9rem",
    color: "#374151",
    textAlign: "left",
  },
  successActions: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    marginTop: "1.5rem",
  },
  secondaryButton: {
    padding: "0.875rem 2rem",
    backgroundColor: "white",
    color: GOLD_DARK,
    border: `2px solid ${GOLD}`,
    borderRadius: "6px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    textDecoration: "none",
  },
};

const STEP_NAMES = ["Guest Info", "Confirmation", "Success"];

function BookingFlow() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingDetails = {} } = location.state || {};

  const [currentStep, setCurrentStep] = useState(1);
  const [roomData, setRoomData] = useState(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("indonesia");
  const [address, setAddress] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  useEffect(() => {
    if (!bookingDetails.roomId) {
      navigate("/home");
    }
  }, [bookingDetails, navigate]);

  useEffect(() => {
    const storedName = localStorage.getItem("fullname");
    const storedEmail = localStorage.getItem("email");
    if (storedName) setFullName(storedName);
    if (storedEmail) setEmail(storedEmail);
  }, []);

  useEffect(() => {
    const fetchRoom = async () => {
      if (!bookingDetails.roomId) return;
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/room/${bookingDetails.roomId}`,
        );
        const data = await res.json();
        setRoomData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRoom();
  }, [bookingDetails.roomId]);

  const calculateNights = () => {
    const checkIn = new Date(bookingDetails.checkinDate);
    const checkOut = new Date(bookingDetails.checkoutDate);
    if (isNaN(checkIn) || isNaN(checkOut)) return 0;
    return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const pricePerNight = roomData?.price || 0;
  const calculatedTotalPrice = pricePerNight * nights;

  const handleContinueToPayment = (e) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !address) {
      alert("Please fill in all required fields");
      return;
    }
    setCurrentStep(2);
  };

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");
  const [bookingResult, setBookingResult] = useState(null);
  const [paymentMethodUsed, setPaymentMethodUsed] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", "SB-Mid-client-ZrpuCE7yEUyWxexK");
    document.head.appendChild(script);
    return () => {
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);

  const saveBooking = async (paymentMethod, paymentStatus) => {
    const bookingPayload = {
      bookingId: `BK-${Date.now()}`,
      userId: bookingDetails.userId,
      fullName,
      fullname: fullName,
      email,
      phone,
      phoneNumber: phone,
      country,
      region: country,
      address,
      checkinDate: bookingDetails.checkinDate,
      checkoutDate: bookingDetails.checkoutDate,
      roomType: bookingDetails.roomType,
      adultGuests: bookingDetails.adultGuests,
      childGuests: bookingDetails.childGuests,
      specialRequests,
      specialRequest: specialRequests,
      paymentMethod,
      paymentStatus,
      pricePerNight,
      nights,
      totalPrice: calculatedTotalPrice,
      totalAmount: calculatedTotalPrice,
    };

    const res = await fetch(`${API_BASE_URL}/api/Booking`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingPayload),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to save booking");

    return {
      ...bookingPayload,
      bookingId: result.id || bookingPayload.bookingId,
    };
  };

  const handleCashPayment = async () => {
    if (!termsAccepted) {
      alert("Please accept the terms and conditions");
      return;
    }

    setIsProcessingPayment(true);
    try {
      const saved = await saveBooking("Cash", "Pending");
      setBookingResult(saved);
      setPaymentMethodUsed("cash");
      setCurrentStep(3);
    } catch (error) {
      console.error(error);
      alert("Failed to save your booking. Please try again.");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleMidtransPayment = async () => {
    if (!termsAccepted) {
      alert("Please accept the terms and conditions");
      return;
    }

    setIsProcessingPayment(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/Payment/create-transaction`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: `ORDER-${Date.now()}`,
            amount: calculatedTotalPrice,
            customerName: fullName,
            customerEmail: email,
            customerPhone: phone,
          }),
        },
      );

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Failed to create transaction");

      window.snap.pay(data.token, {
        onSuccess: async (result) => {
          try {
            const saved = await saveBooking(
              `Midtrans (${result.payment_type})`,
              "Completed",
            );
            setBookingResult(saved);
            setPaymentMethodUsed("midtrans");
            setCurrentStep(3);
          } catch (error) {
            console.error(error);
            alert(
              "Payment succeeded but failed to save booking. Please contact customer service.",
            );
          } finally {
            setIsProcessingPayment(false);
          }
        },
        onPending: () => {
          setIsProcessingPayment(false);
          alert("Waiting for your payment to be completed.");
        },
        onError: () => {
          setIsProcessingPayment(false);
          alert("Payment failed. Please try again.");
        },
        onClose: () => {
          setIsProcessingPayment(false);
        },
      });
    } catch (error) {
      console.error(error);
      alert("An error occurred while processing your payment.");
      setIsProcessingPayment(false);
    }
  };

  const steps = STEP_NAMES.map((name, index) => {
    const stepId = index + 1;
    return {
      id: stepId,
      name,
      status:
        stepId < currentStep
          ? "complete"
          : stepId === currentStep
            ? "current"
            : "upcoming",
    };
  });

  return (
    <div style={styles.bookingProcess}>
      <Helmet>
        <title>Complete Your Booking</title>
      </Helmet>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Complete Your Booking</h1>
          <p style={styles.subtitle}>
            Just a few steps away from your perfect stay
          </p>
        </div>

        <div style={styles.progressBar}>
          <ol style={styles.steps}>
            {steps.map((step, idx) => (
              <li key={step.id} style={styles.step}>
                <div style={styles.stepContent}>
                  <div
                    style={{
                      ...styles.stepCircle,
                      ...(step.status === "complete"
                        ? styles.stepCircleComplete
                        : step.status === "current"
                          ? styles.stepCircleCurrent
                          : styles.stepCircleUpcoming),
                    }}
                  >
                    {step.status === "complete" ? (
                      "✓"
                    ) : (
                      <span
                        style={{
                          ...styles.stepDot,
                          ...(step.status === "upcoming"
                            ? styles.stepDotUpcoming
                            : {}),
                        }}
                      />
                    )}
                  </div>
                  {idx !== steps.length - 1 && (
                    <span
                      style={{
                        ...styles.stepLine,
                        ...(step.status === "complete"
                          ? styles.stepLineComplete
                          : {}),
                      }}
                    />
                  )}
                  <span style={styles.stepName}>{step.name}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {currentStep === 1 && (
          <div style={styles.contentGrid}>
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Guest Information</h2>
              <p style={styles.cardSubtitle}>
                Please provide your personal details
              </p>

              <form onSubmit={handleContinueToPayment}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    required
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Country/Region</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    style={styles.select}
                  >
                    <option value="indonesia">Indonesia</option>
                    <option value="singapore">Singapore</option>
                    <option value="malaysia">Malaysia</option>
                    <option value="thailand">Thailand</option>
                    <option value="philippines">Philippines</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Address</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your address"
                    rows="3"
                    required
                    style={styles.textarea}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Special Requests (Optional)
                  </label>
                  <textarea
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Any special requests or preferences?"
                    rows="3"
                    style={styles.textarea}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button type="submit" style={styles.submitButton}>
                    Continue to Payment
                  </button>
                </div>
              </form>
            </div>

            <div>
              <div style={styles.card}>
                <h2 style={styles.cardTitle}>Booking Summary</h2>
                <div style={styles.summaryRow}>
                  <span>Room Type:</span>
                  <span>{bookingDetails.roomType || "-"}</span>
                </div>
                <hr style={styles.divider} />
                <div style={styles.summaryRow}>
                  <span>Check-in:</span>
                  <span>
                    {bookingDetails.checkinDate
                      ? new Date(bookingDetails.checkinDate).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )
                      : "-"}
                  </span>
                </div>
                <div style={styles.summaryRow}>
                  <span>Check-out:</span>
                  <span>
                    {bookingDetails.checkoutDate
                      ? new Date(
                          bookingDetails.checkoutDate,
                        ).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "-"}
                  </span>
                </div>
                <div style={styles.summaryRow}>
                  <span>Guests:</span>
                  <span>
                    {bookingDetails.adultGuests || 0} Adults,{" "}
                    {bookingDetails.childGuests || 0} Children
                  </span>
                </div>
                <hr style={styles.divider} />
                <div style={styles.summaryRow}>
                  <span>
                    Rp {pricePerNight.toLocaleString("id-ID")} x {nights} night
                    {nights !== 1 ? "s" : ""}
                  </span>
                  <span>Rp {calculatedTotalPrice.toLocaleString("id-ID")}</span>
                </div>
                <hr style={styles.divider} />
                <div style={styles.totalRow}>
                  <span>Total</span>
                  <span>Rp {calculatedTotalPrice.toLocaleString("id-ID")}</span>
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <div style={styles.benefitItem}>
                    <span>✓</span>
                    <span>Free cancellation before 48 hours of check-in</span>
                  </div>
                  <div style={styles.benefitItem}>
                    <span>✓</span>
                    <span>No payment needed today</span>
                  </div>
                  <div style={styles.benefitItem}>
                    <span>✓</span>
                    <span>Secure payment process</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div style={styles.contentGrid}>
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Payment Method</h2>
              <p style={styles.cardSubtitle}>Choose how you want to pay</p>

              <div
                style={{
                  ...styles.paymentOption,
                  ...(selectedPaymentMethod === "cash"
                    ? styles.paymentOptionSelected
                    : {}),
                }}
                onClick={() => setSelectedPaymentMethod("cash")}
              >
                <input
                  type="radio"
                  checked={selectedPaymentMethod === "cash"}
                  onChange={() => setSelectedPaymentMethod("cash")}
                />
                <div>
                  <div style={{ fontWeight: 600 }}>Pay at Hotel</div>
                  <div style={{ fontSize: "0.85rem", color: "#666" }}>
                    Pay in cash upon arrival
                  </div>
                </div>
              </div>

              <div
                style={{
                  ...styles.paymentOption,
                  ...(selectedPaymentMethod === "midtrans"
                    ? styles.paymentOptionSelected
                    : {}),
                }}
                onClick={() => setSelectedPaymentMethod("midtrans")}
              >
                <input
                  type="radio"
                  checked={selectedPaymentMethod === "midtrans"}
                  onChange={() => setSelectedPaymentMethod("midtrans")}
                />
                <div>
                  <div style={{ fontWeight: 600 }}>Pay Online</div>
                  <div style={{ fontSize: "0.85rem", color: "#666" }}>
                    Bank transfer, QRIS, GoPay, ShopeePay
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "1.5rem" }}>
                <h3
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    marginBottom: "0.75rem",
                  }}
                >
                  Important Information
                </h3>
                <div style={styles.infoItem}>
                  <span>✓</span>
                  <span>
                    Check-in time starts at 3:00 PM. If you plan to arrive after
                    6:00 PM, please notify the hotel.
                  </span>
                </div>
                <div style={styles.infoItem}>
                  <span>✓</span>
                  <span>
                    Check-out time is 12:00 PM. Late check-out may result in an
                    additional charge.
                  </span>
                </div>
                <div style={styles.infoItem}>
                  <span>✓</span>
                  <span>
                    Please present a valid ID and the credit card used for
                    booking upon check-in.
                  </span>
                </div>
                <div style={styles.infoItem}>
                  <span>✓</span>
                  <span>
                    Free cancellation is available up to 48 hours before
                    check-in.
                  </span>
                </div>
              </div>

              <div style={styles.termsRow}>
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <label>
                  I agree to the terms and conditions and privacy policy
                </label>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  style={styles.backButton}
                  onClick={() => setCurrentStep(1)}
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={!termsAccepted || isProcessingPayment}
                  style={{
                    ...styles.submitButton,
                    opacity: !termsAccepted || isProcessingPayment ? 0.6 : 1,
                    cursor:
                      !termsAccepted || isProcessingPayment
                        ? "not-allowed"
                        : "pointer",
                  }}
                  onClick={
                    selectedPaymentMethod === "cash"
                      ? handleCashPayment
                      : handleMidtransPayment
                  }
                >
                  {isProcessingPayment ? "Processing..." : "Confirm Booking"}
                </button>
              </div>
            </div>

            <div>
              <div style={styles.card}>
                <h2 style={styles.cardTitle}>Booking Summary</h2>
                <div style={styles.summaryRow}>
                  <span>Room Type:</span>
                  <span>{bookingDetails.roomType || "-"}</span>
                </div>
                <hr style={styles.divider} />
                <div style={styles.totalRow}>
                  <span>Total</span>
                  <span>Rp {calculatedTotalPrice.toLocaleString("id-ID")}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {currentStep === 3 && bookingResult && (
          <div style={styles.card}>
            <div style={styles.successWrapper}>
              <div style={styles.successIcon}>✓</div>
              <h2 style={styles.successTitle}>Booking Confirmed!</h2>
              <p style={styles.successSubtitle}>
                Thank you, {bookingResult.fullName}. Your reservation has been
                received.
              </p>

              <div style={{ textAlign: "left" }}>
                <div style={styles.successDetailRow}>
                  <span>Booking ID:</span>
                  <span>{bookingResult.bookingId}</span>
                </div>
                <hr style={styles.divider} />
                <div style={styles.successDetailRow}>
                  <span>Room Type:</span>
                  <span>{bookingResult.roomType}</span>
                </div>
                <div style={styles.successDetailRow}>
                  <span>Check-in:</span>
                  <span>
                    {new Date(bookingResult.checkinDate).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </span>
                </div>
                <div style={styles.successDetailRow}>
                  <span>Check-out:</span>
                  <span>
                    {new Date(bookingResult.checkoutDate).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </span>
                </div>
                <div style={styles.successDetailRow}>
                  <span>Payment Method:</span>
                  <span>{bookingResult.paymentMethod}</span>
                </div>
                <hr style={styles.divider} />
                <div style={styles.totalRow}>
                  <span>Total Paid</span>
                  <span>
                    Rp {bookingResult.totalAmount.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <div style={styles.successActions}>
                <button
                  type="button"
                  style={styles.secondaryButton}
                  onClick={() => navigate("/home")}
                >
                  Back to Home
                </button>
                <button
                  type="button"
                  style={styles.submitButton}
                  onClick={() =>
                    navigate("/invoice", {
                      state: { bookingId: bookingResult.bookingId },
                    })
                  }
                >
                  View Invoice
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingFlow;
