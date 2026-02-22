const express = require("express");
const router = express.Router();

const {
  runMatching,
  getMatchesByReadiness
} = require("../controllers/matchController");

const { authenticate } = require("../middlewares/authMiddleware");

/*
========================================
Run AI Matching
POST /api/match/:readinessId/run
========================================
*/
router.post("/:readinessId/run", authenticate, runMatching);

/*
========================================
Get Matches By Readiness
GET /api/match/:readinessId
========================================
*/
router.get("/:readinessId", authenticate, getMatchesByReadiness);

module.exports = router;