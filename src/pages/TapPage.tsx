import React from 'react';
import CoinTapper from '../components/CoinTapper';
import UpgradeCard from '../components/UpgradeCard';
import StatsPanel from '../components/StatsPanel';

interface TapPageProps {
  coins: number;
  totalEarned: number;
  totalTaps: number;
  coinsPerTap: number;
  coinsPerSecond: number;
  upgrades: any[];
  onTap: () => void;
  onUpgrade: (upgradeId: string) => void;
}

const TapPage: React.FC<TapPageProps> = ({
  coins,
  totalEarned,
  totalTaps,
  coinsPerTap,
  coinsPerSecond,
  upgrades,
  onTap,
  onUpgrade
}) => {
  return (
    <div className="space-y-6">
      {/* Main Tapping Area */}
      <div className="flex items-center justify-center">
        <CoinTapper 
          coins={coins} 
          totalEarned={totalEarned}
          coinsPerTap={coinsPerTap}
          coinsPerSecond={coinsPerSecond}
          onTap={onTap} 
        />
      </div>

      {/* Statistics Panel */}
      <StatsPanel
        totalTaps={totalTaps}
        totalEarned={totalEarned}
        coinsPerSecond={coinsPerSecond}
        level={Math.floor(totalEarned / 1000) + 1}
      />

      {/* Upgrades Section */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h2 className="text-2xl font-bold mb-6 text-white">Upgrades</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
  );
};

export default TapPage;