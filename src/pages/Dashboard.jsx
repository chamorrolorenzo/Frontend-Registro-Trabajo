import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <nav>
        <Link to="/hours">Horas</Link> |{" "}
        <Link to="/trips">Viajes</Link> |{" "}
        <Link to="/summary">Resumen</Link>
      </nav>
    </div>
  );
}

export default Dashboard;
