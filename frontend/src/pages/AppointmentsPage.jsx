import { useEffect, useState } from "react";
import api from "../api/client";
import AppointmentCard from "../components/AppointmentCard";

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState("");

  const fetchAppointments = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/appointments/mine");
      setAppointments(data.appointments);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCancel = async (id) => {
    setCancellingId(id);
    setError("");
    try {
      await api.delete(`/appointments/${id}`);
      await fetchAppointments();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to cancel appointment");
    } finally {
      setCancellingId("");
    }
  };

  return (
    <section className="stack-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Appointments</span>
          <h2>Track all of your upcoming and cancelled visits.</h2>
        </div>
      </div>

      {error ? <p className="error-banner">{error}</p> : null}
      {loading ? <p className="loading-copy">Loading appointments...</p> : null}

      <div className="appointments-grid">
        {appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            onCancel={handleCancel}
            cancellingId={cancellingId}
          />
        ))}
      </div>

      {!loading && !appointments.length ? (
        <p className="muted-text">You have not booked any appointments yet.</p>
      ) : null}
    </section>
  );
}

export default AppointmentsPage;
