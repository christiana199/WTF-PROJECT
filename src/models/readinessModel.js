module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Readiness", {

    company_name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    sector: {
      type: DataTypes.STRING,
      allowNull: false
    },

    nationality: {
      type: DataTypes.STRING,
      allowNull: false
    },

    business_stage: {
      type: DataTypes.STRING,
      allowNull: false
    },

    funding_need_usd: {
      type: DataTypes.FLOAT,
      allowNull: false
    },

    business_registered_in: DataTypes.STRING,
    founder_age: DataTypes.INTEGER,
    founder_gender: DataTypes.STRING,
    business_age_months: DataTypes.INTEGER,
    annual_revenue_usd: DataTypes.FLOAT,
    employees: DataTypes.INTEGER,
    innovation_level: DataTypes.STRING,
    has_prototype: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    targets_underserved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }

  }, {
    tableName: "readiness",
    timestamps: true
  });
};