import { useEffect, useState } from "react";
import api from "../api/client";
import BookingDrawer from "../components/BookingDrawer";
import DoctorCard from "../components/DoctorCard";

function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [specialization, setSpecialization] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingTarget, setBookingTarget] = useState(null);
  const [flash, setFlash] = useState("");

  const fetchDoctors = async (specializationFilter = "") => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/doctors", {
        params: specializationFilter ? { specialization: specializationFilter } : {},
      });
      setDoctors(data.doctors);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <section className="stack-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Doctors</span>
          <h2>Choose a specialist and book from published availability.</h2>
        </div>
        <form
          className="filter-bar"
          onSubmit={(event) => {
            event.preventDefault();
            fetchDoctors(specialization);
          }}
        >
          <input
            placeholder="Filter by specialization"
            value={specialization}
            onChange={(event) => setSpecialization(event.target.value)}
          />
          <button type="submit" className="primary-button">
            Search
          </button>
        </form>
      </div>

      {flash ? <p className="success-banner">{flash}</p> : null}
      {error ? <p className="error-banner">{error}</p> : null}
      {loading ? <p className="loading-copy">Loading doctors...</p> : null}

      <div className="card-grid">
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor._id}
            doctor={doctor}
            onBook={(selectedDoctor, date, timeSlot) =>
              setBookingTarget({ doctor: selectedDoctor, date, timeSlot })
            }
          />
        ))}
      </div>

      {!loading && !doctors.length ? (
        <p className="muted-text">No doctors match your current filter.</p>
      ) : null}

      <BookingDrawer
        bookingTarget={bookingTarget}
        onClose={() => setBookingTarget(null)}
        onBooked={() => setFlash("Appointment booked successfully.")}
      />
    </section>
  );
}

export default DoctorsPage;
