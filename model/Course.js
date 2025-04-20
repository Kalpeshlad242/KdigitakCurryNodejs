const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    level: { type: String },
    description: { type: String },
    Image: { type: String }
});

module.exports = mongoose.model('Course', courseSchema);
