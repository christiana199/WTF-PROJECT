module.exports = (sequelize, DataTypes) => {
  return sequelize.define("MatchResult", {

    // Company Info (from FastAPI response.company)
    fastapi_company_id: {
      type: DataTypes.STRING,
      allowNull: false
    },

    company_name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    // Individual Grant Match Info
    program_name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    institution: {
      type: DataTypes.STRING,
      allowNull: false
    },

    country: {
      type: DataTypes.STRING,
      allowNull: false
    },

    funding_amount: {
      type: DataTypes.FLOAT,
      allowNull: true
    },

    match_score: {
      type: DataTypes.FLOAT,
      allowNull: false
    },

    // Score Breakdown (geographic, sector, amount_fit, stage)
    score_breakdown: {
      type: DataTypes.JSON,
      allowNull: false
    },

    // Extra Grant Metadata
    target_sectors: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    website: {
      type: DataTypes.STRING,
      allowNull: true
    },

    data_source_url: {
      type: DataTypes.STRING,
      allowNull: true
    },

    repayment_required: {
      type: DataTypes.STRING,
      allowNull: true
    },

    // Store full raw grant details for flexibility
    grant_details: {
      type: DataTypes.JSON,
      allowNull: true
    },

    // AI meta
    ai_recommendation: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    total_matches_found: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    algorithm_version: {
      type: DataTypes.STRING,
      allowNull: false
    }

  }, {
    tableName: "match_results",
    timestamps: true
  });
};