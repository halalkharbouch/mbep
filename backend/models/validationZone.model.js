import mongoose from 'mongoose';

const validationZoneSchema = new mongoose.Schema({
    partnerName: { type: String, required: true },
    contactPersonEmail: { type: String },
    officeContactAddress: { type: String },
    phoneNumber: { type: String },
    contactPersonName: { type: String },
    totalNumberOfStaff: { type: Number },
    activityImplementingName: { type: String },
    tenureOfImplementation: { type: Number },
    projectStartDate: { type: Date },
    projectEndDate: { type: Date },
    donorFunder: { type: String },
    projectThematicArea: { type: String },
    state: { type: String },
    lgaOfImplementation: { type: String },
    projectAmountCeilingNGN: { type: Number },
    projectAmountCeilingUSD: { type: Number },
    emailAddress: { type: String },
    mdaInSokotoState: { type: String }
});

const ValidationZone = mongoose.model('ValidationZone', validationZoneSchema);

export default ValidationZone;
