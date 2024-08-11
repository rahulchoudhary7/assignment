import React from 'react';

const LaptopScreenLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-80 h-48 bg-gray-200 rounded-lg shadow-lg border border-gray-300">
        <div className="absolute top-0 left-0 right-0 h-3 bg-gray-300 rounded-t-lg"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 border-t-4 border-pink-500 border-solid rounded-full animate-spin"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-300 rounded-b-lg"></div>
      </div>
    </div>
  );
};

export default LaptopScreenLoader;
