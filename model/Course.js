const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  description: { type: String, maxlength: 500 },
  image: { type: String, match: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp))$/i }
});

module.exports = mongoose.model('Course', courseSchema);
