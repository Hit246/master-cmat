// Calculate score and performance statistics
export const calculateScore = (questions, userAnswers) => {
  const correctAnswers = questions.filter(
    q => userAnswers[q.id] === q.correctAnswer
  ).length;

  const totalAnswered = Object.keys(userAnswers).length;
  const incorrect = totalAnswered - correctAnswers;
  const unanswered = questions.length - totalAnswered;
  const percentage = ((correctAnswers / questions.length) * 100).toFixed(2);

  return {
    correct: correctAnswers,
    incorrect,
    unanswered,
    total: questions.length,
    percentage: parseFloat(percentage),
  };
};

// Get performance level based on percentage
export const getPerformanceLevel = (percentage) => {
  if (percentage >= 90) return { level: 'Excellent', color: 'text-green-600', message: 'Outstanding performance! Keep it up!' };
  if (percentage >= 75) return { level: 'Very Good', color: 'text-blue-600', message: 'Great job! You\'re doing well!' };
  if (percentage >= 60) return { level: 'Good', color: 'text-yellow-600', message: 'Good effort! Keep practicing!' };
  if (percentage >= 40) return { level: 'Average', color: 'text-orange-600', message: 'You can do better! Review the topics.' };
  return { level: 'Needs Improvement', color: 'text-red-600', message: 'Don\'t give up! Practice more and you\'ll improve!' };
};

// Get motivational message based on score
export const getMotivationalMessage = (percentage) => {
  if (percentage >= 90) return '🎉 Exceptional! You\'re CMAT ready!';
  if (percentage >= 75) return '👏 Well done! You\'re on the right track!';
  if (percentage >= 60) return '💪 Good progress! Keep pushing forward!';
  if (percentage >= 40) return '📚 Keep learning! Success is near!';
  return '🌟 Every expert was once a beginner. Keep practicing!';
};
