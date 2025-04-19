const express = require("express");
const express = require("express");
require("dotenv").config();
console.log(process.env.PORT);
const app = express();
console.log("bad log")
console.log("bad log")

app.listen(process.env.PORT, () => {
  console.log("Listen to server port 3000");
})
