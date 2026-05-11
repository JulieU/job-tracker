import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import boardRoutes from "./routes/boards";
import cardRoutes from "./routes/cards";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/boards", boardRoutes);
app.use("/api", cardRoutes);

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Job Tracker API is running!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
