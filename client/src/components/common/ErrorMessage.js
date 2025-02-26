// components/common/ErrorMessage.js
import React from 'react';

const ErrorMessage = ({ message, className }) => {
  if (!message) return null;

  // Handle different error formats
  let errorText = '';
  if (typeof message === 'string') {
    errorText = message;
  } else if (message.errors && Array.isArray(message.errors) && message.errors.length > 0) {
    // Handle the specific error format from your API
    errorText = message.errors[0];
  } else if (typeof message === 'object') {
    // Fallback for other object formats
    errorText = 'An error occurred. Please try again later.';
    // Optionally try to extract a meaningful message from the object
    if (message.message) {
      errorText = message.message;
    } else if (Object.keys(message).length > 0) {
      const firstKey = Object.keys(message)[0];
      if (typeof message[firstKey] === 'string') {
        errorText = message[firstKey];
      }
    }
  }

  return (
    <div className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative ${className}`} role="alert">
      <span className="block sm:inline">{errorText}</span>
    </div>
  );
};

export default ErrorMessage;