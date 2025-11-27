import mongoose from 'mongoose';

const autoTaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Auto-task name is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    // Starting event configuration
    startingEvent: {
      type: String,
      enum: [
        'Check-in',
        'Check-out',
        'Booking Confirmed',
        'Issue Reported',
        'Reservation Created',
        'Reservation Cancelled',
        'Payment Received',
      ],
      required: [true, 'Starting event is required'],
    },
    // Task timing configuration
    startsAtValue: {
      type: Number,
      default: 0,
    },
    startsAtUnit: {
      type: String,
      enum: ['Hours', 'Days', 'Weeks'],
      default: 'Hours',
    },
    startsAtTiming: {
      type: String,
      enum: ['Before', 'After', 'At'],
      default: 'Before',
    },
    startsAtEvent: {
      type: String,
      default: 'Check-in',
    },
    // Due date configuration
    shouldEndByValue: {
      type: Number,
      default: 0,
    },
    shouldEndByUnit: {
      type: String,
      enum: ['Hours', 'Days', 'Weeks'],
      default: 'Hours',
    },
    shouldEndByTiming: {
      type: String,
      enum: ['Before', 'After', 'At'],
      default: 'Before',
    },
    shouldEndByEvent: {
      type: String,
      default: 'Check-out',
    },
    // Status
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    // Assignments
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
    category: {
      type: String,
      trim: true,
      default: '',
    },
    // Linked properties
    linkedChannel: {
      type: String,
      trim: true,
      default: '',
    },
    linkedListings: [
      {
        type: String,
        trim: true,
      },
    ],
    addAutomaticallyNewListings: {
      type: Boolean,
      default: false,
    },
    // Checklist template
    checklistTemplateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChecklistTemplate',
      default: null,
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
      },
    ],
    // Options
    createTasksForExistingReservations: {
      type: Boolean,
      default: false,
    },
    // Created by
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Last run information
    lastRunAt: {
      type: Date,
      default: null,
    },
    tasksCreated: {
      type: Number,
      default: 0,
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

// Indexes
autoTaskSchema.index({ status: 1 });
autoTaskSchema.index({ startingEvent: 1 });
autoTaskSchema.index({ linkedChannel: 1 });
autoTaskSchema.index({ createdBy: 1 });
autoTaskSchema.index({ createdAt: -1 });

// Method to activate/deactivate
autoTaskSchema.methods.toggleStatus = async function () {
  this.status = this.status === 'Active' ? 'Inactive' : 'Active';
  await this.save();
};

// Method to run auto-task (creates tasks based on reservations)
autoTaskSchema.methods.run = async function () {
  // This would be implemented to create tasks based on reservations
  // For now, just update last run time
  this.lastRunAt = Date.now();
  await this.save();
};

const AutoTask = mongoose.models.AutoTask || mongoose.model('AutoTask', autoTaskSchema);

export default AutoTask;

