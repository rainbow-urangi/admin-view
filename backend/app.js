import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import authRoutes from "./routes/auth.js";
import eventRoutes from "./routes/events.js";
import userRoutes from "./routes/users.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



