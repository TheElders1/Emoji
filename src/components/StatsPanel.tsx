import React from 'react';
import { TrendingUp, MousePointer, Coins, Award } from 'lucide-react';

interface StatsPanelProps {
  totalTaps: number;
  totalEarned: number;
  coinsPerSecond: number;
  level: number;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ 
  totalTaps, 
  totalEarned, 
  coinsPerSecond, 
  level 
}) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const nextLevelRequirement = level * 1000;
  const currentLevelProgress = totalEarned % 1000;
  const progressPercentage = (currentLevelProgress / 1000) * 100;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <TrendingUp className="w-6 h-6 text-green-400" />
        Statistics
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <MousePointer className="w-8 h-8 mx-auto mb-2 text-blue-400" />
          <div className="text-2xl font-bold text-white">{formatNumber(totalTaps)}</div>
          <div className="text-sm text-white/60">Total Taps</div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <Coins className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
          <div className="text-2xl font-bold text-white">{formatNumber(totalEarned)}</div>
          <div className="text-sm text-white/60">Total Earned</div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-400" />
          <div className="text-2xl font-bold text-white">{formatNumber(coinsPerSecond)}</div>
          <div className="text-sm text-white/60">Per Second</div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <Award className="w-8 h-8 mx-auto mb-2 text-purple-400" />
          <div className="text-2xl font-bold text-white">{level}</div>
          <div className="text-sm text-white/60">Level</div>
        </div>
      </div>
      
      {/* Level Progress */}
      <div className="bg-white/10 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-white/60">Level Progress</span>
          <span className="text-sm text-white/60">
            {currentLevelProgress}/1000 to Level {level + 1}
          </span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;