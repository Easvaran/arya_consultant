import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import LoanType from '@/models/LoanType';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    await connectDB();
    let loanTypes = await LoanType.find({}).sort({ createdAt: 1 });
    
    // Seed initial data if empty
    if (loanTypes.length === 0) {
      const initialData = [
        {
          slug: "personal",
          type: "Personal",
          title: "Personal Loan Details",
          description: "Quick cash for your personal needs. Wedding, travel, or medical emergencies. Up to 25 Lakhs for salaried individuals.",
          benefits: ["TAT - 2 Days", "Up to ₹25 Lakhs", "Minimal Documentation", "Competitive Rates"],
          documents: ["PAN Card", "Aadhaar Card", "Last 3 Months Salary Slips", "6 Months Bank Statement"],
        },
        {
          slug: "business",
          type: "Business",
          title: "Business Loan Details",
          description: "Grow your business with our flexible financing options for entrepreneurs. Up to 1 Crore collateral-free loans.",
          benefits: ["Up to ₹1 Crore", "Collateral Free", "TAT - 3 Days", "Flexible Repayment"],
          documents: ["Business Registration Proof", "PAN Card (Owner & Business)", "ITR for last 2 Years", "12 Months Bank Statement"],
        },
        {
          slug: "lap",
          type: "LAP",
          title: "Loan Against Property & HOUSING LOAN",
          description: "Lean against property and Housing Loan (LAP). High loan amounts for both business persons and salaried individuals with cash or account salary.",
          benefits: ["Up to ₹5 Crore", "LTV 80%", "Cash/Account Salary/Business Person", "Business & Salaried"],
          documents: ["Property Documents", "PAN & Aadhaar", "6 Months Bank Statement", "Income Proof"],
        },
        {
          slug: "bike",
          type: "Bike",
          title: "Bike Loan Details",
          description: "Get on the road with our quick and easy bike loans for your favorite two-wheeler. Up to 95% funding available.",
          benefits: ["Up to 95% Funding", "Quick Approval", "Minimal Downpayment", "Flexible Tenure"],
          documents: ["Identity Proof", "Address Proof", "Income Proof", "Bank Statement"],
        },
        {
          slug: "car",
          type: "Car",
          title: "Car Loan Details",
          description: "Drive your dream car today with our quick and easy car loans. Up to 95% funding for new and used cars.",
          benefits: ["Up to 95% Funding", "New & Used Cars", "Fast Processing", "Low Interest Rates"],
          documents: ["Identity Proof", "Address Proof", "Income Proof", "Bank Statement"],
        },
      ];
      await LoanType.insertMany(initialData);
      loanTypes = await LoanType.find({}).sort({ createdAt: 1 });
    }
    
    return NextResponse.json({ loanTypes }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const token = cookies().get('token')?.value;
    if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const decoded: any = verifyToken(token);
    if (!decoded || decoded.role !== 'admin') return NextResponse.json({ message: 'Forbidden' }, { status: 403 });

    const data = await req.json();
    await connectDB();
    
    const loanType = await LoanType.create(data);
    return NextResponse.json({ message: 'Loan type created successfully', loanType }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
