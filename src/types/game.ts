export interface User {
  telegramId?: number;
  username?: string;
  firstName?: string;
  coins: number;
  level: number;
  totalTaps: number;
  totalEarned: number;
  referrals: number;
  rank: string;
  joinedChannels: string[];
  completedTasks: string[];
  coinsPerTap: number;
  coinsPerSecond: number;
  upgrades: any[];
}

export interface GameState {
  currentPage: 'tap' | 'minigames' | 'tasks' | 'rank' | 'war';
  user: User;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  type: 'referral' | 'social' | 'action';
  requirement?: number;
  link?: string;
  completed: boolean;
}

export interface Rank {
  name: string;
  minEarnings: number;
  maxEarnings: number;
  color: string;
  emoji: string;
}