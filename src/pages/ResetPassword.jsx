import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage("Token inválido");
      return;
    }

    try {
      await api.post("/auth/reset-password", {
        token,
        password,
      });

      setMessage("Contraseña actualizada. Ya podés iniciar sesión.");

      // limpia el token del navegador
      window.history.replaceState({}, document.title, "/login");

      // redirige al login después de 2 segundos
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch {
      setMessage("Token inválido o expirado");
    }
  };

  return (
    <div className="page">
      <h2>Nueva contraseña</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nueva contraseña (4 números)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button>Guardar</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
