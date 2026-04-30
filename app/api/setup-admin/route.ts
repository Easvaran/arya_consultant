import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await connectDB();
    
    const adminEmail = 'admin@aryaconsultant.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      const hashedPassword = await bcrypt.hash('Admin@12345', 12);
      existingAdmin.password = hashedPassword;
      existingAdmin.role = 'admin';
      await existingAdmin.save();
      return NextResponse.json({ 
        message: 'Admin account already existed and its password has been reset to: Admin@12345' 
      }, { status: 200 });
    }

    const hashedPassword = await bcrypt.hash('Admin@12345', 12);
    await User.create({
      name: 'System Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    });

    return NextResponse.json({ 
      message: 'Admin account created successfully!',
      credentials: {
        email: adminEmail,
        password: 'Admin@12345'
      }
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
