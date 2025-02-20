import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/aunthentication/Login";
import Signup from "./components/aunthentication/Signup";
import HomePage from "./pages/Home/HomePage";
import DiseaseListPage from "./pages/DiseaseList/DiseaseListPage";
import DiseaseDetailPage from "./pages/DiseaseDetail/DiseaseDetailPage";
import AreasListPage from "./pages/AreaList/AreasListPage";
import AreaDetailPage from "./pages/AreaDetail/AreaDetailPage";
import MapViewPage from "./pages/MapView/MapViewPage";
import DonatePage from "./pages/Donate/DonatePage";
import AdminPage from "./pages/Admin/AdminPage";
import Navbar from "./components/common/Navbar"; 

export default function App() {
  const [user, setUser] = useState(null);
  
  // Simple protected route logic
  const ProtectedRoute = ({ children }) => {
    if (!user || !user.isAdmin) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <div className="App">
        {user && <Navbar user={user} setUser={setUser} />}
        
        <Routes>
          {/* Authentication Routes */}
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          
          {/* Main Application Routes */}
          <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/disease-list" element={user ? <DiseaseListPage /> : <Navigate to="/login" />} />
          <Route path="/disease/:diseaseId" element={user ? <DiseaseDetailPage /> : <Navigate to="/login" />} />
          <Route path="/area-list" element={user ? <AreasListPage /> : <Navigate to="/login" />} />
          <Route path="/area/:areaId" element={user ? <AreaDetailPage /> : <Navigate to="/login" />} />
          <Route path="/map-view" element={user ? <MapViewPage /> : <Navigate to="/login" />} />
          <Route path="/donate" element={user ? <DonatePage /> : <Navigate to="/login" />} />
          
          {/* Admin Route */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}