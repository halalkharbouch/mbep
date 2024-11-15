import mongoose from 'mongoose';

const partnersSchema = new mongoose.Schema({
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
    projects: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Project",
        },
      ],
});

const Partner = mongoose.model('Partner', partnersSchema);

export default Partner;
