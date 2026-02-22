const express = require("express");
const router = express.Router();

const { submitReadiness } = require("../controllers/readinessController");
const { authenticate } = require("../middlewares/authMiddleware");

router.post("/", authenticate, submitReadiness);

module.exports = router;