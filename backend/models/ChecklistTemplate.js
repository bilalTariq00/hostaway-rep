import mongoose from 'mongoose';

const checklistTemplateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Template name is required'],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    tasks: [
      {
        item: {
          type: String,
          required: true,
        },
        order: {
          type: Number,
          default: 0,
        },
      },
    ],
    // Category for organization
    category: {
      type: String,
      trim: true,
      default: '',
    },
    // Usage count
    usageCount: {
      type: Number,
      default: 0,
    },
    // Created by
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Is active
    isActive: {
      type: Boolean,
      default: true,
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
checklistTemplateSchema.index({ name: 1 });
checklistTemplateSchema.index({ category: 1 });
checklistTemplateSchema.index({ createdBy: 1 });
checklistTemplateSchema.index({ isActive: 1 });
checklistTemplateSchema.index({ createdAt: -1 });

// Method to increment usage count
checklistTemplateSchema.methods.incrementUsage = async function () {
  this.usageCount += 1;
  await this.save();
};

// Method to convert to task checklist format
checklistTemplateSchema.methods.toTaskChecklist = function () {
  return this.tasks.map((task) => ({
    item: task.item,
    completed: false,
    completedAt: null,
    completedBy: null,
  }));
};

const ChecklistTemplate =
  mongoose.models.ChecklistTemplate || mongoose.model('ChecklistTemplate', checklistTemplateSchema);

export default ChecklistTemplate;

