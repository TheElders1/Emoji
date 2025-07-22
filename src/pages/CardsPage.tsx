import React, { useState, useEffect } from 'react';
import { CreditCard, Star, Lock, TrendingUp, Coins, Zap, Trophy } from 'lucide-react';

interface Card {
  id: string;
  name: string;
  emoji: string;
  baseProfit: number;
  baseCost: number;
  level: number;
  maxLevel: number;
  category: string;
  unlockRequirement?: {
    cardId: string;
    level: number;
  };
  description: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

interface CardsPageProps {
  coins: number;
  cards: Card[];
  onPurchaseCard: (cardId: string) => void;
  onUpgradeCard: (cardId: string) => void;
}

const CardsPage: React.FC<CardsPageProps> = ({ coins, cards, onPurchaseCard, onUpgradeCard }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userCards, setUserCards] = useState<Card[]>([]);

  const categories = [
    { id: 'all', name: 'All Cards', emoji: '🃏' },
    { id: 'business', name: 'Business', emoji: '💼' },
    { id: 'tech', name: 'Technology', emoji: '💻' },
    { id: 'entertainment', name: 'Entertainment', emoji: '🎬' },
    { id: 'food', name: 'Food & Drink', emoji: '🍕' },
    { id: 'transport', name: 'Transport', emoji: '🚗' },
    { id: 'special', name: 'Special', emoji: '⭐' }
  ];

  const allCards: Card[] = [
    // Business Cards (Common)
    { id: 'coffee-shop', name: 'Coffee Shop', emoji: '☕', baseProfit: 100, baseCost: 1000, level: 0, maxLevel: 25, category: 'business', description: 'A cozy coffee shop generating steady income', rarity: 'Common' },
    { id: 'pizza-place', name: 'Pizza Place', emoji: '🍕', baseProfit: 250, baseCost: 2500, level: 0, maxLevel: 25, category: 'food', description: 'Popular pizza restaurant with high profits', rarity: 'Common' },
    { id: 'taxi-service', name: 'Taxi Service', emoji: '🚕', baseProfit: 500, baseCost: 5000, level: 0, maxLevel: 25, category: 'transport', description: 'City taxi service with growing demand', rarity: 'Common' },
    { id: 'bakery', name: 'Bakery', emoji: '🥖', baseProfit: 300, baseCost: 3000, level: 0, maxLevel: 25, category: 'food', description: 'Fresh bread and pastries daily', rarity: 'Common' },
    { id: 'flower-shop', name: 'Flower Shop', emoji: '🌸', baseProfit: 200, baseCost: 2000, level: 0, maxLevel: 25, category: 'business', description: 'Beautiful flowers for all occasions', rarity: 'Common' },
    
    // Tech Cards (Rare)
    { id: 'smartphone', name: 'Smartphone Factory', emoji: '📱', baseProfit: 1000, baseCost: 10000, level: 0, maxLevel: 25, category: 'tech', description: 'High-tech smartphone manufacturing', rarity: 'Rare', unlockRequirement: { cardId: 'coffee-shop', level: 5 } },
    { id: 'laptop', name: 'Laptop Store', emoji: '💻', baseProfit: 2000, baseCost: 20000, level: 0, maxLevel: 25, category: 'tech', description: 'Premium laptop retail business', rarity: 'Rare', unlockRequirement: { cardId: 'smartphone', level: 3 } },
    { id: 'gaming-pc', name: 'Gaming PC Builder', emoji: '🖥️', baseProfit: 1500, baseCost: 15000, level: 0, maxLevel: 25, category: 'tech', description: 'Custom gaming computers', rarity: 'Rare', unlockRequirement: { cardId: 'laptop', level: 2 } },
    { id: 'vr-headset', name: 'VR Headset Store', emoji: '🥽', baseProfit: 2500, baseCost: 25000, level: 0, maxLevel: 25, category: 'tech', description: 'Virtual reality equipment', rarity: 'Rare', unlockRequirement: { cardId: 'gaming-pc', level: 3 } },
    { id: 'drone-shop', name: 'Drone Shop', emoji: '🚁', baseProfit: 1800, baseCost: 18000, level: 0, maxLevel: 25, category: 'tech', description: 'Professional and hobby drones', rarity: 'Rare' },
    
    // Entertainment Cards (Epic)
    { id: 'cinema', name: 'Movie Theater', emoji: '🎬', baseProfit: 1500, baseCost: 15000, level: 0, maxLevel: 25, category: 'entertainment', description: 'Popular movie theater chain', rarity: 'Epic' },
    { id: 'gaming-arcade', name: 'Gaming Arcade', emoji: '🎮', baseProfit: 3000, baseCost: 30000, level: 0, maxLevel: 25, category: 'entertainment', description: 'Retro gaming arcade with modern games', rarity: 'Epic', unlockRequirement: { cardId: 'cinema', level: 5 } },
    { id: 'concert-hall', name: 'Concert Hall', emoji: '🎵', baseProfit: 4000, baseCost: 40000, level: 0, maxLevel: 25, category: 'entertainment', description: 'Live music venue', rarity: 'Epic', unlockRequirement: { cardId: 'gaming-arcade', level: 3 } },
    { id: 'theme-park', name: 'Theme Park', emoji: '🎡', baseProfit: 5000, baseCost: 50000, level: 0, maxLevel: 25, category: 'entertainment', description: 'Family fun destination', rarity: 'Epic', unlockRequirement: { cardId: 'concert-hall', level: 5 } },
    { id: 'casino', name: 'Casino', emoji: '🎰', baseProfit: 6000, baseCost: 60000, level: 0, maxLevel: 25, category: 'entertainment', description: 'High-stakes gambling venue', rarity: 'Epic', unlockRequirement: { cardId: 'theme-park', level: 3 } },
    
    // Food & Drink (Common to Rare)
    { id: 'ice-cream', name: 'Ice Cream Truck', emoji: '🍦', baseProfit: 400, baseCost: 4000, level: 0, maxLevel: 25, category: 'food', description: 'Mobile ice cream business', rarity: 'Common' },
    { id: 'sushi-bar', name: 'Sushi Bar', emoji: '🍣', baseProfit: 800, baseCost: 8000, level: 0, maxLevel: 25, category: 'food', description: 'Fresh sushi and Japanese cuisine', rarity: 'Rare', unlockRequirement: { cardId: 'pizza-place', level: 3 } },
    { id: 'burger-joint', name: 'Burger Joint', emoji: '🍔', baseProfit: 600, baseCost: 6000, level: 0, maxLevel: 25, category: 'food', description: 'Gourmet burgers and fries', rarity: 'Common' },
    { id: 'wine-bar', name: 'Wine Bar', emoji: '🍷', baseProfit: 1200, baseCost: 12000, level: 0, maxLevel: 25, category: 'food', description: 'Premium wines and cocktails', rarity: 'Rare', unlockRequirement: { cardId: 'sushi-bar', level: 2 } },
    { id: 'food-truck', name: 'Food Truck', emoji: '🚚', baseProfit: 700, baseCost: 7000, level: 0, maxLevel: 25, category: 'food', description: 'Mobile gourmet food service', rarity: 'Common' },
    
    // Transport (Common to Epic)
    { id: 'bus-service', name: 'Bus Service', emoji: '🚌', baseProfit: 800, baseCost: 8000, level: 0, maxLevel: 25, category: 'transport', description: 'Public transportation service', rarity: 'Common' },
    { id: 'bike-rental', name: 'Bike Rental', emoji: '🚲', baseProfit: 300, baseCost: 3000, level: 0, maxLevel: 25, category: 'transport', description: 'Eco-friendly bike sharing', rarity: 'Common' },
    { id: 'helicopter', name: 'Helicopter Tours', emoji: '🚁', baseProfit: 3000, baseCost: 30000, level: 0, maxLevel: 25, category: 'transport', description: 'Scenic helicopter rides', rarity: 'Epic', unlockRequirement: { cardId: 'taxi-service', level: 10 } },
    { id: 'yacht-charter', name: 'Yacht Charter', emoji: '🛥️', baseProfit: 4000, baseCost: 40000, level: 0, maxLevel: 25, category: 'transport', description: 'Luxury yacht rentals', rarity: 'Epic', unlockRequirement: { cardId: 'helicopter', level: 5 } },
    { id: 'private-jet', name: 'Private Jet', emoji: '✈️', baseProfit: 8000, baseCost: 80000, level: 0, maxLevel: 25, category: 'transport', description: 'Executive air travel', rarity: 'Epic', unlockRequirement: { cardId: 'yacht-charter', level: 5 } },
    
    // Special Cards (Legendary)
    { id: 'rocket', name: 'Space Program', emoji: '🚀', baseProfit: 10000, baseCost: 100000, level: 0, maxLevel: 10, category: 'special', description: 'Exclusive space exploration program', rarity: 'Legendary', unlockRequirement: { cardId: 'laptop', level: 10 } },
    { id: 'diamond-mine', name: 'Diamond Mine', emoji: '💎', baseProfit: 25000, baseCost: 250000, level: 0, maxLevel: 10, category: 'special', description: 'Rare diamond mining operation', rarity: 'Legendary', unlockRequirement: { cardId: 'rocket', level: 5 } },
    { id: 'golden-palace', name: 'Golden Palace', emoji: '🏰', baseProfit: 50000, baseCost: 500000, level: 0, maxLevel: 5, category: 'special', description: 'Ultimate luxury palace investment', rarity: 'Legendary', unlockRequirement: { cardId: 'diamond-mine', level: 5 } },
    { id: 'crypto-farm', name: 'Crypto Farm', emoji: '⚡', baseProfit: 15000, baseCost: 150000, level: 0, maxLevel: 15, category: 'special', description: 'Cryptocurrency mining operation', rarity: 'Legendary', unlockRequirement: { cardId: 'gaming-pc', level: 15 } },
    { id: 'ai-company', name: 'AI Company', emoji: '🤖', baseProfit: 30000, baseCost: 300000, level: 0, maxLevel: 10, category: 'special', description: 'Artificial intelligence research', rarity: 'Legendary', unlockRequirement: { cardId: 'crypto-farm', level: 8 } }
  ];

  useEffect(() => {
    // Initialize user cards from localStorage or default
    const savedCards = localStorage.getItem('emoji_kombat_cards');
    if (savedCards) {
      setUserCards(JSON.parse(savedCards));
    } else {
      setUserCards(allCards);
    }
  }, []);

  useEffect(() => {
    // Save cards to localStorage whenever they change
    localStorage.setItem('emoji_kombat_cards', JSON.stringify(userCards));
  }, [userCards]);

  const filteredCards = selectedCategory === 'all' 
    ? userCards 
    : userCards.filter(card => card.category === selectedCategory);

  const isCardUnlocked = (card: Card) => {
    if (!card.unlockRequirement) return true;
    const requiredCard = userCards.find(c => c.id === card.unlockRequirement!.cardId);
    return requiredCard && requiredCard.level >= card.unlockRequirement.level;
  };

  const getCardCost = (card: Card) => {
    return Math.floor(card.baseCost * Math.pow(1.15, card.level));
  };

  const getCardProfit = (card: Card) => {
    return Math.floor(card.baseProfit * Math.pow(1.1, card.level));
  };

  const handlePurchaseCard = (cardId: string) => {
    const card = userCards.find(c => c.id === cardId);
    if (!card || !isCardUnlocked(card)) return;
    
    const cost = getCardCost(card);
    if (coins >= cost) {
      setUserCards(prev => prev.map(c => 
        c.id === cardId 
          ? { ...c, level: c.level + 1 }
          : c
      ));
      onPurchaseCard(cardId);
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-400 bg-gray-400/20';
      case 'Rare': return 'text-blue-400 bg-blue-400/20';
      case 'Epic': return 'text-purple-400 bg-purple-400/20';
      case 'Legendary': return 'text-yellow-400 bg-yellow-400/20';
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

  const totalHourlyProfit = userCards
    .filter(c => c.level > 0)
    .reduce((sum, c) => sum + getCardProfit(c), 0);

  const ownedCards = userCards.filter(c => c.level > 0).length;
  const unlockedCards = userCards.filter(c => isCardUnlocked(c)).length;
  const lockedCards = userCards.filter(c => !isCardUnlocked(c)).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <div className="flex items-center gap-3 mb-4">
          <CreditCard className="w-8 h-8 text-purple-400" />
          <div>
            <h1 className="text-3xl font-bold text-white">Emoji Cards</h1>
            <p className="text-white/60">Purchase and upgrade cards to boost your hourly profits!</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-white/60">Your Balance:</span>
              <span className="text-2xl font-bold text-yellow-400">{formatNumber(coins)} $EMOJI</span>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-white/60">Hourly Profit:</span>
              <span className="text-2xl font-bold text-green-400">+{formatNumber(totalHourlyProfit)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                selectedCategory === category.id
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              <span>{category.emoji}</span>
              <span className="text-sm">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCards.map((card) => {
          const isUnlocked = isCardUnlocked(card);
          const cost = getCardCost(card);
          const profit = getCardProfit(card);
          const canAfford = coins >= cost;
          const isMaxLevel = card.level >= card.maxLevel;

          return (
            <div
              key={card.id}
              className={`bg-white/10 backdrop-blur-lg rounded-xl p-4 border transition-all ${
                isUnlocked
                  ? 'border-white/20 hover:bg-white/20'
                  : 'border-red-500/30 opacity-60'
              }`}
            >
              <div className="text-center mb-4">
                <div className="text-4xl mb-2 relative">
                  {card.emoji}
                  {!isUnlocked && (
                    <Lock className="absolute -top-1 -right-1 w-4 h-4 text-red-400" />
                  )}
                </div>
                <h3 className="font-bold text-white text-sm">{card.name}</h3>
                <p className="text-xs text-white/60 mt-1 line-clamp-2">{card.description}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">Level:</span>
                  <span className="text-white font-bold">{card.level}/{card.maxLevel}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">Profit/hr:</span>
                  <span className="text-green-400 font-bold">+{formatNumber(profit)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">Rarity:</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getRarityColor(card.rarity)}`}>
                    {card.rarity}
                  </span>
                </div>

                {!isMaxLevel && (
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">Cost:</span>
                    <span className="text-yellow-400 font-bold">{formatNumber(cost)}</span>
                  </div>
                )}

                {card.unlockRequirement && !isUnlocked && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-2">
                    <div className="text-red-400 text-xs text-center">
                      Requires {allCards.find(c => c.id === card.unlockRequirement!.cardId)?.name} Level {card.unlockRequirement.level}
                    </div>
                  </div>
                )}

                {isUnlocked && !isMaxLevel && (
                  <button
                    onClick={() => handlePurchaseCard(card.id)}
                    disabled={!canAfford}
                    className={`w-full py-2 rounded-lg font-bold transition-all ${
                      canAfford
                        ? 'bg-purple-500 hover:bg-purple-600 text-white'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {card.level === 0 ? 'Purchase' : 'Upgrade'}
                  </button>
                )}

                {isMaxLevel && (
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-2">
                    <div className="text-green-400 text-sm text-center font-bold">
                      MAX LEVEL
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats Summary */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-white mb-4">Portfolio Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <TrendingUp className="w-6 h-6 mx-auto mb-1 text-green-400" />
            <div className="text-lg font-bold text-white">
              {formatNumber(totalHourlyProfit)}
            </div>
            <div className="text-xs text-white/60">Total Profit/hr</div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <CreditCard className="w-6 h-6 mx-auto mb-1 text-purple-400" />
            <div className="text-lg font-bold text-white">
              {ownedCards}
            </div>
            <div className="text-xs text-white/60">Owned Cards</div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <Star className="w-6 h-6 mx-auto mb-1 text-yellow-400" />
            <div className="text-lg font-bold text-white">
              {unlockedCards}
            </div>
            <div className="text-xs text-white/60">Unlocked</div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <Lock className="w-6 h-6 mx-auto mb-1 text-red-400" />
            <div className="text-lg font-bold text-white">
              {lockedCards}
            </div>
            <div className="text-xs text-white/60">Locked</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsPage;