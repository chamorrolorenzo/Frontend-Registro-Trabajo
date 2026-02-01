import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import "../styles/trips.css";


function Trips() {
  const today = new Date().toISOString().split("T")[0];

  const [remito, setRemito] = useState("");
  const [cubicMeters, setCubicMeters] = useState("");
  const [date, setDate] = useState(today);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!remito || !cubicMeters || !date) return;

    setLoading(true);
    try {
      await api.post("/trips", {
        remito,
        cubicMeters: Number(cubicMeters),
        date,
      });

      setRemito("");
      setCubicMeters("");
      setDate(today);
      alert("Viaje guardado");
    } catch {
      alert("Error al guardar viaje");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Agregar viaje</h1>

      <label>Remito</label>
      <input value={remito} onChange={(e) => setRemito(e.target.value)} />

      <label>Metros cúbicos (m³)</label>
      <input
        type="number"
        value={cubicMeters}
        onChange={(e) => setCubicMeters(e.target.value)}
      />

      
     <div className="trip-actions">
  <button onClick={handleSubmit}>Guardar viaje</button>

  <Link to="/trips/history" className="secondary-link">
    Ver mis viajes →
  </Link>
</div>

    </div>
  );
}

export default Trips;
