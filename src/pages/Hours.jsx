import { useEffect, useState } from "react";
import api from "../api/api";

function Hours() {
  const [hours, setHours] = useState([]);

  useEffect(() => {
    api.get("/hours").then((res) => setHours(res.data));
  }, []);

  return (
    <div>
      <h1>Horas</h1>

      <ul>
        {hours.map((h) => (
          <li key={h._id}>
            {h.date} - {h.hours} hs
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Hours;
