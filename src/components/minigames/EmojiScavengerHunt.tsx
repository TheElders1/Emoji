import React, { useState, useEffect } from 'react';
import { CheckCircle, RotateCcw, Star, Search, MapPin } from 'lucide-react';

interface ScavengerItem {
  emoji: string;
  name: string;
  description: string;
  found: boolean;
  points: number;
}

interface EmojiScavengerHuntProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const EmojiScavengerHunt: React.FC<EmojiScavengerHuntProps> = ({ onComplete, onClose }) => {
  const [items, setItems] = useState<ScavengerItem[]>([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [foundCount, setFoundCount] = useState(0);

  const scavengerItems: ScavengerItem[] = [
    { emoji: '🌟', name: 'Star', description: 'Something that shines bright', found: false, points: 100 },
    { emoji: '🎯', name: 'Target', description: 'Something you aim for', found: false, points: 120 },
    { emoji: '🔥', name: 'Fire', description: 'Something hot and bright', found: false, points: 110 },
    { emoji: '💎', name: 'Diamond', description: 'Something precious and rare', found: false, points: 150 },
    { emoji: '🌈', name: 'Rainbow', description: 'Something colorful after rain', found: false, points: 130 },
    { emoji: '🎪', name: 'Circus', description: 'Place of entertainment and fun', found: false, points: 140 },
    { emoji: '🚀', name: 'Rocket', description: 'Something that goes to space', found: false, points: 160 },
    { emoji: '🏆', name: 'Trophy', description: 'Symbol of victory', found: false, points: 170 },
    { emoji: '🎭', name: 'Theater', description: 'Place for drama and performance', found: false, points: 125 },
    { emoji: '🔮', name: 'Crystal Ball', description: 'Something mystical and magical', found: false, points: 180 }
  ];

  useEffect(() => {
    setItems([...scavengerItems].sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !gameComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 || foundCount === items.length) {
      setGameComplete(true);
    }
  }, [timeLeft, gameComplete, foundCount, items.length]);

  const handleItemFound = (index: number) => {
    if (items[index].found) return;

    const newItems = [...items];
    newItems[index].found = true;
    setItems(newItems);
    setScore(score + newItems[index].points);
    setFoundCount(foundCount + 1);
  };

  const resetGame = () => {
    setItems([...scavengerItems].sort(() => Math.random() - 0.5));
    setScore(0);
    setGameComplete(false);
    setTimeLeft(180);
    setFoundCount(0);
  };

  if (gameComplete) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-white mb-4">Hunt Complete!</h2>
          <div className="text-4xl font-bold text-yellow-400 mb-4">{score} Points</div>
          <p className="text-white/60 mb-6">
            You found {foundCount}/{items.length} items!
          </p>
          <div className="flex gap-3">
            <button
              onClick={resetGame}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Hunt Again
            </button>
            <button
              onClick={() => {
                onComplete(score);
                onClose();
              }}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Claim Reward
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-2xl w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Emoji Scavenger Hunt</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-green-400" />
              <span className="text-white">Found: {foundCount}/{items.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold">{score}</span>
            </div>
          </div>

          <div className="text-white/60 mb-4">⏱️ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>

          <div className="w-full bg-white/20 rounded-full h-2 mb-6">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(timeLeft / 180) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => handleItemFound(index)}
              disabled={item.found}
              className={`p-3 rounded-lg border transition-all duration-200 ${
                item.found
                  ? 'bg-green-500/20 border-green-500 scale-95'
                  : 'bg-white/10 border-white/20 hover:bg-white/20 hover:scale-105'
              }`}
            >
              <div className="text-3xl mb-2">{item.emoji}</div>
              <div className="text-xs text-white font-bold mb-1">{item.name}</div>
              <div className="text-xs text-white/60 mb-2">{item.description}</div>
              <div className="text-xs text-yellow-400">+{item.points}</div>
              {item.found && (
                <CheckCircle className="w-4 h-4 text-green-400 mx-auto mt-1" />
              )}
            </button>
          ))}
        </div>

        <div className="mt-6 text-center text-white/60 text-sm">
          Find all the emoji items by clicking on them!
        </div>
      </div>
    </div>
  );
};

export default EmojiScavengerHunt;