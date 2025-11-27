import express from 'express';
import ChecklistTemplate from '../models/ChecklistTemplate.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// @route   GET /api/checklist-templates
// @desc    Get all checklist templates
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 50 } = req.query;

    const filter = {};

    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const templates = await ChecklistTemplate.find(filter)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await ChecklistTemplate.countDocuments(filter);

    res.json({
      success: true,
      data: templates,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Get checklist templates error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @route   GET /api/checklist-templates/:id
// @desc    Get single checklist template by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const template = await ChecklistTemplate.findById(req.params.id).populate(
      'createdBy',
      'name email'
    );

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Checklist template not found',
      });
    }

    res.json({
      success: true,
      data: template,
    });
  } catch (error) {
    console.error('Get checklist template error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @route   POST /api/checklist-templates
// @desc    Create new checklist template
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { name, description, tasks, category } = req.body;

    if (!name || !tasks || !Array.isArray(tasks) || tasks.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Name and tasks array are required',
      });
    }

    // Convert array of strings to task objects
    const taskObjects = tasks.map((task, index) => {
      if (typeof task === 'string') {
        return {
          item: task,
          order: index,
        };
      }
      return {
        item: task.item || task,
        order: task.order !== undefined ? task.order : index,
      };
    });

    const templateData = {
      name,
      description: description || '',
      tasks: taskObjects,
      category: category || '',
      createdBy: req.userId,
    };

    const template = new ChecklistTemplate(templateData);
    await template.save();

    await template.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Checklist template created successfully',
      data: template,
    });
  } catch (error) {
    console.error('Create checklist template error:', error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Template with this name already exists',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @route   PUT /api/checklist-templates/:id
// @desc    Update checklist template
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const template = await ChecklistTemplate.findById(req.params.id);

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Checklist template not found',
      });
    }

    const { name, description, tasks, category } = req.body;

    if (name) template.name = name;
    if (description !== undefined) template.description = description;
    if (category !== undefined) template.category = category;

    if (tasks && Array.isArray(tasks)) {
      // Convert array of strings to task objects
      template.tasks = tasks.map((task, index) => {
        if (typeof task === 'string') {
          return {
            item: task,
            order: index,
          };
        }
        return {
          item: task.item || task,
          order: task.order !== undefined ? task.order : index,
        };
      });
    }

    await template.save();

    await template.populate('createdBy', 'name email');

    res.json({
      success: true,
      message: 'Checklist template updated successfully',
      data: template,
    });
  } catch (error) {
    console.error('Update checklist template error:', error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Template with this name already exists',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @route   DELETE /api/checklist-templates/:id
// @desc    Delete checklist template
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const template = await ChecklistTemplate.findById(req.params.id);

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Checklist template not found',
      });
    }

    await ChecklistTemplate.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Checklist template deleted successfully',
    });
  } catch (error) {
    console.error('Delete checklist template error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @route   POST /api/checklist-templates/:id/duplicate
// @desc    Duplicate checklist template
// @access  Private
router.post('/:id/duplicate', async (req, res) => {
  try {
    const originalTemplate = await ChecklistTemplate.findById(req.params.id);

    if (!originalTemplate) {
      return res.status(404).json({
        success: false,
        message: 'Checklist template not found',
      });
    }

    const templateData = originalTemplate.toObject();
    delete templateData._id;
    delete templateData.createdAt;
    delete templateData.updatedAt;
    delete templateData.usageCount;

    templateData.name = `${templateData.name} (Copy)`;
    templateData.createdBy = req.userId;

    const newTemplate = new ChecklistTemplate(templateData);
    await newTemplate.save();

    await newTemplate.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Checklist template duplicated successfully',
      data: newTemplate,
    });
  } catch (error) {
    console.error('Duplicate checklist template error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

export default router;

