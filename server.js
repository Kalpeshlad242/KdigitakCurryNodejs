const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
app.listen(process.env.PORT, () => {
  console.log("Listen to server port 3000");
});

