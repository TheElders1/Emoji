import React, { useState, useEffect } from 'react';
import { CreditCard, Star, Lock, TrendingUp, Coins } from 'lucide-react';

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
}

interface CardsPageProps {
  coins: number;
  cards: Card[];
  onPurchaseCard: (cardId: string) => void;
  onUpgradeCard: (cardId: string) => void;
}

const CardsPage: React.FC<CardsPageProps> = ({ coins, cards, onPurchaseCard, onUpgradeCard }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Cards', emoji: '🎴' },
    { id: 'business', name: 'Business', emoji: '💼' },
    { id: 'tech', name: 'Technology', emoji: '💻' },
    { id: 'entertainment', name: 'Entertainment', emoji: '🎬' },
    { id: 'food', name: 'Food & Drink', emoji: '🍕' },
    { id: 'transport', name: 'Transport', emoji: '🚗' },
    { id: 'special', name: 'Special', emoji: '⭐' }
  ];

  const mockCards: Card[] = [
    // Business Cards
    { id: 'coffee-shop', name: 'Coffee Shop', emoji: '☕', baseProfit: 100, baseCost: 1000, level: 0, maxLevel: 25, category: 'business', description: 'A cozy coffee shop generating steady income' },
    { id: 'pizza-place', name: 'Pizza Place', emoji: '🍕', baseProfit: 250, baseCost: 2500, level: 0, maxLevel: 25, category: 'food', description: 'Popular pizza restaurant with high profits' },
    { id: 'taxi-service', name: 'Taxi Service', emoji: '🚕', baseProfit: 500, baseCost: 5000, level: 0, maxLevel: 25, category: 'transport', description: 'City taxi service with growing demand' },
    
    // Tech Cards
    { id: 'smartphone', name: 'Smartphone Factory', emoji: '📱', baseProfit: 1000, baseCost: 10000, level: 0, maxLevel: 25, category: 'tech', description: 'High-tech smartphone manufacturing', unlockRequirement: { cardId: 'coffee-shop', level: 5 } },
    { id: 'laptop', name: 'Laptop Store', emoji: '💻', baseProfit: 2000, baseCost: 20000, level: 0, maxLevel: 25, category: 'tech', description: 'Premium laptop retail business', unlockRequirement: { cardId: 'smartphone', level: 3 } },
    
    // Entertainment Cards
    { id: 'cinema', name: 'Movie Theater', emoji: '🎬', baseProfit: 1500, baseCost: 15000, level: 0, maxLevel: 25, category: 'entertainment', description: 'Popular movie theater chain' },
    { id: 'gaming-arcade', name: 'Gaming Arcade', emoji: '🎮', baseProfit: 3000, baseCost: 30000, level: 0, maxLevel: 25, category: 'entertainment', description: 'Retro gaming arcade with modern games', unlockRequirement: { cardId: 'cinema', level: 5 } },
    
    // Special Cards
    { id: 'rocket', name: 'Space Program', emoji: '🚀', baseProfit: 10000, baseCost: 100000, level: 0, maxLevel: 10, category: 'special', description: 'Exclusive space exploration program', unlockRequirement: { cardId: 'laptop', level: 10 } },
    { id: 'diamond-mine', name: 'Diamond Mine', emoji: '💎', baseProfit: 25000, baseCost: 250000, level: 0, maxLevel: 10, category: 'special', description: 'Rare diamond mining operation', unlockRequirement: { cardId: 'rocket', level: 5 } },
    { id: 'golden-palace', name: 'Golden Palace', emoji: '🏰', baseProfit: 50000, baseCost: 500000, level: 0, maxLevel: 5, category: 'special', description: 'Ultimate luxury palace investment', unlockRequirement: { cardId: 'diamond-mine', level: 5 } }
  ];

  const filteredCards = selectedCategory === 'all' 
    ? mockCards 
    : mockCards.filter(card => card.category === selectedCategory);

  const isCardUnlocked = (card: Card) => {
    if (!card.unlockRequirement) return true;
    const requiredCard = mockCards.find(c => c.id === card.unlockRequirement!.cardId);
    return requiredCard && requiredCard.level >= card.unlockRequirement.level;
  };

  const getCardCost = (card: Card) => {
    return Math.floor(card.baseCost * Math.pow(1.15, card.level));
  };

  const getCardProfit = (card: Card) => {
    return Math.floor(card.baseProfit * Math.pow(1.1, card.level));
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

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
        
        <div className="bg-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-white/60">Your Balance:</span>
            <span className="text-2xl font-bold text-yellow-400">{formatNumber(coins)} $EMOJI</span>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <h3 className="font-bold text-white">{card.name}</h3>
                <p className="text-xs text-white/60 mt-1">{card.description}</p>
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

                {!isMaxLevel && (
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">Cost:</span>
                    <span className="text-yellow-400 font-bold">{formatNumber(cost)}</span>
                  </div>
                )}

                {card.unlockRequirement && !isUnlocked && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-2">
                    <div className="text-red-400 text-xs text-center">
                      Requires {mockCards.find(c => c.id === card.unlockRequirement!.cardId)?.name} Level {card.unlockRequirement.level}
                    </div>
                  </div>
                )}

                {isUnlocked && !isMaxLevel && (
                  <button
                    onClick={() => card.level === 0 ? onPurchaseCard(card.id) : onUpgradeCard(card.id)}
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
              {formatNumber(mockCards.filter(c => c.level > 0).reduce((sum, c) => sum + getCardProfit(c), 0))}
            </div>
            <div className="text-xs text-white/60">Total Profit/hr</div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <CreditCard className="w-6 h-6 mx-auto mb-1 text-purple-400" />
            <div className="text-lg font-bold text-white">
              {mockCards.filter(c => c.level > 0).length}
            </div>
            <div className="text-xs text-white/60">Owned Cards</div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <Star className="w-6 h-6 mx-auto mb-1 text-yellow-400" />
            <div className="text-lg font-bold text-white">
              {mockCards.filter(c => isCardUnlocked(c)).length}
            </div>
            <div className="text-xs text-white/60">Unlocked</div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <Lock className="w-6 h-6 mx-auto mb-1 text-red-400" />
            <div className="text-lg font-bold text-white">
              {mockCards.filter(c => !isCardUnlocked(c)).length}
            </div>
            <div className="text-xs text-white/60">Locked</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsPage;