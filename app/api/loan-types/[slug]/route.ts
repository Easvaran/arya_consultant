import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import LoanType from '@/models/LoanType';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  try {
    await connectDB();
    const loanType = await LoanType.findOne({ slug: params.slug });
    if (!loanType) return NextResponse.json({ message: 'Loan type not found' }, { status: 404 });
    return NextResponse.json(loanType, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
