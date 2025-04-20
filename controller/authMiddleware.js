const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'KDiditalCurry';

// Authentication Middleware
exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authorization header missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('JWT verification failed:', err);
    }
    res.status(403).json({ success: false, message: 'Invalid or expired token' });
  }
};

// Role-based Authorization Middleware
exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ success: false, message: 'Access denied: user role not found' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Access denied: insufficient role' });
    }

    next();
  };
};
