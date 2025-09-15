const express = require("express");
const dotenv = require("dotenv");

const dbConnection = require("./database/connect");
const userRouters = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT;

dotenv.config();
dbConnection();

app.use(express.json());
app.use("/", userRouters);

app.listen(port, () => {
  console.log(`app is running at port ${process.env.PORT}`);
});
 