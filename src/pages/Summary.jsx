import { useEffect, useState } from "react";
import api from "../api/api";
import { useMonth } from "../context/MonthContext";
import MonthSelector from "../components/MonthSelector";
import "../styles/summary.css";


function Summary() {

  const { month, year } = useMonth();
  const [summary, setSummary] = useState(null);

  const downloadMonthlyReport = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://backend-registro-trabajo.onrender.com/exports/monthly?month=${month}&year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Error descargando PDF");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `reporte-${month}-${year}.pdf`;
      a.click();

      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error descargando reporte", error);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [month, year]);

  const fetchSummary = async () => {
    try {

      const data = await api.get(
        `/summary?month=${month}&year=${year}`
      );

      setSummary(data);

    } catch (error) {

      console.error("Error fetching summary", error);
      setSummary({ empty: true });

    }
  };

  return (
    <div className="summary-page">

      {/* HEADER */}
      <div className="summary-header">

        <h1>Resumen </h1>
        <MonthSelector />
        <button
          className="download-btn"
          onClick={downloadMonthlyReport}>
          📄 Descargar
        </button>
      </div>

      {/* CONTENIDO */}
      {!summary ? null : summary.empty ? (

        <p className="empty-text">
          Aún no hay actividad este mes
        </p>

      ) : (

        <div className="liquidation">

          {/* VIAJES */}
          <div className="block">

            <div className="head">
              <span>Viajes</span>
              <span>M³</span>
              <span>Subtotal</span>
            </div>

            <div className="values">
              <span>{summary.trips.count}</span>
              <span>{summary.trips.cubicMeters}</span>
              <span>
                ${summary.trips.subtotal.toLocaleString()}
              </span>
            </div>

          </div>

          {/* HORAS */}
          <div className="block">

            <div className="head">
              <span>Horas</span>
              <span>Hs extras</span>
              <span>Subtotal</span>
            </div>

            <div className="values">
              <span>{summary.hours.normal}</span>
              <span>{summary.hours.extra}</span>
              <span>
                ${summary.hours.subtotal.toLocaleString()}
              </span>
            </div>

          </div>

          {/* INCENTIVO */}
          <div className="block">

            <div className="head">
              <span>Incentivo</span>
              <span>Limpieza</span>
              <span>Subtotal</span>
            </div>

            <div className="values">
              <span>{summary.incentive}</span>
              <span>-</span>
              <span>
                ${summary.incentive.toLocaleString()}
              </span>
            </div>

          </div>

          {/* TOTAL */}
          <div className="total-line">
            TOTAL $ {summary.total.toLocaleString()}
          </div>

        </div>

      )}

    </div>
  );
}

export default Summary;