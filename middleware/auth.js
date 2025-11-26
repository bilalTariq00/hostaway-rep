import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware to authenticate JWT token
export const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Authorization required.',
      });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token',
      });
    }

    // Find user
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (user.status !== 'active') {
      return res.status(403).json({
        success: false,
        message: 'Your account is not active',
      });
    }

    // Attach user to request
    req.user = user;
    req.userId = decoded.userId;
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during authentication',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// Middleware to check user role
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required roles: ${roles.join(', ')}`,
      });
    }

    next();
  };
};

// Helper function to check if user is super admin
export const isSuperAdmin = (user) => {
  return user && user.role === 'super-admin';
};

// Helper function to check if user is manager or above
export const isManagerOrAbove = (user) => {
  return user && ['super-admin', 'manager'].includes(user.role);
};

// Helper function to check if user can manage another user
export const canManageUser = (manager, targetUser) => {
  if (!manager || !targetUser) return false;
  
  // Super admin can manage everyone
  if (manager.role === 'super-admin') return true;
  
  // Manager can manage associates and team members
  if (manager.role === 'manager') {
    return ['associate', 'team'].includes(targetUser.role);
  }
  
  // Users can only manage themselves
  return manager._id.toString() === targetUser._id.toString();
};

export default { authenticate, authorize, isSuperAdmin, isManagerOrAbove, canManageUser };

