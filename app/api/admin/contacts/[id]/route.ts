import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ContactSubmission from '@/models/ContactSubmission';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const token = cookies().get('token')?.value;
    if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const decoded: any = verifyToken(token);
    if (!decoded || decoded.role !== 'admin') return NextResponse.json({ message: 'Forbidden' }, { status: 403 });

    const { status } = await req.json();
    await connectDB();
    
    const submission = await ContactSubmission.findByIdAndUpdate(params.id, { status }, { new: true });
    
    if (!submission) return NextResponse.json({ message: 'Submission not found' }, { status: 404 });
    
    return NextResponse.json({ message: 'Status updated', submission }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const token = cookies().get('token')?.value;
    if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const decoded: any = verifyToken(token);
    if (!decoded || decoded.role !== 'admin') return NextResponse.json({ message: 'Forbidden' }, { status: 403 });

    await connectDB();
    const submission = await ContactSubmission.findByIdAndDelete(params.id);
    
    if (!submission) return NextResponse.json({ message: 'Submission not found' }, { status: 404 });
    
    return NextResponse.json({ message: 'Submission deleted' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
