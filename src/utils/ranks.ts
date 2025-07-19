import { Rank } from '../types/game';

export const ranks: Rank[] = [
  {
    name: 'Rookie',
    minEarnings: 1,
    maxEarnings: 1000,
    color: 'from-gray-400 to-gray-600',
    emoji: '🥉'
  },
  {
    name: 'Veteran',
    minEarnings: 1000,
    maxEarnings: 10000,
    color: 'from-green-400 to-green-600',
    emoji: '🎖️'
  },
  {
    name: 'Pro',
    minEarnings: 10000,
    maxEarnings: 100000,
    color: 'from-blue-400 to-blue-600',
    emoji: '🥈'
  },
  {
    name: 'Guru',
    minEarnings: 100000,
    maxEarnings: 1000000,
    color: 'from-purple-400 to-purple-600',
    emoji: '🏆'
  },
  {
    name: 'Master',
    minEarnings: 1000000,
    maxEarnings: 10000000,
    color: 'from-yellow-400 to-yellow-600',
    emoji: '🥇'
  },
  {
    name: 'Grandmaster',
    minEarnings: 10000000,
    maxEarnings: 100000000,
    color: 'from-orange-400 to-red-500',
    emoji: '👑'
  },
  {
    name: 'Legendary',
    minEarnings: 100000000,
    maxEarnings: 1000000000,
    color: 'from-pink-400 to-purple-600',
    emoji: '💎'
  },
  {
    name: 'Lord',
    minEarnings: 1000000000,
    maxEarnings: Infinity,
    color: 'from-indigo-400 via-purple-500 to-pink-500',
    emoji: '🌟'
  }
];

export const getUserRank = (totalEarned: number): Rank => {
  return ranks.find(rank => 
    totalEarned >= rank.minEarnings && totalEarned < rank.maxEarnings
  ) || ranks[0];
};

export const getNextRank = (totalEarned: number): Rank | null => {
  const currentRankIndex = ranks.findIndex(rank => 
    totalEarned >= rank.minEarnings && totalEarned < rank.maxEarnings
  );
  
  return currentRankIndex < ranks.length - 1 ? ranks[currentRankIndex + 1] : null;
};