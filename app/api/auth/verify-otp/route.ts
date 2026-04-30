import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();
    await connectDB();

    const user = await User.findOne({ 
      email, 
      role: 'admin',
      resetToken: otp,
      resetTokenExpiry: { $gt: new Date() }
    });

    if (!user) {
      // Debug log if user not found (you can remove this later)
      console.log('OTP verification failed for:', email, 'OTP:', otp);
      return NextResponse.json({ message: 'Invalid or expired OTP' }, { status: 400 });
    }

    return NextResponse.json({ message: 'OTP verified successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
