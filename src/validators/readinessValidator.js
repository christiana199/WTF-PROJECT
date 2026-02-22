const { body } = require("express-validator");

exports.validateReadiness = [
  body("hasFinancialRecords")
    .isBoolean()
    .withMessage("hasFinancialRecords must be a boolean"),

  body("hasTaxClearance")
    .isBoolean()
    .withMessage("hasTaxClearance must be a boolean"),

  body("hasBusinessPlan")
    .isBoolean()
    .withMessage("hasBusinessPlan must be a boolean"),

  body("annualRevenue")
    .isFloat({ min: 0 })
    .withMessage("annualRevenue must be a positive number")
];
