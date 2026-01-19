import React from 'react';
import { Clock, Pause, Play } from 'lucide-react';

const Timer = ({ time, isRunning, onPause, onResume, formatTime }) => {
  return (
    <div className="flex items-center space-x-3 bg-white rounded-lg px-4 py-2 shadow-md">
      <Clock className="w-5 h-5 text-gray-600" />
      <span className="font-mono text-lg font-semibold text-gray-800">
        {formatTime()}
      </span>
      <button
        onClick={isRunning ? onPause : onResume}
        className="ml-2 p-1 hover:bg-gray-100 rounded transition-colors"
        title={isRunning ? 'Pause Timer' : 'Resume Timer'}
      >
        {isRunning ? (
          <Pause className="w-4 h-4 text-gray-600" />
        ) : (
          <Play className="w-4 h-4 text-gray-600" />
        )}
      </button>
    </div>
  );
};

export default Timer;
