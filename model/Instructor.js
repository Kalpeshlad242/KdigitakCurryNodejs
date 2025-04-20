const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,  // Email format validation
  },
});

module.exports = mongoose.model('Instructor', instructorSchema);
