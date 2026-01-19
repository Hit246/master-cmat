import React from 'react';
import { getQuestionStatus } from '../utils/questionHelpers';

const QuestionPalette = ({ questions, userAnswers, flaggedQuestions, currentQuestionId, onQuestionClick }) => {
  const stats = {
    answered: Object.keys(userAnswers).length,
    unanswered: questions.length - Object.keys(userAnswers).length,
    flagged: flaggedQuestions.length,
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-lg">
      <h3 className="font-semibold text-gray-800 mb-3">Question Palette</h3>
      
      {/* Statistics */}
      <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
        <div className="text-center">
          <div className="font-semibold text-green-600">{stats.answered}</div>
          <div className="text-gray-600">Answered</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-gray-600">{stats.unanswered}</div>
          <div className="text-gray-600">Unanswered</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-orange-600">{stats.flagged}</div>
          <div className="text-gray-600">Flagged</div>
        </div>
      </div>

      {/* Question Grid */}
      <div className="grid grid-cols-5 gap-2 max-h-[500px] overflow-y-auto pr-2">
        {questions.map((question, index) => {
          const status = getQuestionStatus(
            question.id,
            userAnswers,
            flaggedQuestions,
            currentQuestionId
          );

          return (
            <button
              key={question.id}
              onClick={() => onQuestionClick(index)}
              className={`question-number ${status}`}
              title={`Question ${index + 1}`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-gray-200 space-y-2 text-xs">
        <div className="flex items-center space-x-2">
          <div className="question-number current w-6 h-6 text-xs">1</div>
          <span className="text-gray-600">Current</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="question-number answered w-6 h-6 text-xs">2</div>
          <span className="text-gray-600">Answered</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="question-number flagged w-6 h-6 text-xs">3</div>
          <span className="text-gray-600">Flagged</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="question-number unanswered w-6 h-6 text-xs">4</div>
          <span className="text-gray-600">Unanswered</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionPalette;
