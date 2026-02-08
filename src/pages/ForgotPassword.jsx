
import { useState } from "react";
import api from "../api/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await api.post("/auth/forgot-password", { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Error enviando link");
    } finally {
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
          required
        />

        <button disabled={loading}>
          {loading ? "Enviando..." : "Enviar link"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
