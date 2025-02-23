import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllAreas } from '../../features/areas/areasSlice';
import { fetchAllDiseases } from '../../features/diseases/diseasesSlice';
import MapVisualization from '../../components/areaMap/MapVisualization';
import MapFilters from '../../components/areaMap/MapFilters';

const MapViewPage = () => {
  const dispatch = useDispatch();
  const { areas, loading: areasLoading } = useSelector(state => state.areas);
  const { diseases, loading: diseasesLoading } = useSelector(state => state.diseases);
  const [selectedDisease, setSelectedDisease] = useState('all');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('all');

  useEffect(() => {
    dispatch(fetchAllAreas());
    dispatch(fetchAllDiseases());
  }, [dispatch]);
  
  useEffect(() => {
    console.log("Updated Redux areas state:", areas);
    console.log("Redux loading state:", areasLoading);
  }, [areas, areasLoading]);

  const filteredAreas = (areas ?? []).filter(area => { 
    if (selectedDisease !== 'all') {
      const hasDisease = area.diseases?.some(disease => disease.id === selectedDisease);
      if (!hasDisease) return false;
    }
    
    if (selectedRiskLevel !== 'all' && area.riskLevel !== selectedRiskLevel) {
      return false;
    }
    return true;
  });

  if (areasLoading || diseasesLoading) {
    return <div className="flex justify-center items-center h-screen text-lg font-semibold">Loading map data...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Interactive Disease Map</h1>
        <p className="text-gray-600 text-center">Visualize disease spread and impact across different regions</p>
        
        <MapFilters 
          diseases={diseases}
          selectedDisease={selectedDisease}
          setSelectedDisease={setSelectedDisease}
          selectedRiskLevel={selectedRiskLevel}
          setSelectedRiskLevel={setSelectedRiskLevel}
        />
        
        <div className="border rounded-xl overflow-hidden shadow-md">
          <MapVisualization 
            areas={filteredAreas}
            selectedDisease={selectedDisease}
            center={[1.2921, 36.8219]} // Centering the map on Kenya (Nairobi coordinates)
            zoom={6} // Zoom level to fit Kenya
          />
        </div>
        
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Risk Level</h3>
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center space-x-2">
              <span className="w-4 h-4 bg-red-500 rounded-full"></span>
              <span className="text-gray-600">High Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-4 h-4 bg-yellow-500 rounded-full"></span>
              <span className="text-gray-600">Medium Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-4 h-4 bg-green-500 rounded-full"></span>
              <span className="text-gray-600">Low Risk</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapViewPage;
