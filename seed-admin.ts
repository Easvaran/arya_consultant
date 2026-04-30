import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User';
import connectDB from './lib/mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function seedAdmin() {
  try {
    await connectDB();
    console.log('Connected to MongoDB...');

    const adminEmail = 'admin@aryaconsultant.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('Admin already exists. Updating password...');
      const hashedPassword = await bcrypt.hash('Admin@12345', 12);
      existingAdmin.password = hashedPassword;
      existingAdmin.role = 'admin';
      await existingAdmin.save();
      console.log('Admin updated successfully.');
    } else {
      console.log('Creating new admin...');
      const hashedPassword = await bcrypt.hash('Admin@12345', 12);
      await User.create({
        name: 'System Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
      });
      console.log('Admin created successfully.');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
}

seedAdmin();
