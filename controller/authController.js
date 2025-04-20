const jwt = require('jsonwebtoken');
const User = require('../model/User');

const JWT_SECRET = process.env.JWT_SECRET;

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: '1d',
  });
};

// Signup Controller
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
      }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }

    const user = new User({ name, email, password, role });
    await user.save();

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(400).json({ success: false, message: 'Signup failed', error: err.message });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(user);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Login failed', error: err.message });
  }
};

// Logout Controller
exports.logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully (Token management handled on client side)',
  });
};
