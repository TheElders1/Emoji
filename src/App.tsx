import React, { useState, useEffect, useCallback } from 'react';
import { Coins, Zap, TrendingUp, Users, Trophy, Star } from 'lucide-react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import TapPage from './pages/TapPage';
import MiniGamesPage from './pages/MiniGamesPage';
import TasksPage from './pages/TasksPage';
import RankPage from './pages/RankPage';
import WarPage from './pages/WarPage';
import { GameState, User } from './types/game';
import { saveUserData, loadUserData } from './utils/storage';
import telegramBot from './services/telegramBot';

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
  const [currentPage, setCurrentPage] = useState<GameState['currentPage']>('tap');
  const [coins, setCoins] = useState(0);
  const [coinsPerTap, setCoinsPerTap] = useState(1);
  const [coinsPerSecond, setCoinsPerSecond] = useState(0);
  const [totalTaps, setTotalTaps] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [level, setLevel] = useState(1);
  const [referrals, setReferrals] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

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

  // Load user data on component mount
  useEffect(() => {
    const savedUser = loadUserData();
    if (savedUser) {
      setCoins(savedUser.coins);
      setTotalTaps(savedUser.totalTaps);
      setTotalEarned(savedUser.totalEarned);
      setReferrals(savedUser.referrals);
      setCompletedTasks(savedUser.completedTasks);
      
      // Recalculate derived values
      const newLevel = Math.floor(savedUser.totalEarned / 1000) + 1;
      setLevel(newLevel);
    }

    // Get Telegram user info
    const telegramUser = telegramBot.getTelegramUser();
    if (telegramUser) {
      console.log('Telegram user detected:', telegramUser);
    }
  }, []);

  // Save user data whenever it changes
  useEffect(() => {
    const userData: User = {
      telegramId: telegramBot.getTelegramUser()?.id,
      username: telegramBot.getTelegramUser()?.username,
      firstName: telegramBot.getTelegramUser()?.first_name,
      coins,
      level,
      totalTaps,
      totalEarned,
      referrals,
      rank: 'Rookie', // Will be calculated based on totalEarned
      joinedChannels: [],
      completedTasks
    };
    
    saveUserData(userData);
  }, [coins, level, totalTaps, totalEarned, referrals, completedTasks]);

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

  const handleCompleteTask = useCallback((taskId: string, reward: number) => {
    if (!completedTasks.includes(taskId)) {
      setCompletedTasks(prev => [...prev, taskId]);
      setCoins(prev => prev + reward);
      setTotalEarned(prev => prev + reward);
    }
  }, [completedTasks]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'tap':
        return (
          <TapPage
            coins={coins}
            coinsPerTap={coinsPerTap}
            coinsPerSecond={coinsPerSecond}
            totalTaps={totalTaps}
            totalEarned={totalEarned}
            level={level}
            upgrades={upgrades}
            onTap={handleTap}
            onUpgrade={handleUpgrade}
          />
        );
      case 'minigames':
        return <MiniGamesPage />;
      case 'tasks':
        return (
          <TasksPage
            referrals={referrals}
            completedTasks={completedTasks}
            onCompleteTask={handleCompleteTask}
          />
        );
      case 'rank':
        return <RankPage totalEarned={totalEarned} level={level} />;
      case 'war':
        return <WarPage level={level} totalEarned={totalEarned} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white pb-20">
      <Header coins={coins} level={level} />
      
      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {renderCurrentPage()}
      </main>
      
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
}

export default App;