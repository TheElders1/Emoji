import { getUserRank } from './ranks';

export const getRankTheme = (totalEarned: number) => {
  const rank = getUserRank(totalEarned);
  
  const themes = {
    'Rookie': {
      gradient: 'from-gray-400 to-gray-600',
      coinGradient: 'from-gray-300 to-gray-500',
      tapGlow: 'rgba(156, 163, 175, 0.5)',
      buttonGradient: 'from-gray-500 to-gray-700',
      accentColor: 'text-gray-400'
    },
    'Veteran': {
      gradient: 'from-green-400 to-green-600',
      coinGradient: 'from-green-300 to-green-500',
      tapGlow: 'rgba(34, 197, 94, 0.5)',
      buttonGradient: 'from-green-500 to-green-700',
      accentColor: 'text-green-400'
    },
    'Pro': {
      gradient: 'from-blue-400 to-blue-600',
      coinGradient: 'from-blue-300 to-blue-500',
      tapGlow: 'rgba(59, 130, 246, 0.5)',
      buttonGradient: 'from-blue-500 to-blue-700',
      accentColor: 'text-blue-400'
    },
    'Guru': {
      gradient: 'from-purple-400 to-purple-600',
      coinGradient: 'from-purple-300 to-purple-500',
      tapGlow: 'rgba(147, 51, 234, 0.5)',
      buttonGradient: 'from-purple-500 to-purple-700',
      accentColor: 'text-purple-400'
    },
    'Master': {
      gradient: 'from-yellow-400 to-yellow-600',
      coinGradient: 'from-yellow-300 to-yellow-500',
      tapGlow: 'rgba(234, 179, 8, 0.5)',
      buttonGradient: 'from-yellow-500 to-yellow-700',
      accentColor: 'text-yellow-400'
    },
    'Grandmaster': {
      gradient: 'from-orange-400 to-red-500',
      coinGradient: 'from-orange-300 to-red-400',
      tapGlow: 'rgba(249, 115, 22, 0.5)',
      buttonGradient: 'from-orange-500 to-red-600',
      accentColor: 'text-orange-400'
    },
    'Legendary': {
      gradient: 'from-pink-400 to-purple-600',
      coinGradient: 'from-pink-300 to-purple-500',
      tapGlow: 'rgba(236, 72, 153, 0.5)',
      buttonGradient: 'from-pink-500 to-purple-700',
      accentColor: 'text-pink-400'
    },
    'Lord': {
      gradient: 'from-indigo-400 via-purple-500 to-pink-500',
      coinGradient: 'from-indigo-300 via-purple-400 to-pink-400',
      tapGlow: 'rgba(99, 102, 241, 0.7)',
      buttonGradient: 'from-indigo-500 via-purple-600 to-pink-600',
      accentColor: 'text-indigo-400'
    }
  };

  return themes[rank.name as keyof typeof themes] || themes.Rookie;
};