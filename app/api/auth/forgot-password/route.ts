import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { sendEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    await connectDB();

    const user = await User.findOne({ email, role: 'admin' });
    if (!user) {
      return NextResponse.json({ message: 'Admin account not found' }, { status: 404 });
    }

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    user.resetToken = otp;
    user.resetTokenExpiry = otpExpiry;
    await user.save();

    await sendEmail({
      to: email,
      subject: 'Your Admin Password Reset OTP',
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 12px;">
          <h2 style="color: #3b82f6; text-align: center;">Admin Password Reset</h2>
          <p>Hello,</p>
          <p>You requested a password reset for your ARYA CONSULTANT Admin account. Use the OTP below to proceed:</p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 12px; text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: 900; letter-spacing: 10px; color: #1e293b;">${otp}</span>
          </div>
          <p>This OTP is valid for <strong>10 minutes</strong>. If you didn't request this, please ignore this email.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #666; text-align: center;">ARYA CONSULTANT Secure Admin Portal</p>
        </div>
      `
    });

    return NextResponse.json({ message: 'OTP sent to your email' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
