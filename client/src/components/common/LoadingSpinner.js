import React from 'react';

const LoadingSpinner = ({ size = 'medium', color = 'teal' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const colorClasses = {
    teal: 'border-teal-500',
    blue: 'border-blue-500',
    green: 'border-green-500',
    red: 'border-red-500',
    gray: 'border-gray-500'
  };

  return (
    <div className="flex justify-center items-center">
      <div 
        className={`
          ${sizeClasses[size] || sizeClasses.medium}
          ${colorClasses[color] || colorClasses.teal}
          border-2 border-t-transparent rounded-full animate-spin
        `}
      />
    </div>
  );
};

export default LoadingSpinner;