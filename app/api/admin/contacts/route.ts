import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ContactSubmission from '@/models/ContactSubmission';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const token = cookies().get('token')?.value;
    if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const decoded: any = verifyToken(token);
    if (!decoded || decoded.role !== 'admin') return NextResponse.json({ message: 'Forbidden' }, { status: 403 });

    await connectDB();
    const submissions = await ContactSubmission.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({ submissions }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
