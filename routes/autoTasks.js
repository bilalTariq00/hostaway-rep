import express from 'express';
import AutoTask from '../models/AutoTask.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// @route   GET /api/auto-tasks
// @desc    Get all auto-tasks
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { status, startingEvent, linkedChannel, page = 1, limit = 50 } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }
    if (startingEvent) {
      filter.startingEvent = startingEvent;
    }
    if (linkedChannel) {
      filter.linkedChannel = { $regex: linkedChannel, $options: 'i' };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const autoTasks = await AutoTask.find(filter)
      .populate('assignee', 'name email')
      .populate('supervisor', 'name email')
      .populate('checklistTemplateId', 'name tasks')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await AutoTask.countDocuments(filter);

    res.json({
      success: true,
      data: autoTasks,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Get auto-tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @route   GET /api/auto-tasks/:id
// @desc    Get single auto-task by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const autoTask = await AutoTask.findById(req.params.id)
      .populate('assignee', 'name email role')
      .populate('supervisor', 'name email role')
      .populate('checklistTemplateId', 'name tasks')
      .populate('createdBy', 'name email');

    if (!autoTask) {
      return res.status(404).json({
        success: false,
        message: 'Auto-task not found',
      });
    }

    res.json({
      success: true,
      data: autoTask,
    });
  } catch (error) {
    console.error('Get auto-task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @route   POST /api/auto-tasks
// @desc    Create new auto-task
// @access  Private
router.post('/', async (req, res) => {
  try {
    const autoTaskData = {
      ...req.body,
      createdBy: req.userId,
    };

    const autoTask = new AutoTask(autoTaskData);
    await autoTask.save();

    await autoTask.populate('assignee', 'name email');
    await autoTask.populate('supervisor', 'name email');
    await autoTask.populate('checklistTemplateId', 'name tasks');
    await autoTask.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Auto-task created successfully',
      data: autoTask,
    });
  } catch (error) {
    console.error('Create auto-task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @route   PUT /api/auto-tasks/:id
// @desc    Update auto-task
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const autoTask = await AutoTask.findById(req.params.id);

    if (!autoTask) {
      return res.status(404).json({
        success: false,
        message: 'Auto-task not found',
      });
    }

    Object.assign(autoTask, req.body);
    await autoTask.save();

    await autoTask.populate('assignee', 'name email');
    await autoTask.populate('supervisor', 'name email');
    await autoTask.populate('checklistTemplateId', 'name tasks');

    res.json({
      success: true,
      message: 'Auto-task updated successfully',
      data: autoTask,
    });
  } catch (error) {
    console.error('Update auto-task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @route   DELETE /api/auto-tasks/:id
// @desc    Delete auto-task
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const autoTask = await AutoTask.findById(req.params.id);

    if (!autoTask) {
      return res.status(404).json({
        success: false,
        message: 'Auto-task not found',
      });
    }

    await AutoTask.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Auto-task deleted successfully',
    });
  } catch (error) {
    console.error('Delete auto-task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @route   POST /api/auto-tasks/:id/toggle-status
// @desc    Toggle auto-task status (Active/Inactive)
// @access  Private
router.post('/:id/toggle-status', async (req, res) => {
  try {
    const autoTask = await AutoTask.findById(req.params.id);

    if (!autoTask) {
      return res.status(404).json({
        success: false,
        message: 'Auto-task not found',
      });
    }

    await autoTask.toggleStatus();

    res.json({
      success: true,
      message: 'Auto-task status updated',
      data: autoTask,
    });
  } catch (error) {
    console.error('Toggle auto-task status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @route   POST /api/auto-tasks/:id/run
// @desc    Run auto-task manually
// @access  Private
router.post('/:id/run', async (req, res) => {
  try {
    const autoTask = await AutoTask.findById(req.params.id);

    if (!autoTask) {
      return res.status(404).json({
        success: false,
        message: 'Auto-task not found',
      });
    }

    if (autoTask.status !== 'Active') {
      return res.status(400).json({
        success: false,
        message: 'Auto-task must be active to run',
      });
    }

    // TODO: Implement actual task creation logic based on reservations
    // For now, just update last run time
    await autoTask.run();

    res.json({
      success: true,
      message: 'Auto-task executed successfully',
      data: autoTask,
    });
  } catch (error) {
    console.error('Run auto-task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @route   POST /api/auto-tasks/:id/duplicate
// @desc    Duplicate auto-task
// @access  Private
router.post('/:id/duplicate', async (req, res) => {
  try {
    const originalAutoTask = await AutoTask.findById(req.params.id);

    if (!originalAutoTask) {
      return res.status(404).json({
        success: false,
        message: 'Auto-task not found',
      });
    }

    const autoTaskData = originalAutoTask.toObject();
    delete autoTaskData._id;
    delete autoTaskData.createdAt;
    delete autoTaskData.updatedAt;
    delete autoTaskData.lastRunAt;
    delete autoTaskData.tasksCreated;

    autoTaskData.name = `${autoTaskData.name} (Copy)`;
    autoTaskData.status = 'Inactive'; // Set to inactive by default
    autoTaskData.createdBy = req.userId;

    const newAutoTask = new AutoTask(autoTaskData);
    await newAutoTask.save();

    await newAutoTask.populate('assignee', 'name email');
    await newAutoTask.populate('supervisor', 'name email');
    await newAutoTask.populate('checklistTemplateId', 'name tasks');
    await newAutoTask.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Auto-task duplicated successfully',
      data: newAutoTask,
    });
  } catch (error) {
    console.error('Duplicate auto-task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

export default router;

