import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  // 🔎 DEBUG (dejalo por ahora)
  console.log("PROTECTED ROUTE");
  console.log("TOKEN:", token);
  console.log("PATH:", location.pathname);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
