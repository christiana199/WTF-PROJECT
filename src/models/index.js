const Sequelize = require("sequelize");
const sequelize = require("../config/connection");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.User = require("./userModel")(sequelize, Sequelize);
db.Readiness = require("./readinessModel")(sequelize, Sequelize);
db.MatchResult = require("./matchResultModel")(sequelize, Sequelize);

/*
====================================
Associations
====================================
*/

// 1️⃣ User → Readiness (One-to-One)
db.User.hasOne(db.Readiness, {
  foreignKey: {
    name: "user_id",
    allowNull: false
  },
  onDelete: "CASCADE"
});

db.Readiness.belongsTo(db.User, {
  foreignKey: "user_id"
});

// 2️⃣ Readiness → MatchResults (One-to-Many)
// One readiness submission can generate many AI matches
db.Readiness.hasMany(db.MatchResult, {
  foreignKey: {
    name: "readiness_id",
    allowNull: false
  },
  onDelete: "CASCADE"
});

db.MatchResult.belongsTo(db.Readiness, {
  foreignKey: "readiness_id"
});

// Optional: still allow querying matches directly from User
db.User.hasMany(db.MatchResult, {
  foreignKey: "user_id"
});

db.MatchResult.belongsTo(db.User, {
  foreignKey: "user_id"
});

module.exports = db;