import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Layout() {
  const { patient, isAuthenticated, logout } = useAuth();

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="brand">
          MediFlow Care
        </Link>
        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/doctors">Doctors</NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/appointments">My Appointments</NavLink>
              <button className="ghost-button" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/auth">Login / Register</NavLink>
          )}
        </nav>
      </header>
      <main className="page-frame">
        {isAuthenticated && patient ? (
          <section className="welcome-strip">
            <span>Signed in as {patient.name}</span>
            <span>{patient.email}</span>
          </section>
        ) : null}
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
