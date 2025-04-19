const express = require('express');
require('dotenv').config();
const app = express();
console.log('Hello');
console.log('Hello');
app.listen(process.env.PORT, () => {
  console.log('Listen to server port 3000');
});
