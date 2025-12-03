import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import EventsList from "./pages/EventsList";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateSimpleUser from "./pages/CreateSimpleUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 */}
        <Route path="/" element={<LoginPage />} />

        {/* 보호된 라우트 */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <EventsList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-simple-user"
          element={
            <ProtectedRoute>
              <CreateSimpleUser />
            </ProtectedRoute>
          }
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
