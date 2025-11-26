# Default Login Credentials

The following users have been seeded in the MongoDB database. **ONLY these users can login** - the system now uses backend authentication only.

## 🔐 Login Credentials (Database Users)

### Super Admin
- **Email:** `superadmin@hostaway.com`
- **Password:** `superadmin123`
- **Role:** `super-admin`
- **Access:** Full access to all features and user management
- **Status:** Active
- **Database ID:** MongoDB ObjectId

### Manager
- **Email:** `manager@hostaway.com`
- **Password:** `manager123`
- **Role:** `manager`
- **Access:** Can manage associates and team members
- **Status:** Active
- **Database ID:** MongoDB ObjectId

### Associate
- **Email:** `associate@hostaway.com`
- **Password:** `associate123`
- **Role:** `associate`
- **Access:** Regular user with assigned clients and properties
- **Status:** Active
- **Assigned Clients:** client1, client2
- **Assigned Properties:** property1, property2
- **Database ID:** MongoDB ObjectId

### Team
- **Email:** `team@hostaway.com`
- **Password:** `team123`
- **Role:** `team`
- **Access:** Basic team member access

## 👥 Additional Users (Assignees & Supervisors)

### Additional Managers (Can be Supervisors)
- **Sarah Wilson:** `manager2@hostaway.com` / `manager123`
- **David Lee:** `manager3@hostaway.com` / `manager123`
- **Emily Chen:** `manager4@hostaway.com` / `manager123`

### Additional Associates (Can be Assignees)
- **John Doe:** `associate2@hostaway.com` / `associate123`
- **Mike Johnson:** `associate3@hostaway.com` / `associate123`
- **Tom Brown:** `associate4@hostaway.com` / `associate123`
- **Lisa Anderson:** `associate5@hostaway.com` / `associate123`
- **Robert Taylor:** `associate6@hostaway.com` / `associate123`

### Additional Team Members (Can be Assignees)
- **Alex Martinez:** `team2@hostaway.com` / `team123`
- **Jessica White:** `team3@hostaway.com` / `team123`
- **Status:** Active
- **Database ID:** MongoDB ObjectId

## ⚠️ Important Notes

- **ONLY users in the database can login** - Mock login has been removed
- All user data is saved and retrieved from MongoDB
- User information is fetched from the backend API
- Tokens are validated with the backend on every session check
- Passwords are hashed using bcrypt (12 rounds) in the database

## 📝 Notes

- All users are set to `active` status
- Passwords are hashed using bcrypt (12 rounds)
- You can use these credentials to test the login functionality
- To reset all users to default credentials, run: `npm run reset:users`
- To add new users without overwriting existing ones, run: `npm run seed:users`

## 🔄 Resetting Users

If you need to reset all users to their default passwords:

```bash
npm run reset:users
```

This will update existing users or create them if they don't exist.

## ➕ Adding More Users

To add more users, you can:

1. Use the registration API endpoint: `POST /api/auth/register`
2. Modify the `scripts/seedUsers.js` file and add more users to the `defaultUsers` array
3. Use MongoDB directly to insert users (passwords will need to be hashed)

## 🛡️ Security Warning

⚠️ **Important:** These are default credentials for development/testing purposes. 
- Change all passwords in production
- Use strong, unique passwords
- Never commit actual credentials to version control

