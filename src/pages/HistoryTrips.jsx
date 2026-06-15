import { useEffect, useState } from "react";
import api from "../api/api";
import { useMonth } from "../context/MonthContext";
import "../styles/HistoryTrips.css";

const PRICE_PER_TRIP = 9500;
const PRICE_PER_CUBIC_METER = 950;

const formatDateTime = (iso) =>
  new Date(iso).toLocaleString("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

function HistoryTrips() {

  const { month, year } = useMonth();

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {

        const data = await api.get(
          `/trips?month=${month}&year=${year}`
        );

        setTrips(data);

      } catch (error) {
        console.error("Error fetching trips", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [month, year]);

  const calculateAmount = (trip) =>
    PRICE_PER_TRIP + trip.cubicMeters * PRICE_PER_CUBIC_METER;

  return (
    <div className="page">
        <h1>Mis viajes — {month}/{year}</h1>
      {loading && (
        <p className="empty-text">Cargando viajes…</p>
      )}

      {!loading && trips.length === 0 && (
        <p className="empty-text">
          No hay viajes cargados este mes
        </p>
      )}

      <div className="trips-list">
        {trips.map((trip) => (
          <div className="trip-card" key={trip._id}>
            <div className="trip-row">

              <span className="trip-date">
                {formatDateTime(trip.createdAt)}
              </span>

              <span className="trip-remito">
                {trip.remito}
              </span>

              <span className="trip-meters">
                {trip.cubicMeters} m³
              </span>

              <span className="trip-amount">
                ${calculateAmount(trip).toLocaleString("es-AR")}
              </span>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default HistoryTrips;