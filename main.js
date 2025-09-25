const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const dbConnection = require("./database/connect");
const userRouters = require("./routes/userRoutes");
const cartRouters = require("./routes/cartRoutes");

dotenv.config();
const app = express();
const port = process.env.PORT;

dbConnection();

app.use(express.json());
app.use(cors());
app.use("/", userRouters);
app.use("/", cartRouters);

app.listen(port, () => {
  console.log(`app is running at port ${process.env.PORT}`);
});
