// components/diseaseList/DiseaseCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const DiseaseCard = ({ disease }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {disease.image_url && (
        <img 
          src={disease.image_url} 
          alt={disease.name} 
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{disease.name}</h2>
        <p className="text-gray-600 mb-3 line-clamp-3">{disease.short_description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-red-600 font-medium">
            {disease.affected_count.toLocaleString()} cases reported
          </span>
          <Link 
            to={`/diseases/${disease.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DiseaseCard;