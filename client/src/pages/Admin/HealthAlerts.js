// src/pages/Admin/HealthAlerts.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlerts, subscribeToAreaAlerts } from '../../features/alerts/alertsSlice';
import { fetchAllAreas } from '../../features/areas/areasSlice';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import Pagination from '../../components/common/Pagination';
import AdminNavbar from '../../components/common/AdminNavbar';

const HealthAlerts = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArea, setSelectedArea] = useState('all');
  const itemsPerPage = 10;
  
  const { alerts, status: alertsStatus, error: alertsError } = useSelector((state) => state.alerts);
  const { areas, status: areasStatus, error: areasError } = useSelector((state) => state.areas);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (alertsStatus === 'idle' && user) {
      dispatch(fetchAlerts(user.id));
    }
    
    if (areasStatus === 'idle') {
      dispatch(fetchAllAreas());
    }
  }, [dispatch, alertsStatus, areasStatus, user]);

  // Filter alerts by area if an area is selected
  const filteredAlerts = selectedArea === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.areaId === selectedArea);

  // Pagination logic
  const indexOfLastAlert = currentPage * itemsPerPage;
  const indexOfFirstAlert = indexOfLastAlert - itemsPerPage;
  const currentAlerts = filteredAlerts.slice(indexOfFirstAlert, indexOfLastAlert);
  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);

  const handleSubscribe = (areaId) => {
    if (user) {
      dispatch(subscribeToAreaAlerts({ userId: user.id, areaId }));
    }
  };

  if (alertsStatus === 'loading' || areasStatus === 'loading') {
    return <LoadingSpinner />;
  }

  if (alertsStatus === 'failed') {
    return <ErrorMessage message={alertsError} />;
  }

  if (areasStatus === 'failed') {
    return <ErrorMessage message={areasError} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminNavbar />
      <h1 className="text-2xl font-bold mb-6">Health Alerts Management</h1>
      
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Filter by Area</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setSelectedArea('all')}
                className={`px-4 py-2 rounded-md ${
                  selectedArea === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                All Areas
              </button>
              {areas.map(area => (
                <button
                  key={area.id}
                  onClick={() => setSelectedArea(area.id)}
                  className={`px-4 py-2 rounded-md ${
                    selectedArea === area.id ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  {area.name}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Area Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Select areas to subscribe to health alerts:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {areas.map(area => (
                <Card key={area.id} className="bg-gray-50">
                  <CardContent className="p-4">
                    <h3 className="font-medium text-lg">{area.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{area.description}</p>
                    <button
                      onClick={() => handleSubscribe(area.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Subscribe to Alerts
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Current Health Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            {currentAlerts.length === 0 ? (
              <p className="text-center py-8 text-gray-500">No alerts found for the selected criteria.</p>
            ) : (
              <div className="divide-y divide-gray-200">
                {currentAlerts.map(alert => (
                  <div key={alert.id} className="py-4">
                    <h3 className="font-medium text-lg">{alert.title}</h3>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">
                        {areas.find(a => a.id === alert.areaId)?.name || 'Unknown Area'}
                      </span>
                      <span className="text-xs text-gray-500">{new Date(alert.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-gray-800 mb-2">{alert.message}</p>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                        alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)} Severity
                      </span>
                      {alert.read ? (
                        <span className="text-xs text-gray-500">Read</span>
                      ) : (
                        <span className="text-xs text-blue-500">Unread</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthAlerts; 