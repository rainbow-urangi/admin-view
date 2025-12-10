import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

interface Stats {
  [key: string]: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({});
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/stats");
      setStats(res.data);
    };
    load();
  }, []);

  const cards = [
    { key: "events", label: "Events", route: "/events" },
    { key: "az_events", label: "AZ Events", route: "/az-events" },
    { key: "sessions", label: "Sessions", route: "/sessions" },
    { key: "tasks", label: "Tasks", route: "/tasks" },
    { key: "snapshots", label: "Snapshots", route: "/snapshots" },
    { key: "admin_users", label: "Admin Users", route: "/user-management" }
  ];

  return (
    <div className="container mt-4">
      <h3 className="mb-4">대시보드</h3>

      <div className="row g-3">
        {cards.map(card => (
          <div className="col-md-4" key={card.key}>
            <div
              className="card text-center shadow-sm"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(card.route)}
            >
              <div className="card-body">
                <h5 className="card-title">{card.label}</h5>
                <p className="card-text fs-3 fw-bold">
                  {stats[card.key] ?? "—"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
