import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Clock, BarChart, Eye, Home, RotateCcw } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import { sections } from '../data/sections';
import { getPerformanceLevel, getMotivationalMessage } from '../utils/scoreCalculator';
import ScoreChart from '../components/ScoreChart';

const ResultsPage = () => {
  const navigate = useNavigate();
  const { state, dispatch, actions } = useQuiz();

  const { score, timeSpent, currentSection } = state;

  if (!score) {
    navigate('/');
    return null;
  }

  const section = sections.find(s => s.id === currentSection);
  const performance = getPerformanceLevel(score.percentage);
  const motivationalMsg = getMotivationalMessage(score.percentage);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReviewAnswers = () => {
    navigate('/review');
  };

  const handleRetakeQuiz = () => {
    dispatch({ type: actions.RESET_QUIZ });
    navigate('/sections');
  };

  const handleGoHome = () => {
    dispatch({ type: actions.RESET_QUIZ });
    navigate('/');
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-block bg-white p-4 rounded-full mb-4 shadow-lg">
            <Trophy className="w-16 h-16 text-yellow-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Quiz Completed!
          </h1>
          <p className="text-xl text-white/90">{motivationalMsg}</p>
        </div>

        {/* Score Card */}
        <div className="card mb-6 animate-slide-up">
          <div className="text-center mb-6">
            <div className="text-6xl font-bold text-primary-600 mb-2">
              {score.percentage}%
            </div>
            <div className={`text-2xl font-semibold ${performance.color}`}>
              {performance.level}
            </div>
            <p className="text-gray-600 mt-2">{performance.message}</p>
          </div>

          <ScoreChart
            correct={score.correct}
            incorrect={score.incorrect}
            unanswered={score.unanswered}
          />
        </div>

        {/* Statistics Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-6 animate-slide-up">
          <div className="card text-center">
            <BarChart className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-800 mb-1">
              {score.correct}/{score.total}
            </div>
            <div className="text-sm text-gray-600">Correct Answers</div>
          </div>

          <div className="card text-center">
            <Clock className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-800 mb-1">
              {formatTime(timeSpent)}
            </div>
            <div className="text-sm text-gray-600">Time Taken</div>
          </div>

          <div className="card text-center">
            <div className={`${section?.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2`}>
              {section && React.createElement(section.icon, { className: 'w-6 h-6 text-white' })}
            </div>
            <div className="text-lg font-bold text-gray-800 mb-1">
              {section?.shortName}
            </div>
            <div className="text-sm text-gray-600">Section</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-3 gap-4 animate-slide-up">
          <button
            onClick={handleReviewAnswers}
            className="btn-primary flex items-center justify-center space-x-2"
          >
            <Eye className="w-5 h-5" />
            <span>Review Answers</span>
          </button>

          <button
            onClick={handleRetakeQuiz}
            className="btn-secondary flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Try Again</span>
          </button>

          <button
            onClick={handleGoHome}
            className="btn-secondary flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </button>
        </div>

        {/* Performance Tips */}
        <div className="mt-8 card bg-white/10 backdrop-blur-sm border border-white/20 animate-slide-up">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            📈 Improve Your Score
          </h3>
          <ul className="text-gray-700 space-y-2 text-sm">
            <li>• Review the explanations for questions you got wrong</li>
            <li>• Practice regularly to improve your speed and accuracy</li>
            <li>• Focus on understanding concepts rather than memorizing answers</li>
            <li>• Try different difficulty levels to challenge yourself</li>
            <li>• Use hints strategically to learn problem-solving techniques</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
