import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import authRoutes from "./routes/auth.js";
import eventRoutes from "./routes/events.js";
import userRoutes from "./routes/users.js";
import statsRoutes from "./routes/stats.js";
import azEventsRoutes from "./routes/azEvents.js";
import sessionsRoutes from "./routes/sessions.js";
import tasksRoutes from "./routes/tasks.js";
import snapshotsRoutes from "./routes/snapshots.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/az-events", azEventsRoutes);
app.use("/api/sessions", sessionsRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/snapshots", snapshotsRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



