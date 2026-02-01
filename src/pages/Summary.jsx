import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "../styles/summary.css";

function Summary() {
  const navigate = useNavigate();
  const now = new Date();

  const [month, setMonth] = useState(now.getMonth() + 1); // 1–12
  const [year, setYear] = useState(now.getFullYear());
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSummary();
  }, [month, year]);

  const fetchSummary = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await api.get(`/summary?month=${month}&year=${year}`);
      setSummary(data);
    } catch (err) {
      setError("No se pudo cargar el resumen");
      setSummary(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="summary-page">
      <h1>Resumen mensual</h1>

      {/* Selectores */}
      <div className="summary-filters">
        <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
          {Array.from({ length: 12 }).map((_, i) => (
            <option key={i + 1} value={i + 1}>
              Mes {i + 1}
            </option>
          ))}
        </select>

        <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
          {[year - 1, year, year + 1].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      <div className="summary-card">
        {loading && <p className="summary-loading">Cargando resumen…</p>}

        {error && <p className="summary-error">{error}</p>}

        {!loading && summary && summary.empty && (
          <div className="summary-empty">
            <p>{summary.message}</p>
            <button
              className="primary-btn"
              onClick={() => navigate("/trips")}
            >
              Cargar viajes
            </button>
          </div>
        )}

        {!loading && summary && !summary.empty && (
          <div className="summary-metrics">
            <div className="metric">
              <div className="metric-label">Viajes</div>
              <div className="metric-value">{summary.totalTrips}</div>
            </div>

            <div className="metric">
              <div className="metric-label">Horas</div>
              <div className="metric-value">{summary.totalHours}</div>
            </div>

            <div className="metric">
              <div className="metric-label">Total</div>
              <div className="metric-value">
                ${summary.totalAmount.toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Summary;
