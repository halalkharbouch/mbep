import mongoose from 'mongoose';

const partnerRequestsSchema = new mongoose.Schema({
  state: { type: String },
  category: { type: String },
  organizationName: { type: String },
  emailAddress: { type: String },
  officeAddress: { type: String },
  phoneNumber: { type: String },
  contactPersonName: { type: String },
  totalNumberOfStaff: { type: Number },
  donorFunderName: { type: String },
  partnerThematicAreas: { type: String },
  lgaOfImplementation: { type: String },
  partnerRegistrationStatus: { type: String },
});

const PartnerRequest = mongoose.model('PartnerRequest', partnerRequestsSchema);

export default PartnerRequest;
