import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';
import HomePage from './pages/HomePage';
import SectionSelection from './pages/SectionSelection';
import DifficultySelection from './pages/DifficultySelection';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';
import ReviewPage from './pages/ReviewPage';
import './index.css';

function App() {
  return (
    <QuizProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sections" element={<SectionSelection />} />
            <Route path="/difficulty/:sectionId" element={<DifficultySelection />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/review" element={<ReviewPage />} />
          </Routes>
        </div>
      </Router>
    </QuizProvider>
  );
}

export default App;
