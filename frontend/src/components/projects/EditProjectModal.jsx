import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import api from '../../api/axios.js';

const EditProjectModal = ({ project, isOpen, onClose, onSave }) => {
  const [updatedProject, setUpdatedProject] = useState({ ...project });
  const [originalProject, setOriginalProject] = useState({ ...project });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setUpdatedProject({
        ...project,
        projectStartDate: formatDate(project.projectStartDate),
        projectEndDate: formatDate(project.projectEndDate),
      });
      setOriginalProject({ ...project });
    }
  }, [project, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProject({ ...updatedProject, [name]: value });
  };

  const handleSubmit = async () => {
    const updatedFields = {};

    // Check which fields have been modified
    for (const key in updatedProject) {
      if (updatedProject[key] !== originalProject[key]) {
        updatedFields[key] = updatedProject[key]; // Add only modified fields
      }
    }

    try {
      const response = await api.put(
        `/projects/update/${project._id}`,
        updatedFields,
      );
      const data = await response.data;

      const updatedData = {
        ...data,
        parentPartner: {
          ...originalProject.parentPartner,
        },
      };
      onSave(updatedData); // Send only updated fields
      onClose();
    } catch (error) {
      console.error('Error updating project:', error);
      setError('An Error Occurred While Trying to Update');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Extracts YYYY-MM-DD
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-gray-800 rounded-lg text-xl shadow-xl w-full max-w-7xl p-6 text-gray-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-300"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-semibold mb-6">Edit Project</h2>

        {error && (
          <div className="bg-red-500 text-white p-2 rounded-md mb-4">
            {error}
          </div>
        )}

        <div className="flex space-x-2 w-full">
          <div className="space-y-4 w-full">
            {/* Donor Name */}
            <div>
              <label className="block font-medium text-gray-400">
                Donor/Funder Name
              </label>
              <input
                name="donorFunderName"
                value={updatedProject.donorFunderName}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-700 text-white p-2 rounded-md focus:ring focus:ring-blue-500"
              />
            </div>

            {/* Project Implementing Name */}
            <div>
              <label className="block  font-medium text-gray-400">
                Project Implementing Name
              </label>
              <input
                name="projectImplementingName"
                value={updatedProject.projectImplementingName}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-700 text-white p-2 rounded-md focus:ring focus:ring-blue-500"
              />
            </div>

            {/* Project Category */}
            <div>
              <label className="block font-medium text-gray-400">
                Project Category
              </label>
              <select
                name="projectCategory"
                value={updatedProject.projectCategory}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-700 text-white p-2 rounded-md focus:ring focus:ring-blue-500"
              >
                <option value="">Select Project Category</option>
                <option value="Recovery">Recovery</option>
                <option value="Development">Development</option>
                <option value="Humanitarian">Humanitarian</option>
              </select>
            </div>

            {/* Tenure of Project by Year */}
            <div>
              <label className="block  font-medium text-gray-400">
                Tenure of Project by Year
              </label>
              <input
                type="number"
                name="tenureOfProjectByYear"
                value={updatedProject.tenureOfProjectByYear}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-700 text-white p-2 rounded-md focus:ring focus:ring-blue-500"
              />
            </div>

            {/* Project Start Date */}
            <div>
              <label className="block  font-medium text-gray-400">
                Project Start Date
              </label>
              <input
                type="date"
                name="projectStartDate"
                value={updatedProject.projectStartDate}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-700 text-white p-2 rounded-md focus:ring focus:ring-blue-500"
              />
            </div>

            {/* Project End Date */}
            <div>
              <label className="block  font-medium text-gray-400">
                Project End Date
              </label>
              <input
                type="date"
                name="projectEndDate"
                value={updatedProject.projectEndDate}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-700 text-white p-2 rounded-md focus:ring focus:ring-blue-500"
              />
            </div>

            {/* Project Thematic Areas */}
            <div>
              <label className="block  font-medium text-gray-400">
                Project Thematic Areas{' '}
                <span className="text-sm">(separated by comma)</span>
              </label>
              <input
                name="projectThematicAreas"
                value={updatedProject.projectThematicAreas}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-700 text-white p-2 rounded-md focus:ring focus:ring-blue-500"
              />
            </div>

            {/* LGA of Implementation */}
            <div>
              <label className="block  font-medium text-gray-400">
                LGA of Implementation{' '}
                <span className="text-sm">(separated by comma)</span>
              </label>
              <input
                name="lgaOfImplementation"
                value={updatedProject.lgaOfImplementation}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-700 text-white p-2 rounded-md focus:ring focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="space-y-4 w-full">
            {/* Project Registration Status */}
            <div>
              <label className="block font-medium text-gray-400">
                Registration Status
              </label>
              <select
                name="projectRegistrationStatus"
                value={updatedProject.projectRegistrationStatus}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-700 text-white p-2 rounded-md focus:ring focus:ring-blue-500"
              >
                <option value="">Select Registration Status</option>
                <option value="Registeration Completed ">
                  Registration Completed
                </option>
                <option value="Registeration Started ">
                  Registeration Started{' '}
                </option>
                <option value="No Registered Yet">No Registered Yet</option>
              </select>
            </div>

            {/* Project Amount Ceiling (NGN) */}
            <div>
              <label className="block  font-medium text-gray-400">
                Project Amount Ceiling (NGN)
              </label>
              <input
                type="number"
                name="projectAmountCeilingNGN"
                value={updatedProject.projectAmountCeilingNGN}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-700 text-white p-2 rounded-md focus:ring focus:ring-blue-500"
              />
            </div>

            {/* Project Amount Ceiling (USD) */}
            <div>
              <label className="block  font-medium text-gray-400">
                Project Amount Ceiling (USD)
              </label>
              <input
                type="number"
                name="projectAmountCeilingUSD"
                value={updatedProject.projectAmountCeilingUSD}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-700 text-white p-2 rounded-md focus:ring focus:ring-blue-500"
              />
            </div>
            {/* Project Approval Status */}
            <div>
              <label className="block font-medium text-gray-400">
                Project Approval Status
              </label>
              <select
                name="projectApprovalStatus"
                value={updatedProject.projectApprovalStatus}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-700 text-white p-2 rounded-md focus:ring focus:ring-blue-500"
              >
                <option value="">Select Approval Status</option>
                <option value="Approval Pending ">Approval Pending</option>
                <option value="Approved">Approved</option>
              </select>
            </div>

            {/* MDA in Sokoto State */}
            <div>
              <label className="block  font-medium text-gray-400">
                MDA in Sokoto State{' '}
                <span className="text-sm">(separated by comma)</span>
              </label>
              <input
                name="mdaInSokotoState"
                value={updatedProject.mdaInSokotoState}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-700 text-white p-2 rounded-md focus:ring focus:ring-blue-500"
              />
            </div>

            {/* Brief About Project */}
            <div>
              <label className="block  font-medium text-gray-400">
                Brief About Project
              </label>
              <input
                name="briefAboutProject"
                value={updatedProject.briefAboutProject}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-700 text-white p-2 rounded-md focus:ring focus:ring-blue-500"
              />
            </div>

            {/* Status of Project */}
            <div>
              <label className="block  font-medium text-gray-400">
                Status of Project
              </label>
              <input
                name="statusOfProject"
                value={updatedProject.statusOfProject}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-700 text-white p-2 rounded-md focus:ring focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-4 py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EditProjectModal;
