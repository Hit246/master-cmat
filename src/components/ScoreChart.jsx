import React from 'react';

const ScoreChart = ({ correct, incorrect, unanswered }) => {
  const total = correct + incorrect + unanswered;
  const correctPercent = (correct / total) * 100;
  const incorrectPercent = (incorrect / total) * 100;
  const unansweredPercent = (unanswered / total) * 100;

  return (
    <div className="space-y-4">
      {/* Bar Chart */}
      <div className="flex h-8 rounded-lg overflow-hidden">
        {correct > 0 && (
          <div
            className="bg-green-500 flex items-center justify-center text-white text-sm font-semibold"
            style={{ width: `${correctPercent}%` }}
          >
            {correct > 0 && correctPercent > 10 && correct}
          </div>
        )}
        {incorrect > 0 && (
          <div
            className="bg-red-500 flex items-center justify-center text-white text-sm font-semibold"
            style={{ width: `${incorrectPercent}%` }}
          >
            {incorrect > 0 && incorrectPercent > 10 && incorrect}
          </div>
        )}
        {unanswered > 0 && (
          <div
            className="bg-gray-400 flex items-center justify-center text-white text-sm font-semibold"
            style={{ width: `${unansweredPercent}%` }}
          >
            {unanswered > 0 && unansweredPercent > 10 && unanswered}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="w-4 h-4 bg-green-500 rounded mx-auto mb-1"></div>
          <div className="text-sm font-semibold text-gray-800">{correct}</div>
          <div className="text-xs text-gray-600">Correct</div>
        </div>
        <div>
          <div className="w-4 h-4 bg-red-500 rounded mx-auto mb-1"></div>
          <div className="text-sm font-semibold text-gray-800">{incorrect}</div>
          <div className="text-xs text-gray-600">Incorrect</div>
        </div>
        <div>
          <div className="w-4 h-4 bg-gray-400 rounded mx-auto mb-1"></div>
          <div className="text-sm font-semibold text-gray-800">{unanswered}</div>
          <div className="text-xs text-gray-600">Unanswered</div>
        </div>
      </div>
    </div>
  );
};

export default ScoreChart;
