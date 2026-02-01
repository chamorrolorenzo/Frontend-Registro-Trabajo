import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <nav style={{ marginBottom: "20px" }}>
      <Link to="/trips">Viajes</Link> |{" "}
      <Link to="/hours">Horas</Link> |{" "}
      <Link to="/summary">Resumen</Link> |{" "}
      <button onClick={handleLogout}>Salir</button>
    </nav>
  );
}

export default Navbar;
