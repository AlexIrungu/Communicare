import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkAuthStatus } from "./features/auth/authSlice";

// Page Components
import HomePage from "./pages/Home/HomePage";
import DiseaseListPage from "./pages/DiseaseList/DiseaseListPage";
import DiseaseDetailPage from "./pages/DiseaseDetail/DiseaseDetailPage";
import AreaDetailPage from "./pages/AreaDetail/AreaDetailPage";
import AreasListPage from "./pages/AreaList/AreasListPage";
import MapViewPage from "./pages/MapView/MapViewPage";
import DonatePage from "./pages/Donate/DonatePage";
import AdminPage from "./pages/Admin/AdminPage";
import LandingPage from "./pages/Landing/LandingPage";

// New Direct Component Pages
import AppointmentScheduling from "./components/appointment/AppointmentScheduling";
import CommunityForums from "./components/community/CommunityForums";
import Dashboard from "./components/dashboard/Dashboard";
import EducationalResourceList from "./components/educational/EducationalResourceList";
import NotificationCenter from "./components/notifications/NotificationCenter";
import UserProfile from "./components/profile/UserProfile";

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
import LoadingSpinner from "./components/common/LoadingSpinner";

import AdminNavbar from "./components/common/AdminNavbar";
import Statistics from "./pages/Admin/Statistics";
import CommunityReviews from "./pages/Admin/CommunityReviews";
import HealthAlerts from "./pages/Admin/HealthAlerts";

// Create a separate component for the app content
const AppContent = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  // Check authentication status when app loads - FIXED: removed dependencies that caused infinite loop
  useEffect(() => {
    console.log("Checking auth status on app load");
    dispatch(checkAuthStatus());

    // Log to track auth state changes
    console.log("Auth state in AppContent:", { isAuthenticated, user });
  }, [dispatch]); // Only re-run if dispatch changes (which it won't)

  // Determine which navbar to show
  const isAdminRoute = location.pathname.startsWith("/admin");
  const shouldShowAdminNav = isAdminRoute && isAuthenticated && user?.isAdmin;
  const shouldShowMainNav = !shouldShowAdminNav;

  // Loading state while checking auth status
  if (loading) {
    return <LoadingSpinner />;
  }

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) return <Navigate to="/landing" replace />;
    return children;
  };

  const AdminRoute = ({ children }) => {
    if (!isAuthenticated || !user?.isAdmin) return <Navigate to="/" replace />;
    return children;
  };

  return (
    <div className="App min-h-screen flex flex-col">
      {/* Navigation Logic */}
      {shouldShowMainNav && <Navbar />}
      {shouldShowAdminNav && <AdminNavbar />}

      <div className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/" replace /> : <Signup />}
          />

          {/* Disease Routes */}
          <Route path="/diseases" element={<DiseaseListPage />} />
          <Route path="/diseases/:diseaseId" element={<DiseaseDetailPage />} />

          {/* Area Routes */}
          <Route path="/areas" element={<AreasListPage />} />
          <Route path="/areas/:areaId" element={<AreaDetailPage />} />

          {/* Map View */}
          <Route path="/map" element={<MapViewPage />} />

          {/* Support/Donate Route */}
          <Route
            path="/donate/:areaId?"
            element={
              <ProtectedRoute>
                <DonatePage />
              </ProtectedRoute>
            }
          />

          {/* New Protected User Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <AppointmentScheduling />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <NotificationCenter />
              </ProtectedRoute>
            }
          />

          {/* Educational Resources - Public */}
          <Route path="/resources" element={<EducationalResourceList />} />

          {/* Community Forums - Public */}
          <Route path="/community" element={<CommunityForums />} />

          {/* Statistics, Health Alerts, Community Reviews - Public */}
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/health-alerts" element={<HealthAlerts />} />
          <Route path="/community-reviews" element={<CommunityReviews />} />

          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <Routes>
                  <Route path="diseases" element={<AdminDiseasePanel />} />
                  <Route path="areas" element={<AdminAreaPanel />} />
                  <Route path="donations" element={<AdminDonationPanel />} />
                  <Route path="users" element={<AdminUserPanel />} />
                  <Route path="user-management" element={<UserManagement />} />
                  <Route path="statistics" element={<Statistics />} />
                  <Route
                    path="community-reviews"
                    element={<CommunityReviews />}
                  />
                  <Route path="health-alerts" element={<HealthAlerts />} />
                  <Route index element={<Navigate to="diseases" replace />} />
                </Routes>
              </AdminRoute>
            }
          />

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