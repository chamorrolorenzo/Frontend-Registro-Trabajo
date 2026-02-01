import { useEffect, useState } from "react";
import api from "../api/api";

function Hours() {
  const [hoursList, setHoursList] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchHours = async () => {
    try {
      const data = await api.get("/hours");
      setHoursList(data);
    } catch (error) {
      console.error("Error fetching hours", error);
    }
  };

  useEffect(() => {
    fetchHours();
  }, []);

  const calculateHours = () => {
    if (!checkIn || !checkOut) return 0;

    const start = new Date(`1970-01-01T${checkIn}`);
    const end = new Date(`1970-01-01T${checkOut}`);

    const diffMs = end - start;
    if (diffMs <= 0) return 0;

    return +(diffMs / (1000 * 60 * 60)).toFixed(2);
  };

  const totalHours = calculateHours();

  const handleSubmit = async () => {
    if (totalHours <= 0) return;

    setLoading(true);
    try {
      await api.post("/hours", {
        date: new Date(),
        hours: totalHours,
      });

      setCheckIn("");
      setCheckOut("");
      fetchHours();
    } catch (error) {
      alert("Error al guardar horas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Horas trabajadas</h1>

      {/* CARGA */}
      <div className="hours-box">
        <label>Hora de ingreso</label>
        <input
          type="time"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />

        <label>Hora de egreso</label>
        <input
          type="time"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />

        {totalHours > 0 && (
          <p className="hours-preview">
            Total: <strong>{totalHours} hs</strong>
          </p>
        )}

        <button onClick={handleSubmit} disabled={loading || totalHours === 0}>
          {loading ? "Guardando..." : "Guardar jornada"}
        </button>
      </div>

      {/* LISTADO */}
      <h2>Mis horas</h2>

      <div className="hours-list">
        {hoursList.length === 0 && (
          <p className="empty-text">Todavía no cargaste horas</p>
        )}

        {hoursList.map((h) => (
          <div className="hour-card" key={h._id}>
            <div>
              <div className="hour-date">
                {new Date(h.date).toLocaleDateString()}
              </div>
              <div className="hour-detail">
                {h.hours} hs
                {h.extraHours > 0 && (
                  <span className="extra">
                    {" "}
                    + {h.extraHours} extra
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hours;
