import { useEffect, useState } from "react";
import api from "../api/api";
import { useMonth } from "../context/MonthContext";
import "../styles/HistoryHours.css";

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const formatTime = (iso) =>
  new Date(iso).toLocaleTimeString("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    hour: "2-digit",
    minute: "2-digit",
  });

function HistoryHours() {
  const { month, year } = useMonth();

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHours = async () => {
      setLoading(true);

      try {
        const data = await api.get(`/hours?month=${month}&year=${year}`);

        // ✅ ordenar por el momento real (entryTime), no por el bucket (date)
        const sorted = [...data].sort(
          (a, b) => new Date(b.entryTime) - new Date(a.entryTime)
        );

        setRecords(sorted);
      } catch (error) {
        console.error("Error fetching hours", error);
        setRecords([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHours();
  }, [month, year]);

  return (
    <div className="page">
      <h1>Mis horas</h1>

      {loading ? (
        <p className="empty-text">Cargando horas…</p>
      ) : records.length === 0 ? (
        <p className="empty-text">No hay horas cargadas este mes</p>
      ) : (
        <div className="hours-list">
          {records.map((h) => {
            const totalHours = (h.totalMinutes ?? 0) / 60;
            const extraHours = totalHours > 8 ? totalHours - 8 : 0;

            return (
              <div className="hour-card" key={h._id}>
                <div className="hour-row">
                  {/* ✅ fecha desde entryTime */}
                  <span className="hour-date">
                    {formatDate(h.entryTime)}
                  </span>

                  <span className="hour-time">
                    {formatTime(h.entryTime)} –{" "}
                    {h.exitTime ? formatTime(h.exitTime) : "—"}
                  </span>

                  <span className="hour-extra">
                    +{extraHours.toFixed(2)} hs
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default HistoryHours;