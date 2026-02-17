import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import AuthFooter from "../components/AuthFooter";

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
    }

    catch (err) {
      setError(err.message || "Error al crear la cuenta");
    }
    
 finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Crear cuenta</h1>
        <p className="auth-subtitle">
          Registrate para empezar a usar el sistema
        </p>
        <form className="auth-form" onSubmit={handleSubmit}>
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />

        <input
          placeholder="Usuario (mínimo 8 caracteres)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Ingrese 4 números"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          placeholder="Nombre de la Empresa"
          value={companyCode}
          onChange={(e) => setCompanyCode(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creando cuenta..." : "Crear cuenta"}
        </button>
              </form>
        {error && <p className="auth-error">{error}</p>}

        <p className="auth-footer">
          Ya tienes cuenta?{" "}
          <Link to="/login">Iniciar sesion</Link>
        </p>
      </div>

      {/* 👇 FOOTER INSTITUCIONAL */}
      <AuthFooter />
    </div>
  );
}

export default Register;
