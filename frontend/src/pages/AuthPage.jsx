import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const initialForm = {
  name: "",
  email: "",
  password: "",
  phone: "",
  age: "",
  gender: "Male",
};

function AuthPage() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const { login, register, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = useMemo(() => location.state?.from || "/appointments", [location.state]);

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const validate = () => {
    if (!form.email || !form.password) {
      return "Email and password are required";
    }
    if (mode === "register") {
      if (!form.name || !form.phone || !form.age || !form.gender) {
        return "Please fill all registration fields";
      }
      if (form.password.length < 6) {
        return "Password must be at least 6 characters";
      }
    }
    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    try {
      if (mode === "login") {
        await login({ email: form.email, password: form.password });
      } else {
        await register({
          ...form,
          age: Number(form.age),
        });
      }
      navigate(redirectTo);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to continue");
    }
  };

  return (
    <section className="auth-layout">
      <div className="auth-copy">
        <span className="eyebrow">Secure Access</span>
        <h2>Patients can create an account and manage appointments in a few clicks.</h2>
        <p>
          JWT-secured sessions, profile storage, and booking access all connect through the
          backend gateway.
        </p>
      </div>
      <div className="auth-card">
        <div className="tab-row">
          <button
            className={mode === "login" ? "tab active" : "tab"}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={mode === "register" ? "tab active" : "tab"}
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>
        <form className="form-grid" onSubmit={handleSubmit}>
          {mode === "register" ? (
            <>
              <input name="name" placeholder="Full name" value={form.name} onChange={handleChange} />
              <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
              <input
                name="age"
                type="number"
                placeholder="Age"
                value={form.age}
                onChange={handleChange}
              />
              <select name="gender" value={form.gender} onChange={handleChange}>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </>
          ) : null}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          {error ? <p className="error-banner">{error}</p> : null}
          <button type="submit" className="primary-button wide-button" disabled={loading}>
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AuthPage;
