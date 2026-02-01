import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Hours from "./pages/Hours";
import Trips from "./pages/Trips";
import HistoryTrips from "./pages/HistoryTrips";
import Summary from "./pages/Summary";
import Navbar from "./components/Navbar";
import HistoryHours from "./pages/HistoryHours";

import "./styles/global.css";

// Layout privado (navbar + contenido)
function PrivateLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ===== RUTAS PÚBLICAS ===== */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ===== RUTAS PRIVADAS ===== */}
        <Route
          path="/hours"
          element={
            <ProtectedRoute>
              <PrivateLayout>
                <Hours />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/trips"
          element={
            <ProtectedRoute>
              <PrivateLayout>
                <Trips />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/trips/history"
          element={
            <ProtectedRoute>
              <PrivateLayout>
                <HistoryTrips />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/summary"
          element={
            <ProtectedRoute>
              <PrivateLayout>
                <Summary />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/hours/history"
          element={
            <ProtectedRoute>
              <PrivateLayout>
                <HistoryHours />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
