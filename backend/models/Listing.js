import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    // Basic Information
    propertyName: {
      type: String,
      required: [true, 'Property name is required'],
      trim: true,
    },
    listingId: {
      type: String,
      required: [true, 'Listing ID is required'],
      unique: true,
      trim: true,
    },
    externalName: {
      type: String,
      trim: true,
      default: '',
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    
    // Location
    address: {
      type: String,
      trim: true,
      default: '',
    },
    city: {
      type: String,
      trim: true,
      default: '',
    },
    country: {
      type: String,
      trim: true,
      default: '',
    },
    location: {
      type: String,
      trim: true,
      default: '',
    },
    directions: {
      type: String,
      trim: true,
      default: '',
    },
    
    // Property Details
    propertyType: {
      type: String,
      trim: true,
      default: '',
    },
    roomType: {
      type: String,
      trim: true,
      default: '',
    },
    capacity: {
      type: Number,
      default: 0,
    },
    maxGuests: {
      type: Number,
      default: 0,
    },
    bedrooms: {
      type: Number,
      default: 0,
    },
    beds: {
      type: Number,
      default: 0,
    },
    bathrooms: {
      type: Number,
      default: 0,
    },
    
    // Pricing
    price: {
      type: Number,
      default: 0,
    },
    basePrice: {
      type: Number,
      default: 0,
    },
    cleaningFee: {
      type: Number,
      default: 0,
    },
    weeklyDiscount: {
      type: Number,
      default: 0,
    },
    monthlyDiscount: {
      type: Number,
      default: 0,
    },
    longTermDiscounts: {
      type: String,
      trim: true,
      default: '',
    },
    additionalFees: {
      type: String,
      trim: true,
      default: '',
    },
    taxes: {
      type: String,
      trim: true,
      default: '',
    },
    payoutMethod: {
      type: String,
      trim: true,
      default: '',
    },
    payoutCurrency: {
      type: String,
      default: 'USD',
    },
    
    // Check-in/Check-out
    checkInTime: {
      type: String,
      trim: true,
      default: '',
    },
    checkOutTime: {
      type: String,
      trim: true,
      default: '',
    },
    checkIn: {
      type: String,
      trim: true,
      default: '',
    },
    checkOut: {
      type: String,
      trim: true,
      default: '',
    },
    
    // Availability
    availability: {
      type: String,
      trim: true,
      default: '',
    },
    minimumNights: {
      type: Number,
      default: 1,
    },
    minimumStay: {
      type: String,
      trim: true,
      default: '',
    },
    maximumStay: {
      type: String,
      trim: true,
      default: '',
    },
    instantBookable: {
      type: Boolean,
      default: false,
    },
    instantBooking: {
      type: Boolean,
      default: false,
    },
    
    // Amenities and Features
    amenities: {
      type: [String],
      default: [],
    },
    
    // Rules and Policies
    houseRules: {
      type: String,
      trim: true,
      default: '',
    },
    guestRequirements: {
      type: String,
      trim: true,
      default: '',
    },
    cancellationPolicy: {
      type: String,
      trim: true,
      default: '',
    },
    freeCancellation: {
      type: Boolean,
      default: false,
    },
    
    // Channels and Distribution
    channels: {
      type: [String],
      default: [],
    },
    
    // Tags and Categories
    tags: {
      type: [String],
      default: [],
    },
    
    // Media
    image: {
      type: String,
      trim: true,
      default: '',
    },
    photos: {
      type: Number,
      default: 0,
    },
    
    // Insurance
    insurance: {
      type: String,
      trim: true,
      default: '',
    },
    
    // Reviews and Ratings
    reviews: {
      type: String,
      trim: true,
      default: '',
    },
    
    // Additional Information
    legalInformation: {
      type: String,
      trim: true,
      default: '',
    },
    translations: {
      type: String,
      trim: true,
      default: '',
    },
    
    // Custom Fields (stored as key-value pairs)
    customFields: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },
    
    // Status
    status: {
      type: String,
      enum: ['active', 'inactive', 'draft', 'archived'],
      default: 'active',
    },
    
    // Ownership
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
listingSchema.index({ listingId: 1 });
listingSchema.index({ propertyName: 1 });
listingSchema.index({ status: 1 });
listingSchema.index({ createdBy: 1 });
listingSchema.index({ city: 1, country: 1 });

// Update the updatedAt field before saving
listingSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;

