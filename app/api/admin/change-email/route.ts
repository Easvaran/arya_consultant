import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const token = cookies().get('token')?.value;
    if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const decoded: any = verifyToken(token);
    if (!decoded || decoded.role !== 'admin') return NextResponse.json({ message: 'Forbidden' }, { status: 403 });

    const { currentPassword, newEmail } = await req.json();
    await connectDB();
    
    const user = await User.findById(decoded.id);
    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return NextResponse.json({ message: 'Incorrect password' }, { status: 400 });

    // Check if email is already taken
    const emailExists = await User.findOne({ email: newEmail, _id: { $ne: user._id } });
    if (emailExists) return NextResponse.json({ message: 'Email already in use' }, { status: 400 });

    user.email = newEmail;
    await user.save();

    return NextResponse.json({ message: 'Email updated successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
