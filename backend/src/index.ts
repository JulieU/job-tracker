import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Job Tracker API is running!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
