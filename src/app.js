const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const matchRoutes = require("./routes/matchRoute");
const authRoutes = require("./routes/authRoute");   // 👈 ADD THIS
const readinessRoutes = require("./routes/readinessRoute"); // 👈 if you have it

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// Register routes
app.use("/api/match", matchRoutes);        // 👈 ADD THIS
app.use("/api/readiness", readinessRoutes); // 👈 if exists
app.use("/api", matchRoutes);

module.exports = app;