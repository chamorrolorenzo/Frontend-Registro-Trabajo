import { MapContainer, TileLayer, Marker, Circle, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import api from "../api/api";
import "../styles/simpleMap.css";

// FIX ICONO LEAFLET
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

// CALCULO DISTANCIA (sin cambios)
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

// ===============================
function Recenter({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 17);
    }
  }, [position]);

  return null;
}
// ===============================

export default function SimpleMap() {
  const company = {
    lat: -34.305701,
    lng: -58.862443
  };

  const [userPosition, setUserPosition] = useState(null);
  const [inside, setInside] = useState(false);
  const [gpsActive, setGpsActive] = useState(false);

  // ⭐ AGREGADO — estado jornada
const [hasEntry, setHasEntry] = useState(false);
const [hasExit, setHasExit] = useState(false);
const [loadingStatus, setLoadingStatus] = useState(true); // ⭐ NUEVO
  // ⭐ AGREGADO — consultar estado real al backend
  const loadStatus = async () => {
    try {
      const data = await api.get("/hours/status");

      // backend dice si ya inició o terminó
      setHasEntry(data.hasEntry);
      setHasExit(data.hasExit);

    } catch (err) {
      console.log("STATUS ERROR", err);
    } finally{
      setLoadingStatus(false);
    }
  };
 
  // GPS POSITION
  const handlePosition = (lat, lng) => {
    const uLat = Number(lat);
    const uLng = Number(lng);

    setUserPosition([uLat, uLng]);

    const distance = getDistance(
      uLat,
      uLng,
      company.lat,
      company.lng
    );
    setInside(distance <= 200);
  };

  const activateGps = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        handlePosition(pos.coords.latitude, pos.coords.longitude);
        setGpsActive(true);
      },
      () => alert("Debes permitir ubicación para usar la aplicación"),
      { enableHighAccuracy: true }
    );
  };

  // ⭐ GPS watcher 
  useEffect(() => {
    const watcher = navigator.geolocation.watchPosition(
      (pos) => {
        handlePosition(pos.coords.latitude, pos.coords.longitude);
      },
      (err) => {
        console.log("GPS ERROR:", err);
      },
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  // ⭐ AGREGADO — cuando abre la pantalla consulta jornada actual
  useEffect(() => {
    loadStatus();
  }, []);
  
  // INICIAR JORNADA (HIBRIDO)
  const startDay = async () => {
    if (!inside) {
      return alert("Debes estar dentro de la empresa");
    }

    try {
      await api.post("/hours/entry");
      setHasEntry(true); // actualiza UI inmediatamente
      alert("Jornada iniciada");
    } catch (err) {
      alert("Error al iniciar jornada");
    }
  };
  
  // FINALIZAR JORNADA
  const closeDay = async () => {
    if (!inside) {
      return alert("Debes estar en la empresa para finalizar la jornada");
    }

    try {
      await api.post("/hours/exit");
      setHasExit(true); // ⭐ AGREGADO
      alert("Jornada finalizada");
    } catch (err) {
      alert("Error al finalizar jornada");
    }
  };

    // UI
    return (
    <div className="simplemap-container">

      {/* BOTON GPS */}
      <button
        className={`gps-btn ${gpsActive ? "gps-active" : ""}`}
        onClick={activateGps}
      >
        {gpsActive ? "Ubicación activa" : "Activar ubicación"}
      </button>

      {/* ⭐ AGREGADO — BOTON INICIAR JORNADA */}
      {!hasEntry && (
        <button
          className="close-day-btn"
          onClick={startDay}
           disabled={!inside || !hasEntry || hasExit || loadingStatus}
        >
          Iniciar jornada
        </button>
      )}

      {/* MAPA */}
      <MapContainer
        center={[company.lat, company.lng]}
        zoom={16}
        className="simplemap-map"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[company.lat, company.lng]} />
        <Circle center={[company.lat, company.lng]} radius={200} />

        {userPosition && (
          <>
            <Marker position={userPosition} />
            <Recenter position={userPosition} />
          </>
        )}
      </MapContainer>

      {/* ESTADO */}
      <p className={inside ? "inside" : "outside"}>
        {inside
          ? "Dentro del área de la empresa"
          : "Fuera del área de la empresa"}
      </p>

      {/* ⭐ MODIFICADO — control lógico */}
      <button
        className="close-day-btn"
        onClick={closeDay}
        disabled={!inside || !hasEntry || hasExit}
      >
        Finalizar jornada
      </button>

    </div>
  );
}