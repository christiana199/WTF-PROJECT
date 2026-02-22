require("dotenv").config();

const app = require("./src/app");
const sequelize = require("./src/config/connection");

const PORT = process.env.PORT || 5000;

async function start() {
  try {
        console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Unable to connect to database:", error);
  }
}

start();