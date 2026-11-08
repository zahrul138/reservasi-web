const normalizeStatus = (status) => String(status || "").trim().toLowerCase();

const isActiveBooking = (booking) => {
  const statuses = [booking.status, booking.paymentStatus]
    .map(normalizeStatus)
    .filter(Boolean);

  return !statuses.some((status) =>
    ["cancelled", "canceled", "complete", "completed"].includes(status),
  );
};

const matchesRoom = (booking, room) => {
  if (booking.roomId != null && room.id != null) {
    return String(booking.roomId) === String(room.id);
  }

  return (
    String(booking.roomType || "").trim().toLowerCase() ===
    String(room.title || "").trim().toLowerCase()
  );
};

export const getRemainingRoomQuantity = (room, bookings, checkIn, checkOut) => {
  const requestedCheckIn = String(checkIn || "").slice(0, 10);
  const requestedCheckOut = String(checkOut || "").slice(0, 10);
  const quantity = Number(room.quantity);
  const activeRoomBookings = bookings.filter(
    (booking) => isActiveBooking(booking) && matchesRoom(booking, room),
  );
  const availableQuantity = Number.isFinite(quantity) ? Math.max(0, quantity) : 0;
  const totalQuantity = availableQuantity + activeRoomBookings.length;

  if (!requestedCheckIn || !requestedCheckOut || requestedCheckOut <= requestedCheckIn) {
    return 0;
  }

  const bookedQuantity = activeRoomBookings.filter((booking) => {
    const existingCheckIn = String(booking.checkinDate || "").slice(0, 10);
    const existingCheckOut = String(booking.checkoutDate || "").slice(0, 10);

    return (
      existingCheckIn &&
      existingCheckOut &&
      requestedCheckIn < existingCheckOut &&
      requestedCheckOut > existingCheckIn
    );
  }).length;

  return Math.max(0, totalQuantity - bookedQuantity);
};
