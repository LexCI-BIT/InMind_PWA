/**
 * weeklyData.js — 32-week structured curriculum data for MindLab.
 *
 * Each week has a title and 7 days (Mon–Sun) following this pattern:
 *   Monday     → Awareness
 *   Tuesday    → Recognition
 *   Wednesday  → Conflict
 *   Thursday   → Real-Life Mapping
 *   Friday     → Behaviour Action
 *   Saturday   → Mind Lab Reinforcement
 *   Sunday     → Weekly Snapshot
 *
 * Each day has 7 dynamic screens:
 *   1. DailyPrompt  2. Scenario  3. MicroFeedback
 *   4. Reflection    5. Insight   6. Challenge  7. Completion
 */

const DAY_STRUCTURE = [
  { day: 'MONDAY',    focus: 'Awareness',              duration: '15 mins' },
  { day: 'TUESDAY',   focus: 'Recognition',            duration: '15 mins' },
  { day: 'WEDNESDAY', focus: 'Conflict',               duration: '15 mins' },
  { day: 'THURSDAY',  focus: 'Real-Life Mapping',      duration: '15 mins' },
  { day: 'FRIDAY',    focus: 'Behaviour Action',       duration: '15 mins' },
  { day: 'SATURDAY',  focus: 'Mind Lab Reinforcement', duration: '15 mins' },
  { day: 'SUNDAY',    focus: 'Weekly Snapshot',         duration: '15 mins' },
];

const WEEK_TITLES = [
  'Weighing Pros and Cons',
  'Asking the Right Questions',
  'Small Risks vs Big Risks',
  'Influence vs Manipulation',
  'Defending Your Decisions',
  'The Power of Yet',
  'Handling Criticism Maturely',
  'My Decision Snapshot',
  'Friendships or Friend Shifts',
  'Trust vs Coercion',
  'Reading Social Cues',
  'Handling Guilt-Tripping',
  'Groupthink & Resistance',
  'Balancing Trust & Safety',
  'Setting Boundary Lines',
  'Guiding vs Following',
  'Silencing the Inner Critic',
  'Reframing Self-Doubt',
  'Risk vs Reward',
  'Speaking Up Authentically',
  'Moving Past Mistakes',
  'Personal Strengths Map',
  'Resilience & Small Wins',
  'My Confidence Snapshot',
  'Vision vs Success',
  'Strengthening My Values',
  'Discovering My Passion',
  'Overcoming Inner Resistance',
  'Setting Realistic Goals',
  'Identity & Direction',
  'Building My Support Network',
  'Personal Vision Board',
];

/* Pre-built prompts, scenarios, & options per week theme (sample set).
   These rotate to give each day fresh content tied to the week's theme. */

function generateDailyContent(weekTitle, dayFocus, dayIndex) {
  const prompts = {
    'Awareness': {
      prompt: `What important decision did you think about today related to "${weekTitle}"?`,
      scenario: `Your best friend is pressuring you to skip studying for a fun outing. What would you consider when weighing this decision?`,
      scenarioOptions: [
        'Think about what matters most right now',
        'Consider the consequences of each choice',
        'Go with whatever feels exciting',
        'Ask someone you trust for advice',
      ],
      reflection: `Have you ever faced a similar situation? How did you handle it?`,
      insight: `Becoming aware of your thought patterns is the first step toward making better decisions.`,
      challenge: `Today, notice one decision you make automatically and pause to think about it for 30 seconds before acting.`,
    },
    'Recognition': {
      prompt: `When did you last recognize a pattern in how you react to "${weekTitle}" situations?`,
      scenario: `Your classmate takes credit for your group project idea in front of the teacher. What will you do?`,
      scenarioOptions: [
        'Speak up calmly and clarify your contribution',
        'Talk to the classmate privately after class',
        'Let it go, it\'s not worth the conflict',
        'Something else',
      ],
      reflection: `Think about a time when recognizing your own reaction helped you respond better.`,
      insight: `Recognizing patterns in your behaviour helps you understand your emotional triggers.`,
      challenge: `Identify one emotional reaction you have today and try to name the feeling behind it.`,
    },
    'Conflict': {
      prompt: `What internal conflict have you noticed related to "${weekTitle}"?`,
      scenario: `Your best friend is upset because you couldn't attend their birthday. What will you do?`,
      scenarioOptions: [
        'Say sorry and make it up to them',
        'Explain why you couldn\'t make it',
        'Ignore it, they will get over it',
        'Something else',
      ],
      reflection: `How do you usually handle conflict? Is there a pattern?`,
      insight: `Conflict isn't always negative — it can be a signal that something needs your attention.`,
      challenge: `The next time you feel conflicted, write down both sides before making a decision.`,
    },
    'Real-Life Mapping': {
      prompt: `Map a real-life situation where "${weekTitle}" played a role in your choices.`,
      scenario: `You have a big test tomorrow but your favourite show just released new episodes. How do you decide?`,
      scenarioOptions: [
        'Study first, then reward yourself with one episode',
        'Watch now and study later — you work better under pressure',
        'Skip the show entirely until the test is over',
        'Something else',
      ],
      reflection: `Draw a connection between how you handle this week\'s theme and a real moment in your life.`,
      insight: `Mapping real situations to behaviour patterns helps you see how your choices shape outcomes.`,
      challenge: `Create a simple pro/con list for one decision you face today.`,
    },
    'Behaviour Action': {
      prompt: `What one behaviour action will you take today based on "${weekTitle}"?`,
      scenario: `Your parent asks you to help with chores but you had plans with friends. How do you handle it?`,
      scenarioOptions: [
        'Help with chores and reschedule with friends',
        'Negotiate — do half now and half later',
        'Ask a sibling to cover for you',
        'Something else',
      ],
      reflection: `What actions have you taken this week that you feel proud of?`,
      insight: `Small, consistent behaviour changes lead to lasting personal growth.`,
      challenge: `Take one small action today that aligns with what you learned this week.`,
    },
    'Mind Lab Reinforcement': {
      prompt: `What key lesson from "${weekTitle}" do you want to reinforce?`,
      scenario: `You overhear classmates gossiping about someone. You could join in or walk away. What do you choose?`,
      scenarioOptions: [
        'Walk away — it doesn\'t feel right',
        'Change the subject to something positive',
        'Quietly listen but don\'t participate',
        'Something else',
      ],
      reflection: `Which lesson from this week do you think will stay with you the longest?`,
      insight: `Reinforcing positive behaviours through repetition makes them natural over time.`,
      challenge: `Share one thing you learned this week with someone you trust.`,
    },
    'Weekly Snapshot': {
      prompt: `Looking back at the week of "${weekTitle}", what stands out most?`,
      scenario: `It's the end of the week. You reflect on your choices. Which moment taught you the most?`,
      scenarioOptions: [
        'A moment of conflict that I handled well',
        'A decision where I chose wisely',
        'A time I could have done better',
        'Something else',
      ],
      reflection: `Write a short snapshot of your emotional journey this week.`,
      insight: `Weekly reflection helps solidify learning and prepares you for growth in the coming week.`,
      challenge: `Set one personal intention for next week based on what you learned.`,
    },
  };

  return prompts[dayFocus] || prompts['Awareness'];
}

export const WEEKS = WEEK_TITLES.map((title, wIdx) => ({
  id: wIdx + 1,
  title,
  days: DAY_STRUCTURE.map((d, dIdx) => ({
    ...d,
    dayIndex: dIdx,
    content: generateDailyContent(title, d.focus, dIdx),
  })),
}));
