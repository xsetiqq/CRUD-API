import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/users", userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.use((err: unknown, req: express.Request, res: express.Response) => {
  res.status(500).json({ message: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
