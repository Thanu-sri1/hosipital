import { useState } from "react";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";

function BookingDrawer({ bookingTarget, onClose, onBooked }) {
  const { isAuthenticated } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!bookingTarget) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const { data } = await api.post("/appointments/book", {
        doctorId: bookingTarget.doctor._id,
        appointmentDate: bookingTarget.date,
        timeSlot: bookingTarget.timeSlot,
      });
      onBooked(data.appointment);
      onClose();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Failed to book appointment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer" onClick={(event) => event.stopPropagation()}>
        <h3>Confirm Appointment</h3>
        <p>
          <strong>{bookingTarget.doctor.name}</strong> · {bookingTarget.doctor.specialization}
        </p>
        <p>
          {bookingTarget.date} at {bookingTarget.timeSlot}
        </p>
        {!isAuthenticated ? (
          <p className="error-banner">Please log in before booking an appointment.</p>
        ) : null}
        {error ? <p className="error-banner">{error}</p> : null}
        <form onSubmit={handleSubmit} className="drawer-actions">
          <button type="button" className="ghost-button" onClick={onClose}>
            Close
          </button>
          <button type="submit" className="primary-button" disabled={!isAuthenticated || submitting}>
            {submitting ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingDrawer;
