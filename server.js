const express = require("express");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
console.log(process.env.PORT);
const app = express();
app.listen(process.env.PORT, () => {
  console.log("Listen to server port 3000");
})
