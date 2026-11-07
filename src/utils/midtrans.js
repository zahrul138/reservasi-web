import { API_BASE_URL } from "../services/apiConfig";
const CLIENT_KEY = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;
const SNAP_URL = process.env.REACT_APP_MIDTRANS_SNAP_URL;

export function loadSnap() {
  return new Promise((resolve, reject) => {
    if (window.snap) return resolve(window.snap);

    const script = document.createElement("script");
    script.src = SNAP_URL;
    script.setAttribute("data-client-key", CLIENT_KEY);
    script.onload = () => resolve(window.snap);
    script.onerror = () => reject(new Error("Gagal memuat Midtrans Snap."));
    document.body.appendChild(script);
  });
}

export async function createTransaction(bookingId) {
  const res = await fetch(`${API_BASE_URL}/api/Payment/create-transaction`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookingId }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Gagal membuat transaksi.");
  return data;
}

export async function syncPaymentStatus(bookingId) {
  const res = await fetch(`${API_BASE_URL}/api/Payment/status/${bookingId}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Gagal mengecek status.");
  return data.booking;
}

export async function payBooking(bookingId, { onDone } = {}) {
  const snap = await loadSnap();
  const { token } = await createTransaction(bookingId);

  const finish = async () => {
    try {
      const booking = await syncPaymentStatus(bookingId);
      onDone?.(booking);
    } catch {
      onDone?.(null);
    }
  };

  snap.pay(token, {
    onSuccess: finish,
    onPending: finish,
    onError: finish,
    onClose: finish,
  });
}