import mongoose from 'mongoose';

const LoanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  loanAmount: {
    type: Number,
    required: true,
  },
  loanType: {
    type: String,
    enum: ['Personal', 'Business', 'Gold', 'Investment', 'Bike', 'LAP', 'Car'],
    required: true,
  },
  dob: String,
  gender: String,
  panNumber: String,
  loanTenure: String,
  employmentType: String,
  monthlyIncome: String,
  address: String,
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
}, { timestamps: true });

export default mongoose.models.Loan || mongoose.model('Loan', LoanSchema);
