'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('match_results', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      readiness_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      fastapi_company_id: Sequelize.STRING,
      company_name: Sequelize.STRING,
      program_name: Sequelize.STRING,
      institution: Sequelize.STRING,
      country: Sequelize.STRING,
      funding_amount: Sequelize.FLOAT,
      match_score: Sequelize.FLOAT,
      score_breakdown: Sequelize.JSON,
      target_sectors: Sequelize.TEXT,
      website: Sequelize.STRING,
      data_source_url: Sequelize.STRING,
      repayment_required: Sequelize.STRING,
      grant_details: Sequelize.JSON,
      ai_recommendation: Sequelize.TEXT,
      total_matches_found: Sequelize.INTEGER,
      algorithm_version: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('match_results');
  }
};