import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import { useEffect, useState } from "react";
import api from "../api/api";

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export default function SimpleMap() {
  const company = {
    lat: -34.6037389,
    lng: -58.3815704
  };

  const [userPosition, setUserPosition] = useState(null);
  const [inside, setInside] = useState(false);
  const [lastInside, setLastInside] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setUserPosition([lat, lng]);

        const distance = getDistance(
          lat,
          lng,
          company.lat,
          company.lng
        );

        const isInside = distance < 100;

        setInside(isInside);

        if (lastInside === null) {
          setLastInside(isInside);
          return;
        }

        if (!lastInside && isInside) {
          await api.post("/hours/entry");
          console.log("AUTO ENTRY");
        }

        if (lastInside && !isInside) {
          await api.post("/hours/exit");
          console.log("AUTO EXIT");
        }

        setLastInside(isInside);
      });
    }, 15000);

    return () => clearInterval(interval);
  }, [lastInside]);

  return (
    <div>
      <MapContainer
        center={[company.lat, company.lng]}
        zoom={16}
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Empresa */}
        <Marker position={[company.lat, company.lng]} />

        {/* Radio 100m */}
        <Circle center={[company.lat, company.lng]} radius={100} />

        {/* Usuario */}
        {userPosition && <Marker position={userPosition} />}
      </MapContainer>

      <p style={{ color: inside ? "green" : "red", marginTop: "10px" }}>
        {inside ? "Inside company area" : "Outside company area"}
      </p>
    </div>
  );
}
