// components/diseaseList/DiseaseList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchDiseases } from '../../features/diseases/diseasesSlice';
import DiseaseCard from './DiseaseCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const DiseaseList = () => {
  const dispatch = useDispatch();
  const { diseases, loading, error } = useSelector((state) => state.diseases);

  useEffect(() => {
    dispatch(fetchDiseases());
  }, [dispatch]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Prevalent Communicable Diseases</h1>
      <p className="mb-8 text-gray-600">
        Learn about the most common communicable diseases affecting communities worldwide.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {diseases.map((disease) => (
          <DiseaseCard key={disease.id} disease={disease} />
        ))}
      </div>
    </div>
  );
};

export default DiseaseList;

