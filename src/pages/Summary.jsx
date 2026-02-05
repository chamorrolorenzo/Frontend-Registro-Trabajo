import { useEffect, useState } from "react";
import api from "../api/api";
import "../styles/summary.css";

function Summary() {
  const now = new Date();

  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const [periods, setPeriods] = useState([]);
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    api.get("/summary/periods").then((data) => {
      setPeriods(data);
    });
  }, []);

  useEffect(() => {
    fetchSummary();
  }, [month, year]);

  const fetchSummary = async () => {
    const data = await api.get(`/summary?month=${month}&year=${year}`);
    setSummary(data);
  };

  return (
    <div className="summary-page">

      {/* HEADER */}
      <div className="summary-header">
        <h1>Resumen mensual</h1>

        <select
          className="summary-period"
          value={`${month}-${year}`}
          onChange={(e) => {
            const [m, y] = e.target.value.split("-");
            setMonth(Number(m));
            setYear(Number(y));
          }}
        >
          {periods.map((p) => (
            <option key={`${p.month}-${p.year}`} value={`${p.month}-${p.year}`}>
              {p.month}/{p.year}
            </option>
          ))}
        </select>
      </div>

      {summary && !summary.empty && (

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
              <span>${summary.trips.subtotal.toLocaleString()}</span>
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
              <span>{summary.hours.normal || 0}</span>
              <span>{summary.hours.extra || 0}</span>
              <span>${summary.hours.subtotal.toLocaleString()}</span>
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
              <span>${summary.incentive.toLocaleString()}</span>
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
