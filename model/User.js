const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'instructor'], default: 'instructor' }
});

userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) return next();
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        return next(err); // Pass the error to the next middleware
    }
});

userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (err) {
        throw new Error('Password comparison failed');
    }
};

module.exports = mongoose.model('User', userSchema);
