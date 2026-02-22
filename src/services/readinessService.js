const { Readiness } = require("../models");

const allowedFields = [
  "company_name",
  "sector",
  "nationality",
  "business_stage",
  "funding_need_usd",
  "business_registered_in",
  "founder_age",
  "founder_gender",
  "business_age_months",
  "annual_revenue_usd",
  "employees",
  "innovation_level",
  "has_prototype",
  "targets_underserved"
];

exports.submitReadinessService = async (userId, data) => {

  // 1️⃣ Filter only allowed fields
  const filteredData = Object.keys(data)
    .filter((key) => allowedFields.includes(key))
    .reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {});

  // 2️⃣ Normalize numeric fields
  if (filteredData.funding_need_usd)
    filteredData.funding_need_usd = Number(filteredData.funding_need_usd);

  if (filteredData.founder_age)
    filteredData.founder_age = Number(filteredData.founder_age);

  if (filteredData.business_age_months)
    filteredData.business_age_months = Number(filteredData.business_age_months);

  if (filteredData.annual_revenue_usd)
    filteredData.annual_revenue_usd = Number(filteredData.annual_revenue_usd);

  if (filteredData.employees)
    filteredData.employees = Number(filteredData.employees);

  // 3️⃣ Normalize boolean fields
  if (filteredData.has_prototype !== undefined)
    filteredData.has_prototype = Boolean(filteredData.has_prototype);

  if (filteredData.targets_underserved !== undefined)
    filteredData.targets_underserved = Boolean(filteredData.targets_underserved);

  // 4️⃣ Protect required AI fields
  const requiredFields = [
    "company_name",
    "sector",
    "nationality",
    "business_stage",
    "funding_need_usd"
  ];

  for (const field of requiredFields) {
    if (!filteredData[field]) {
      throw new Error(`${field} is required`);
    }
  }

  // 5️⃣ Check if readiness exists
  const existing = await Readiness.findOne({
    where: { user_id: userId }
  });

  let readiness;

  if (existing) {
    readiness = await existing.update(filteredData);
  } else {
    readiness = await Readiness.create({
      ...filteredData,
      user_id: userId
    });
  }

  // 6️⃣ Return plain object (clean response)
  return readiness.toJSON();
};