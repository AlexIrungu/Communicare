// src/pages/AreaList/AreasListPage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '../../components/ui/card';
import { fetchAllAreas } from '../../features/areas/areasSlice';

const AreasListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { areas, loading, error } = useSelector((state) => state.areas);

  useEffect(() => {
    console.log('Dispatching fetchAllAreas'); // Debug log
    dispatch(fetchAllAreas())
      .unwrap()
      .then((result) => {
        console.log('Areas fetched successfully:', result);
      })
      .catch((error) => {
        console.error('Error fetching areas:', error);
      });
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading areas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600">
        <p>Error: {error}</p>
      </div>
    );
  }

  // Debug log to check areas data
  console.log('Rendering areas:', areas);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Affected Areas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(areas) && areas.length > 0 ? (
          areas.map((area) => (
            <Card key={area.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <h2 className="text-xl font-semibold">{area.name}</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    Population Affected: {area.affectedPopulation?.toLocaleString() || 'N/A'}
                  </p>
                  <p className="text-gray-600">
                    Risk Level: {area.riskLevel || 'N/A'}
                  </p>
                  <p className="text-gray-600">
                    Active Cases: {area.activeCases?.toLocaleString() || 'N/A'}
                  </p>
                  <div className="mt-4">
                    <button 
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                      onClick={() => navigate(`/areas/${area.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p>No affected areas found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AreasListPage;