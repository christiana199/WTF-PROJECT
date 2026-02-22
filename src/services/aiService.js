const axios = require("axios");

const AI_BASE_URL = process.env.AI_BASE_URL || "http://127.0.0.1:8000";

/*
========================================
Send Readiness Data To FastAPI
========================================
*/
exports.sendToAI = async (readiness) => {
  try {
    // 1️⃣ Validate required AI fields
    const requiredFields = [
      "company_name",
      "sector",
      "nationality",
      "business_stage",
      "funding_need_usd"
    ];

    for (const field of requiredFields) {
      if (!readiness[field]) {
        throw new Error(`Missing required field for AI: ${field}`);
      }
    }

    // 2️⃣ Build payload exactly as FastAPI expects
    const payload = {
      company_name: readiness.company_name,
      sector: readiness.sector,
      nationality: readiness.nationality,
      business_stage: readiness.business_stage,
      funding_need_usd: Number(readiness.funding_need_usd),

      business_registered_in: readiness.business_registered_in || null,
      founder_age: readiness.founder_age
        ? Number(readiness.founder_age)
        : null,
      founder_gender: readiness.founder_gender || null,
      business_age_months: readiness.business_age_months
        ? Number(readiness.business_age_months)
        : null,
      annual_revenue_usd: readiness.annual_revenue_usd
        ? Number(readiness.annual_revenue_usd)
        : null,
      employees: readiness.employees
        ? Number(readiness.employees)
        : null,
      innovation_level: readiness.innovation_level || null,
      has_prototype: Boolean(readiness.has_prototype),
      targets_underserved: Boolean(readiness.targets_underserved)
    };

    console.log("Creating company in AI service...");
    
    // 3️⃣ Create company in FastAPI
    const createCompanyResponse = await axios.post(
      `${AI_BASE_URL}/api/v1/companies`,
      payload,
      { timeout: 15000 }
    );

    const companyId = createCompanyResponse.data.id;

    if (!companyId) {
      throw new Error("Company ID not returned from AI service");
    }

    console.log("Company created. Running match...");

    // 4️⃣ Run matching using company ID
    const matchResponse = await axios.post(
      `${AI_BASE_URL}/api/v1/match/${companyId}`,
      {},
      { timeout: 20000 }
    );

    return matchResponse.data;

  } catch (err) {
    console.error("AI Integration Error:");
    console.error(err.response?.data || err.message);
    throw err;
  }
};