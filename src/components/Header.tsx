import React from 'react';
import { Coins, Award, Zap } from 'lucide-react';

interface HeaderProps {
  coins: number;
  level: number;
}

const Header: React.FC<HeaderProps> = ({ coins, level }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <header className="bg-black/20 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Emoji Kombat
              </h1>
              <p className="text-sm text-white/60">Season 1</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <Coins className="w-5 h-5 text-yellow-400" />
              <span className="font-bold text-lg">{formatNumber(coins)}</span>
            </div>
            
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <Award className="w-5 h-5 text-purple-400" />
              <span className="font-bold">Level {level}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;