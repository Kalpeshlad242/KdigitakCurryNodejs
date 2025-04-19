const express = require("express");
require("dotenv").config();
const app = express();
app.listen(process.env.PORT, () => {
  console.log("Listen to server port 3000");
})
