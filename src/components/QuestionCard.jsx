import React from 'react';

const QuestionCard = ({ question, selectedAnswer, onSelectAnswer, isReview = false, userAnswer, showCorrect = false }) => {
  const handleOptionClick = (index) => {
    if (!isReview) {
      onSelectAnswer(index);
    }
  };

  const getOptionClass = (index) => {
    let baseClass = 'option-btn';
    
    if (isReview) {
      // Review mode: show correct and incorrect answers
      if (index === question.correctAnswer) {
        baseClass += ' correct';
      } else if (index === userAnswer && userAnswer !== question.correctAnswer) {
        baseClass += ' incorrect';
      }
    } else {
      // Quiz mode: just show selected
      if (index === selectedAnswer) {
        baseClass += ' selected';
      }
    }
    
    return baseClass;
  };

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="space-y-4">
      {/* Question Text */}
      <div className="bg-white rounded-lg p-6 shadow-md">
        <p className="text-lg text-gray-800 leading-relaxed font-medium">
          {question.question}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            className={getOptionClass(index)}
            disabled={isReview}
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700">
                {optionLabels[index]}
              </div>
              <span className="text-gray-800 flex-1 text-left">{option}</span>
              {isReview && index === question.correctAnswer && (
                <span className="text-green-600 font-semibold">✓ Correct</span>
              )}
              {isReview && index === userAnswer && userAnswer !== question.correctAnswer && (
                <span className="text-red-600 font-semibold">✗ Your Answer</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
