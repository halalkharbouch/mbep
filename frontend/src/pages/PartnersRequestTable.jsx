import { motion } from 'framer-motion';
import {  Search} from 'lucide-react';
import { useState, useEffect } from 'react';
import Header from '../components/common/Header';

import api from '../api/axios.js';
import LoadingScreen from '../components/common/LoadingScreen.jsx';

const PartnersRequestTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [partnersData, setPartnersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 15;

  console.log(partnersData);

  useEffect(() => {
    const fetchPartners = async () => {
      setLoading(true);
      const response = await api.get('/partners/requests');
      setPartnersData(response.data);
      setLoading(false);
    };

    fetchPartners();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const filteredPartners = partnersData.filter((partner) =>
    partner.organizationName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  const totalItems = filteredPartners.length;
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

  const displayedPartners = filteredPartners.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Horizontal scroll with click-and-drag
  const handleMouseDown = (e) => {
    const tableContainer = e.currentTarget;
    tableContainer.isDragging = true;
    tableContainer.startX = e.pageX - tableContainer.offsetLeft;
    tableContainer.scrollLeftStart = tableContainer.scrollLeft;

    const handleMouseMove = (e) => {
      if (tableContainer.isDragging) {
        const x = e.pageX - tableContainer.offsetLeft;
        const scroll = x - tableContainer.startX;
        tableContainer.scrollLeft = tableContainer.scrollLeftStart - scroll;
      }
    };

    const handleMouseUp = () => {
      tableContainer.isDragging = false;
      tableContainer.removeEventListener('mousemove', handleMouseMove);
      tableContainer.removeEventListener('mouseup', handleMouseUp);
    };

    tableContainer.addEventListener('mousemove', handleMouseMove);
    tableContainer.addEventListener('mouseup', handleMouseUp);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Partners" />

      <main className="mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-100">
              Partners Requests List
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

          <div
            className="overflow-x-auto"
            onMouseDown={handleMouseDown}
            style={{ cursor: 'grab' }}
          >
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                    Contact Person Name
                  </th>
                  <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                    Registration Status
                  </th>

                  <th className="px-6 py-3 text-left text-xl font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-700">
                {displayedPartners.map((p, i) => (
                  <motion.tr
                    key={p.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-xl font-medium text-gray-100 flex gap-2 items-center">
                      {i + 1}. {p.organizationName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-300">
                      {p.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-300">
                      {p.contactPersonName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-300">
                      {p.emailAddress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-300">
                      {0}
                      {p.phoneNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-300">
                      <span className="px-2 py-2 inline-flex text-xl leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-300">
                      <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                        Review
                      </button>
                    </td>
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
      </main>
    </div>
  );
};

export default PartnersRequestTable;
