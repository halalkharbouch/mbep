import { motion } from 'framer-motion';
import { ArrowBigDown, ArrowBigUp, Edit, Search, Trash2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Header from '../components/common/Header';

import api from '../api/axios.js';
import LoadingScreen from '../components/common/LoadingScreen.jsx';

import EditProjectModal from '../components/projects/EditProjectModal.jsx';

import DeleteConfirmationModal from '../components/common/DeleteConfirmationModal.jsx';

const ProjectsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [projectsData, setProjectsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 15;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const categoryDropdownRef = useRef(null);

  const [showDonorDropdown, setShowDonorDropdown] = useState(false);
  const [uniqueDonors, setUniqueDonors] = useState([]);
  const [selectedDonors, setSelectedDonors] = useState([]);
  const donorDropdownRef = useRef(null);

  const [showOrganizationDropdown, setShowOrganizationDropdown] =
    useState(false);
  const [uniqueOrganizations, setUniqueOrganizations] = useState([]);
  const [selectedOrganizations, setSelectedOrganizations] = useState([]);
  const organizationDropdownRef = useRef(null);

  const [showPartnerCategoryDropdown, setShowPartnerCategoryDropdown] =
    useState(false);
  const [uniquePartnerCategories, setUniquePartnerCategories] = useState([
    'International Partners',
    'Local Partners ',
    'UN Agency',
  ]);
  const [selectedPartnerCategories, setSelectedPartnerCategories] = useState(
    [],
  );
  const partnerCategoryDropdownRef = useRef(null);

  const [uniqueThematicAreas, setUniqueThematicAreas] = useState([]);
  const [selectedThematicAreas, setSelectedThematicAreas] = useState([]);
  const [showThematicAreaDropdown, setShowThematicAreaDropdown] =
    useState(false);
  const thematicAreaDropdownRef = useRef(null);

  const [showRegistrationStatusDropdown, setShowRegistrationStatusDropdown] =
    useState(false);
  const [uniqueRegistrationStatuses, setUniqueRegistrationStatuses] = useState(
    [],
  );
  const [selectedRegistrationStatuses, setSelectedRegistrationStatuses] =
    useState([]);
  const registrationStatusDropdownRef = useRef(null);

  const [showApprovalStatusDropdown, setShowApprovalStatusDropdown] =
    useState(false);
  const [uniqueApprovalStatuses, setUniqueApprovalStatuses] = useState([]);
  const [selectedApprovalStatuses, setSelectedApprovalStatuses] = useState([]);
  const approvalStatusDropdownRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await api.get('/projects/get');
        setProjectsData(response.data);
        // Extract unique categories
        const categories = response.data.map(
          (project) => project.projectCategory,
        );
        const uniqueCategories = [...new Set(categories)];
        setUniqueCategories(uniqueCategories);

        // Extract unique Donors
        const donors = response.data.map((project) => project.donorFunderName);
        const uniqueDonors = [...new Set(donors)];
        setUniqueDonors(uniqueDonors);

        // Extract unique Organizations
        const organizations = response.data.map(
          (project) => project.parentPartner.organizationName,
        );
        const uniqueOrganizations = [...new Set(organizations)];
        setUniqueOrganizations(uniqueOrganizations);

        // Extract unique thematic areas
        const thematicAreas = response.data.flatMap((project) =>
          project.projectThematicAreas?.split(',').map((area) => area.trim()),
        );
        const uniqueThematicAreas = [...new Set(thematicAreas)];
        setUniqueThematicAreas(uniqueThematicAreas);

        // Extract unique Organizations
        const statuses = response.data.map(
          (project) => project.projectRegistrationStatus,
        );
        const uniqueRegistrationStatuses = [...new Set(statuses)];
        setUniqueRegistrationStatuses(uniqueRegistrationStatuses);

        // Extract unique Approval Statuses
        const approvalStatuses = response.data.map(
          (project) => project.projectApprovalStatus,
        );
        const uniqueApprovalStatuses = [...new Set(approvalStatuses)];
        setUniqueApprovalStatuses(uniqueApprovalStatuses);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching Projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDeletePartner = () => {
    // Logic to delete the partner goes here
    // e.g., call your delete API function
    console.log('Partner deleted');
    setIsDeleteModalOpen(false); // Close the modal after deletion
  };

  const openEditModal = (project) => {
    setSelectedProject(project);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedProject(null);
  };

  const handleUpdateProject = (updatedProject) => {
    const updatedProjects = projectsData.map((project) => {
      if (project._id === updatedProject._id) {
        return updatedProject;
      }
      return project;
    });
    setProjectsData(updatedProjects);
  };

  // Handle dropdown toggle
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  // Handle dropdown toggles
  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown((prev) => !prev);
    // Close the column dropdown if it's open
    setShowDropdown(false);
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

  // Handle dropdown toggles
  const toggleDonorDropdown = () => {
    setShowDonorDropdown((prev) => !prev);
    // Close the column dropdown if it's open
    setShowDropdown(false);
  };

  const handleDonorToggle = (donor) => {
    setSelectedDonors((prev) => {
      if (prev.includes(donor)) {
        return prev.filter((c) => c !== donor); // Remove category if already selected
      } else {
        return [...prev, donor]; // Add category if not selected
      }
    });
  };

  // Handle dropdown toggles
  const toggleOrganizationDropdown = () => {
    setShowOrganizationDropdown((prev) => !prev);
    // Close the column dropdown if it's open
    setShowDropdown(false);
  };

  const handleOrganizationToggle = (organization) => {
    setSelectedOrganizations((prev) => {
      if (prev.includes(organization)) {
        return prev.filter((c) => c !== organization); // Remove category if already selected
      } else {
        return [...prev, organization]; // Add category if not selected
      }
    });
  };

  // Handle dropdown toggles
  const togglePartnerCategoryDropdown = () => {
    setShowPartnerCategoryDropdown((prev) => !prev);
    // Close the column dropdown if it's open
    setShowDropdown(false);
  };

  const handlePartnerCategoryToggle = (partnerCategory) => {
    setSelectedPartnerCategories((prev) => {
      if (prev.includes(partnerCategory)) {
        return prev.filter((c) => c !== partnerCategory); // Remove category if already selected
      } else {
        return [...prev, partnerCategory]; // Add category if not selected
      }
    });
  };

  // Handle dropdown toggles
  const toggleThematicAreaDropdown = () => {
    setShowThematicAreaDropdown((prev) => !prev);
    // Close the column dropdown if it's open
    setShowDropdown(false);
  };

  const handleThematicAreaToggle = (area) => {
    setSelectedThematicAreas((prev) => {
      if (prev.includes(area)) {
        return prev.filter((a) => a !== area); // Remove area if already selected
      } else {
        return [...prev, area]; // Add area if not selected
      }
    });
  };

  // Handle dropdown toggles
  const toggleRegistrationStatusDropdown = () => {
    setShowRegistrationStatusDropdown((prev) => !prev);
    // Close the column dropdown if it's open
    setShowDropdown(false);
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
  const toggleApprovalStatusDropdown = () => {
    setShowApprovalStatusDropdown((prev) => !prev);
    // Close the column dropdown if it's open
    setShowDropdown(false);
  };

  const handleApprovalStatusToggle = (approvalStatus) => {
    setSelectedApprovalStatuses((prev) => {
      if (prev.includes(approvalStatus)) {
        return prev.filter((c) => c !== approvalStatus); // Remove category if already selected
      } else {
        return [...prev, approvalStatus]; // Add category if not selected
      }
    });
  };

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
        donorDropdownRef.current &&
        !donorDropdownRef.current.contains(event.target)
      ) {
        setShowDonorDropdown(false);
      }

      if (
        organizationDropdownRef.current &&
        !organizationDropdownRef.current.contains(event.target)
      ) {
        setShowOrganizationDropdown(false);
      }

      if (
        partnerCategoryDropdownRef.current &&
        !partnerCategoryDropdownRef.current.contains(event.target)
      ) {
        setShowPartnerCategoryDropdown(false);
      }

      if (
        thematicAreaDropdownRef.current &&
        !thematicAreaDropdownRef.current.contains(event.target)
      ) {
        setShowThematicAreaDropdown(false);
      }

      if (
        registrationStatusDropdownRef.current &&
        !registrationStatusDropdownRef.current.contains(event.target)
      ) {
        setShowRegistrationStatusDropdown(false);
      }

      if (
        approvalStatusDropdownRef.current &&
        !approvalStatusDropdownRef.current.contains(event.target)
      ) {
        setShowApprovalStatusDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [
    dropdownRef,
    categoryDropdownRef,
    donorDropdownRef,
    organizationDropdownRef,
    partnerCategoryDropdownRef,
    thematicAreaDropdownRef,
    registrationStatusDropdownRef,
    approvalStatusDropdownRef,
  ]);

  const handleColumnToggle = (column) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState({
    no: true,
    organizationName: true,
    donorFunderName: true,
    projectImplementingName: true,
    actions: true,
    projectCategory: false,
    tenureOfProjectByYear: false,
    projectStartDate: false,
    projectEndDate: false,
    projectThematicAreas: false,
    lgaOfImplementation: false,
    projectAmountCeilingNGN: false,
    projectAmountCeilingUSD: false,
    projectRegistrationStatus: false,
    projectApprovalStatus: false,
    mdaInSokotoState: false,
    briefAboutProject: false,
    statusOfProject: false,
  });

  // Mapping for column display names
  const columnNames = {
    no: 'No',
    organizationName: 'Organization Name',
    donorFunderName: 'Donor/Funder Name',
    projectImplementingName: 'Project Implementing Name',
    actions: 'Actions',
    projectCategory: 'Project Category',
    tenureOfProjectByYear: 'Tenure of Project by Year',
    projectStartDate: 'Project Start Date',
    projectEndDate: 'Project End Date',
    projectThematicAreas: 'Project Thematic Areas',
    lgaOfImplementation: 'LGA of Implementation',
    projectAmountCeilingNGN: 'Project Amount Ceiling (NGN)',
    projectAmountCeilingUSD: 'Project Amount Ceiling (USD)',
    projectRegistrationStatus: 'Project Registration Status',
    projectApprovalStatus: 'Project Approval Status',
    mdaInSokotoState: 'MDA in Sokoto State',
    briefAboutProject: 'Brief About Project',
    statusOfProject: 'Status of Project',
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const filteredProjects = projectsData.filter((project) => {
    const matchesSearch =
      project.parentPartner?.organizationName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      project.donorFunderName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      project.lgaOfImplementation
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      project.projectImplementingName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(project.projectCategory);

    const matchesDonors =
      selectedDonors.length === 0 ||
      selectedDonors.includes(project.donorFunderName);

    const matchesOrganizations =
      selectedOrganizations.length === 0 ||
      selectedOrganizations.includes(project.parentPartner?.organizationName);

    const matchesPartnerCategories =
      selectedPartnerCategories.length === 0 ||
      selectedPartnerCategories.includes(project.parentPartner.category);

    const matchesThematicArea =
      selectedThematicAreas.length === 0 ||
      selectedThematicAreas.some((area) =>
        project.projectThematicAreas
          ?.split(',')
          .map((a) => a.trim())
          .includes(area),
      );

    const matchesRegistrationStatus =
      selectedRegistrationStatuses.length === 0 ||
      selectedRegistrationStatuses.includes(project.projectRegistrationStatus);

    const matchesApprovalStatus =
      selectedApprovalStatuses.length === 0 ||
      selectedApprovalStatuses.includes(project.projectApprovalStatus);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesDonors &&
      matchesOrganizations &&
      matchesPartnerCategories &&
      matchesThematicArea &&
      matchesRegistrationStatus &&
      matchesApprovalStatus
    );
  });

  const totalItems = filteredProjects.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const displayedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Projects" />
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

          {/* Donor Selection Dropdown */}
          <div className="relative" ref={donorDropdownRef}>
            <button
              onClick={toggleDonorDropdown}
              className="bg-gray-700 text-white px-8 py-4 text-xl uppercase rounded-md focus:outline-none"
            >
              Filter By Donor/Funder{' '}
              <span>
                {showDonorDropdown ? (
                  <ArrowBigUp className="absolute text-red-400 inline mx-auto" />
                ) : (
                  <ArrowBigDown className="text-indigo-400 absolute inline mx-auto" />
                )}
              </span>
            </button>
            {showDonorDropdown && (
              <div className="absolute bg-gray-800 text-white rounded-md shadow-lg p-4 mt-2 z-20">
                {uniqueDonors.map((donor, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={selectedDonors.includes(donor)}
                      onChange={() => handleDonorToggle(donor)}
                      className="mr-2 cursor-pointer"
                    />
                    <label
                      onClick={() => handleDonorToggle(donor)}
                      className="cursor-pointer text-xl"
                    >
                      {donor}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Organization Name Selection Dropdown */}
          <div className="relative" ref={organizationDropdownRef}>
            <button
              onClick={toggleOrganizationDropdown}
              className="bg-gray-700 text-white px-8 py-4 text-xl uppercase rounded-md focus:outline-none"
            >
              Filter By Organization Name{' '}
              <span>
                {showOrganizationDropdown ? (
                  <ArrowBigUp className="absolute text-red-400 inline mx-auto" />
                ) : (
                  <ArrowBigDown className="text-indigo-400 absolute inline mx-auto" />
                )}
              </span>
            </button>
            {showOrganizationDropdown && (
              <div className="absolute bg-gray-800 text-white rounded-md shadow-lg p-4 mt-2 z-20">
                {uniqueOrganizations.map((org, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={selectedOrganizations.includes(org)}
                      onChange={() => handleOrganizationToggle(org)}
                      className="mr-2 cursor-pointer"
                    />
                    <label
                      onClick={() => handleOrganizationToggle(org)}
                      className="cursor-pointer text-xl"
                    >
                      {org}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Partner Category Selection Dropdown */}
          <div className="relative" ref={partnerCategoryDropdownRef}>
            <button
              onClick={togglePartnerCategoryDropdown}
              className="bg-gray-700 text-white px-8 py-4 text-xl uppercase rounded-md focus:outline-none"
            >
              Filter By Partner Category{' '}
              <span>
                {showPartnerCategoryDropdown ? (
                  <ArrowBigUp className="absolute text-red-400 inline mx-auto" />
                ) : (
                  <ArrowBigDown className="text-indigo-400 absolute inline mx-auto" />
                )}
              </span>
            </button>
            {showPartnerCategoryDropdown && (
              <div className="absolute bg-gray-800 text-white rounded-md shadow-lg p-4 mt-2 z-20">
                {uniquePartnerCategories.map((cat, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={selectedPartnerCategories.includes(cat)}
                      onChange={() => handlePartnerCategoryToggle(cat)}
                      className="mr-2 cursor-pointer"
                    />
                    <label
                      onClick={() => handlePartnerCategoryToggle(cat)}
                      className="cursor-pointer text-xl"
                    >
                      {cat}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Thematic Areas Selection Dropdown */}
          <div className="relative" ref={thematicAreaDropdownRef}>
            <button
              onClick={toggleThematicAreaDropdown}
              className="bg-gray-700 text-white px-8 py-4 text-xl uppercase rounded-md focus:outline-none"
            >
              Filter By Thematic Areas{' '}
              <span>
                {showThematicAreaDropdown ? (
                  <ArrowBigUp className="absolute text-red-400 inline mx-auto" />
                ) : (
                  <ArrowBigDown className="text-indigo-400 absolute inline mx-auto" />
                )}
              </span>
            </button>
            {showThematicAreaDropdown && (
              <div className="absolute bg-gray-800 text-white rounded-md shadow-lg p-4 mt-2 z-20">
                {uniqueThematicAreas.map((area, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={selectedThematicAreas.includes(area)}
                      onChange={() => handleThematicAreaToggle(area)}
                      className="mr-2 cursor-pointer"
                    />
                    <label
                      onClick={() => handleThematicAreaToggle(area)}
                      className="cursor-pointer text-xl"
                    >
                      {area}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex space-x-4 mt-4">
          {/* Registration Status Selection Dropdown */}
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

          {/* Approval Status Selection Dropdown */}
          <div className="relative" ref={approvalStatusDropdownRef}>
            <button
              onClick={toggleApprovalStatusDropdown}
              className="bg-gray-700 text-white px-8 py-4 text-xl uppercase rounded-md focus:outline-none"
            >
              Filter By Approval Status{' '}
              <span>
                {showApprovalStatusDropdown ? (
                  <ArrowBigUp className="absolute text-red-400 inline mx-auto" />
                ) : (
                  <ArrowBigDown className="text-indigo-400 absolute inline mx-auto" />
                )}
              </span>
            </button>
            {showApprovalStatusDropdown && (
              <div className="absolute bg-gray-800 text-white rounded-md shadow-lg p-4 mt-2 z-20">
                {uniqueApprovalStatuses.map((status, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={selectedApprovalStatuses.includes(status)}
                      onChange={() => handleApprovalStatusToggle(status)}
                      className="mr-2 cursor-pointer"
                    />
                    <label
                      onClick={() => handleApprovalStatusToggle(status)}
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
              Projects List
            </h2>
            <div className="relative">
              <input
                value={searchTerm}
                onChange={handleSearch}
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
                  {visibleColumns.actions && (
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  )}
                  {visibleColumns.organizationName && (
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                      Organization Name
                    </th>
                  )}

                  {visibleColumns.donorFunderName && (
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                      Donor Fund
                    </th>
                  )}
                  {visibleColumns.projectRegistrationStatus && (
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                      Registration Status
                    </th>
                  )}
                  {visibleColumns.lgaOfImplementation && (
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                      LGA
                    </th>
                  )}
                  {visibleColumns.projectImplementingName && (
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                      Project Name
                    </th>
                  )}
                  {visibleColumns.tenureOfProjectByYear && (
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                      Project Tenure
                    </th>
                  )}
                  {visibleColumns.projectStartDate && (
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                      Start Date
                    </th>
                  )}
                  {visibleColumns.projectEndDate && (
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                      End Date
                    </th>
                  )}
                  {visibleColumns.projectCategory && (
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                      Project Category
                    </th>
                  )}
                  {visibleColumns.projectThematicAreas && (
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                      Project Thematic Areas
                    </th>
                  )}
                  {visibleColumns.projectAmountCeilingNGN && (
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                      Project Amount (NGN)
                    </th>
                  )}
                  {visibleColumns.projectAmountCeilingUSD && (
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                      Project Amount (USD)
                    </th>
                  )}
                  {visibleColumns.projectApprovalStatus && (
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                      Project Approval Status
                    </th>
                  )}
                  {visibleColumns.mdaInSokotoState && (
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                      MDA's In Sokoto
                    </th>
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-700">
                {displayedProjects.map((p, i) => (
                  <motion.tr
                    key={p.id}
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
                    {visibleColumns.organizationName && (
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-300">
                        {p.parentPartner.organizationName}
                      </td>
                    )}
                    {visibleColumns.donorFunderName && (
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-300">
                        {p.donorFunderName}
                      </td>
                    )}
                    {visibleColumns.projectRegistrationStatus && (
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-300">
                        {p.projectRegistrationStatus}
                      </td>
                    )}
                    {visibleColumns.lgaOfImplementation && (
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-300">
                        {p.lgaOfImplementation}
                      </td>
                    )}
                    {visibleColumns.projectImplementingName && (
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-300">
                        {p.projectImplementingName}
                      </td>
                    )}
                    {visibleColumns.tenureOfProjectByYear && (
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-300">
                        {p.tenureOfProjectByYear}
                      </td>
                    )}
                    {visibleColumns.projectStartDate && (
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-300">
                        {new Date(p.projectStartDate).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          },
                        )}
                      </td>
                    )}
                    {visibleColumns.projectEndDate && (
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-300">
                        {new Date(p.projectEndDate).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          },
                        )}
                      </td>
                    )}
                    {visibleColumns.projectCategory && (
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-300">
                        {p.projectCategory}
                      </td>
                    )}
                    {visibleColumns.projectThematicAreas && (
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-300">
                        {p.projectThematicAreas}
                      </td>
                    )}
                    {visibleColumns.projectAmountCeilingNGN && (
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-300">
                        {new Intl.NumberFormat('en-NG', {
                          style: 'currency',
                          currency: 'NGN',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(p.projectAmountCeilingNGN)}
                      </td>
                    )}
                    {visibleColumns.projectAmountCeilingUSD && (
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-300">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(p.projectAmountCeilingUSD)}
                      </td>
                    )}
                    {visibleColumns.projectApprovalStatus && (
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-300">
                        {p.projectApprovalStatus}
                      </td>
                    )}
                    {visibleColumns.mdaInSokotoState && (
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-300">
                        {p.mdaInSokotoState}
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
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="text-gray-400 text-xl disabled:text-gray-600"
            >
              Previous
            </button>
            <span className="text-gray-300 text-xl">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="text-gray-400 text-xl disabled:text-gray-600"
            >
              Next
            </button>
          </div>
        </motion.div>

        <EditProjectModal
          project={selectedProject}
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onSave={handleUpdateProject}
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

export default ProjectsTable;
