import { Route, Routes, useLocation } from 'react-router-dom';

import ProductPage from './pages/ProductPage';
import SideBar from './components/common/SideBar';
import UsersPage from './pages/UsersPage';
import SalesPage from './pages/SalesPage';
import OrdersPage from './pages/OrdersPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import PartnersDashboard from './pages/PartnersDashboard';
import ProjectsTable from './pages/ProjectsTable';
import PartnersTable from './pages/PartnersTable';
import PartnerApplicationForm from './pages/PartnerApplicationForm';
import PartnersRequestTable from './pages/PartnersRequestTable';


function App() {
  const location = useLocation();
  const showSidebar = location.pathname !== '/partners-application';

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* BG */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-o bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      {/* Conditionally render the sidebar */}
      {showSidebar && <SideBar />}

      <Routes>
        <Route path="/products" element={<ProductPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/" element={<PartnersDashboard />} />
        <Route path="/projects-table" element={<ProjectsTable />} />
        <Route path="/partners-table" element={<PartnersTable />} />
        <Route path="/partners-request" element={<PartnersRequestTable />} />
        <Route
          path="/partners-application"
          element={<PartnerApplicationForm />}
        />
      </Routes>
    </div>
  );
}

export default App;
