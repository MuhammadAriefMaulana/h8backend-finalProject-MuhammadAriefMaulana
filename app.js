require("dotenv").config(); // membaca file .env
const express = require("express");
const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello world!");
});
app.use(require("./routes"));

// error handling
app.use((err, req, res, next) => {
  console.log(err);
  const error = err.name || "ServerError";
  const message = err.message || "Internal server error";
  const status = err.statusCode || 500;

  res.status(status).json({ error, message });
});

module.exports = app;
