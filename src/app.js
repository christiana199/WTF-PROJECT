const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./routes/authRoute");
const readinessRoutes = require("./routes/readinessRoute");
const matchRoutes = require("./routes/matchRoute");

const app = express();

// Security & middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// =========================
// ROUTES
// =========================

// Authentication
app.use("/api/auth", authRoutes);

// Readiness
app.use("/api/readiness", readinessRoutes);

// Matching
app.use("/api/match", matchRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Team Nexus Backend is running"
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

module.exports = app;