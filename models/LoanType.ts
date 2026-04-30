import mongoose from 'mongoose';

const LoanTypeSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true }, // e.g. 'personal'
  type: { type: String, required: true }, // e.g. 'Personal'
  title: { type: String, required: true },
  description: { type: String, required: true },
  benefits: [{ type: String }],
  documents: [{ type: String }],
}, { timestamps: true });

export default mongoose.models.LoanType || mongoose.model('LoanType', LoanTypeSchema);
