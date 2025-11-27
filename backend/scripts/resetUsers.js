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
];

const resetUsers = async () => {
  try {
    console.log('🔄 Starting user reset...');
    
    // Connect to MongoDB
    await connectDB();
    
    let createdCount = 0;
    let updatedCount = 0;

    for (const userData of defaultUsers) {
      try {
        // Check if user already exists
        const existingUser = await User.findByEmail(userData.email);
        
        if (existingUser) {
          // Update existing user with new password and data
          existingUser.password = userData.password; // Will be hashed by pre-save hook
          existingUser.name = userData.name;
          existingUser.role = userData.role;
          existingUser.status = userData.status;
          if (userData.assignedClients) {
            existingUser.assignedClients = userData.assignedClients;
          }
          if (userData.assignedProperties) {
            existingUser.assignedProperties = userData.assignedProperties;
          }
          
          await existingUser.save();
          console.log(`🔄 Updated user: ${userData.email} (${userData.role})`);
          updatedCount++;
        } else {
          // Create new user
          const user = new User(userData);
          await user.save();
          
          console.log(`✅ Created user: ${userData.email} (${userData.role})`);
          createdCount++;
        }
      } catch (error) {
        console.error(`❌ Error processing user ${userData.email}:`, error.message);
      }
    }

    console.log('\n📊 Reset Summary:');
    console.log(`   ✅ Created: ${createdCount}`);
    console.log(`   🔄 Updated: ${updatedCount}`);
    console.log('\n✨ Reset completed!');
    
    // Display all users
    console.log('\n📋 All users in database:');
    const allUsers = await User.find().select('email name role status');
    allUsers.forEach(user => {
      console.log(`   - ${user.email} (${user.role}) - ${user.name}`);
    });

    console.log('\n🔑 Default Login Credentials:');
    console.log('   Super Admin: superadmin@hostaway.com / superadmin123');
    console.log('   Manager:    manager@hostaway.com / manager123');
    console.log('   Associate:  associate@hostaway.com / associate123');
    console.log('   Team:       team@hostaway.com / team123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Reset error:', error);
    process.exit(1);
  }
};

// Run the reset function
resetUsers();

