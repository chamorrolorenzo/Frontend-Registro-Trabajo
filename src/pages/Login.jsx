import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import AuthFooter from "../components/AuthFooter";

import "../styles/auth.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await api.post("/auth/login", {
        username,
        password,
      });

      // 🔑 ÚNICA fuente de verdad
      localStorage.setItem("token", data.token);

      // 👉 HOME REAL
      navigate("/summary", { replace: true });
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Welcome back</h1>
        <p className="auth-subtitle">Log in to your account</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Log in</button>
        </form>

        <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>


        {error && <p className="auth-error">{error}</p>}

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">Sign up</Link>
        </p>
      </div>

      {/* 👇 FOOTER INSTITUCIONAL */}
      <AuthFooter />
    </div>
  );
}

export default Login;
