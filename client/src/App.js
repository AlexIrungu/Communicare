import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";

// Page Components
import HomePage from "./pages/Home/HomePage";
import DiseaseListPage from "./pages/DiseaseList/DiseaseListPage";
import DiseaseDetailPage from "./pages/DiseaseDetail/DiseaseDetailPage";
import AreaDetailPage from "./pages/AreaDetail/AreaDetailPage";
import AreasListPage from "./pages/AreaList/AreasListPage";
import MapViewPage from "./pages/MapView/MapViewPage";
import DonatePage from "./pages/Donate/DonatePage";
import AdminPage from "./pages/Admin/AdminPage";

// Authentication Components
import Login from "./components/aunthentication/Login";
import Signup from "./components/aunthentication/Signup";

// Admin Components
import AdminAreaPanel from "./components/admin/AdminAreaPanel";
import AdminDiseasePanel from "./components/admin/AdminDiseasePanel";
import AdminDonationPanel from "./components/admin/AdminDonationPanel";
import AdminUserPanel from "./components/admin/AdminUserPanel";
import UserManagement from "./components/admin/UserManagement";

// Common Components
import Navbar from "./components/common/Navbar";
import ErrorMessage from "./components/common/ErrorMessage";

import AdminNavbar from "./components/common/AdminNavbar";
import Statistics from "./pages/Admin/Statistics";
import CommunityReviews from "./pages/Admin/CommunityReviews";
import HealthAlerts from "./pages/Admin/HealthAlerts";
import LandingPage from "./pages/Landing/LandingPage";

// Create a separate component for the app content
const AppContent = () => {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const ProtectedRoute = ({ children }) => {
    const { user, loading } = useSelector((state) => state.auth);
    
    if (loading) return <div>Loading...</div>; // Show a loading state
    if (!user) return <Navigate to="/login" replace />;
  
    return children;
  };
  
  const AdminRoute = ({ children }) => {
    const { user, loading } = useSelector((state) => state.auth);
  
    if (loading) return <div>Loading...</div>;
    if (!user?.isAdmin) return <Navigate to="/" replace />;
  
    return children;
  };
  
  

  return (
    <div className="App min-h-screen flex flex-col">
      {(!isAdminRoute || !user?.isAdmin) && <Navbar />}
      {isAdminRoute && user?.isAdmin && <AdminNavbar />}

      <div className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Navigate to="/landing" replace />} />
          <Route path="/signup" element={<Navigate to="/landing" replace />} />

          <Route path="/landing" element={<LandingPage />} />

          {/* Disease Routes */}
          <Route path="/diseases" element={<DiseaseListPage />} />
          <Route path="/diseases/:diseaseId" element={<DiseaseDetailPage />} />

          {/* Area Routes */}
          <Route path="/areas" element={<AreasListPage />} />
          <Route path="/areas/:areaId" element={<AreaDetailPage />} />

          {/* Map View */}
          <Route path="/map" element={<MapViewPage />} />

          {/* Protected Routes */}
          <Route
            path="/donate/:areaId?"
            element={
              <ProtectedRoute>
                <DonatePage />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          >
            <Route path="diseases" element={<AdminDiseasePanel />} />
            <Route path="areas" element={<AdminAreaPanel />} />
            <Route path="donations" element={<AdminDonationPanel />} />
            <Route path="users" element={<AdminUserPanel />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route
              path="statistics"
              element={
                <AdminRoute>
                  <Statistics />
                </AdminRoute>
              }
            />
            <Route
              path="community-reviews"
              element={
                <AdminRoute>
                  <CommunityReviews />
                </AdminRoute>
              }
            />
            <Route
              path="health-alerts"
              element={
                <AdminRoute>
                  <HealthAlerts />
                </AdminRoute>
              }
            />
            <Route index element={<Navigate to="diseases" replace />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

// Main App component
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
