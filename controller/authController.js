const jwt = require('jsonwebtoken');
const User = require('../model/User');

const JWT_SECRET = process.env.JWT_SECRET || 'yoursecret';

const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
};

exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const user = new User({ name, email, password, role });
        await user.save();
        res.status(201).json({ message: 'User registered' });
    } catch (err) {
        res.status(400).json({ error: 'Signup failed', details: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = generateToken(user);
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Login failed' });
    }
};

exports.logout = async (req, res) => {
    res.json({ message: 'Logged out (JWT handled on client side)' });
};
