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
import AZEventDetail from "./pages/AZEventDetail";
import EventDetail from "./pages/EventDetail";
import SessionDetail from "./pages/SessionDetail";
import TaskDetail from "./pages/TaskDetail";
import SnapshotDetail from "./pages/SnapshotDetail";
import UserManagement from "./pages/UserManagement";


function App() {
  return (
    <BrowserRouter basename="/admin">
      
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
        <Route path="/az-events/:id" element={<ProtectedRoute> <AZEventDetail /></ProtectedRoute>}/>
        <Route path="/events/:id" element={<ProtectedRoute> <EventDetail /> </ProtectedRoute>}/>  
        <Route path="/sessions/:id" element={<ProtectedRoute><SessionDetail /></ProtectedRoute>}/>  
        <Route path="/tasks/:id" element={<ProtectedRoute><TaskDetail /></ProtectedRoute>}/>
        <Route path="/snapshots/:event_id" element={<ProtectedRoute><SnapshotDetail /></ProtectedRoute>}/>  
        <Route path="/user-management" element={<ProtectedRoute><UserManagement /></ProtectedRoute>}/>  

      </Routes>

    </BrowserRouter>
  );
}

export default App;
