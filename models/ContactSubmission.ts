import mongoose from 'mongoose';

const ContactSubmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['New', 'Read', 'Replied'], default: 'New' },
}, { timestamps: true });

export default mongoose.models.ContactSubmission || mongoose.model('ContactSubmission', ContactSubmissionSchema);
