import { useState } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { motion } from 'framer-motion';
import Modal from 'react-modal';
import api from '../api/axios.js';

Modal.setAppElement('#root'); // Required for accessibility

const PartnerApplicationForm = () => {
  const [formValues, setFormValues] = useState({
    category: '',
    organizationName: '',
    emailAddress: '',
    officeAddress: '',
    phoneNumber: '',
    contactPersonName: '',
    partnerThematicAreas: '', // Store as comma-separated string
    organizationProfile: null,
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const categoryOptions = [
    { value: 'International Partners', label: 'International Partners' },
    { value: 'Local Partners', label: 'Local Partners' },
  ];

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleThematicAreasChange = (newValue) => {
    const thematicAreas = newValue.map((option) => option.value).join(', ');
    setFormValues((prev) => ({ ...prev, partnerThematicAreas: thematicAreas }));
  };

  const handleFileChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      organizationProfile: e.target.files[0],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormValues = {
      ...formValues,
      partnerRegistrationStatus: 'Registration Started',
    };
    delete updatedFormValues.organizationProfile;

    try {
      const response = await api.post(
        '/partners/create-partner-request',
        updatedFormValues,
      );
      console.log(response);

      setShowSuccessModal(true); // Show success modal on success
    } catch (error) {
      console.error('Submission failed', error);
    }
  };

  return (
    <div className="flex-1 overflow-auto relative z-10 max-w-7xl mx-auto">
      <main className="mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-gray-100 mb-4">
            Partner Application Form
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Category Select */}
            <div>
              <label className="text-gray-300 text-lg mb-2 block">
                Partner Category
              </label>
              <Select
                options={categoryOptions}
                onChange={(selectedOption) =>
                  handleChange('category', selectedOption.value)
                }
                placeholder="Select Category"
                className="text-gray-900"
              />
            </div>

            {/* Organization Name */}
            <div>
              <label className="text-gray-300 text-lg mb-2 block">
                Organization Name
              </label>
              <input
                required
                type="text"
                value={formValues.organizationName}
                onChange={(e) =>
                  handleChange('organizationName', e.target.value)
                }
                placeholder="Organization Name"
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="text-gray-300 text-lg mb-2 block">
                Contact Person Email Address
              </label>
              <input
                required
                type="email"
                value={formValues.emailAddress}
                onChange={(e) => handleChange('emailAddress', e.target.value)}
                placeholder="Email Address"
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>

            {/* Office Address */}
            <div>
              <label className="text-gray-300 text-lg mb-2 block">
                Office Address
              </label>
              <input
                required
                type="text"
                value={formValues.officeAddress}
                onChange={(e) => handleChange('officeAddress', e.target.value)}
                placeholder="Office Address"
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-gray-300 text-lg mb-2 block">
                Contact Person Phone Number
              </label>
              <input
                required
                type="tel"
                value={formValues.phoneNumber}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                placeholder="Phone Number"
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>

            {/* Contact Person Name */}
            <div>
              <label className="text-gray-300 text-lg mb-2 block">
                Contact Person Name
              </label>
              <input
                required
                type="text"
                value={formValues.contactPersonName}
                onChange={(e) =>
                  handleChange('contactPersonName', e.target.value)
                }
                placeholder="Contact Person Name"
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>

            {/* Thematic Areas */}
            <div>
              <label className="text-gray-300 text-lg mb-2 block">
                Thematic Areas
              </label>
              <CreatableSelect
                isMulti
                onChange={handleThematicAreasChange}
                placeholder="Select or add thematic areas"
                className="text-gray-900"
              />
            </div>

            {/* Organization Profile */}
            <div>
              <label className="text-gray-300 text-lg mb-2 block">
                Organization Profile
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="bg-gray-700 text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold rounded-lg px-6 py-3 hover:bg-blue-500 transition duration-200"
              >
                Submit
              </button>
            </div>
          </form>
        </motion.div>
      </main>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
        contentLabel="Application Submitted"
        className="flex items-center justify-center h-screen"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center"
        style={{
          overlay: { zIndex: 20 }, // Ensures overlay is in front
          content: { zIndex: 21 }, // Ensures modal content is in front of overlay
        }}
      >
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-sm mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Application Submitted
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for submitting your application! We will review it and get
            back to you shortly.
          </p>
          <a
            href="http://localhost:3001/" // Change to your redirect URL
            className="bg-blue-600 text-white font-semibold rounded-lg px-6 py-3 hover:bg-blue-500 transition duration-200"
          >
            OK
          </a>
        </div>
      </Modal>
    </div>
  );
};

export default PartnerApplicationForm;
