import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import history from "./routes/history.mjs";

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/history", history);

app.use((err, _req, res, _next) => {
  res.status(500).send("Uh oh! An unexpected error occured.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});