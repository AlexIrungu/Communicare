import React from 'react';

const MapFilters = ({ diseases, selectedDisease, setSelectedDisease, selectedRiskLevel, setSelectedRiskLevel }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-white shadow-md rounded-lg">
      {/* Disease Filter */}
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-700">Select Disease</label>
        <select 
          value={selectedDisease} 
          onChange={(e) => setSelectedDisease(e.target.value)} 
          className="p-2 border rounded-md">
          <option value="all">All Diseases</option>
          {diseases.map((disease) => (
            <option key={disease.id} value={disease.id}>{disease.name}</option>
          ))}
        </select>
      </div>
      
      {/* Risk Level Filter */}
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-700">Select Risk Level</label>
        <select 
          value={selectedRiskLevel} 
          onChange={(e) => setSelectedRiskLevel(e.target.value)} 
          className="p-2 border rounded-md">
          <option value="all">All Risk Levels</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
    </div>
  );
};

export default MapFilters;
