function DoctorCard({ doctor, onBook }) {
  return (
    <article className="doctor-card">
      <div className="doctor-card__header">
        <div>
          <h3>{doctor.name}</h3>
          <p>{doctor.specialization}</p>
        </div>
        <span className="pill">{doctor.experience} yrs exp</span>
      </div>

      <div className="slot-groups">
        {doctor.availableSlots?.length ? (
          doctor.availableSlots.map((slot) => (
            <div className="slot-group" key={`${doctor._id}-${slot.date}`}>
              <strong>{slot.date}</strong>
              <div className="slot-row">
                {slot.timeSlots.map((time) => (
                  <button
                    key={`${slot.date}-${time}`}
                    className="slot-chip"
                    onClick={() => onBook(doctor, slot.date, time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="muted-text">No availability published yet.</p>
        )}
      </div>
    </article>
  );
}

export default DoctorCard;
