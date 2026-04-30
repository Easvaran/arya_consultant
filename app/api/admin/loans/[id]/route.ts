import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Loan from '@/models/Loan';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const token = cookies().get('token')?.value;
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded: any = verifyToken(token);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const data = await req.json();
    
    await connectDB();
    const loan = await Loan.findByIdAndUpdate(
      params.id,
      { $set: data },
      { new: true }
    );

    if (!loan) {
      return NextResponse.json({ message: 'Loan not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Loan updated successfully', loan }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const token = cookies().get('token')?.value;
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded: any = verifyToken(token);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    await connectDB();
    const loan = await Loan.findByIdAndDelete(params.id);

    if (!loan) {
      return NextResponse.json({ message: 'Loan not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Loan deleted successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
