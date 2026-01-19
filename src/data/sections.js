import { Calculator, Brain, BookOpen, Globe, Lightbulb } from 'lucide-react';

export const sections = [
  {
    id: 'quantitative',
    name: 'Quantitative Techniques & Data Interpretation',
    shortName: 'Quantitative',
    icon: Calculator,
    color: 'bg-blue-500',
    description: 'Test your mathematical and analytical skills with quantitative problems and data interpretation questions.',
  },
  {
    id: 'logical',
    name: 'Logical Reasoning',
    shortName: 'Logical Reasoning',
    icon: Brain,
    color: 'bg-purple-500',
    description: 'Enhance your logical thinking and problem-solving abilities with reasoning questions.',
  },
  {
    id: 'language',
    name: 'Language Comprehension',
    shortName: 'Language',
    icon: BookOpen,
    color: 'bg-green-500',
    description: 'Improve your English language skills including grammar, vocabulary, and comprehension.',
  },
  {
    id: 'awareness',
    name: 'General Awareness',
    shortName: 'General Awareness',
    icon: Globe,
    color: 'bg-orange-500',
    description: 'Stay updated with current affairs, business news, and general knowledge.',
  },
  {
    id: 'innovation',
    name: 'Innovation & Entrepreneurship',
    shortName: 'Innovation',
    icon: Lightbulb,
    color: 'bg-pink-500',
    description: 'Explore concepts of innovation, entrepreneurship, and business management.',
  },
];

export const difficulties = [
  {
    id: 'easy',
    name: 'Easy',
    color: 'bg-green-500',
    description: 'Perfect for beginners and building confidence',
  },
  {
    id: 'moderate',
    name: 'Moderate',
    color: 'bg-yellow-500',
    description: 'Intermediate level questions for steady progress',
  },
  {
    id: 'hard',
    name: 'Hard',
    color: 'bg-red-500',
    description: 'Advanced questions for serious aspirants',
  },
];
