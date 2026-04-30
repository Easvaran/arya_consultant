import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Loan from '@/models/Loan';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { sendAdminNotification } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const token = cookies().get('token')?.value;
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded: any = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    await connectDB();
    const data = await req.json();

    const loan = await Loan.create({
      ...data,
      userId: decoded.id,
    });

    // Send email notification to admin
    await sendAdminNotification(
      `New Loan Application: ${data.loanType} - ₹${Number(data.loanAmount).toLocaleString()}`,
      `
      <div style="font-family: sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #3b82f6;">New Loan Application Received</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
          <h3 style="margin-top: 0; color: #1e293b; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Applicant Details</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Address:</strong> ${data.address}</p>
          
          <h3 style="margin-top: 20px; color: #1e293b; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Loan Information</h3>
          <p><strong>Loan Type:</strong> ${data.loanType}</p>
          <p><strong>Amount Requested:</strong> ₹${Number(data.loanAmount).toLocaleString()}</p>
          <p><strong>Tenure:</strong> ${data.loanTenure} Years</p>
          <p><strong>Monthly Income:</strong> ₹${Number(data.monthlyIncome).toLocaleString()}</p>
          <p><strong>Employment:</strong> ${data.employmentType}</p>
        </div>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #666;">This is an automated notification from ARYA CONSULTANT Management System.</p>
      </div>
      `
    );

    return NextResponse.json({ message: 'Loan application submitted successfully', loan }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
