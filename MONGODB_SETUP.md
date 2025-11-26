# MongoDB Setup Guide

This project now includes MongoDB integration with User authentication and RBAC (Role-Based Access Control).

## Prerequisites

- MongoDB database (local or MongoDB Atlas)
- Node.js >= 20
- Environment variables configured

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
MONGO_DB_URI=mongodb://localhost:27017/your-database-name
# Or for MongoDB Atlas:
# MONGO_DB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=3001
NODE_ENV=development
```

## User Roles (RBAC)

The system supports the following roles:

1. **super-admin** - Full access to all features and user management
2. **manager** - Can manage associates and team members
3. **associate** - Regular user with assigned clients and properties
4. **team** - Basic team member access

## API Endpoints

### Authentication Routes (`/api/auth`)

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "team" // Optional: super-admin, manager, associate, team (default: team)
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "team",
    "status": "active"
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/auth/update-profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "avatar": "avatar-url"
}
```

#### Change Password
```http
PUT /api/auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

## User Model Schema

```javascript
{
  email: String (required, unique),
  password: String (required, hashed),
  name: String (required),
  role: String (enum: 'super-admin', 'manager', 'associate', 'team'),
  avatar: String (optional),
  status: String (enum: 'active', 'inactive', 'suspended', default: 'active'),
  assignedClients: [String],
  assignedProperties: [String],
  assignedUsers: [ObjectId], // For managers
  assignedManager: ObjectId, // For associates
  assignedSupervisor: ObjectId, // For associates
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Usage in Frontend

Update your `auth-context.tsx` to use the API endpoints:

```typescript
const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (data.success) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};
```

## Authentication Middleware

Use the authentication middleware to protect routes:

```javascript
import { authenticate, authorize } from './middleware/auth.js';

// Protect route - requires authentication
app.get('/api/protected', authenticate, (req, res) => {
  res.json({ user: req.user });
});

// Protect route - requires specific role
app.get('/api/admin', authenticate, authorize('super-admin'), (req, res) => {
  res.json({ message: 'Admin only' });
});
```

## Security Features

- Passwords are hashed using bcrypt (12 rounds)
- JWT tokens for authentication
- Password is excluded from user queries by default
- Account status checking (active/inactive/suspended)
- Role-based access control

## Testing

1. Start the server:
```bash
npm run server
```

2. Register a new user:
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123",
    "name": "Admin User",
    "role": "super-admin"
  }'
```

3. Login:
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

4. Get current user (use token from login):
```bash
curl -X GET http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Notes

- Make sure `MONGO_DB_URI` is set in your environment variables
- Change `JWT_SECRET` to a strong random string in production
- The server will automatically connect to MongoDB on startup
- User passwords are automatically hashed before saving
- All timestamps are automatically managed by Mongoose

