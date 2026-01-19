// Filter questions by section and difficulty
export const filterQuestions = (questions, sectionId, difficulty) => {
  return questions.filter(
    q => q.section === sectionId && q.difficulty === difficulty
  );
};

// Shuffle array (Fisher-Yates algorithm)
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Get question status
export const getQuestionStatus = (questionId, userAnswers, flaggedQuestions, currentQuestionId) => {
  if (questionId === currentQuestionId) return 'current';
  if (flaggedQuestions.includes(questionId)) return 'flagged';
  if (userAnswers.hasOwnProperty(questionId)) return 'answered';
  return 'unanswered';
};

// Validate question structure
export const validateQuestion = (question) => {
  return (
    question.id &&
    question.section &&
    question.difficulty &&
    question.question &&
    Array.isArray(question.options) &&
    question.options.length === 4 &&
    typeof question.correctAnswer === 'number' &&
    question.correctAnswer >= 0 &&
    question.correctAnswer < 4 &&
    question.hint &&
    question.explanation
  );
};
