import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { sections, difficulties } from '../data/sections';
import { getQuestionsBySection } from '../data/questions';
import { useQuiz } from '../context/QuizContext';

const DifficultySelection = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const { dispatch, actions } = useQuiz();

  const section = sections.find(s => s.id === sectionId);

  if (!section) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Section not found</div>
      </div>
    );
  }

  const handleDifficultyClick = (difficulty) => {
    const questions = getQuestionsBySection(sectionId, difficulty);
    
    if (questions.length === 0) {
      alert('No questions available for this difficulty level yet.');
      return;
    }

    // Set section, difficulty, and questions in context
    dispatch({ type: actions.SET_SECTION, payload: sectionId });
    dispatch({ type: actions.SET_DIFFICULTY, payload: difficulty });
    dispatch({ type: actions.SET_QUESTIONS, payload: questions });
    dispatch({ type: actions.SET_CURRENT_QUESTION, payload: 0 });

    // Navigate to quiz page
    navigate('/quiz');
  };

  const Icon = section.icon;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <button
            onClick={() => navigate('/sections')}
            className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Sections</span>
          </button>

          {/* Section Info */}
          <div className="flex items-center space-x-4 mb-4">
            <div className={`${section.color} p-3 rounded-full`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {section.name}
              </h1>
              <p className="text-white/80">{section.description}</p>
            </div>
          </div>
        </div>

        {/* Difficulty Cards */}
        <div className="space-y-6 animate-slide-up">
          <h2 className="text-2xl font-bold text-white mb-4">
            Select Difficulty Level
          </h2>

          {difficulties.map((diff, index) => {
            const questionCount = getQuestionsBySection(sectionId, diff.id).length;
            
            return (
              <div
                key={diff.id}
                onClick={() => handleDifficultyClick(diff.id)}
                className="card cursor-pointer hover:scale-102 transform transition-all group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`${diff.color} w-16 h-16 rounded-lg flex items-center justify-center`}>
                      <span className="text-white font-bold text-2xl">
                        {diff.id === 'easy' ? '⭐' : diff.id === 'moderate' ? '⭐⭐' : '⭐⭐⭐'}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-1">
                        {diff.name}
                      </h3>
                      <p className="text-gray-600">{diff.description}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {questionCount} questions available
                      </p>
                    </div>
                  </div>
                  <div className="text-primary-600 text-3xl group-hover:translate-x-2 transition-transform">
                    →
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="mt-8 card bg-white/10 backdrop-blur-sm border border-white/20 animate-slide-up">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            💡 Difficulty Guide
          </h3>
          <div className="text-gray-700 text-sm space-y-1">
            <p><strong>Easy:</strong> Foundation building questions for beginners</p>
            <p><strong>Moderate:</strong> Intermediate level for steady progress</p>
            <p><strong>Hard:</strong> Advanced questions for serious aspirants</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DifficultySelection;
