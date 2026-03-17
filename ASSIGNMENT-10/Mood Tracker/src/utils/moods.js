export const moods = [
  {
    id: 'happy',
    emoji: '😊',
    label: 'Happy',
    color: '#FFD93D',
    gradient: 'linear-gradient(135deg, #FFD93D 0%, #FF9F43 100%)',
    darkGradient: 'linear-gradient(135deg, #FFA502 0%, #FF6B35 100%)',
    messages: [
      "That's wonderful! Keep spreading that joy! 🌟",
      "Your smile is contagious! Keep shining! ✨",
      "Life is beautiful when you're happy! 🌈",
      "Embrace this positive energy! 💛"
    ],
    accent: '#FF9F43'
  },
  {
    id: 'sad',
    emoji: '😢',
    label: 'Sad',
    color: '#4A90E2',
    gradient: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)',
    darkGradient: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    messages: [
      "It's okay to feel sad. This feeling will pass. 💙",
      "Talk to someone you trust. You're not alone.",
      "Remember: After rain comes the rainbow. 🌈",
      "Take care of yourself today. 🤗"
    ],
    accent: '#357ABD'
  },
  {
    id: 'angry',
    emoji: '😡',
    label: 'Angry',
    color: '#E94B3C',
    gradient: 'linear-gradient(135deg, #E94B3C 0%, #C92A2A 100%)',
    darkGradient: 'linear-gradient(135deg, #DC2430 0%, #7B221D 100%)',
    messages: [
      "Take a deep breath. Count to 10. 🧘",
      "It's okay to feel frustrated. Find healthy outlets. 💪",
      "Channel this energy into something productive! 🔥",
      "Step back and cool down. You've got this! ❄️"
    ],
    accent: '#C92A2A'
  },
  {
    id: 'calm',
    emoji: '😌',
    label: 'Calm',
    color: '#6ECB63',
    gradient: 'linear-gradient(135deg, #6ECB63 0%, #4CAF50 100%)',
    darkGradient: 'linear-gradient(135deg, #2D5016 0%, #4CAF50 100%)',
    messages: [
      "Peace is within you. Cherish this moment. 🍃",
      "Let this calm guide your day. 🌿",
      "You're in harmony with yourself. Beautiful! ✨",
      "This tranquility is your strength. Hold onto it. 🙏"
    ],
    accent: '#4CAF50'
  },
  {
    id: 'tired',
    emoji: '😴',
    label: 'Tired',
    color: '#9B59B6',
    gradient: 'linear-gradient(135deg, #9B59B6 0%, #6C3483 100%)',
    darkGradient: 'linear-gradient(135deg, #4a235a 0%, #663399 100%)',
    messages: [
      "Rest is productive too. Take time to recharge. 💜",
      "You deserve a break. Be kind to yourself. 🌙",
      "Tomorrow is a new day with fresh energy. ✨",
      "Sleep well and find peace. 😴"
    ],
    accent: '#6C3483'
  },
  {
    id: 'excited',
    emoji: '🤩',
    label: 'Excited',
    color: '#FF6B9D',
    gradient: 'linear-gradient(135deg, #FF6B9D 0%, #FFA06B 100%)',
    darkGradient: 'linear-gradient(135deg, #FF1654 0%, #FFB652 100%)',
    messages: [
      "Amazing energy! Let's go make things happen! 🚀",
      "You're on fire! Keep that momentum! 🔥",
      "This excitement is contagious! Share it! 🎉",
      "The world needs your enthusiasm! Let it shine! 🌟"
    ],
    accent: '#FFA06B'
  }
];

export const getMoodById = (id) => {
  return moods.find(mood => mood.id === id) || moods[0];
};

export const getRandomMessage = (moodId) => {
  const mood = getMoodById(moodId);
  return mood.messages[Math.floor(Math.random() * mood.messages.length)];
};
