import React from 'react';

const HintBox = ({ hint, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="mt-4 animate-slide-down">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <span className="text-2xl">💡</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-semibold text-yellow-800 mb-1">
              Hint
            </h3>
            <p className="text-sm text-yellow-700 leading-relaxed">{hint}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HintBox;
