import React, { useState, useEffect, useCallback } from 'react';
import { Coins, Zap, TrendingUp, Users, Trophy, Star } from 'lucide-react';
import CoinTapper from './components/CoinTapper';
import UpgradeCard from './components/UpgradeCard';
import StatsPanel from './components/StatsPanel';
import Header from './components/Header';
import TelegramIntegration from './components/TelegramIntegration';

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

function App() {
  const [coins, setCoins] = useState(0);
  const [coinsPerTap, setCoinsPerTap] = useState(1);
  const [coinsPerSecond, setCoinsPerSecond] = useState(0);
  const [totalTaps, setTotalTaps] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [level, setLevel] = useState(1);

  const [upgrades, setUpgrades] = useState<Upgrade[]>([
    {
      id: 'tap-power',
      name: 'Diamond Hands',
      description: 'Increases coins per tap',
      cost: 50,
      multiplier: 1,
      icon: <Zap className="w-5 h-5" />,
      owned: 0
    },
    {
      id: 'auto-miner',
      name: 'Mining Rig',
      description: 'Earns coins automatically',
      cost: 200,
      multiplier: 1,
      icon: <Coins className="w-5 h-5" />,
      owned: 0
    },
    {
      id: 'boost-multiplier',
      name: 'Rocket Boost',
      description: 'Multiplies all earnings',
      cost: 1000,
      multiplier: 1.5,
      icon: <TrendingUp className="w-5 h-5" />,
      owned: 0
    },
    {
      id: 'social-power',
      name: 'Influencer Status',
      description: 'Massive tap power boost',
      cost: 5000,
      multiplier: 10,
      icon: <Users className="w-5 h-5" />,
      owned: 0
    }
  ]);

  // Auto-earning effect
  useEffect(() => {
    if (coinsPerSecond > 0) {
      const interval = setInterval(() => {
        setCoins(prev => prev + coinsPerSecond);
        setTotalEarned(prev => prev + coinsPerSecond);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [coinsPerSecond]);

  // Level calculation
  useEffect(() => {
    const newLevel = Math.floor(totalEarned / 1000) + 1;
    setLevel(newLevel);
  }, [totalEarned]);

  const handleTap = useCallback(() => {
    setCoins(prev => prev + coinsPerTap);
    setTotalTaps(prev => prev + 1);
    setTotalEarned(prev => prev + coinsPerTap);
  }, [coinsPerTap]);

  const handleUpgrade = useCallback((upgradeId: string) => {
    setUpgrades(prev => prev.map(upgrade => {
      if (upgrade.id === upgradeId && coins >= upgrade.cost) {
        const newOwned = upgrade.owned + 1;
        const newCost = Math.floor(upgrade.cost * 1.5);
        
        setCoins(current => current - upgrade.cost);
        
        // Apply upgrade effects
        if (upgrade.id === 'tap-power') {
          setCoinsPerTap(current => current + upgrade.multiplier);
        } else if (upgrade.id === 'auto-miner') {
          setCoinsPerSecond(current => current + upgrade.multiplier);
        } else if (upgrade.id === 'boost-multiplier') {
          setCoinsPerTap(current => Math.floor(current * upgrade.multiplier));
        } else if (upgrade.id === 'social-power') {
          setCoinsPerTap(current => current + upgrade.multiplier);
        }
        
        return {
          ...upgrade,
          owned: newOwned,
          cost: newCost
        };
      }
      return upgrade;
    }));
  }, [coins]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <Header coins={coins} level={level} />
      
      <main className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Game Area */}
          <div className="lg:col-span-2 space-y-6">
            <CoinTapper 
              coins={coins} 
              coinsPerTap={coinsPerTap} 
              onTap={handleTap} 
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
                    onUpgrade={() => handleUpgrade(upgrade.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;