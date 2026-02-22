const asyncHandler = require("express-async-handler");
const { submitReadinessService } = require("../services/readinessService");

exports.submitReadiness = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const readiness = await submitReadinessService(
    userId,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Readiness submitted successfully",
    readiness
  });
});