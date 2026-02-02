import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import "../styles/auth.css";

function Register() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyCode, setCompanyCode] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
  await api.post("/auth/register", {
    nombre,
    apellido,
    username,
    email,
    password,
    empresa: companyCode,
  });
      navigate("/login");
    } catch (err) {
      setError("No se pudo crear la cuenta. Verificá los datos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Crear cuenta</h1>
        <p className="auth-subtitle">
          Registrate para comenzar a usar el sistema
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <input
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />

          <input
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            placeholder="Código de empresa"
            value={companyCode}
            onChange={(e) => setCompanyCode(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        {error && <p className="auth-error">{error}</p>}

        <p className="auth-footer">
          ¿Ya tenés cuenta?{" "}
          <Link to="/login">Iniciar sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
