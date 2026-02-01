import { useEffect, useState } from "react";
import api from "../api/api";

// ⚙️ Configuración de negocio (empresa)
// Luego esto puede venir del backend
const PRICE_PER_TRIP = 8000;
const PRICE_PER_CUBIC_METER = 800;

function HistoryTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await api.get("/trips");
        setTrips(data);
      } catch (error) {
        console.error("Error fetching trips", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const calculateAmount = (m3) => {
    return PRICE_PER_TRIP + m3 * PRICE_PER_CUBIC_METER;
  };

  return (
    <div className="page">
      <h1>Mis viajes</h1>

      {loading && <p className="empty-text">Cargando viajes…</p>}

      {!loading && trips.length === 0 && (
        <p className="empty-text">Todavía no cargaste viajes</p>
      )}

      <div className="trips-list">
        {trips.map((t) => {
          const amount = calculateAmount(t.cubicMeters);

          return (
            <div className="trip-card" key={t._id}>
              <div className="trip-row">
                <span className="trip-date">
                  {new Date(t.date).toLocaleDateString()}
                </span>

                <span className="trip-remito">
                  Remito {t.remito}
                </span>

                <span className="trip-meters">
                  {t.cubicMeters} m³
                </span>

                <span className="trip-amount">
                  ${amount.toLocaleString("es-AR")}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HistoryTrips;
