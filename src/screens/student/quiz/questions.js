/**
 * Mock quiz bank — 10 emotional-awareness + general-knowledge questions.
 * Replace with API data later. Each question has 4 options and a `correct`
 * index (0-based).
 */

export const QUESTIONS = [
  {
    id: 1,
    category: 'Emotional Awareness',
    question: 'Which of these is NOT a primary emotion?',
    options: ['Joy', 'Sadness', 'Confusion', 'Anger'],
    correct: 2,
  },
  {
    id: 2,
    category: 'General knowledge',
    question: "Who among the following doesn't have the record of playing the most World cups?",
    options: ['Antonio Carbajal', 'Lothar Matthäus', 'Lionel Messi', 'Neymar'],
    correct: 3,
  },
  {
    id: 3,
    category: 'Mindfulness',
    question: 'What is the recommended breath count in box breathing?',
    options: ['2-2-2-2', '4-4-4-4', '6-6-6-6', '8-8-8-8'],
    correct: 1,
  },
  {
    id: 4,
    category: 'Self-awareness',
    question: 'When you label an emotion in words, which brain region calms?',
    options: ['Hippocampus', 'Amygdala', 'Cerebellum', 'Brainstem'],
    correct: 1,
  },
  {
    id: 5,
    category: 'Habits',
    question: 'About how many days does it take for a behaviour to become automatic?',
    options: ['7 days', '21 days', '66 days', '180 days'],
    correct: 2,
  },
  {
    id: 6,
    category: 'Sleep',
    question: 'Which is best for falling asleep faster?',
    options: ['Bright phone screen', 'Caffeine after 6pm', 'Cool, dark room', 'Late workout'],
    correct: 2,
  },
  {
    id: 7,
    category: 'Social',
    question: '"Active listening" most importantly involves…',
    options: ['Replying quickly', 'Reflecting back', 'Giving advice', 'Solving the problem'],
    correct: 1,
  },
  {
    id: 8,
    category: 'Wellbeing',
    question: 'A short walk outside primarily helps by…',
    options: ['Burning calories', 'Resetting attention', 'Building muscle', 'Improving posture'],
    correct: 1,
  },
  {
    id: 9,
    category: 'Self-talk',
    question: 'Re-framing a thought is most effective when you…',
    options: ['Suppress the thought', 'Argue with it', 'Notice + name + ask if it\'s true', 'Distract yourself'],
    correct: 2,
  },
  {
    id: 10,
    category: 'Gratitude',
    question: 'Daily gratitude journaling has been shown to improve…',
    options: ['Test scores only', 'Long-term mood', 'Eyesight', 'Hearing'],
    correct: 1,
  },
];

export const OPTION_COLORS = [
  { bg: '#fbbf80', text: '#3a2a1a' }, // peach
  { bg: '#f5f5f5', text: '#1f1f1f' }, // white
  { bg: '#a7f3d0', text: '#1f3a2a' }, // mint
  { bg: '#f5f5f5', text: '#1f1f1f' }, // white
];

export const QUIZ_DURATION = 210; // seconds (3:30)
