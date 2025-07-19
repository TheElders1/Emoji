import React, { useState } from 'react';
import { Swords, Users, Trophy, Zap, Shield, Target } from 'lucide-react';

interface WarPageProps {
  level: number;
  totalEarned: number;
}

const WarPage: React.FC<WarPageProps> = ({ level, totalEarned }) => {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  const battleModes = [
    {
      id: 'quick_battle',
      title: 'Quick Battle',
      description: 'Fast-paced 1v1 emoji battles',
      icon: '⚡',
      duration: '2 min',
      reward: '500-2000',
      difficulty: 'Easy'
    },
    {
      id: 'emoji_duel',
      title: 'Emoji Duel',
      description: 'Strategic emoji combination battles',
      icon: '🎯',
      duration: '5 min',
      reward: '1000-5000',
      difficulty: 'Medium'
    },
    {
      id: 'tournament',
      title: 'Tournament',
      description: 'Compete against multiple players',
      icon: '🏆',
      duration: '15 min',
      reward: '5000-20000',
      difficulty: 'Hard'
    },
    {
      id: 'clan_war',
      title: 'Clan War',
      description: 'Team-based emoji battles',
      icon: '⚔️',
      duration: '30 min',
      reward: '10000-50000',
      difficulty: 'Expert'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'Hard': return 'text-orange-400 bg-orange-400/20';
      case 'Expert': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <div className="flex items-center gap-3 mb-4">
          <Swords className="w-8 h-8 text-red-400" />
          <div>
            <h1 className="text-3xl font-bold text-white">Emoji War Arena</h1>
            <p className="text-white/60">Battle other players in epic emoji combat!</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <Shield className="w-6 h-6 mx-auto mb-1 text-blue-400" />
            <div className="text-lg font-bold text-white">{level}</div>
            <div className="text-xs text-white/60">Battle Level</div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <Trophy className="w-6 h-6 mx-auto mb-1 text-yellow-400" />
            <div className="text-lg font-bold text-white">0</div>
            <div className="text-xs text-white/60">Wins</div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <Target className="w-6 h-6 mx-auto mb-1 text-purple-400" />
            <div className="text-lg font-bold text-white">1000</div>
            <div className="text-xs text-white/60">Rating</div>
          </div>
        </div>
      </div>

      {/* Battle Modes */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-400" />
          Battle Modes
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {battleModes.map((mode) => (
            <div
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              className="bg-white/10 rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-200 cursor-pointer group"
            >
              <div className="text-center mb-3">
                <div className="text-4xl mb-2">{mode.icon}</div>
                <h3 className="font-bold text-white group-hover:text-yellow-400 transition-colors">
                  {mode.title}
                </h3>
              </div>
              
              <p className="text-sm text-white/60 mb-3 text-center">
                {mode.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/40">Duration:</span>
                  <span className="text-xs text-white">{mode.duration}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/40">Reward:</span>
                  <span className="text-xs text-yellow-400">{mode.reward}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/40">Difficulty:</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(mode.difficulty)}`}>
                    {mode.difficulty}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-400" />
          War Leaderboard
        </h2>
        
        <div className="space-y-3">
          {[
            { rank: 1, name: 'EmojiMaster', rating: 2500, wins: 150, emoji: '👑' },
            { rank: 2, name: 'BattleKing', rating: 2350, wins: 142, emoji: '🥇' },
            { rank: 3, name: 'WarLord', rating: 2200, wins: 138, emoji: '🥈' },
            { rank: 4, name: 'Champion', rating: 2100, wins: 125, emoji: '🥉' },
            { rank: 5, name: 'Gladiator', rating: 2000, wins: 120, emoji: '⚔️' }
          ].map((player) => (
            <div
              key={player.rank}
              className="flex items-center gap-4 p-3 bg-white/10 rounded-lg"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                {player.rank}
              </div>
              
              <div className="text-2xl">{player.emoji}</div>
              
              <div className="flex-1">
                <div className="font-bold text-white">{player.name}</div>
                <div className="text-sm text-white/60">{player.wins} wins</div>
              </div>
              
              <div className="text-right">
                <div className="font-bold text-yellow-400">{player.rating}</div>
                <div className="text-xs text-white/60">Rating</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coming Soon Modal */}
      {selectedMode && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-md w-full">
            <div className="text-center">
              <div className="text-6xl mb-4">⚔️</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Battle Arena Coming Soon!
              </h3>
              <p className="text-white/60 mb-6">
                Epic emoji battles are currently in development. Get ready for intense 1v1 combat!
              </p>
              <button
                onClick={() => setSelectedMode(null)}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition-colors"
              >
                Ready for War! 🔥
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WarPage;