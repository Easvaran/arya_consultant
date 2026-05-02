import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ContactSubmission from '@/models/ContactSubmission';
import { sendAdminNotification } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await connectDB();
    
    const submission = await ContactSubmission.create(data);

    // Send email notification to admin
    await sendAdminNotification(
      `New Contact Message: ${data.subject}`,
      `
      <div style="font-family: sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #3b82f6;">New Contact Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px;">
          ${data.message.replace(/\n/g, '<br>') || 'No message provided'}
        </div>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #666;">This message was sent from Arya Finance contact form.</p>
      </div>
      `
    );
    
    return NextResponse.json({ message: 'Message sent successfully', submission }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
