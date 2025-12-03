import { useEffect, useState } from "react";
import api from "../api/axios";

interface Event {
  id: number;
  event_time: string;
  event_type: string;
  page_url: string;
}

export default function EventsList() {
  const [events, setEvents] = useState<Event[]>([]);

  const load = async () => {
    const res = await api.get<Event[]>("/events?limit=50");
    setEvents(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container mt-5">
      <h3>Events</h3>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>event_time</th>
            <th>event_type</th>
            <th>page_url</th>
          </tr>
        </thead>
        <tbody>
          {events.map((ev) => (
            <tr key={ev.id}>
              <td>{ev.id}</td>
              <td>{ev.event_time}</td>
              <td>{ev.event_type}</td>
              <td>{ev.page_url?.slice(0, 60)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
