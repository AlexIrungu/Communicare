import React from 'react';
import PropTypes from 'prop-types';

const MapFilters = ({ 
  diseases = [], 
  selectedDisease = 'all', 
  setSelectedDisease,
  selectedRiskLevel = 'all', 
  setSelectedRiskLevel
}) => {
  const handleDiseaseChange = (e) => {
    const value = e.target.value;
    console.log('Selected disease:', value);
    setSelectedDisease(value);
  };

  const handleRiskLevelChange = (e) => {
    const value = e.target.value;
    console.log('Selected risk level:', value);
    setSelectedRiskLevel(value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-white shadow-md rounded-lg">
      {/* Disease Filter */}
      <div className="flex flex-col flex-1">
        <label className="text-sm font-semibold text-gray-700 mb-1">Select Disease</label>
        <select 
          value={selectedDisease} 
          onChange={handleDiseaseChange}
          className="p-2 border rounded-md bg-white hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        >
          <option value="all">All Diseases</option>
          {(diseases || []).map((disease) => (
            <option 
              key={disease.id || `disease-${disease.name}`} 
              value={disease.id}
            >
              {disease.name}
            </option>
          ))}
        </select>
      </div>
      
      {/* Risk Level Filter */}
      <div className="flex flex-col flex-1">
        <label className="text-sm font-semibold text-gray-700 mb-1">Select Risk Level</label>
        <select 
          value={selectedRiskLevel} 
          onChange={handleRiskLevelChange}
          className="p-2 border rounded-md bg-white hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        >
          <option value="all">All Risk Levels</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
    </div>
  );
};

MapFilters.propTypes = {
  diseases: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  selectedDisease: PropTypes.string.isRequired,
  setSelectedDisease: PropTypes.func.isRequired,
  selectedRiskLevel: PropTypes.string.isRequired,
  setSelectedRiskLevel: PropTypes.func.isRequired
};

export default MapFilters;