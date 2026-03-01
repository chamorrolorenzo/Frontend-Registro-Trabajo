import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LoadingProvider, useLoading } from "./context/LoadingContext";
import AppRouter from "./routes/AppRouter";
import { useEffect } from "react";
import { setLoadingHandler } from "./api/api";
import "./styles/global.css";

// ⭐ Loader visual global
function GlobalLoader() {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="global-loader">
      Cargando datos...
    </div>
  );
}

// ⭐ conecta api.js con LoadingContext
function LoadingConnector() {
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoadingHandler(setLoading);
  }, []);

  return null;
}

function AppContent() {
  return (
    <>
      <LoadingConnector /> 
      <GlobalLoader />
      <AppRouter />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LoadingProvider> {/* ⭐ AGREGADO */}
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LoadingProvider>
    </BrowserRouter>
  );
}