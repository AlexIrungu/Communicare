// src/components/ui/alert.js
import React from 'react';

const Alert = ({ variant = 'default', className = '', ...props }) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-900',
    destructive: 'bg-red-100 text-red-900',
    warning: 'bg-yellow-100 text-yellow-900',
    info: 'bg-blue-100 text-blue-900',
    success: 'bg-green-100 text-green-900'
  };

  return (
    <div
      role="alert"
      className={`rounded-lg border p-4 ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
};

const AlertTitle = ({ className = '', ...props }) => {
  return (
    <h5
      className={`mb-1 font-medium leading-none tracking-tight ${className}`}
      {...props}
    />
  );
};

const AlertDescription = ({ className = '', ...props }) => {
  return (
    <div
      className={`text-sm [&_p]:leading-relaxed ${className}`}
      {...props}
    />
  );
};

export { Alert, AlertTitle, AlertDescription };
