import React, { useState, useEffect } from 'react';
import { Coins } from 'lucide-react';

interface CoinTapperProps {
  coins: number;
  totalEarned: number;
  onTap: () => void;
}

interface FloatingCoin {
  id: number;
  x: number;
  y: number;
}

const CoinTapper: React.FC<CoinTapperProps> = ({ coins, totalEarned, onTap }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [floatingCoins, setFloatingCoins] = useState<FloatingCoin[]>([]);
  const [tapCount, setTapCount] = useState(0);
  
  // Get rank-based coin color
  const getRankCoinColor = (totalEarned: number) => {
    if (totalEarned >= 1000000000) return 'from-indigo-400 via-purple-500 to-pink-500'; // Lord
    if (totalEarned >= 100000000) return 'from-pink-400 to-purple-600'; // Legendary
    if (totalEarned >= 10000000) return 'from-orange-400 to-red-500'; // Grandmaster
    if (totalEarned >= 1000000) return 'from-yellow-400 to-yellow-600'; // Master
    if (totalEarned >= 100000) return 'from-purple-400 to-purple-600'; // Guru
    if (totalEarned >= 10000) return 'from-blue-400 to-blue-600'; // Pro
    if (totalEarned >= 1000) return 'from-green-400 to-green-600'; // Veteran
    return 'from-gray-400 to-gray-600'; // Rookie
  };
  
  const coinGradient = getRankCoinColor(totalEarned);

  const handleTap = (event: React.MouseEvent) => {
    onTap();
    setIsPressed(true);
    setTapCount(prev => prev + 1);
    
    // Create floating coin effect
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const newFloatingCoin: FloatingCoin = {
      id: Date.now() + Math.random(),
      x: x,
      y: y,
    };
    
    setFloatingCoins(prev => [...prev, newFloatingCoin]);
    
    setTimeout(() => setIsPressed(false), 150);
  };

  // Remove floating coins after animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setFloatingCoins([]);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [tapCount]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/20 text-center relative overflow-hidden">
      {/* Background effects */}
      <div className={`absolute inset-0 bg-gradient-to-br ${rankTheme.gradient}/10 rounded-3xl`} />
      
      {/* Floating coins */}
      {floatingCoins.map((coin) => (
        <div
          key={coin.id}
          className="absolute pointer-events-none z-10 animate-bounce"
          style={{
            left: coin.x,
            top: coin.y,
            transform: 'translate(-50%, -50%)',
            animation: 'float-up 1s ease-out forwards'
          }}
        >
          <div className="flex items-center gap-1 text-yellow-400 font-bold text-lg">
            <Coins className="w-5 h-5" />
            +1
          </div>
        </div>
      ))}
      
      <div className="relative z-20">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white">
          {formatNumber(coins)} $EMOJI
        </h2>
        <p className="text-white/60 mb-4 sm:mb-6 lg:mb-8 text-sm sm:text-base">Tap to earn coins!</p>
        
        <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8">
          <button
            onClick={handleTap}
            className={`relative w-64 h-64 rounded-full bg-gradient-to-br ${coinGradient} shadow-2xl transform transition-all duration-150 hover:scale-105 active:scale-95 ${
              isPressed ? 'scale-95 shadow-lg' : 'shadow-2xl'
            } w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64`}
          >
            <div className={`absolute inset-3 sm:inset-4 bg-gradient-to-br ${coinGradient} rounded-full flex items-center justify-center`}>
              <Coins className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 text-white drop-shadow-lg" />
            </div>
            
            {/* Pulse effect */}
            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${coinGradient} ${
              isPressed ? 'animate-ping' : ''
            }`} />
          </button>
        </div>
        
        <div className="flex items-center justify-center gap-4 text-white/80">
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-yellow-400">+1</div>
            <div className="text-xs sm:text-sm">per tap</div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float-up {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -150%) scale(1.5);
          }
        }
      `}</style>
    </div>
  );
};

export default CoinTapper;