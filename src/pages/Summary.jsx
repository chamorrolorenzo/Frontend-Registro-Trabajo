import { useEffect, useState } from "react";
import api from "../api/api";

function Summary() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    api
      .get("/summary?month=2&year=2026")
      .then((res) => setSummary(res.data));
  }, []);

  if (!summary) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Resumen mensual</h1>
      <pre>{JSON.stringify(summary, null, 2)}</pre>
    </div>
  );
}

export default Summary;
