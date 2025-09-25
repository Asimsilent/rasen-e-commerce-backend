const { connect } = require("mongoose");

const dbConnection = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log("✅ Database connected");
  } catch (err) {
    console.error("❌ Error in database connection:", err.message);
  }
};

module.exports = dbConnection;
