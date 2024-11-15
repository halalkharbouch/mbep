import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import api from '../api/axios.js';

const EditPartnerModal = ({ partner, isOpen, onClose, onSave }) => {
  const [updatedPartner, setUpdatedPartner] = useState({ ...partner });
  const [originalPartner, setOriginalPartner] = useState({ ...partner });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setUpdatedPartner({ ...partner });
      setOriginalPartner({ ...partner }); // Store the original partner data
    }
  }, [partner, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPartner({ ...updatedPartner, [name]: value });
  };

  const handleSubmit = async () => {
    const updatedFields = {};

    // Check which fields have been modified
    for (const key in updatedPartner) {
      if (updatedPartner[key] !== originalPartner[key]) {
        updatedFields[key] = updatedPartner[key]; // Add only modified fields
      }
    }

    try {
      const response = await api.put(
        `/partners/update/${partner._id}`,
        updatedFields,
      );
      const data = await response.data;
      onSave(data); // Send only updated fields
      onClose();
    } catch (error) {
      console.error('Error updating partner:', error);
      setError('An Error Occurred While Trying to Update');
    }
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
        <h2 className="text-2xl font-semibold mb-6">Edit Partner</h2>

        {error && (
          <div className="bg-red-500 text-white p-2 rounded-md mb-4">
            {error}
          </div>
        )}

        <div className="flex space-x-2 w-full">
          <div className="space-y-4 w-full">
            {/* Organization Name */}
            <div>
              <label className="block font-medium text-gray-400">
                Organization Name
              </label>
              <input
                name="organizationName"
                value={updatedPartner.organizationName}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-700 text-white p-2 rounded-md focus:ring focus:ring-blue-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block  font-medium text-gray-400">
                Category
              </label>
              <input
                name="category"
                value={updatedPartner.category}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-700 text-white p-2 rounded-md focus:ring focus:ring-blue-500"
              />
            </div>

            {/* Contact Person Name */}
            <div>
              <label className="block  font-medium text-gray-400">
                Contact Person Name
              </label>
              <input
                name="contactPersonName"
                value={updatedPartner.contactPersonName}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-700 text-white p-2 rounded-md focus:ring focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block  font-medium text-gray-400">Email</label>
              <input
                name="emailAddress"
                value={updatedPartner.emailAddress}
                onChange={handleChange}
                type="email"
                className="mt-1 block w-full bg-gray-700 text-white p-2 rounded-md focus:ring focus:ring-blue-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block  font-medium text-gray-400">Phone</label>
              <input
                name="phoneNumber"
                value={updatedPartner.phoneNumber}
                onChange={handleChange}
                type="tel"
                className="mt-1 block w-full bg-gray-700 text-white p-2 rounded-md focus:ring focus:ring-blue-500"
              />
            </div>

            {/* Office Address */}
            <div>
              <label className="block  font-medium text-gray-400">
                Office Address
              </label>
              <input
                name="officeAddress"
                value={updatedPartner.officeAddress}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-700 text-white p-2 rounded-md focus:ring focus:ring-blue-500"
              />
            </div>

            {/* Thematic Areas */}
            <div>
              <label className="block  font-medium text-gray-400">
                Thematic Areas
              </label>
              <input
                name="partnerThematicAreas"
                value={updatedPartner.partnerThematicAreas}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-700 text-white p-2 rounded-md focus:ring focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-4 w-full">
            {/* Organization Registration Status */}
            <div>
              <label className="block font-medium text-gray-400">
                Registration Status
              </label>
              <select
                name="partnerRegistrationStatus"
                value={updatedPartner.partnerRegistrationStatus}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-700 text-white p-2 rounded-md focus:ring focus:ring-blue-500"
              >
                <option value="">Select Registration Status</option>
                <option value="Registration Started">
                  Registration Started
                </option>
                <option value="Not yet Registered">Not yet Registered</option>
                <option value="Registration Completed">
                  Registration Completed
                </option>
              </select>
            </div>

            {/* Partner Thematic Areas */}
            <div>
              <label className="block  font-medium text-gray-400">
                Partner Thematic Areas{' '}
                <span className="text-sm">(separated by comma)</span>
              </label>
              <input
                name="partnerThematicAreas"
                value={updatedPartner.partnerThematicAreas}
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
                value={updatedPartner.lgaOfImplementation}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-700 text-white p-2 rounded-md focus:ring focus:ring-blue-500"
              />
            </div>
            {/* Donor Funder Name */}
            <div>
              <label className="block  font-medium text-gray-400">
                Donor Funder Name
              </label>
              <input
                name="donorFunderName"
                value={updatedPartner.donorFunderName}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-700 text-white p-2 rounded-md focus:ring focus:ring-blue-500"
              />
            </div>
            {/* Total Number of Staffs */}
            <div>
              <label className="block  font-medium text-gray-400">
                Total Number of Staffs
              </label>
              <input
                name="totalNumberOfStaff"
                value={updatedPartner.totalNumberOfStaff}
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

export default EditPartnerModal;
