import React from 'react';
import CoinTapper from '../components/CoinTapper';
import UpgradeCard from '../components/UpgradeCard';
import StatsPanel from '../components/StatsPanel';
import TelegramIntegration from '../components/TelegramIntegration';
import { Trophy } from 'lucide-react';

interface TapPageProps {
  coins: number;
  coinsPerTap: number;
  coinsPerSecond: number;
  totalTaps: number;
  totalEarned: number;
  level: number;
  upgrades: any[];
  onTap: () => void;
  onUpgrade: (upgradeId: string) => void;
}

const TapPage: React.FC<TapPageProps> = ({
  coins,
  coinsPerTap,
  coinsPerSecond,
  totalTaps,
  totalEarned,
  level,
  upgrades,
  onTap,
  onUpgrade
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Game Area */}
      <div className="lg:col-span-2 space-y-6">
        <CoinTapper 
          coins={coins} 
          coinsPerTap={coinsPerTap} 
          onTap={onTap} 
        />
        
        <StatsPanel 
          totalTaps={totalTaps}
          totalEarned={totalEarned}
          coinsPerSecond={coinsPerSecond}
          level={level}
        />
      </div>

      {/* Upgrades Panel */}
      <div className="space-y-4">
        <TelegramIntegration 
          gameStats={{
            coins,
            level,
            totalTaps,
            totalEarned
          }}
        />
        
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            Upgrades
          </h2>
          <div className="space-y-3">
            {upgrades.map((upgrade) => (
              <UpgradeCard
                key={upgrade.id}
                upgrade={upgrade}
                canAfford={coins >= upgrade.cost}
                onUpgrade={() => onUpgrade(upgrade.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TapPage;