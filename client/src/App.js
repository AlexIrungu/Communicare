import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./pages/Home/HomePage";
import DiseaseListPage from "./pages/DiseaseList/DiseaseListPage";
import DiseaseDetailPage from "./pages/DiseaseDetail/DiseaseDetailPage";
import AreasListPage from "./pages/AreaList/AreasListPage";
import AreaDetailPage from "./pages/AreaDetail/AreaDetailPage";
import MapViewPage from "./pages/MapView/MapViewPage";
import DonatePage from "./pages/Donate/DonatePage";
import AdminPage from "./pages/Admin/AdminPage";
import Navbar from "./components/common/Navbar";
import Login from './components/aunthentication/Login'
import Signup from './components/aunthentication/Signup'

export default function App() {
  const user = useSelector((state) => state.auth.user); // Use Redux for authentication

  const ProtectedRoute = ({ children }) => {
    if (!user || !user.isAdmin) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Authentication Required Routes */}
          <Route path="/disease-list" element={user ? <DiseaseListPage /> : <Navigate to="/login" />} />
          <Route path="/disease/:diseaseId" element={user ? <DiseaseDetailPage /> : <Navigate to="/login" />} />
          <Route path="/area-list" element={user ? <AreasListPage /> : <Navigate to="/login" />} />
          <Route path="/area/:areaId" element={user ? <AreaDetailPage /> : <Navigate to="/login" />} />
          <Route path="/map-view" element={user ? <MapViewPage /> : <Navigate to="/login" />} />
          <Route path="/donate" element={user ? <DonatePage /> : <Navigate to="/login" />} />
          
          {/* Admin Route */}
          <Route path="/admin/*" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}
