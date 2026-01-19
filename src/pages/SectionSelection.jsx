import React from 'react';
import { useNavigate } from 'react-router-dom';
import { sections } from '../data/sections';
import { ArrowLeft } from 'lucide-react';

const SectionSelection = () => {
  const navigate = useNavigate();

  const handleSectionClick = (sectionId) => {
    navigate(`/difficulty/${sectionId}`);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Choose Your Section
          </h1>
          <p className="text-white/80 text-lg">
            Select a section to begin your CMAT preparation
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className="card cursor-pointer hover:scale-105 transform transition-all group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center text-center">
                  {/* Icon */}
                  <div
                    className={`${section.color} p-4 rounded-full mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {section.shortName}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {section.description}
                  </p>

                  {/* Arrow indicator */}
                  <div className="mt-4 text-primary-600 group-hover:translate-x-2 transition-transform">
                    →
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="mt-12 card bg-white/10 backdrop-blur-sm border border-white/20 animate-slide-up">
          <h3 className="text-xl font-bold text-white mb-3">
            📚 Preparation Tips
          </h3>
          <ul className="text-white/90 space-y-2">
            <li>• Start with Easy level to build confidence</li>
            <li>• Use hints strategically to understand problem-solving approaches</li>
            <li>• Review explanations carefully after completing each quiz</li>
            <li>• Track your progress and focus on weaker areas</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SectionSelection;
