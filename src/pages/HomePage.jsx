import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Brain, Target, TrendingUp } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: BookOpen,
      title: '750 Questions',
      description: '5 sections with 3 difficulty levels each',
    },
    {
      icon: Brain,
      title: 'Smart Hints',
      description: 'Strategic hints for every question',
    },
    {
      icon: Target,
      title: 'Detailed Explanations',
      description: 'Learn from comprehensive explanations',
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your performance and improvement',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            CMAT Quiz App
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-2">
            Common Management Admission Test
          </p>
          <p className="text-lg text-white/80">
            Prepare smarter, perform better
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12 animate-slide-up">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="card hover:scale-105 transform transition-transform"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center animate-slide-up">
          <button
            onClick={() => navigate('/sections')}
            className="btn-primary text-lg px-12 py-4 inline-flex items-center space-x-2"
          >
            <span>Start Quiz</span>
            <span>→</span>
          </button>
          <p className="mt-4 text-white/70 text-sm">
            Choose your section and difficulty level to begin
          </p>
        </div>

        {/* Info Section */}
        <div className="mt-16 card bg-white/10 backdrop-blur-sm border border-white/20">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About CMAT Preparation
          </h2>
          <p className="text-gray-700 leading-relaxed">
            This comprehensive quiz application helps you prepare for the Common
            Management Admission Test (CMAT) with carefully curated questions
            across all five sections. Each question comes with strategic hints
            and detailed explanations to enhance your learning experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
