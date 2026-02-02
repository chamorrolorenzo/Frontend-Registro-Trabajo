import { useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";
import "../styles/Hours.css"; // si ya lo usás

function Hours() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleEntry = async () => {
    setLoading(true);
    setMessage(null);
    try {
      await api.post("/hours/entry");
      setMessage("Ingreso registrado correctamente");
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Error al registrar ingreso"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleExit = async () => {
    setLoading(true);
    setMessage(null);
    try {
      await api.post("/hours/exit");
      setMessage("Salida registrada correctamente");
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Error al registrar salida"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Cargar horas</h1>

      <div className="hours-actions">
        <button
          className="primary-btn"
          onClick={handleEntry}
          disabled={loading}
        >
          Ingresar
        </button>

        <button
          className="secondary-btn"
          onClick={handleExit}
          disabled={loading}
        >
          Salir
        </button>
      </div>

      {message && <p className="status-text">{message}</p>}

      <Link to="/hours/history" className="link-hours">
        Ver mis horas →
      </Link>
    </div>
  );
}

export default Hours;
