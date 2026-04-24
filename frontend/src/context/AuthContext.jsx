import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [patient, setPatient] = useState(() => {
    const stored = localStorage.getItem("patientProfile");
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("patientToken"));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setPatient(null);
      localStorage.removeItem("patientProfile");
      return;
    }

    const syncProfile = async () => {
      try {
        const { data } = await api.get("/patients/profile");
        setPatient(data.patient);
        localStorage.setItem("patientProfile", JSON.stringify(data.patient));
      } catch (error) {
        logout();
      }
    };

    syncProfile();
  }, [token]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const { data } = await api.post("/patients/login", credentials);
      localStorage.setItem("patientToken", data.token);
      localStorage.setItem("patientProfile", JSON.stringify(data.patient));
      setToken(data.token);
      setPatient(data.patient);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const { data } = await api.post("/patients/register", payload);
      localStorage.setItem("patientToken", data.token);
      localStorage.setItem("patientProfile", JSON.stringify(data.patient));
      setToken(data.token);
      setPatient(data.patient);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("patientToken");
    localStorage.removeItem("patientProfile");
    setToken(null);
    setPatient(null);
  };

  return (
    <AuthContext.Provider
      value={{
        patient,
        token,
        isAuthenticated: Boolean(token),
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
