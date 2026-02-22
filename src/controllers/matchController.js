const asyncHandler = require("express-async-handler");
const { Readiness, MatchResult, sequelize } = require("../models");
const { sendToAI } = require("../services/aiService");

/*
========================================
Run AI Matching
========================================
*/
exports.runMatching = asyncHandler(async (req, res) => {
  const { readinessId } = req.params;
  const userId = req.user.id;

  // 1️⃣ Find readiness
  const readiness = await Readiness.findOne({
    where: {
      id: readinessId,
      user_id: userId
    }
  });

  if (!readiness) {
    return res.status(404).json({
      success: false,
      message: "Readiness record not found"
    });
  }

  // 2️⃣ Send to FastAPI
  const aiResponse = await sendToAI(readiness);

  if (!aiResponse || !aiResponse.matches) {
    return res.status(500).json({
      success: false,
      message: "Invalid AI response"
    });
  }

  const {
    company,
    matches,
    ai_recommendation,
    total_matches_found,
    algorithm_version
  } = aiResponse;

  // 3️⃣ Use transaction (prevents partial saves)
  const transaction = await sequelize.transaction();

  try {
    // Delete old matches
    await MatchResult.destroy(
      {
        where: { readiness_id: readiness.id }
      },
      { transaction }
    );

    // Save new matches
    for (const match of matches) {
      await MatchResult.create(
        {
          readiness_id: readiness.id,
          user_id: userId,

         fastapi_company_id: company?.id,
          company_name: company?.company_name,

          program_name: match.program_name,
          institution: match.institution,
          country: match.country,
          funding_amount: match.funding_amount,
          match_score: match.match_score,
          score_breakdown: match.score_breakdown,
          target_sectors: match.target_sectors,
          website: match.website,
          data_source_url: match.data_source_url,
          repayment_required: match.repayment_required,
          grant_details: match.grant_details,

          ai_recommendation,
          total_matches_found,
          algorithm_version
        },
        { transaction }
      );
    }

    await transaction.commit();

  } catch (err) {
    await transaction.rollback();
    throw err;
  }

  // 4️⃣ Return clean response
  return res.status(200).json({
    success: true,
    message: "AI matching completed successfully",
    total_matches_found,
    algorithm_version,
    matches
  });
});

/*
========================================
Get Matches by Readiness
========================================
*/
exports.getMatchesByReadiness = asyncHandler(async (req, res) => {
  const { readinessId } = req.params;
  const userId = req.user.id;

  const matches = await MatchResult.findAll({
    where: {
      readiness_id: readinessId,
      user_id: userId
    },
    order: [["match_score", "DESC"]]
  });

  if (!matches.length) {
    return res.status(404).json({
      success: false,
      message: "No matches found for this readiness"
    });
  }

  res.status(200).json({
    success: true,
    total: matches.length,
    matches
  });
});