'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('readiness', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sector: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nationality: {
        type: Sequelize.STRING,
        allowNull: false
      },
      business_stage: {
        type: Sequelize.STRING,
        allowNull: false
      },
      funding_need_usd: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      business_registered_in: Sequelize.STRING,
      founder_age: Sequelize.INTEGER,
      founder_gender: Sequelize.STRING,
      business_age_months: Sequelize.INTEGER,
      annual_revenue_usd: Sequelize.FLOAT,
      employees: Sequelize.INTEGER,
      innovation_level: Sequelize.STRING,
      has_prototype: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      targets_underserved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
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
    await queryInterface.dropTable('readiness');
  }
};