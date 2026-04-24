function AppointmentCard({ appointment, onCancel, cancellingId }) {
  const isCancelled = appointment.status === "CANCELLED";

  return (
    <article className="appointment-card">
      <div className="appointment-card__main">
        <div>
          <h3>{appointment.doctor?.name || appointment.doctorId}</h3>
          <p>{appointment.doctor?.specialization || "Specialization unavailable"}</p>
        </div>
        <span className={`status-pill ${isCancelled ? "cancelled" : "booked"}`}>
          {appointment.status}
        </span>
      </div>
      <p>
        {appointment.appointmentDate} at {appointment.timeSlot}
      </p>
      <button
        className="danger-button"
        onClick={() => onCancel(appointment.id)}
        disabled={isCancelled || cancellingId === appointment.id}
      >
        {cancellingId === appointment.id ? "Cancelling..." : "Cancel Appointment"}
      </button>
    </article>
  );
}

export default AppointmentCard;
