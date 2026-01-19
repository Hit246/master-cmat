# CMAT Quiz Application

A comprehensive React-based quiz application for CMAT (Common Management Admission Test) preparation with 75 sample questions across 5 sections and 3 difficulty levels.

## 🎯 Features

### Core Functionality

- **5 CMAT Sections**: Quantitative Techniques, Logical Reasoning, Language Comprehension, General Awareness, Innovation & Entrepreneurship
- **3 Difficulty Levels**: Easy, Moderate, Hard
- **75 Sample Questions**: Each with hints and detailed explanations
- **Interactive Quiz Interface**: One question at a time with multiple-choice options
- **Smart Hints**: Strategic guidance for problem-solving
- **Timer**: Track time spent with pause/resume functionality
- **Progress Tracking**: Visual progress bar and question palette
- **Bookmark/Flag**: Mark questions for later review
- **Comprehensive Results**: Score analysis with performance feedback
- **Answer Review**: Review all answers with explanations
- **LocalStorage Persistence**: Auto-save progress

### UI/UX

- Modern, professional design with gradient backgrounds
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- Visual feedback for interactions
- Motivational messages based on performance

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
cmat/
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # React Context for state management
│   ├── data/            # Question bank and section data
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main app component
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🎓 How to Use

1. **Start Quiz**: Click "Start Quiz" on the home page
2. **Select Section**: Choose from 5 CMAT sections
3. **Choose Difficulty**: Select Easy, Moderate, or Hard
4. **Take Quiz**:
   - Answer questions one at a time
   - Use hints for guidance
   - Flag questions for review
   - Navigate using Previous/Next or question palette
5. **Submit**: Complete the quiz and submit
6. **View Results**: See your score and performance analysis
7. **Review Answers**: Study explanations for all questions

## 🛠️ Tech Stack

- **React** 18.3.1 - UI framework
- **Vite** 7.2.4 - Build tool
- **React Router** 6.28.0 - Routing
- **Tailwind CSS** 3.4.17 - Styling
- **Lucide React** 0.468.0 - Icons
- **Context API** - State management

## 📊 Question Bank

The application includes 75 sample questions:

- **Quantitative Techniques**: 15 questions (5 per difficulty)
- **Logical Reasoning**: 15 questions (5 per difficulty)
- **Language Comprehension**: 15 questions (5 per difficulty)
- **General Awareness**: 15 questions (5 per difficulty)
- **Innovation & Entrepreneurship**: 15 questions (5 per difficulty)

Each question includes:

- Question text
- Four multiple-choice options (A, B, C, D)
- Correct answer
- Strategic hint
- Detailed explanation

## 🎨 Features Breakdown

### Quiz Interface

- Question display with clear formatting
- Four labeled options (A, B, C, D)
- Visual feedback for selected answers
- Show/Hide hint toggle
- Flag for review button
- Running timer with pause control
- Progress indicator
- Question palette with status indicators

### Results Page

- Score percentage
- Performance level (Excellent, Very Good, Good, Average, Needs Improvement)
- Motivational messages
- Visual score breakdown chart
- Statistics (correct, incorrect, unanswered)
- Time taken
- Action buttons (Review Answers, Try Again, Go Home)

### Review Page

- All questions with user's answers
- Correct answers highlighted
- Visual indicators for correct/incorrect
- Hints available
- Detailed explanations
- Navigation between questions
- Quick access to incorrect questions

## 📝 Customization

### Adding More Questions

Edit `src/data/questions.js` and add questions following this format:

```javascript
{
  id: 'unique_id',
  section: 'quantitative', // or 'logical', 'language', 'awareness', 'innovation'
  difficulty: 'easy', // or 'moderate', 'hard'
  question: 'Your question text',
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  correctAnswer: 0, // index of correct option (0-3)
  hint: 'Strategic hint for solving',
  explanation: 'Detailed explanation of the answer'
}
```

### Customizing Styles

- Edit `tailwind.config.js` for theme customization
- Modify `src/index.css` for global styles
- Update component styles in individual component files

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with React and Vite
- Styled with Tailwind CSS
- Icons from Lucide React
- Designed for CMAT aspirants

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

**Happy Learning! 🎓**
