import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="container mt-5">
      <h3>Dashboard</h3>

      <Link to="/events" className="btn btn-primary mt-3">
        Events 보기
      </Link>
    </div>
  );
}
