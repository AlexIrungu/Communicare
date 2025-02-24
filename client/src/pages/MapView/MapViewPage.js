import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllAreas } from '../../features/areas/areasSlice';
import { fetchAllDiseases } from '../../features/diseases/diseasesSlice';
import MapVisualization from '../../components/areaMap/MapVisualization';
import MapFilters from '../../components/areaMap/MapFilters';

const MapViewPage = () => {
  const dispatch = useDispatch();
  const { areas, loading: areasLoading, error: areasError } = useSelector(state => {
    console.log('Current Redux State:', state); // Debug log
    return state.areas;
  });
  const { diseases, loading: diseasesLoading, error: diseasesError } = useSelector(state => state.diseases);
  const [selectedDisease, setSelectedDisease] = useState('all');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('all');

  useEffect(() => {
    const loadData = async () => {
      try {
        const areasResult = await dispatch(fetchAllAreas()).unwrap();
        console.log('Areas fetched successfully:', areasResult);
      } catch (error) {
        console.error('Failed to fetch areas:', error);
      }
    };
    loadData();
  }, [dispatch]);
  
  useEffect(() => {
    console.log("Current areas in state:", areas);
    console.log("Areas loading state:", areasLoading);
    console.log("Areas error state:", areasError);
    console.log("Current areas in Redux:", areas);
    console.log("Sample area structure:", areas?.[0]);
  }, [areas, areasLoading, areasError]);

  const filteredAreas = React.useMemo(() => {
    console.log("Filtering areas:", areas); // Debug log
    return (areas ?? []).filter(area => { 
      if (selectedDisease !== 'all') {
        const hasDisease = area.diseases?.some(disease => disease.id === selectedDisease);
        if (!hasDisease) return false;
      }
      
      if (selectedRiskLevel !== 'all' && area.riskLevel !== selectedRiskLevel) {
        return false;
      }
      return true;
    });
  }, [areas, selectedDisease, selectedRiskLevel]);

  if (areasError || diseasesError) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-red-600">
        {areasError || diseasesError}
      </div>
    );
  }

  if (areasLoading || diseasesLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading map data...
      </div>
    );
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
          <pre className="text-xs p-2 bg-gray-100">Debug: {JSON.stringify(filteredAreas, null, 2)}</pre>
          <MapVisualization 
            areas={filteredAreas}
            selectedDisease={selectedDisease}
            center={[1.2921, 36.8219]} // Kenya coordinates
            zoom={6}
          />
        </div>
        
        {/* Risk Level Legend */}
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