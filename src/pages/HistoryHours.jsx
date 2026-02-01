import { useEffect, useState } from "react";
import api from "../api/api";
import "../styles/HistoryHours.css";

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

function HistoryHours() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHours = async () => {
      try {
        const data = await api.get("/hours");
        setRecords(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHours();
  }, []);

  return (
    <div className="page">
      <h1>Mis horas</h1>

      {loading && <p className="empty-text">Cargando…</p>}

      {!loading && records.length === 0 && (
        <p className="empty-text">No hay horas cargadas</p>
      )}

      <div className="hours-list">
        {records.map((h) => (
          <div className="hour-card" key={h._id}>
            <div className="hour-row">
              <span className="hour-date">
                {formatDate(h.date)}
              </span>

              <span className="hour-total">
                {h.hours} hs
              </span>

              <span className="hour-extra">
                {h.extraHours > 0 ? `+${h.extraHours} hs` : ""}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryHours;
