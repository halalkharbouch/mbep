import mongoose from 'mongoose';

const projectsSchema = new mongoose.Schema({
    donorFunderName: { type: String },
    projectImplementingName: { type: String },
    projectCategory: { type: String },
    tenureOfProjectByYear: { type: Number },
    projectStartDate: { type: Date },
    projectEndDate: { type: Date },
    projectThematicAreas: { type: String },
    lgaOfImplementation: { type: String },
    projectAmountCeilingNGN: { type: Number },
    projectAmountCeilingUSD: { type: Number },
    projectRegistrationStatus: { type: String },
    projectApprovalStatus: { type: String },
    mdaInSokotoState: { type: String },
    briefAboutProject: { type: String },
    statusOfProject: { type: String },
    parentPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Partner",
        required: true,
      },
});

const Project = mongoose.model('Project', projectsSchema);

export default Project;
