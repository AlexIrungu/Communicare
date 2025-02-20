// pages/MapView/MapViewPage.js
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

  const filteredAreas = areas.filter(area => {
    if (selectedDisease !== 'all') {
      const hasDisease = area.diseases.some(disease => disease.id === selectedDisease);
      if (!hasDisease) return false;
    }
    
    if (selectedRiskLevel !== 'all' && area.riskLevel !== selectedRiskLevel) {
      return false;
    }
    
    return true;
  });

  if (areasLoading || diseasesLoading) {
    return <div>Loading map data...</div>;
  }

  return (
    <div className="map-view-container">
      <h1>Interactive Disease Map</h1>
      <p>Visualize disease spread and impact across different regions</p>
      
      <MapFilters 
        diseases={diseases}
        selectedDisease={selectedDisease}
        setSelectedDisease={setSelectedDisease}
        selectedRiskLevel={selectedRiskLevel}
        setSelectedRiskLevel={setSelectedRiskLevel}
      />
      
      <div className="map-container">
        <MapVisualization 
          areas={filteredAreas}
          selectedDisease={selectedDisease}
        />
      </div>
      
      <div className="map-legend">
        <h3>Risk Level</h3>
        <div className="legend-item">
          <span className="color-box high"></span>
          <span>High Risk</span>
        </div>
        <div className="legend-item">
          <span className="color-box medium"></span>
          <span>Medium Risk</span>
        </div>
        <div className="legend-item">
          <span className="color-box low"></span>
          <span>Low Risk</span>
        </div>
      </div>
    </div>
  );
};

export default MapViewPage;