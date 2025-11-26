import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
      index: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Don't return password by default
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    role: {
      type: String,
      enum: ['super-admin', 'manager', 'associate', 'team'],
      required: [true, 'Role is required'],
      default: 'team',
    },
    avatar: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'suspended'],
      default: 'active',
    },
    // For associates - assigned clients and properties
    assignedClients: [{
      type: String,
    }],
    assignedProperties: [{
      type: String,
    }],
    // For managers and supervisors - users they manage
    assignedUsers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    // For associates - their manager
    assignedManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    // For associates - their supervisor
    assignedSupervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    // Timestamps
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    if (typeof next === 'function') {
      return next();
    }
    return;
  }

  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    if (typeof next === 'function') {
      return next();
    }
  } catch (error) {
    if (typeof next === 'function') {
      return next(error);
    }
    throw error;
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to update last login
userSchema.methods.updateLastLogin = async function () {
  this.lastLogin = Date.now();
  await this.save();
};

// Static method to find user by email
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email.toLowerCase() });
};

// Index for faster queries (email index already defined in schema)
userSchema.index({ role: 1 });
userSchema.index({ status: 1 });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;

