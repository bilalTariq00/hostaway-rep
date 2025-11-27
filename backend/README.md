# Backend API Server

This is the backend API server for the Hostaway task management system.

## Structure

```
backend/
├── server.js              # Main Express server
├── package.json           # Backend dependencies
├── .env                   # Environment variables (create from .env.example)
├── config/
│   └── database.js        # MongoDB connection
├── routes/
│   ├── auth.js           # Authentication routes
│   ├── tasks.js          # Task management routes
│   ├── autoTasks.js      # Auto-task routes
│   ├── checklistTemplates.js
│   ├── uploads.js        # File upload routes
│   └── users.js          # User management routes
├── models/
│   ├── User.js
│   ├── Task.js
│   ├── AutoTask.js
│   └── ChecklistTemplate.js
├── middleware/
│   └── auth.js           # Authentication middleware
├── scripts/
│   ├── seedUsers.js      # Seed database with users
│   └── resetUsers.js     # Reset users
└── uploads/              # File uploads directory
```

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required variables:
- `MONGO_DB_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Set to `production` for production
- `PORT` - Server port (optional, Railway sets this automatically)

### 3. Run Locally

```bash
npm start
# or
npm run dev
```

The server will start on `http://localhost:3001`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/update-profile` - Update user profile
- `PUT /api/auth/change-password` - Change password

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `POST /api/tasks/:id/archive` - Archive task
- `POST /api/tasks/:id/restore` - Restore archived task

### Auto Tasks
- `GET /api/auto-tasks` - Get all auto-tasks
- `POST /api/auto-tasks` - Create auto-task
- `PUT /api/auto-tasks/:id` - Update auto-task
- `DELETE /api/auto-tasks/:id` - Delete auto-task
- `POST /api/auto-tasks/:id/toggle-status` - Toggle auto-task status

### Checklist Templates
- `GET /api/checklist-templates` - Get all templates
- `POST /api/checklist-templates` - Create template
- `PUT /api/checklist-templates/:id` - Update template
- `DELETE /api/checklist-templates/:id` - Delete template

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/by-role/:role` - Get users by role

### Uploads
- `POST /api/uploads` - Upload single file
- `POST /api/uploads/multiple` - Upload multiple files
- `DELETE /api/uploads/:filename` - Delete file

### Health Check
- `GET /health` - Health check endpoint

## Deployment to Railway

1. **Connect Repository**: Link your GitHub repo to Railway
2. **Set Root Directory**: Set to `backend/` in Railway settings
3. **Set Environment Variables**: Add all variables from `.env.example`
4. **Deploy**: Railway will automatically deploy on push

### Railway Configuration

In Railway dashboard:
- **Root Directory**: `backend`
- **Start Command**: `npm start`
- **Build Command**: (not needed, just install dependencies)

## Scripts

```bash
# Start server
npm start

# Development mode
npm run dev

# Seed database with users
npm run seed:users

# Reset users
npm run reset:users
```

## Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **cors** - CORS middleware
- **dotenv** - Environment variables
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **socket.io** - Real-time communication
- **multer** - File uploads

