import { Link } from "react-router-dom";
import SimpleMap from "../components/SimpleMap";
import "../styles/Hours.css";

function Hours() {
  return (
    <div className="page">
      <h1>Cargar horas</h1>

      <SimpleMap />

      <Link to="/hours/history" className="link-hours">
        Ver mis horas →
      </Link>
    </div>
  );
}

export default Hours;
