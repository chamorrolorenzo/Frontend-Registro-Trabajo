import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import "../styles/Hours.css";

// util: fecha de hoy en formato YYYY-MM-DD
const todayISO = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

// util: calcula horas entre ingreso y egreso
const calculateHours = (start, end) => {
  if (!start || !end) return null;

  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);

  const startMinutes = sh * 60 + sm;
  const endMinutes = eh * 60 + em;

  if (endMinutes <= startMinutes) return null;

  const diff = endMinutes - startMinutes;
  return Number((diff / 60).toFixed(2));
};

function Hours() {
  const [date] = useState(todayISO());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const totalHours = calculateHours(startTime, endTime);

  const handleSubmit = async () => {
    if (!totalHours) {
      setMessage("Horario inválido");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      await api.post("/hours", {
        date,
        hours: totalHours,
      });

      setStartTime("");
      setEndTime("");
      setMessage("Horas guardadas correctamente");
    } catch (error) {
      console.error(error);
      setMessage("Error al guardar horas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Cargar horas</h1>

      <div className="hours-form">
        <label>Fecha</label>
        <input type="date" value={date} disabled />

        <label>Hora de ingreso</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <label>Hora de egreso</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>

      {totalHours && (
        <p className="hours-preview">
          Total: <strong>{totalHours} hs</strong>
        </p>
      )}

      <div className="hours-actions">
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Guardando..." : "Guardar horas"}
        </button>

        <Link to="/hours/history" className="secondary-link">
          Ver mis horas →
        </Link>
      </div>

      {message && <p className="hours-feedback">{message}</p>}
    </div>
  );
}

export default Hours;
