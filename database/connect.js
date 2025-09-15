const { connect } = require("mongoose");

function dbConnection() {
  connect(process.env.MONGO_URI)
    .then(() => console.log("data base connected"))
    .catch((err) => console.log("error in data base connection:", err.message));
}

module.exports = dbConnection;
