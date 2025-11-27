import express from 'express';
import mongoose from 'mongoose';
import Listing from '../models/Listing.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// @route   GET /api/listings
// @desc    Get all listings with filters
// @access  Private
router.get('/', async (req, res) => {
  try {
    const {
      status,
      propertyType,
      city,
      country,
      search,
      tags,
      channels,
      page = 1,
      limit = 50,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    // Build filter object
    const filter = {};

    // Status filter
    if (status) {
      if (Array.isArray(status)) {
        filter.status = { $in: status };
      } else {
        filter.status = status;
      }
    } else {
      // By default, show active listings
      filter.status = { $ne: 'archived' };
    }

    // Property type filter
    if (propertyType) {
      filter.propertyType = propertyType;
    }

    // Location filters
    if (city) {
      filter.city = { $regex: city, $options: 'i' };
    }
    if (country) {
      filter.country = { $regex: country, $options: 'i' };
    }

    // Tags filter
    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : [tags];
      filter.tags = { $in: tagArray };
    }

    // Channels filter
    if (channels) {
      const channelArray = Array.isArray(channels) ? channels : [channels];
      filter.channels = { $in: channelArray };
    }

    // Search filter (searches in propertyName, listingId, externalName, description, address)
    if (search) {
      filter.$or = [
        { propertyName: { $regex: search, $options: 'i' } },
        { listingId: { $regex: search, $options: 'i' } },
        { externalName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { address: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
        { country: { $regex: search, $options: 'i' } },
      ];
    }

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // Sort
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query
    const listings = await Listing.find(filter)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum)
      .lean();

    // Get total count for pagination
    const total = await Listing.countDocuments(filter);

    res.json({
      success: true,
      data: listings,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Get listings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching listings',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @route   GET /api/listings/:id
// @desc    Get single listing by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid listing ID',
      });
    }

    const listing = await Listing.findById(id)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .lean();

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found',
      });
    }

    res.json({
      success: true,
      data: listing,
    });
  } catch (error) {
    console.error('Get listing error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching listing',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @route   GET /api/listings/listing-id/:listingId
// @desc    Get listing by listingId (external ID)
// @access  Private
router.get('/listing-id/:listingId', async (req, res) => {
  try {
    const { listingId } = req.params;

    const listing = await Listing.findOne({ listingId })
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .lean();

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found',
      });
    }

    res.json({
      success: true,
      data: listing,
    });
  } catch (error) {
    console.error('Get listing by listingId error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching listing',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @route   POST /api/listings
// @desc    Create new listing
// @access  Private (Super-admin, Manager can create)
router.post('/', authorize('super-admin', 'manager'), async (req, res) => {
  try {
    const listingData = req.body;

    // Validate required fields
    if (!listingData.propertyName || !listingData.listingId) {
      return res.status(400).json({
        success: false,
        message: 'Property name and listing ID are required',
      });
    }

    // Check if listingId already exists
    const existingListing = await Listing.findOne({ listingId: listingData.listingId });
    if (existingListing) {
      return res.status(400).json({
        success: false,
        message: 'Listing ID already exists',
      });
    }

    // Set createdBy
    listingData.createdBy = req.userId;

    // Convert arrays if they're strings
    if (listingData.amenities && typeof listingData.amenities === 'string') {
      try {
        listingData.amenities = JSON.parse(listingData.amenities);
      } catch (e) {
        listingData.amenities = listingData.amenities.split(',').map((a) => a.trim());
      }
    }
    if (listingData.channels && typeof listingData.channels === 'string') {
      try {
        listingData.channels = JSON.parse(listingData.channels);
      } catch (e) {
        listingData.channels = listingData.channels.split(',').map((c) => c.trim());
      }
    }
    if (listingData.tags && typeof listingData.tags === 'string') {
      try {
        listingData.tags = JSON.parse(listingData.tags);
      } catch (e) {
        listingData.tags = listingData.tags.split(',').map((t) => t.trim());
      }
    }

    // Handle custom fields
    if (listingData.customFields && typeof listingData.customFields === 'object') {
      listingData.customFields = new Map(Object.entries(listingData.customFields));
    }

    // Create listing
    const listing = new Listing(listingData);
    await listing.save();

    // Populate createdBy
    await listing.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Listing created successfully',
      data: listing,
    });
  } catch (error) {
    console.error('Create listing error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors,
      });
    }

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Listing ID already exists',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating listing',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @route   PUT /api/listings/:id
// @desc    Update listing
// @access  Private (Super-admin, Manager can update)
router.put('/:id', authorize('super-admin', 'manager'), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid listing ID',
      });
    }

    // Check if listing exists
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found',
      });
    }

    // If listingId is being updated, check for duplicates
    if (updateData.listingId && updateData.listingId !== listing.listingId) {
      const existingListing = await Listing.findOne({ listingId: updateData.listingId });
      if (existingListing) {
        return res.status(400).json({
          success: false,
          message: 'Listing ID already exists',
        });
      }
    }

    // Set updatedBy
    updateData.updatedBy = req.userId;

    // Convert arrays if they're strings
    if (updateData.amenities && typeof updateData.amenities === 'string') {
      try {
        updateData.amenities = JSON.parse(updateData.amenities);
      } catch (e) {
        updateData.amenities = updateData.amenities.split(',').map((a) => a.trim());
      }
    }
    if (updateData.channels && typeof updateData.channels === 'string') {
      try {
        updateData.channels = JSON.parse(updateData.channels);
      } catch (e) {
        updateData.channels = updateData.channels.split(',').map((c) => c.trim());
      }
    }
    if (updateData.tags && typeof updateData.tags === 'string') {
      try {
        updateData.tags = JSON.parse(updateData.tags);
      } catch (e) {
        updateData.tags = updateData.tags.split(',').map((t) => t.trim());
      }
    }

    // Handle custom fields
    if (updateData.customFields && typeof updateData.customFields === 'object') {
      updateData.customFields = new Map(Object.entries(updateData.customFields));
    }

    // Update listing
    const updatedListing = await Listing.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    )
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .lean();

    res.json({
      success: true,
      message: 'Listing updated successfully',
      data: updatedListing,
    });
  } catch (error) {
    console.error('Update listing error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors,
      });
    }

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Listing ID already exists',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating listing',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @route   DELETE /api/listings/:id
// @desc    Delete listing
// @access  Private (Super-admin, Manager can delete)
router.delete('/:id', authorize('super-admin', 'manager'), async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid listing ID',
      });
    }

    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found',
      });
    }

    await Listing.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Listing deleted successfully',
    });
  } catch (error) {
    console.error('Delete listing error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting listing',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @route   POST /api/listings/:id/archive
// @desc    Archive listing
// @access  Private (Super-admin, Manager can archive)
router.post('/:id/archive', authorize('super-admin', 'manager'), async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid listing ID',
      });
    }

    const listing = await Listing.findByIdAndUpdate(
      id,
      { 
        $set: { 
          status: 'archived',
          updatedBy: req.userId,
        } 
      },
      { new: true }
    )
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .lean();

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found',
      });
    }

    res.json({
      success: true,
      message: 'Listing archived successfully',
      data: listing,
    });
  } catch (error) {
    console.error('Archive listing error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while archiving listing',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @route   POST /api/listings/:id/restore
// @desc    Restore archived listing
// @access  Private (Super-admin, Manager can restore)
router.post('/:id/restore', authorize('super-admin', 'manager'), async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid listing ID',
      });
    }

    const listing = await Listing.findByIdAndUpdate(
      id,
      { 
        $set: { 
          status: 'active',
          updatedBy: req.userId,
        } 
      },
      { new: true }
    )
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .lean();

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found',
      });
    }

    res.json({
      success: true,
      message: 'Listing restored successfully',
      data: listing,
    });
  } catch (error) {
    console.error('Restore listing error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while restoring listing',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

export default router;

