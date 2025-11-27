import express from 'express';
import mongoose from 'mongoose';
import Task from '../models/Task.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// @route   GET /api/tasks
// @desc    Get all tasks with filters
// @access  Private
router.get('/', async (req, res) => {
  try {
    const {
      status,
      priority,
      assignee,
      supervisor,
      listing,
      channel,
      isArchived,
      search,
      page = 1,
      limit = 50,
      sortBy = 'dueDate',
      sortOrder = 'asc',
    } = req.query;

    // Build filter object
    const filter = {};

    // Archive filter
    if (isArchived !== undefined) {
      filter.isArchived = isArchived === 'true';
    } else {
      // By default, show non-archived tasks
      filter.isArchived = false;
    }

    // Status filter
    if (status) {
      if (Array.isArray(status)) {
        filter.status = { $in: status };
      } else {
        filter.status = status;
      }
    }

    // Priority filter
    if (priority) {
      if (Array.isArray(priority)) {
        filter.priority = { $in: priority };
      } else {
        filter.priority = priority;
      }
    }

    // Assignee filter
    if (assignee) {
      filter.assignee = assignee;
    }

    // Supervisor filter
    if (supervisor) {
      filter.supervisor = supervisor;
    }

    // Listing filter
    if (listing) {
      filter.listing = { $regex: listing, $options: 'i' };
    }

    // Channel filter
    if (channel) {
      filter.channel = { $regex: channel, $options: 'i' };
    }

    // Search filter (searches in title and description)
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const tasks = await Task.find(filter)
      .populate('assignee', 'name email')
      .populate('supervisor', 'name email')
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Task.countDocuments(filter);

    res.json({
      success: true,
      data: tasks,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @route   GET /api/tasks/:id
// @desc    Get single task by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignee', 'name email role')
      .populate('supervisor', 'name email role')
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .populate('archivedBy', 'name email');

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @route   POST /api/tasks
// @desc    Create new task
// @access  Private
router.post('/', async (req, res) => {
  try {
    console.log('📝 Creating task, received data:', {
      title: req.body.title,
      attachmentsType: typeof req.body.attachments,
      attachmentsIsArray: Array.isArray(req.body.attachments),
      attachmentsLength: Array.isArray(req.body.attachments) ? req.body.attachments.length : 'N/A',
    });

    const taskData = {
      ...req.body,
      createdBy: req.userId,
    };

    // Handle empty assignee/supervisor - convert empty strings to null
    if (taskData.assignee === '' || taskData.assignee === null) {
      taskData.assignee = null;
    }
    if (taskData.supervisor === '' || taskData.supervisor === null) {
      taskData.supervisor = null;
    }

    // Handle cost - convert null to 0
    if (taskData.cost === null || taskData.cost === undefined || taskData.cost === '') {
      taskData.cost = 0;
    } else if (typeof taskData.cost === 'string') {
      taskData.cost = parseFloat(taskData.cost) || 0;
    }

    // Handle attachments - parse if stringified
    if (typeof taskData.attachments === 'string') {
      try {
        taskData.attachments = JSON.parse(taskData.attachments);
        console.log('✅ Parsed attachments from string');
      } catch (e) {
        console.error('❌ Failed to parse attachments:', e);
        taskData.attachments = [];
      }
    }
    
    // Ensure attachments is an array
    if (!Array.isArray(taskData.attachments)) {
      console.warn('⚠️ Attachments is not an array, converting to empty array');
      taskData.attachments = [];
    }
    
    // Ensure attachments have the correct structure
    taskData.attachments = taskData.attachments.map((att, index) => {
      // Handle nested stringified objects
      if (typeof att === 'string') {
        try {
          att = JSON.parse(att);
        } catch (e) {
          console.warn(`⚠️ Failed to parse attachment at index ${index}:`, e);
          return null;
        }
      }
      
      // Ensure att is an object
      if (typeof att !== 'object' || att === null) {
        console.warn(`⚠️ Attachment at index ${index} is not an object:`, typeof att);
        return null;
      }
      
      return {
        name: att.name || att.filename || 'Unknown',
        url: att.url || '',
        type: att.type || 'application/octet-stream',
        size: att.size || 0,
        uploadedAt: att.uploadedAt ? new Date(att.uploadedAt) : new Date(),
        uploadedBy: att.uploadedBy || req.userId,
      };
    }).filter((att) => att !== null);
    
    console.log('✅ Processed attachments:', taskData.attachments.length);

    // Convert checklist array of strings to checklist objects
    if (Array.isArray(taskData.checklist) && taskData.checklist.length > 0) {
      if (typeof taskData.checklist[0] === 'string') {
        taskData.checklist = taskData.checklist
          .filter((item) => item && item.trim() !== '')
          .map((item) => ({
            item: item.trim(),
            completed: false,
          }));
      }
    } else {
      taskData.checklist = [];
    }

    // Convert date strings to Date objects, handle invalid dates
    if (taskData.startDate && typeof taskData.startDate === 'string') {
      const startDate = new Date(taskData.startDate);
      taskData.startDate = isNaN(startDate.getTime()) ? null : startDate;
    } else if (!taskData.startDate) {
      taskData.startDate = null;
    }

    if (taskData.endDate && typeof taskData.endDate === 'string') {
      const endDate = new Date(taskData.endDate);
      taskData.endDate = isNaN(endDate.getTime()) ? null : endDate;
    } else if (!taskData.endDate) {
      taskData.endDate = null;
    }

    if (taskData.dueDate && typeof taskData.dueDate === 'string') {
      const dueDate = new Date(taskData.dueDate);
      taskData.dueDate = isNaN(dueDate.getTime()) ? null : dueDate;
    } else if (!taskData.dueDate) {
      taskData.dueDate = null;
    }

    // Validate ObjectId fields
    if (taskData.assignee && !mongoose.Types.ObjectId.isValid(taskData.assignee)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid assignee ID',
      });
    }

    if (taskData.supervisor && !mongoose.Types.ObjectId.isValid(taskData.supervisor)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid supervisor ID',
      });
    }

    const task = new Task(taskData);
    await task.save();

    await task.populate('assignee', 'name email');
    await task.populate('supervisor', 'name email');
    await task.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task,
    });
  } catch (error) {
    console.error('Create task error:', error);
    console.error('Error details:', {
      message: error.message,
      name: error.name,
      stack: error.stack,
    });
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @route   PUT /api/tasks/:id
// @desc    Update task
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    const updateData = {
      ...req.body,
      updatedBy: req.userId,
    };

    // Convert checklist array of strings to checklist objects if needed
    if (Array.isArray(updateData.checklist) && updateData.checklist.length > 0) {
      if (typeof updateData.checklist[0] === 'string') {
        updateData.checklist = updateData.checklist.map((item) => ({
          item,
          completed: false,
        }));
      }
    }

    // Convert date strings to Date objects
    if (updateData.startDate && typeof updateData.startDate === 'string') {
      updateData.startDate = new Date(updateData.startDate);
    }
    if (updateData.endDate && typeof updateData.endDate === 'string') {
      updateData.endDate = new Date(updateData.endDate);
    }
    if (updateData.dueDate && typeof updateData.dueDate === 'string') {
      updateData.dueDate = new Date(updateData.dueDate);
    }

    Object.assign(task, updateData);
    await task.save();

    await task.populate('assignee', 'name email');
    await task.populate('supervisor', 'name email');
    await task.populate('updatedBy', 'name email');

    res.json({
      success: true,
      message: 'Task updated successfully',
      data: task,
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete task permanently
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @route   POST /api/tasks/:id/archive
// @desc    Archive task
// @access  Private
router.post('/:id/archive', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    await task.archive(req.userId);

    res.json({
      success: true,
      message: 'Task archived successfully',
      data: task,
    });
  } catch (error) {
    console.error('Archive task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @route   POST /api/tasks/:id/restore
// @desc    Restore archived task
// @access  Private
router.post('/:id/restore', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    await task.restore();

    res.json({
      success: true,
      message: 'Task restored successfully',
      data: task,
    });
  } catch (error) {
    console.error('Restore task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @route   POST /api/tasks/:id/checklist/:itemIndex/complete
// @desc    Complete checklist item
// @access  Private
router.post('/:id/checklist/:itemIndex/complete', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    const itemIndex = parseInt(req.params.itemIndex);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    if (itemIndex < 0 || itemIndex >= task.checklist.length) {
      return res.status(400).json({
        success: false,
        message: 'Invalid checklist item index',
      });
    }

    await task.completeChecklistItem(itemIndex, req.userId);

    res.json({
      success: true,
      message: 'Checklist item completed',
      data: task,
    });
  } catch (error) {
    console.error('Complete checklist item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @route   POST /api/tasks/:id/duplicate
// @desc    Duplicate task
// @access  Private
router.post('/:id/duplicate', async (req, res) => {
  try {
    const originalTask = await Task.findById(req.params.id);

    if (!originalTask) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Create new task from original
    const taskData = originalTask.toObject();
    delete taskData._id;
    delete taskData.createdAt;
    delete taskData.updatedAt;
    delete taskData.isArchived;
    delete taskData.archivedDate;
    delete taskData.archivedBy;

    taskData.title = `${taskData.title} (Copy)`;
    taskData.status = 'To Do';
    taskData.createdBy = req.userId;
    taskData.updatedBy = null;

    // Reset checklist completion
    if (taskData.checklist) {
      taskData.checklist = taskData.checklist.map((item) => ({
        item: item.item,
        completed: false,
        completedAt: null,
        completedBy: null,
      }));
    }

    const newTask = new Task(taskData);
    await newTask.save();

    await newTask.populate('assignee', 'name email');
    await newTask.populate('supervisor', 'name email');
    await newTask.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Task duplicated successfully',
      data: newTask,
    });
  } catch (error) {
    console.error('Duplicate task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

export default router;

