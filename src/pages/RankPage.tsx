import React from 'react';
import { Trophy, TrendingUp, Star, Crown } from 'lucide-react';
import { ranks, getUserRank, getNextRank } from '../utils/ranks';

interface RankPageProps {
  totalEarned: number;
  level: number;
}

const RankPage: React.FC<RankPageProps> = ({ totalEarned, level }) => {
  const currentRank = getUserRank(totalEarned);
  const nextRank = getNextRank(totalEarned);
  
  const progressToNext = nextRank 
    ? ((totalEarned - currentRank.minEarnings) / (nextRank.minEarnings - currentRank.minEarnings)) * 100
    : 100;

  const formatNumber = (num: number) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Current Rank Display */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <div className="text-center mb-6">
          <div className={`w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r ${currentRank.color} flex items-center justify-center text-4xl`}>
            {currentRank.emoji}
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{currentRank.name}</h1>
          <p className="text-white/60">Level {level} Player</p>
        </div>

        <div className="bg-white/10 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/60">Total Earned</span>
            <span className="text-2xl font-bold text-yellow-400">{formatNumber(totalEarned)}</span>
          </div>
          
          {nextRank && (
            <>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/60">Next Rank</span>
                <span className="text-white font-bold">{nextRank.name} {nextRank.emoji}</span>
              </div>
              
              <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                <div 
                  className={`bg-gradient-to-r ${nextRank.color} h-3 rounded-full transition-all duration-500`}
                  style={{ width: `${Math.min(progressToNext, 100)}%` }}
                />
              </div>
              
              <div className="text-center text-sm text-white/60">
                {formatNumber(nextRank.minEarnings - totalEarned)} more to reach {nextRank.name}
              </div>
            </>
          )}
          
          {!nextRank && (
            <div className="text-center text-yellow-400 font-bold">
              🎉 Maximum Rank Achieved! 🎉
            </div>
          )}
        </div>
      </div>

      {/* All Ranks Display */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Crown className="w-6 h-6 text-yellow-400" />
          All Ranks
        </h2>
        
        <div className="space-y-3">
          {ranks.map((rank, index) => {
            const isCurrentRank = rank.name === currentRank.name;
            const isUnlocked = totalEarned >= rank.minEarnings;
            
            return (
              <div
                key={rank.name}
                className={`p-4 rounded-xl border transition-all duration-200 ${
                  isCurrentRank
                    ? 'bg-yellow-500/20 border-yellow-500/30 ring-2 ring-yellow-500/50'
                    : isUnlocked
                    ? 'bg-green-500/10 border-green-500/20'
                    : 'bg-white/5 border-white/10 opacity-60'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${rank.color} flex items-center justify-center text-2xl`}>
                    {rank.emoji}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white">{rank.name}</h3>
                      {isCurrentRank && (
                        <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                          Current
                        </span>
                      )}
                      {isUnlocked && !isCurrentRank && (
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                          Unlocked
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-white/60">
                      {formatNumber(rank.minEarnings)} - {rank.maxEarnings === Infinity ? '∞' : formatNumber(rank.maxEarnings)} coins
                    </p>
                  </div>
                  
                  <div className="text-right">
                    {isUnlocked ? (
                      <Star className="w-6 h-6 text-yellow-400" />
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-white/20" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rank Benefits */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-green-400" />
          Rank Benefits
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-bold text-white mb-2">🎁 Exclusive Rewards</h3>
            <p className="text-sm text-white/60">Higher ranks unlock special bonuses and exclusive content</p>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-bold text-white mb-2">⚡ Increased Multipliers</h3>
            <p className="text-sm text-white/60">Earn more coins per tap and from upgrades</p>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-bold text-white mb-2">🏆 Prestige Status</h3>
            <p className="text-sm text-white/60">Show off your achievements to other players</p>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-bold text-white mb-2">🎮 Early Access</h3>
            <p className="text-sm text-white/60">Get first access to new features and games</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankPage;