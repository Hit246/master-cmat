import React from 'react';

const ProgressBar = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-gray-700">
          Question {current} of {total}
        </span>
        <span className="text-sm text-gray-600">
          {percentage.toFixed(0)}% Complete
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-primary-600 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
