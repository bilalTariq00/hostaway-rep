import express from 'express';
import User from '../models/User.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// @route   GET /api/users
// @desc    Get all users (for dropdowns, assignments, etc.)
// @access  Private
router.get('/', async (req, res) => {
  try {
    console.log('📥 GET /api/users - Request received');
    const { role, status, search, page = 1, limit = 100 } = req.query;

    // Build filter
    const filter = {};

    if (role) {
      if (Array.isArray(role)) {
        filter.role = { $in: role };
      } else {
        filter.role = role;
      }
    }

    if (status) {
      filter.status = status;
    } else {
      // By default, only show active users
      filter.status = 'active';
    }

    // Search filter
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const users = await User.find(filter)
      .select('name email role status')
      .sort({ name: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(filter);

    // Format response
    const formattedUsers = users.map((user) => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    }));

    console.log(`✅ GET /api/users - Returning ${formattedUsers.length} users`);
    res.json({
      success: true,
      data: formattedUsers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @route   GET /api/users/:id
// @desc    Get single user by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      data: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        avatar: user.avatar,
        assignedClients: user.assignedClients || [],
        assignedProperties: user.assignedProperties || [],
        assignedUsers: user.assignedUsers?.map(id => id.toString()) || [],
        assignedManager: user.assignedManager?.toString() || undefined,
        assignedSupervisor: user.assignedSupervisor?.toString() || undefined,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @route   GET /api/users/by-role/:role
// @desc    Get users by role
// @access  Private
router.get('/by-role/:role', async (req, res) => {
  try {
    const { role } = req.params;
    const users = await User.find({ role, status: 'active' })
      .select('name email role')
      .sort({ name: 1 });

    const formattedUsers = users.map((user) => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    }));

    res.json({
      success: true,
      data: formattedUsers,
    });
  } catch (error) {
    console.error('Get users by role error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

export default router;

