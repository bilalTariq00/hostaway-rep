import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import User from '../models/User.js';

// Load .env.local first, then .env
dotenv.config({ path: '.env.local' });
dotenv.config();

const defaultUsers = [
  {
    email: 'superadmin@hostaway.com',
    password: 'superadmin123',
    name: 'Super Admin',
    role: 'super-admin',
    status: 'active',
  },
  {
    email: 'manager@hostaway.com',
    password: 'manager123',
    name: 'Manager User',
    role: 'manager',
    status: 'active',
  },
  {
    email: 'associate@hostaway.com',
    password: 'associate123',
    name: 'Associate User',
    role: 'associate',
    status: 'active',
    assignedClients: ['client1', 'client2'],
    assignedProperties: ['property1', 'property2'],
  },
  {
    email: 'team@hostaway.com',
    password: 'team123',
    name: 'Team Member',
    role: 'team',
    status: 'active',
  },
  // Additional Managers (Supervisors)
  {
    email: 'manager2@hostaway.com',
    password: 'manager123',
    name: 'Sarah Wilson',
    role: 'manager',
    status: 'active',
  },
  {
    email: 'manager3@hostaway.com',
    password: 'manager123',
    name: 'David Lee',
    role: 'manager',
    status: 'active',
  },
  {
    email: 'manager4@hostaway.com',
    password: 'manager123',
    name: 'Emily Chen',
    role: 'manager',
    status: 'active',
  },
  // Additional Associates (Assignees)
  {
    email: 'associate2@hostaway.com',
    password: 'associate123',
    name: 'John Doe',
    role: 'associate',
    status: 'active',
    assignedClients: ['client3', 'client4'],
    assignedProperties: ['property3', 'property4'],
  },
  {
    email: 'associate3@hostaway.com',
    password: 'associate123',
    name: 'Mike Johnson',
    role: 'associate',
    status: 'active',
    assignedClients: ['client5', 'client6'],
    assignedProperties: ['property5', 'property6'],
  },
  {
    email: 'associate4@hostaway.com',
    password: 'associate123',
    name: 'Tom Brown',
    role: 'associate',
    status: 'active',
    assignedClients: ['client7', 'client8'],
    assignedProperties: ['property7', 'property8'],
  },
  {
    email: 'associate5@hostaway.com',
    password: 'associate123',
    name: 'Lisa Anderson',
    role: 'associate',
    status: 'active',
    assignedClients: ['client9', 'client10'],
    assignedProperties: ['property9', 'property10'],
  },
  {
    email: 'associate6@hostaway.com',
    password: 'associate123',
    name: 'Robert Taylor',
    role: 'associate',
    status: 'active',
    assignedClients: ['client11', 'client12'],
    assignedProperties: ['property11', 'property12'],
  },
  // Additional Team Members (Assignees)
  {
    email: 'team2@hostaway.com',
    password: 'team123',
    name: 'Alex Martinez',
    role: 'team',
    status: 'active',
  },
  {
    email: 'team3@hostaway.com',
    password: 'team123',
    name: 'Jessica White',
    role: 'team',
    status: 'active',
  },
];

const seedUsers = async () => {
  try {
    console.log('🌱 Starting user seeding...');
    
    // Connect to MongoDB
    await connectDB();
    
    let createdCount = 0;
    let updatedCount = 0;
    let skippedCount = 0;

    for (const userData of defaultUsers) {
      try {
        // Check if user already exists
        const existingUser = await User.findByEmail(userData.email);
        
        if (existingUser) {
          // Update existing user (but don't change password unless it's the default)
          console.log(`⚠️  User ${userData.email} already exists. Skipping...`);
          skippedCount++;
          continue;
        }

        // Create new user
        const user = new User(userData);
        await user.save();
        
        console.log(`✅ Created user: ${userData.email} (${userData.role})`);
        createdCount++;
      } catch (error) {
        console.error(`❌ Error creating user ${userData.email}:`, error.message);
      }
    }

    console.log('\n📊 Seeding Summary:');
    console.log(`   ✅ Created: ${createdCount}`);
    console.log(`   ⚠️  Skipped: ${skippedCount}`);
    console.log(`   📝 Updated: ${updatedCount}`);
    console.log('\n✨ Seeding completed!');
    
    // Display all users
    console.log('\n📋 All users in database:');
    const allUsers = await User.find().select('email name role status');
    allUsers.forEach(user => {
      console.log(`   - ${user.email} (${user.role}) - ${user.name}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

// Run the seed function
seedUsers();

