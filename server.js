import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import registerRoutes from "./routes/registerRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT =  5000;

app.use(cors());
app.use(express.json()); 

app.use("/api", registerRoutes);


app.get("/test", (req, res) => {
  res.json({ message: "API working" });
});

app.listen(PORT, () =>
  console.log(` Server running on port ${PORT}`)
);
