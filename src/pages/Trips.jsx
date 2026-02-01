import { useEffect, useState } from "react";
import api from "../api/api";

function Trips() {
  const [remito, setRemito] = useState("");
  const [cubicMeters, setCubicMeters] = useState("");
  const [trips, setTrips] = useState([]);
  const [message, setMessage] = useState("");

  // Traer viajes al cargar
  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const res = await api.get("/trips");
      setTrips(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/trips", {
        remito,
        cubicMeters: Number(cubicMeters),
        date: new Date(),
      });

      setRemito("");
      setCubicMeters("");
      setMessage("Viaje guardado correctamente");
      fetchTrips();
    } catch (error) {
      setMessage("Error al guardar viaje");
    }
  };

  return (
    <div>
      <h1>Viajes</h1>

      <h2>Agregar viaje</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Remito"
          value={remito}
          onChange={(e) => setRemito(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="m³"
          value={cubicMeters}
          onChange={(e) => setCubicMeters(e.target.value)}
          required
        />

        <button type="submit">Guardar viaje</button>
      </form>

      {message && <p>{message}</p>}

      <h2>Mis viajes</h2>

      <ul>
        {trips.map((trip) => (
          <li key={trip._id}>
            {trip.remito} – {trip.cubicMeters} m³
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Trips;
