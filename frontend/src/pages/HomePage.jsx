import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="hero-grid">
      <div className="hero-copy">
        <span className="eyebrow">Healthcare Appointment Management System</span>
        <h1>Coordinate patients, doctors, bookings, and alerts from one seamless flow.</h1>
        <p>
          A microservices-powered healthcare platform with secure patient authentication,
          doctor availability, appointment orchestration, and notification tracking.
        </p>
        <div className="hero-actions">
          <Link to="/doctors" className="primary-button">
            Browse Doctors
          </Link>
          <Link to={isAuthenticated ? "/appointments" : "/auth"} className="ghost-button">
            {isAuthenticated ? "View My Appointments" : "Get Started"}
          </Link>
        </div>
      </div>
      <div className="hero-panel">
        <div className="metric-card">
          <strong>4 Services</strong>
          <span>Patient, Doctor, Appointment, Notification</span>
        </div>
        <div className="metric-card">
          <strong>JWT Secured</strong>
          <span>Token-based patient authentication</span>
        </div>
        <div className="metric-card">
          <strong>Realtime UX</strong>
          <span>Interactive booking and cancellation flows</span>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
