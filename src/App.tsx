import React, { useState, useEffect, useCallback } from 'react';
import { Coins, Zap, TrendingUp, Users, Trophy, Star } from 'lucide-react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import TapPage from './pages/TapPage';
import MiniGamesPage from './pages/MiniGamesPage';
import CardsPage from './pages/CardsPage';
import TasksPage from './pages/TasksPage';
import RankPage from './pages/RankPage';
import WarPage from './pages/WarPage';
import { GameState, User, Upgrade } from './types/game';
import { saveUserData, loadUserData, saveUpgrades, loadUpgrades } from './utils/storage';
import telegramBot from './services/telegramBot';

// Define initial upgrades
const initialUpgrades: Upgrade[] = [
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
];

function App() {
  const [currentPage, setCurrentPage] = useState<GameState['currentPage']>('tap');
  const [coins, setCoins] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [totalTaps, setTotalTaps] = useState(0);
  const [level, setLevel] = useState(1);
  const [referrals, setReferrals] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [upgrades, setUpgrades] = useState<Upgrade[]>(initialUpgrades);
  const [cards, setCards] = useState<any[]>([]);

  // Calculate derived values
  const coinsPerTap = 1 + upgrades.find(u => u.id === 'tap-power')?.owned || 0;
  const coinsPerSecond = upgrades.find(u => u.id === 'auto-miner')?.owned || 0;

  // Load user data on component mount
  useEffect(() => {
    const savedUser = loadUserData();
    const savedUpgrades = loadUpgrades();
    
    if (savedUser) {
      setCoins(savedUser.coins);
      setTotalEarned(savedUser.totalEarned);
      setTotalTaps(savedUser.totalTaps);
      setReferrals(savedUser.referrals);
      setCompletedTasks(savedUser.completedTasks);
      setCards(savedUser.cards || []);
      
      // Recalculate derived values
      const newLevel = Math.floor(savedUser.totalEarned / 1000) + 1;
      setLevel(newLevel);
    }

    if (savedUpgrades) {
      // Merge saved upgrades with initial upgrades (preserving icons)
      const mergedUpgrades = initialUpgrades.map(initialUpgrade => {
        const savedUpgrade = savedUpgrades.find(u => u.id === initialUpgrade.id);
        return savedUpgrade ? { ...initialUpgrade, ...savedUpgrade, icon: initialUpgrade.icon } : initialUpgrade;
      });
      setUpgrades(mergedUpgrades);
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
      rank: 'Rookie',
      joinedChannels: [],
      completedTasks,
      coinsPerTap,
      coinsPerSecond,
      upgrades: [],
      cards
    };
    
    saveUserData(userData);
  }, [coins, level, totalTaps, totalEarned, referrals, completedTasks, coinsPerTap, coinsPerSecond, cards]);

  // Save upgrades whenever they change
  useEffect(() => {
    // Create serializable upgrades (without React components)
    const serializableUpgrades = upgrades.map(({ icon, ...upgrade }) => upgrade);
    saveUpgrades(serializableUpgrades);
  }, [upgrades]);

  // Level calculation
  useEffect(() => {
    const newLevel = Math.floor(totalEarned / 1000) + 1;
    setLevel(newLevel);
  }, [totalEarned]);

  // Auto-mining effect
  useEffect(() => {
    if (coinsPerSecond > 0) {
      const interval = setInterval(() => {
        setCoins(prev => prev + coinsPerSecond);
        setTotalEarned(prev => prev + coinsPerSecond);
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [coinsPerSecond]);

  const handleTap = useCallback(() => {
    setCoins(prev => prev + coinsPerTap);
    setTotalEarned(prev => prev + coinsPerTap);
    setTotalTaps(prev => prev + 1);
  }, [coinsPerTap]);

  const handleUpgrade = useCallback((upgradeId: string) => {
    const upgrade = upgrades.find(u => u.id === upgradeId);
    if (!upgrade || coins < upgrade.cost) return;

    setCoins(prev => prev - upgrade.cost);
    setUpgrades(prev => prev.map(u => 
      u.id === upgradeId 
        ? { ...u, owned: u.owned + 1, cost: Math.floor(u.cost * 1.5) }
        : u
    ));
  }, [coins, upgrades]);

  const handleCompleteTask = useCallback((taskId: string, reward: number) => {
    if (!completedTasks.includes(taskId)) {
      setCompletedTasks(prev => [...prev, taskId]);
      setCoins(prev => prev + reward);
      setTotalEarned(prev => prev + reward);
    }
  }, [completedTasks]);

  const handlePurchaseCard = useCallback((cardId: string) => {
    // Card purchase logic would go here
    console.log('Purchase card:', cardId);
  }, []);

  const handleUpgradeCard = useCallback((cardId: string) => {
    // Card upgrade logic would go here
    console.log('Upgrade card:', cardId);
  }, []);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'tap':
        return (
          <TapPage
            coins={coins}
            totalEarned={totalEarned}
            totalTaps={totalTaps}
            coinsPerTap={coinsPerTap}
            coinsPerSecond={coinsPerSecond}
            upgrades={upgrades}
            onTap={handleTap}
            onUpgrade={handleUpgrade}
          />
        );
      case 'minigames':
        return <MiniGamesPage onEarnCoins={(amount) => {
          setCoins(prev => prev + amount);
          setTotalEarned(prev => prev + amount);
        }} />;
      case 'cards':
        return (
          <CardsPage
            coins={coins}
            cards={cards}
            onPurchaseCard={handlePurchaseCard}
            onUpgradeCard={handleUpgradeCard}
          />
        );
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white pb-16 sm:pb-20">
      <Header coins={coins} level={level} />
      
      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 max-w-6xl">
        {renderCurrentPage()}
      </main>
      
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
}

export default App;