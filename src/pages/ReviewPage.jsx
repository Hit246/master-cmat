import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import QuestionCard from '../components/QuestionCard';
import HintBox from '../components/HintBox';

const ReviewPage = () => {
  const navigate = useNavigate();
  const { state } = useQuiz();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(true);

  const { questions, userAnswers } = state;

  if (!questions || questions.length === 0) {
    navigate('/');
    return null;
  }

  const currentQuestion = questions[currentIndex];
  const userAnswer = userAnswers[currentQuestion.id];
  const isCorrect = userAnswer === currentQuestion.correctAnswer;

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowHint(false);
      setShowExplanation(true);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowHint(false);
      setShowExplanation(true);
    }
  };

  const incorrectQuestions = questions.filter(
    q => userAnswers[q.id] !== undefined && userAnswers[q.id] !== q.correctAnswer
  );

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 animate-fade-in">
          <button
            onClick={() => navigate('/results')}
            className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Results</span>
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Review Answers
          </h1>
          <p className="text-white/80">
            Question {currentIndex + 1} of {questions.length}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow-md">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">
              Progress: {currentIndex + 1}/{questions.length}
            </span>
            <span className={`text-sm font-semibold ${isCorrect ? 'text-green-600' : userAnswer !== undefined ? 'text-red-600' : 'text-gray-600'}`}>
              {isCorrect ? '✓ Correct' : userAnswer !== undefined ? '✗ Incorrect' : 'Not Answered'}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="mb-4 animate-slide-up">
          <QuestionCard
            question={currentQuestion}
            isReview={true}
            userAnswer={userAnswer}
            showCorrect={true}
          />
        </div>

        {/* Hint Section */}
        <div className="mb-4">
          <button
            onClick={() => setShowHint(!showHint)}
            className="btn-secondary w-full md:w-auto"
          >
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
          <HintBox hint={currentQuestion.hint} isVisible={showHint} />
        </div>

        {/* Explanation Section */}
        <div className="card mb-4 animate-slide-up">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800">Explanation</h3>
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              {showExplanation ? 'Hide' : 'Show'}
            </button>
          </div>
          {showExplanation && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <p className="text-gray-700 leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="btn-secondary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
            className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Incorrect Questions Summary */}
        {incorrectQuestions.length > 0 && (
          <div className="card bg-red-50 border border-red-200 animate-slide-up">
            <h3 className="text-lg font-semibold text-red-800 mb-3">
              📝 Questions to Review ({incorrectQuestions.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {incorrectQuestions.map((q, idx) => {
                const questionIndex = questions.findIndex(question => question.id === q.id);
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(questionIndex)}
                    className={`px-3 py-1 rounded ${
                      currentIndex === questionIndex
                        ? 'bg-red-600 text-white'
                        : 'bg-white text-red-600 border border-red-300 hover:bg-red-100'
                    }`}
                  >
                    Q{questionIndex + 1}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
