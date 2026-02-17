import { useState } from "react";
import api from "../api/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await api.post("/auth/forgot-password", { email });

      // 🔥 res YA ES el JSON
      setMessage(res.message || "Si el email existe, se enviará un link");
    }
    catch (err) {
      setMessage(err.message || "No se pudo enviar el link.");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h2>¿Olvidaste tu contraseña?</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button disabled={loading}>
          {loading ? "Enviando..." : "Enviar link"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
