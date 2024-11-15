import { motion } from 'framer-motion';
import Header from '../components/common/Header';
import StatCard from '../components/common/StatCard';
import PartnersRegistrationStatus from '../components/partners/PartnersRegistrationStatus';
import FundsByDonorCategory from '../components/partners/FundsByDonorCategory';
import MapOfActivity from '../components/partners/MapOfActivity';
import { useState, useEffect } from 'react';
import LoadingScreen from '../components/common/LoadingScreen';
import api from '../api/axios.js';
import lgaCoordinates from '../data/lgaData.js';

function PartnersDashboard() {
  const [loading, setLoading] = useState(false);
  const [projectsData, setProjectsData] = useState([]);
  const [partnersData, setPartnersData] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(0);

  console.log('EXCHANGE RATE: ', exchangeRate);
  console.log('PARTNERS DATA: ', partnersData);
  

  useEffect(() => {
    const fetchPartners = async () => {
      setLoading(true);
      const response = await api.get('/partners/get');
      setPartnersData(response.data);
      setLoading(false);
    };
    const fetchProjects = async () => {
      setLoading(true);
      const response = await api.get('/projects/get');
      setProjectsData(response.data);
      setLoading(false);
    };
    fetchProjects();
    fetchPartners();
  }, []);

  // Fetch current USD to NGN exchange rate
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          `https://openexchangerates.org/api/latest.json?app_id=942d7424643d4e61bc4c79c04c6c4fad`,
        );

        const data = await response.json();
        setExchangeRate(data.rates.NGN);
        //setExchangeRate(data.conversion_rates.NGN); // Save NGN rate
      } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
      }
    };
    fetchExchangeRate();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  // Calculation functions
  const calculateStats = () => {
    const unAgenciesCount = partnersData.filter(
      (partner) => partner.category === 'UN Agency',
    ).length;
    const localPartnersCount = partnersData.filter(
      (partner) => partner.category === 'Local Partners ',
    ).length;
    const internationalPartnersCount = partnersData.filter(
      (partner) => partner.category !== 'Local Partners ',
    ).length;
    const allPartnersCount = partnersData.length;

    const donorAgenciesCount = new Set(
      projectsData.map((project) => project.donorFunderName),
    ).size;
    const lgaImplementationsCount = new Set(
      projectsData.flatMap(
        (project) => project.lgaOfImplementation?.split(', ') || [],
      ),
    ).size;

    const totalGrantsUSD = projectsData.reduce(
      (acc, project) => acc + (project.projectAmountCeilingUSD || 0),
      0,
    );
    const totalGrantsNGN = totalGrantsUSD * exchangeRate;

    return {
      unAgenciesCount,
      localPartnersCount,
      internationalPartnersCount,
      allPartnersCount,
      donorAgenciesCount,
      lgaImplementationsCount,
      totalGrantsNGN,
      totalGrantsUSD,
    };
  };
  function formatCurrency(value) {
    if (value >= 1_000_000_000) {
      return `${(value / 1_000_000_000).toFixed(1)}B`; // Billions
    } else if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(1)}M`; // Millions
    } else if (value >= 1_000) {
      return `${(value / 1_000).toFixed(1)}K`; // Thousands
    }
    return value.toString(); // Smaller numbers show as-is
  }

  const stats = calculateStats();

  // Inside PartnersDashboard component
  const registrationStatusCounts = Object.entries(
    partnersData.reduce((acc, project) => {
      const status = project.partnerRegistrationStatus || 'Unknown'; // handle missing statuses
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {}),
  ).map(([name, value]) => ({ name, value }));

  // Inside PartnersDashboard component
  const donorFundCategoryCounts = Object.entries(
    projectsData.reduce((acc, project) => {
      const category = project.projectCategory || 'Uncategorized'; // handle missing categories
      const amountUSD = project.projectAmountCeilingUSD || 0; // handle missing amounts

      if (!acc[category]) {
        acc[category] = { count: 0, value: 0 };
      }

      acc[category].count += 1; // Optional if you still want the project count
      acc[category].value += amountUSD;

      return acc;
    }, {}),
  ).map(([name, { value }]) => ({
    name,
    value,
  }));

  const lgaActivityData = Object.values(
    projectsData.reduce((acc, project) => {
      const lgas = project.lgaOfImplementation
        ? project.lgaOfImplementation.split(',').map((lga) => lga.trim())
        : [];

      lgas.forEach((lga) => {
        if (lgaCoordinates[lga]) {
          const { name, coordinates } = lgaCoordinates[lga];
          if (!acc[name]) {
            acc[name] = {
              name,
              coordinates,
              totalProjects: 0, // Initialize project count
              organizations: [], // Initialize organizations array
            };
          }
          acc[name].totalProjects += 1; // Increment project count

          // Check if the project organization is in partnersData
          const projectOrganization = project.organizationName;
          const partnerInfo = partnersData.find(
            (partner) => partner.organizationName === projectOrganization,
          );

          // Add organization to the list if it is not already included
          if (
            partnerInfo &&
            !acc[name].organizations.includes(partnerInfo.organizationName)
          ) {
            acc[name].organizations.push(partnerInfo.organizationName);
          }
        }
      });

      return acc;
    }, {}),
  );

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Overview" />

      <main className=" mx-auto py-6 px-4 lg:px-8">
        {/* stats */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="UN Agencies"
            imgSrc="/un.png"
            value={stats.unAgenciesCount}
          />
          <StatCard
            name="Local Partners"
            imgSrc="/local-ngo.png"
            value={stats.localPartnersCount}
          />
          <StatCard
            name="International Partners"
            imgSrc="/international-ngo.png"
            value={stats.internationalPartnersCount}
          />
          <StatCard
            name="All Partners"
            imgSrc="/partners.png"
            value={stats.allPartnersCount}
          />
          <StatCard
            name="Donor Agencies"
            imgSrc="/donor.png"
            value={stats.donorAgenciesCount}
          />
          <StatCard
            name="LGA Implementations"
            imgSrc="/local-government.png"
            value={stats.lgaImplementationsCount}
          />
          <StatCard
            name="Total Grants In NGN"
            imgSrc="/naira.png"
            value={`₦${formatCurrency(stats.totalGrantsNGN)}`}
          />
          <StatCard
            name="Total Grants In USD"
            imgSrc="/dollar.png"
            value={`$${formatCurrency(stats.totalGrantsUSD)}`}
          />
        </motion.div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PartnersRegistrationStatus
            registrationStatusCounts={registrationStatusCounts}
          />{' '}
          <FundsByDonorCategory
            donorFundCategoryCounts={donorFundCategoryCounts}
          />{' '}
          <MapOfActivity locations={lgaActivityData} />{' '}
        </div>
      </main>
    </div>
  );
}

export default PartnersDashboard;
