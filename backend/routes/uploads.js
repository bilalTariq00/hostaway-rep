import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

console.log('📁 Upload routes module loaded');

// Get directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure storage
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    // Create uploads directory if it doesn't exist
    const uploadPath = path.join(__dirname, '../uploads');
    const fs = await import('fs/promises');
    try {
      await fs.mkdir(uploadPath, { recursive: true });
    } catch (error) {
      // Directory already exists or other error
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate unique filename: timestamp-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  },
});

// File filter - accept common file types
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain',
    'text/csv',
    'application/zip',
    'application/x-zip-compressed',
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`File type ${file.mimetype} is not allowed`), false);
  }
};

// Configure multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// Test route (no auth required for testing)
router.get('/test', (req, res) => {
  res.json({ success: true, message: 'Upload route is working' });
});

// All routes require authentication
router.use(authenticate);

// @route   POST /api/uploads
// @desc    Upload a file
// @access  Private
router.post('/', upload.single('file'), async (req, res) => {
  console.log('📤 Upload request received');
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    // Return file information
    res.json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        name: req.file.originalname,
        filename: req.file.filename,
        url: `/uploads/${req.file.filename}`,
        type: req.file.mimetype,
        size: req.file.size,
        uploadedAt: new Date(),
        uploadedBy: req.userId,
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'File upload failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @route   POST /api/uploads/multiple
// @desc    Upload multiple files
// @access  Private
router.post('/multiple', upload.array('files', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded',
      });
    }

    // Return file information for all uploaded files
    const files = req.files.map((file) => ({
      name: file.originalname,
      filename: file.filename,
      url: `/uploads/${file.filename}`,
      type: file.mimetype,
      size: file.size,
      uploadedAt: new Date(),
      uploadedBy: req.userId,
    }));

    res.json({
      success: true,
      message: `${files.length} file(s) uploaded successfully`,
      data: files,
    });
  } catch (error) {
    console.error('Multiple upload error:', error);
    res.status(500).json({
      success: false,
      message: 'File upload failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @route   DELETE /api/uploads/:filename
// @desc    Delete an uploaded file
// @access  Private
router.delete('/:filename', async (req, res) => {
  try {
    const fs = await import('fs/promises');
    const filePath = path.join(__dirname, '../uploads', req.params.filename);

    try {
      await fs.unlink(filePath);
      res.json({
        success: true,
        message: 'File deleted successfully',
      });
    } catch (error) {
      if (error.code === 'ENOENT') {
        return res.status(404).json({
          success: false,
          message: 'File not found',
        });
      }
      throw error;
    }
  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({
      success: false,
      message: 'File deletion failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

export default router;

