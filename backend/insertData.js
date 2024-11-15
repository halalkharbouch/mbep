// import mongoose from 'mongoose';
// import fs from 'fs';
// import Partner from './models/partner.model.js';  // Import Partner model
// import Project from './models/projects.model.js';  // Import Project model

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/mbepDashboardDB')   
// .then(() => console.log('MongoDB connected'))
// .catch((err) => console.error('MongoDB connection error:', err));

// const path = '/home/halalkharbouch/Projects/Website-Projects/MBEP-DASHBOARD/backend';

// const partnersData = JSON.parse(fs.readFileSync(`${path}/all_partners.json`, 'utf8'));
// const projectsData = JSON.parse(fs.readFileSync(`${path}/all_projects.json`, 'utf8'));

// const importData = async () => {
//     try {
//       // Step 3.1: Insert Partners
//       const partnerIdMap = {}; // To map organizationName to Partner IDs
//       for (const partner of partnersData) {
//         const newPartner = new Partner({
//           state: partner.state,
//           category: partner.category,
//           organizationName: partner.organizationName,
//           emailAddress: partner.emailAddress,
//           officeAddress: partner.officeAddress,
//           phoneNumber: partner.phoneNumber,
//           contactPersonName: partner.contactPersonName,
//           totalNumberOfStaff: partner.totalNumberOfStaff,
//           donorFunderName: partner.donorFunderName,
//           partnerThematicAreas: partner.partnerThematicAreas,
//           lgaOfImplementation: partner.lgaOfImplementation || null,
//           partnerRegistrationStatus: partner.partnerRegistrationStatus || null,
//         });
//         const savedPartner = await newPartner.save();
//         partnerIdMap[partner.organizationName] = savedPartner._id;
//       }
  
//       // Step 3.2: Insert Projects and Associate with Partners
//       for (const project of projectsData) {
//         const partnerId = partnerIdMap[project.organizationName];
//         if (partnerId) {
//           const newProject = new Project({
//             donorFunderName: project.donorFunderName,
//             projectImplementingName: project.projectImplementingName,
//             projectCategory: project.projectCategory,
//             tenureOfProjectByYear: project.tenureOfProjectByYear,
//             projectStartDate: new Date(project.projectStartDate),
//             projectEndDate: new Date(project.projectEndDate),
//             projectThematicAreas: project.projectThematicAreas,
//             lgaOfImplementation: project.lgaOfImplementation,
//             projectAmountCeilingNGN: project.projectAmountCeilingNGN,
//             projectAmountCeilingUSD: project.projectAmountCeilingUSD,
//             projectRegistrationStatus: project.projectRegistrationStatus,
//             projectApprovalStatus: project.projectApprovalStatus,
//             mdaInSokotoState: project.mdaInSokotoState,
//             briefAboutProject: project.briefAboutProject,
//             statusOfProject: project.statusOfProject,
//             parentPartner: partnerId,  // Link to the Partner
//           });
//           const savedProject = await newProject.save();
  
//           // Add project reference to Partner
//           await Partner.findByIdAndUpdate(partnerId, { $push: { projects: savedProject._id } });
//         } else {
//           console.warn(`Partner not found for project with organizationName: ${project.organizationName}`);
//         }
//       }
  
//       console.log('Data import completed successfully!');
//     } catch (error) {
//       console.error('Error importing data:', error);
//     } finally {
//       mongoose.connection.close();
//     }
//   };


// // Run the import
// importData();



// import mongoose from 'mongoose';
// import fs from 'fs';
// import ValidationZone from './models/validationZone.model.js'; // Update this path

// // MongoDB Connection URL
// const mongoURL = 'mongodb://localhost:27017/mbepDashboardDB'; // Replace with your actual MongoDB URI

// // Connect to MongoDB
// mongoose.connect(mongoURL)
//     .then(() => console.log("MongoDB connected successfully"))
//     .catch(error => console.log("MongoDB connection error:", error));

// // Read and Parse the JSON file
// const validationZoneDataPath = '/home/halalkharbouch/Projects/Website-Projects/MBEP-DASHBOARD/backend/validation_zone.json';

// try {
//     const data = JSON.parse(fs.readFileSync(validationZoneDataPath, 'utf8'));

//     // Insert data into the ValidationZone collection
//     ValidationZone.insertMany(data)
//         .then(() => {
//             console.log("Data successfully inserted into ValidationZone collection.");
//             mongoose.connection.close(); // Close connection after insertion
//         })
//         .catch(err => {
//             console.error("Error inserting data:", err);
//             mongoose.connection.close();
//         });
// } catch (err) {
//     console.error("Error reading JSON file:", err);
//     mongoose.connection.close();
// }
