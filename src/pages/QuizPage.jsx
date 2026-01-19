import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flag, Lightbulb, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import { useQuizTimer } from '../hooks/useQuizTimer';
import QuestionCard from '../components/QuestionCard';
import HintBox from '../components/HintBox';
import ProgressBar from '../components/ProgressBar';
import Timer from '../components/Timer';
import QuestionPalette from '../components/QuestionPalette';
import ConfirmDialog from '../components/ConfirmDialog';

const QuizPage = () => {
  const navigate = useNavigate();
  const { state, dispatch, actions } = useQuiz();
  const timer = useQuizTimer();
  
  const [showHint, setShowHint] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const { questions, currentQuestionIndex, userAnswers, flaggedQuestions } = state;
  const currentQuestion = questions[currentQuestionIndex];

  // Start timer on mount
  useEffect(() => {
    timer.start();
    return () => timer.pause();
  }, []);

  // Reset hint and feedback when question changes
  useEffect(() => {
    setShowHint(false);
    setShowFeedback(false);
  }, [currentQuestionIndex]);

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading quiz...</div>
      </div>
    );
  }

  const handleAnswerSelect = (answerIndex) => {
    dispatch({
      type: actions.SET_ANSWER,
      payload: { questionId: currentQuestion.id, answerIndex },
    });
    // Show instant feedback
    setShowFeedback(true);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      dispatch({ type: actions.SET_CURRENT_QUESTION, payload: currentQuestionIndex - 1 });
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      dispatch({ type: actions.SET_CURRENT_QUESTION, payload: currentQuestionIndex + 1 });
    }
  };

  const handleToggleFlag = () => {
    dispatch({ type: actions.TOGGLE_FLAG, payload: currentQuestion.id });
  };

  const handleQuestionClick = (index) => {
    dispatch({ type: actions.SET_CURRENT_QUESTION, payload: index });
    setShowPalette(false);
  };

  const handleSubmitClick = () => {
    setShowSubmitDialog(true);
  };

  const handleConfirmSubmit = () => {
    dispatch({ type: actions.SET_TIME, payload: timer.time });
    dispatch({ type: actions.SUBMIT_QUIZ });
    timer.pause();
    navigate('/results');
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFlagged = flaggedQuestions.includes(currentQuestion.id);
  const selectedAnswer = userAnswers[currentQuestion.id];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const hasAnswered = selectedAnswer !== undefined;

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Timer
              time={timer.time}
              isRunning={timer.isRunning}
              onPause={timer.pause}
              onResume={timer.resume}
              formatTime={timer.formatTime}
            />
            <button
              onClick={() => setShowPalette(!showPalette)}
              className="md:hidden p-2 hover:bg-gray-100 rounded transition-colors"
            >
              {showPalette ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          <div className="flex-1 max-w-md">
            <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_300px] gap-4">
          {/* Main Quiz Area */}
          <div className="space-y-4">
            {/* Question Card */}
            <QuestionCard
              question={currentQuestion}
              selectedAnswer={selectedAnswer}
              onSelectAnswer={handleAnswerSelect}
            />

            {/* Instant Feedback */}
            {showFeedback && hasAnswered && (
              <div className={`p-4 rounded-lg border-2 animate-slide-down ${
                isCorrect 
                  ? 'bg-green-50 border-green-500' 
                  : 'bg-red-50 border-red-500'
              }`}>
                <div className="flex items-center space-x-2 mb-2">
                  {isCorrect ? (
                    <>
                      <span className="text-2xl">✓</span>
                      <span className="font-semibold text-green-700 text-lg">Correct!</span>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl">✗</span>
                      <span className="font-semibold text-red-700 text-lg">Incorrect</span>
                    </>
                  )}
                </div>
                <p className="text-gray-700 text-sm mb-2">
                  <strong>Correct Answer:</strong> {currentQuestion.options[currentQuestion.correctAnswer]}
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r">
                  <p className="text-sm text-gray-700">
                    <strong>Explanation:</strong> {currentQuestion.explanation}
                  </p>
                </div>
              </div>
            )}

            {/* Hint Box */}
            <HintBox hint={currentQuestion.hint} isVisible={showHint} />

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowHint(!showHint)}
                className="btn-secondary flex items-center space-x-2"
              >
                <Lightbulb className="w-4 h-4" />
                <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
              </button>
              <button
                onClick={handleToggleFlag}
                className={`btn-secondary flex items-center space-x-2 ${
                  isFlagged ? 'bg-orange-100 border-orange-300' : ''
                }`}
              >
                <Flag className={`w-4 h-4 ${isFlagged ? 'fill-orange-500 text-orange-500' : ''}`} />
                <span>{isFlagged ? 'Unflag' : 'Flag for Review'}</span>
              </button>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-4">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="btn-secondary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {isLastQuestion ? (
                <button onClick={handleSubmitClick} className="btn-success">
                  Submit Quiz
                </button>
              ) : (
                <button onClick={handleNext} className="btn-primary flex items-center space-x-2">
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Question Palette - Desktop */}
          <div className="hidden md:block">
            <QuestionPalette
              questions={questions}
              userAnswers={userAnswers}
              flaggedQuestions={flaggedQuestions}
              currentQuestionId={currentQuestion.id}
              onQuestionClick={handleQuestionClick}
            />
          </div>

          {/* Question Palette - Mobile */}
          {showPalette && (
            <div className="md:hidden fixed inset-0 bg-black/50 z-50 p-4 overflow-y-auto">
              <div className="bg-white rounded-lg p-4 max-w-md mx-auto mt-16">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">Question Palette</h3>
                  <button onClick={() => setShowPalette(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <QuestionPalette
                  questions={questions}
                  userAnswers={userAnswers}
                  flaggedQuestions={flaggedQuestions}
                  currentQuestionId={currentQuestion.id}
                  onQuestionClick={handleQuestionClick}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Submit Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showSubmitDialog}
        title="Submit Quiz?"
        message={`You have answered ${Object.keys(userAnswers).length} out of ${questions.length} questions. Are you sure you want to submit?`}
        onConfirm={handleConfirmSubmit}
        onCancel={() => setShowSubmitDialog(false)}
        confirmText="Submit"
        cancelText="Continue Quiz"
      />
    </div>
  );
};

export default QuizPage;
