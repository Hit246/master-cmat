import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const QuizContext = createContext();

// Action types
const ACTIONS = {
  SET_SECTION: 'SET_SECTION',
  SET_DIFFICULTY: 'SET_DIFFICULTY',
  SET_QUESTIONS: 'SET_QUESTIONS',
  SET_CURRENT_QUESTION: 'SET_CURRENT_QUESTION',
  SET_ANSWER: 'SET_ANSWER',
  TOGGLE_FLAG: 'TOGGLE_FLAG',
  SET_TIME: 'SET_TIME',
  SUBMIT_QUIZ: 'SUBMIT_QUIZ',
  RESET_QUIZ: 'RESET_QUIZ',
  LOAD_SAVED_STATE: 'LOAD_SAVED_STATE',
};

// Initial state
const initialState = {
  currentSection: null,
  currentDifficulty: null,
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: {}, // { questionId: answerIndex }
  flaggedQuestions: [], // [questionId]
  timeSpent: 0,
  isSubmitted: false,
  score: null,
};

// Reducer function
const quizReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_SECTION:
      return { ...state, currentSection: action.payload };
    
    case ACTIONS.SET_DIFFICULTY:
      return { ...state, currentDifficulty: action.payload };
    
    case ACTIONS.SET_QUESTIONS:
      return { ...state, questions: action.payload };
    
    case ACTIONS.SET_CURRENT_QUESTION:
      return { ...state, currentQuestionIndex: action.payload };
    
    case ACTIONS.SET_ANSWER:
      return {
        ...state,
        userAnswers: {
          ...state.userAnswers,
          [action.payload.questionId]: action.payload.answerIndex,
        },
      };
    
    case ACTIONS.TOGGLE_FLAG:
      const questionId = action.payload;
      const isFlagged = state.flaggedQuestions.includes(questionId);
      return {
        ...state,
        flaggedQuestions: isFlagged
          ? state.flaggedQuestions.filter(id => id !== questionId)
          : [...state.flaggedQuestions, questionId],
      };
    
    case ACTIONS.SET_TIME:
      return { ...state, timeSpent: action.payload };
    
    case ACTIONS.SUBMIT_QUIZ:
      const correctAnswers = state.questions.filter(
        q => state.userAnswers[q.id] === q.correctAnswer
      ).length;
      return {
        ...state,
        isSubmitted: true,
        score: {
          correct: correctAnswers,
          incorrect: Object.keys(state.userAnswers).length - correctAnswers,
          unanswered: state.questions.length - Object.keys(state.userAnswers).length,
          total: state.questions.length,
          percentage: ((correctAnswers / state.questions.length) * 100).toFixed(2),
        },
      };
    
    case ACTIONS.RESET_QUIZ:
      return initialState;
    
    case ACTIONS.LOAD_SAVED_STATE:
      return { ...state, ...action.payload };
    
    default:
      return state;
  }
};

// Context Provider
export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const [savedState, setSavedState] = useLocalStorage('cmat-quiz-state', null);

  // Load saved state on mount
  useEffect(() => {
    if (savedState && !state.isSubmitted) {
      dispatch({ type: ACTIONS.LOAD_SAVED_STATE, payload: savedState });
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (state.currentSection && !state.isSubmitted) {
      setSavedState(state);
    }
  }, [state, setSavedState]);

  const value = {
    state,
    dispatch,
    actions: ACTIONS,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

// Custom hook to use quiz context
export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within QuizProvider');
  }
  return context;
};
