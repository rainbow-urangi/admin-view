import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import EventsList from "./pages/EventsList";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateSimpleUser from "./pages/CreateSimpleUser";
import Navbar from "./components/Navbar";
import AZEventsList from "./pages/AZEventsList";
import SessionsList from "./pages/SessionsList";
import TasksList from "./pages/TasksList";
import SnapshotsList from "./pages/SnapshotsList";

function App() {
  return (
    <BrowserRouter>
      
      <Navbar />
      
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

        <Route path="/az-events" element={<ProtectedRoute><AZEventsList/></ProtectedRoute>} />
        <Route path="/sessions" element={<ProtectedRoute><SessionsList/></ProtectedRoute>} />
        <Route path="/tasks" element={<ProtectedRoute><TasksList/></ProtectedRoute>} />
        <Route path="/snapshots" element={<ProtectedRoute><SnapshotsList/></ProtectedRoute>} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
