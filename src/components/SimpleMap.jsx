import { MapContainer, TileLayer, Marker, Circle, useMap } from "react-leaflet";
import { useEffect, useState, useRef } from "react";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import api from "../api/api";
import "../styles/simpleMap.css";

//  FIX ICONO LEAFLET (IMPORTANTE)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

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

//  Para centrar el mapa cuando obtenemos posición
function Recenter({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 17);
    }
  }, [position]);

  return null;
}

export default function SimpleMap() {
  const company = {
    lat: -34.305701,
    lng: -58.862443
  };

  const [userPosition, setUserPosition] = useState(null);
  const [inside, setInside] = useState(false);
  const lastInsideRef = useRef(false);

  const [gpsActive, setGpsActive] = useState(false);

 const handlePosition = async (lat, lng) => {
  const uLat = Number(lat);
  const uLng = Number(lng);

  console.log("MI POSICION:", uLat, uLng);

  setUserPosition([uLat, uLng]);

  const distance = getDistance(
    uLat,
    uLng,
    company.lat,
    company.lng
  );

  const isInside = distance <= 500;
  setInside(isInside);

  // AUTO ENTRY
  if (isInside && !lastInsideRef.current) {
    try {
      await api.post("/hours/entry");
      console.log("AUTO ENTRY");
    } catch (err) {
      console.log("ENTRY ERROR:", err);
    }
  }

  lastInsideRef.current = isInside;
};
    
  const activateGps = () => {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      handlePosition(pos.coords.latitude, pos.coords.longitude);
      setGpsActive(true); // 🔥 marcamos activo
    },
    () => alert("Debes permitir ubicación para usar la aplicación"),
    { enableHighAccuracy: true }
  );
};

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

  const closeDay = async () => {
    if (!userPosition) return alert("No se pudo obtener tu ubicación");

    const distance = getDistance(
      userPosition[0],
      userPosition[1],
      company.lat,
      company.lng
    );

    if (distance > 200) {
      return alert("Debes estar en la empresa para finalizar la jornada");
    }

    await api.post("/hours/exit");
    alert("Jornada finalizada");
  };

  return (
    <div className="simplemap-container">
      <button
  className={`gps-btn ${gpsActive ? "gps-active" : ""}`}
  onClick={activateGps}
>
  {gpsActive ? "Ubicación activa" : "Activar ubicación"}
</button>

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