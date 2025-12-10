import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link to="/dashboard" className="navbar-brand">
        Admin Console
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">대시보드</Link>
          </li>

          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
              조회
            </a>
           <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to="/events">Events</Link></li>
              <li><Link className="dropdown-item" to="/sessions">Sessions</Link></li>
              <li><Link className="dropdown-item" to="/tasks">Tasks</Link></li>
              <li><Link className="dropdown-item" to="/az-events">AZ Events</Link></li>
              <li><Link className="dropdown-item" to="/snapshots">Snapshots</Link></li>
            </ul>
          </li>

          <li className="nav-item">
            <Link to="/user-management" className="nav-link">유저관리</Link>
          </li>
        </ul>

        <button className="btn btn-outline-light" onClick={logout}>
          로그아웃
        </button>
      </div>
    </nav>
  );
}
