import React from 'react';
import { Lock } from 'lucide-react';

interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  multiplier: number;
  icon: React.ReactNode;
  owned: number;
  maxOwned?: number;
}

interface UpgradeCardProps {
  upgrade: Upgrade;
  canAfford: boolean;
  onUpgrade: () => void;
}

const UpgradeCard: React.FC<UpgradeCardProps> = ({ upgrade, canAfford, onUpgrade }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const isMaxed = upgrade.maxOwned && upgrade.owned >= upgrade.maxOwned;

  return (
    <button
      onClick={onUpgrade}
      disabled={!canAfford || isMaxed}
      className={`w-full p-4 rounded-xl border transition-all duration-200 text-left ${
        canAfford && !isMaxed
          ? 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/30 transform hover:scale-105'
          : 'bg-white/5 border-white/10 opacity-50 cursor-not-allowed'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          canAfford && !isMaxed
            ? 'bg-gradient-to-r from-purple-500 to-pink-500'
            : 'bg-gray-600'
        }`}>
          {canAfford && !isMaxed ? upgrade.icon : <Lock className="w-5 h-5" />}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-white">{upgrade.name}</h3>
            {upgrade.owned > 0 && (
              <span className="text-xs bg-purple-500/20 px-2 py-1 rounded-full">
                {upgrade.owned}
              </span>
            )}
          </div>
          
          <p className="text-sm text-white/60 mb-2">{upgrade.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="text-white/40">Cost: </span>
              <span className="text-yellow-400 font-bold">
                {formatNumber(upgrade.cost)}
              </span>
            </div>
            
            {upgrade.id === 'tap-power' && (
              <div className="text-xs text-green-400">
                +{upgrade.multiplier} per tap
              </div>
            )}
            
            {upgrade.id === 'auto-miner' && (
              <div className="text-xs text-blue-400">
                +{upgrade.multiplier}/sec
              </div>
            )}
            
            {upgrade.id === 'boost-multiplier' && (
              <div className="text-xs text-purple-400">
                {upgrade.multiplier}x multiplier
              </div>
            )}
            
            {upgrade.id === 'social-power' && (
              <div className="text-xs text-orange-400">
                +{upgrade.multiplier} tap power
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

export default UpgradeCard;