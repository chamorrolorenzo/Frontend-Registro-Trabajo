import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import { useEffect, useState, useRef } from "react";
import api from "../api/api";
import "../styles/simpleMap.css";

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function SimpleMap() {
  const company = {
    lat: -34.307026,
    lng: -58.864212
  };

  const [userPosition, setUserPosition] = useState(null);
  const [inside, setInside] = useState(false);

  const lastInsideRef = useRef(null);

  const handlePosition = async (lat, lng) => {
    const uLat = Number(lat);
    const uLng = Number(lng);

    setUserPosition([uLat, uLng]);

    const distance = getDistance(
      uLat,
      uLng,
      Number(company.lat),
      Number(company.lng)
    );

    const isInside = distance <= 200;

    setInside(isInside);

    if (lastInsideRef.current === null) {
      lastInsideRef.current = false;
    }

    if (!lastInsideRef.current && isInside) {
      await api.post("/hours/entry");
      console.log("AUTO ENTRY");
    }

    lastInsideRef.current = isInside;
  };

  // BOTÓN ACTIVAR GPS
  const activateGps = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        handlePosition(pos.coords.latitude, pos.coords.longitude);
        alert("Ubicación activada correctamente");
      },
      () => alert("Debes permitir ubicación para usar la aplicación")
    );
  };

  // POLLING REAL CADA 1 MINUTO
  useEffect(() => {
    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          handlePosition(pos.coords.latitude, pos.coords.longitude);
        },
        (err) => {
          console.log("GPS ERROR:", err);
        }
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // CIERRE MANUAL
  const closeDay = async () => {
    if (!userPosition) return alert("No se pudo obtener tu ubicación");

    const distance = getDistance(
      Number(userPosition[0]),
      Number(userPosition[1]),
      Number(company.lat),
      Number(company.lng)
    );

    if (distance > 200) {
      return alert("Debes estar en la empresa para finalizar la jornada");
    }

    await api.post("/hours/close");
    alert("Jornada finalizada");
  };

  return (
    <div className="simplemap-container">

      <button className="gps-btn" onClick={activateGps}>
        Activar ubicación
      </button>

      <MapContainer
        center={[company.lat, company.lng]}
        zoom={16}
        className="simplemap-map"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={[company.lat, company.lng]} />
        <Circle center={[company.lat, company.lng]} radius={200} />

        {userPosition && <Marker position={userPosition} />}
      </MapContainer>

      <p className={inside ? "inside" : "outside"}>
        {inside
          ? "Dentro del área de la empresa"
          : "Fuera del área de la empresa"}
      </p>

      <button className="close-day-btn" onClick={closeDay}>
        Finalizar jornada
      </button>
    </div>
  );
}
