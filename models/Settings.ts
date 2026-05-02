import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
  businessName: { type: String, default: 'Arya Finance' },
  subheading: { type: String, default: 'Loan Services' },
  nameColor: { type: String, default: '#0F172A' },
  subheadingColor: { type: String, default: '#64748B' },
  logoUrl: { type: String, default: '' },
  email: { type: String, default: 'info@aryaconsultant.com' },
  phone: { type: String, default: '+1 (555) 000-0000' },
  address: { type: String, default: '123 Finance Plaza, Wall Street, NY' },
  workingHours: { type: String, default: 'Mon-Fri from 9am to 6pm' },
  contactTitle: { type: String, default: 'Get in Touch' },
  contactDescription: { type: String, default: 'Have questions about our loan services? Our team of financial experts is here to help you find the perfect solution for your needs.' },
  mapIframe: { type: String, default: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.01107!3d40.7067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a173d1b444d%3A0xf8a1c37ab1f622d!2sWall%20St%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus' },
}, { timestamps: true });

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
