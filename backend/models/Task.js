import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['To Do', 'In Progress', 'Completed', 'Pending', 'Cancelled'],
      default: 'To Do',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    // User assignments
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    supervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    group: {
      type: String,
      trim: true,
      default: '',
    },
    // Dates and times
    startDate: {
      type: Date,
      default: null,
    },
    startTime: {
      type: String,
      default: '',
    },
    endDate: {
      type: Date,
      default: null,
    },
    endTime: {
      type: String,
      default: '',
    },
    dueDate: {
      type: Date,
      default: null,
    },
    // Property and booking information
    listing: {
      type: String,
      trim: true,
      default: '',
    },
    listingId: {
      type: String,
      trim: true,
      default: '',
    },
    channel: {
      type: String,
      trim: true,
      default: '',
    },
    reservation: {
      type: String,
      trim: true,
      default: '',
    },
    reservationId: {
      type: String,
      trim: true,
      default: '',
    },
    category: {
      type: String,
      trim: true,
      default: '',
    },
    // Cost information
    cost: {
      type: Number,
      default: 0,
    },
    costCurrency: {
      type: String,
      default: 'USD',
    },
    costDescription: {
      type: String,
      trim: true,
      default: '',
    },
    autoGenerateExpense: {
      type: Boolean,
      default: false,
    },
    // Checklist items
    checklist: [
      {
        item: {
          type: String,
          required: true,
        },
        completed: {
          type: Boolean,
          default: false,
        },
        completedAt: {
          type: Date,
          default: null,
        },
        completedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          default: null,
        },
      },
    ],
    // Attachments
    attachments: [
      {
        name: String,
        url: String,
        type: String,
        size: Number,
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
        uploadedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
    // Custom fields
    customFields: [
      {
        name: String,
        value: mongoose.Schema.Types.Mixed,
        type: {
          type: String,
          enum: ['text', 'number', 'date', 'boolean'],
        },
      },
    ],
    // Feedback and resolution
    feedbackScore: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    resolutionNote: {
      type: String,
      trim: true,
      default: '',
    },
    feedbackNote: {
      type: String,
      trim: true,
      default: '',
    },
    // Archive management
    isArchived: {
      type: Boolean,
      default: false,
    },
    archivedDate: {
      type: Date,
      default: null,
    },
    archivedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    // Auto-task reference (if created from auto-task)
    autoTaskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AutoTask',
      default: null,
    },
    // Checklist template reference (if created from template)
    checklistTemplateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChecklistTemplate',
      default: null,
    },
    // Created by
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Updated by
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Indexes for faster queries
taskSchema.index({ assignee: 1 });
taskSchema.index({ supervisor: 1 });
taskSchema.index({ status: 1 });
taskSchema.index({ priority: 1 });
taskSchema.index({ dueDate: 1 });
taskSchema.index({ isArchived: 1 });
taskSchema.index({ listing: 1 });
taskSchema.index({ channel: 1 });
taskSchema.index({ createdBy: 1 });
taskSchema.index({ createdAt: -1 });

// Virtual for formatted due date
taskSchema.virtual('formattedDueDate').get(function () {
  if (!this.dueDate) return null;
  return this.dueDate.toISOString().split('T')[0];
});

// Method to archive task
taskSchema.methods.archive = async function (userId) {
  this.isArchived = true;
  this.archivedDate = Date.now();
  this.archivedBy = userId;
  await this.save();
};

// Method to restore task
taskSchema.methods.restore = async function () {
  this.isArchived = false;
  this.archivedDate = null;
  this.archivedBy = null;
  await this.save();
};

// Method to complete checklist item
taskSchema.methods.completeChecklistItem = async function (itemIndex, userId) {
  if (this.checklist[itemIndex]) {
    this.checklist[itemIndex].completed = true;
    this.checklist[itemIndex].completedAt = Date.now();
    this.checklist[itemIndex].completedBy = userId;
    await this.save();
  }
};

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

export default Task;

