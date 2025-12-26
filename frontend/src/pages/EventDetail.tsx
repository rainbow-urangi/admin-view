import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    api.get(`/events/${id}`).then(res => setEvent(res.data));
  }, [id]);

  if (!event) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <h3>Event Detail (ID: {id})</h3>
      <pre className="bg-light p-3 rounded" style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify(event, null, 2)}
      </pre>
    </div>
  );
}
