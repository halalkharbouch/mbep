import { motion } from 'framer-motion';
import { Edit, Search, Trash2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Header from '../components/common/Header';
import EditPartnerModal from './EditPartnerModal.jsx';
import api from '../api/axios.js';
import LoadingScreen from '../components/common/LoadingScreen.jsx';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import DeleteConfirmationModal from '../components/common/DeleteConfirmationModal.jsx';

const PartnersTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [partnersData, setPartnersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 15;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState({
    no: true,
    organizationName: true,
    contactPersonName: true,
    emailAddress: true,
    actions: true,
    state: false,
    category: false,
    officeAddress: false,
    phoneNumber: false,
    totalNumberOfStaff: false,
    donorFunderName: false,
    partnerThematicAreas: false,
    lgaOfImplementation: false,
    partnerRegistrationStatus: false,
  });

  // Mapping for column display names
  const columnNames = {
    no: 'No',
    organizationName: 'Organization Name',
    contactPersonName: 'Contact Person Name',
    emailAddress: 'Email Address',
    actions: 'Actions',
    state: 'State',
    category: 'Category',
    officeAddress: 'Office Address',
    phoneNumber: 'Phone Number',
    totalNumberOfStaff: 'Total Number of Staff',
    donorFunderName: 'Donor/Funder Name',
    partnerThematicAreas: 'Partner Thematic Areas',
    lgaOfImplementation: 'LGA of Implementation',
    partnerRegistrationStatus: 'Partner Registration Status',
  };

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const categoryDropdownRef = useRef(null);

  const [showRegistrationStatusDropdown, setShowRegistrationStatusDropdown] =
    useState(false);
  const registrationStatusDropdownRef = useRef(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);

  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [uniqueRegistrationStatuses, setUniqueRegistrationStatuses] = useState(
    [],
  );

  const [selectedCategories, setSelectedCategories] = useState([]);

  const [selectedRegistrationStatuses, setSelectedRegistrationStatuses] =
    useState([]);

  console.log('PARTNERS DATA: ', partnersData);

  console.log('UNIQUE REGISTRATION STATUS: ', uniqueRegistrationStatuses);
  console.log('UNIQUE CATEGORIES: ', uniqueCategories);

  useEffect(() => {
    const fetchPartners = async () => {
      setLoading(true);
      try {
        const response = await api.get('/partners/get');
        setPartnersData(response.data);

        // Extract unique categories
        const categories = response.data.map((partner) => partner.category);
        const uniqueCategories = [...new Set(categories)];
        setUniqueCategories(uniqueCategories);

        // Extract unique registration statuses
        const registrationStatuses = response.data.map(
          (partner) => partner.partnerRegistrationStatus,
        );
        const uniqueRegistrationStatuses = [...new Set(registrationStatuses)];
        setUniqueRegistrationStatuses(uniqueRegistrationStatuses);
      } catch (error) {
        console.error('Error fetching partners:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  const handleDeletePartner = () => {
    // Logic to delete the partner goes here
    // e.g., call your delete API function
    console.log('Partner deleted');
    setIsDeleteModalOpen(false); // Close the modal after deletion
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category); // Remove category if already selected
      } else {
        return [...prev, category]; // Add category if not selected
      }
    });
  };

  const handleRegistrationStatusToggle = (registrationStatus) => {
    setSelectedRegistrationStatuses((prev) => {
      if (prev.includes(registrationStatus)) {
        return prev.filter((c) => c !== registrationStatus); // Remove category if already selected
      } else {
        return [...prev, registrationStatus]; // Add category if not selected
      }
    });
  };

  // Handle dropdown toggles
  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown((prev) => !prev);
    // Close the column dropdown if it's open
    setShowDropdown(false);
  };

  const toggleRegistrationStatusDropdown = () => {
    setShowRegistrationStatusDropdown((prev) => !prev);
    setShowDropdown(false);
    setShowCategoryDropdown(false);
  };

  // Handle dropdown toggle
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }

      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target)
      ) {
        setShowCategoryDropdown(false);
      }

      if (
        registrationStatusDropdownRef.current &&
        !registrationStatusDropdownRef.current.contains(event.target)
      ) {
        setShowRegistrationStatusDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef, categoryDropdownRef, registrationStatusDropdownRef]);

  const openEditModal = (partner) => {
    setSelectedPartner(partner);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedPartner(null);
  };

  const handleColumnToggle = (column) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const handleUpdatePartner = (updatedPartner) => {
    const updatedPartners = partnersData.map((partner) => {
      if (partner._id === updatedPartner._id) {
        return updatedPartner;
      }
      return partner;
    });
    setPartnersData(updatedPartners);
  };

  const filteredPartners = partnersData.filter((partner) => {
    const matchesSearch = partner.organizationName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(partner.category);

    const matchesRegistrationStatus =
      selectedRegistrationStatuses.length === 0 ||
      selectedRegistrationStatuses.includes(partner.partnerRegistrationStatus);
    return matchesSearch && matchesCategory && matchesRegistrationStatus;
  });

  const totalItems = filteredPartners.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const displayedPartners = filteredPartners.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Partners" />
      <div className="mx-auto py-6 px-4 lg:px-8">
        {/* Dropdowns Container */}
        <div className="flex space-x-4">
          {/* Category Selection Dropdown */}
          <div className="relative" ref={categoryDropdownRef}>
            <button
              onClick={toggleCategoryDropdown}
              className="bg-gray-700 text-white px-8 py-4 text-xl uppercase rounded-md focus:outline-none"
            >
              Filter By Category{' '}
              <span>
                {showCategoryDropdown ? (
                  <ArrowBigUp className="absolute text-red-400 inline mx-auto" />
                ) : (
                  <ArrowBigDown className="text-indigo-400 absolute inline mx-auto" />
                )}
              </span>
            </button>
            {showCategoryDropdown && (
              <div className="absolute bg-gray-800 text-white rounded-md shadow-lg p-4 mt-2 z-20">
                {uniqueCategories.map((category, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className="mr-2 cursor-pointer"
                    />
                    <label
                      onClick={() => handleCategoryToggle(category)}
                      className="cursor-pointer text-xl"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Registration Selection Dropdown */}
          <div className="relative" ref={registrationStatusDropdownRef}>
            <button
              onClick={toggleRegistrationStatusDropdown}
              className="bg-gray-700 text-white px-8 py-4 text-xl uppercase rounded-md focus:outline-none"
            >
              Filter By Registration Status{' '}
              <span>
                {showRegistrationStatusDropdown ? (
                  <ArrowBigUp className="absolute text-red-400 inline mx-auto" />
                ) : (
                  <ArrowBigDown className="text-indigo-400 absolute inline mx-auto" />
                )}
              </span>
            </button>
            {showRegistrationStatusDropdown && (
              <div className="absolute bg-gray-800 text-white rounded-md shadow-lg p-4 mt-2 z-20">
                {uniqueRegistrationStatuses.map((status, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={selectedRegistrationStatuses.includes(status)}
                      onChange={() => handleRegistrationStatusToggle(status)}
                      className="mr-2 cursor-pointer"
                    />
                    <label
                      onClick={() => handleRegistrationStatusToggle(status)}
                      className="cursor-pointer text-xl"
                    >
                      {status}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <main className="mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-100">
              Partners List
            </h2>
            <div className="relative">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search"
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search
                className="absolute top-2.5 left-3 text-gray-400"
                size={18}
              />
            </div>
          </div>

          {/* Column Selection Dropdown */}
          <div className="relative mb-6" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="bg-gray-700 uppercase text-xl text-white px-4 py-2 rounded-md focus:outline-none"
            >
              Toggle Columns
            </button>
            {showDropdown && (
              <div className="absolute bg-gray-800 text-white rounded-md shadow-lg p-4 mt-2 z-20">
                {Object.keys(visibleColumns).map((column) => (
                  <div key={column} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={visibleColumns[column]}
                      onChange={() => handleColumnToggle(column)}
                      className="mr-2 cursor-pointer"
                    />
                    <label
                      onClick={() => handleColumnToggle(column)}
                      className="text-xl cursor-pointer"
                    >
                      {columnNames[column]} {/* Use the mapping here */}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  {visibleColumns.no && (
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                      No.
                    </th>
                  )}
                  {visibleColumns.organizationName && (
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                      Organization Name
                    </th>
                  )}
                  {visibleColumns.contactPersonName && (
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                      Contact Person Name
                    </th>
                  )}
                  {visibleColumns.emailAddress && (
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                      Email
                    </th>
                  )}
                  {visibleColumns.state && (
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                      State
                    </th>
                  )}
                  {visibleColumns.category && (
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                      Category
                    </th>
                  )}
                  {visibleColumns.officeAddress && (
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                      Office Address
                    </th>
                  )}
                  {visibleColumns.phoneNumber && (
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                      Phone Number
                    </th>
                  )}

                  {visibleColumns.totalNumberOfStaff && (
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                      Staffs
                    </th>
                  )}
                  {visibleColumns.donorFunderName && (
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                      Donor/Funder Name
                    </th>
                  )}
                  {visibleColumns.partnerThematicAreas && (
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                      Thematic Areas
                    </th>
                  )}
                  {visibleColumns.lgaOfImplementation && (
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                      LGA of Implementation
                    </th>
                  )}
                  {visibleColumns.partnerRegistrationStatus && (
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                      Registration Status
                    </th>
                  )}
                  {visibleColumns.actions && (
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  )}
                  {/* Add other columns conditionally based on visibility */}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-700">
                {displayedPartners.map((p, i) => (
                  <motion.tr
                    key={p._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {visibleColumns.no && (
                      <td className="px-6 py-4 whitespace-nowrap text-xl font-medium text-gray-100">
                        {/* Calculate the continuous index based on the current page */}
                        {(currentPage - 1) * itemsPerPage + i + 1}.
                      </td>
                    )}
                    {visibleColumns.organizationName && (
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-300">
                        {p.organizationName}
                      </td>
                    )}
                    {visibleColumns.contactPersonName && (
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-300">
                        {p.contactPersonName}
                      </td>
                    )}
                    {visibleColumns.emailAddress && (
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-300">
                        {p.emailAddress}
                      </td>
                    )}
                    {visibleColumns.state && (
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-300">
                        {p.state}
                      </td>
                    )}
                    {visibleColumns.category && (
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-300">
                        {p.category}
                      </td>
                    )}
                    {visibleColumns.officeAddress && (
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-300">
                        {p.officeAddress}
                      </td>
                    )}
                    {visibleColumns.phoneNumber && (
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-300">
                        {p.phoneNumber}
                      </td>
                    )}
                    {visibleColumns.totalNumberOfStaff && (
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-300">
                        {p.totalNumberOfStaff}
                      </td>
                    )}
                    {visibleColumns.donorFunderName && (
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-300">
                        {p.donorFunderName}
                      </td>
                    )}
                    {visibleColumns.partnerThematicAreas && (
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-300">
                        {p.partnerThematicAreas}
                      </td>
                    )}
                    {visibleColumns.lgaOfImplementation && (
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-300">
                        {p.lgaOfImplementation}
                      </td>
                    )}
                    {visibleColumns.partnerRegistrationStatus && (
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-300">
                        {p.partnerRegistrationStatus}
                      </td>
                    )}
                    {visibleColumns.actions && (
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-300">
                        <button
                          onClick={() => openEditModal(p)}
                          className="text-indigo-400 hover:text-indigo-300 mr-2"
                        >
                          <Edit size={25} />
                        </button>
                        <button
                          onClick={() => setIsDeleteModalOpen(true)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={25} />
                        </button>
                      </td>
                    )}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="text-gray-400 text-xl disabled:text-gray-600"
            >
              Previous
            </button>
            <span className="text-gray-300 text-xl">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="text-gray-400 text-xl disabled:text-gray-600"
            >
              Next
            </button>
          </div>
        </motion.div>
        <EditPartnerModal
          partner={selectedPartner}
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onSave={handleUpdatePartner}
        />

        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)} // Close the modal
          onConfirm={handleDeletePartner} // Confirm deletion action
        />
      </main>
    </div>
  );
};

export default PartnersTable;
