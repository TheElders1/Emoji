import React, { useState, useEffect, useCallback } from 'react';
import { getRankTheme } from '../utils/rankThemes';

interface CoinTapperProps {
  coins: number;
  totalEarned: number;
  coinsPerTap: number;
  coinsPerSecond: number;
  onTap: () => void;
}

interface FloatingCoin {
  id: number;
  x: number;
  y: number;
}

const CoinTapper: React.FC<CoinTapperProps> = ({ 
  coins, 
  totalEarned, 
  coinsPerTap,
  coinsPerSecond,
  onTap 
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [floatingCoins, setFloatingCoins] = useState<FloatingCoin[]>([]);
  const [tapCount, setTapCount] = useState(0);
  
  const rankTheme = getRankTheme(totalEarned);

  const handleTap = useCallback((event: React.MouseEvent) => {
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
  }, [onTap]);

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
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/20 text-center relative overflow-hidden shadow-2xl">
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
            <span className="text-2xl">{rankTheme.emoji}</span>
            +{coinsPerTap}
          </div>
        </div>
      ))}
      
      <div className="relative z-20">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white">
          {formatNumber(coins)} $EMOJI
        </h2>
        <p className="text-white/60 mb-4 sm:mb-6 lg:mb-8 text-sm sm:text-base">Tap to earn coins!</p>
        
        <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8">
          <div className="relative">
            {/* Outer glow ring */}
            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${rankTheme.coinGradient} opacity-30 scale-110 animate-pulse`} />
            
            {/* Main coin button */}
            <button
              onClick={handleTap}
              className={`relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full bg-gradient-to-br ${rankTheme.coinGradient} shadow-2xl transform transition-all duration-150 hover:scale-105 active:scale-95 ${
                isPressed ? 'scale-95 shadow-lg' : 'shadow-2xl'
              } border-4 border-white/20`}
            >
              <div className={`absolute inset-3 sm:inset-4 bg-gradient-to-br ${rankTheme.coinGradient} rounded-full flex items-center justify-center border-2 border-white/10`}>
                <span className="text-6xl sm:text-7xl lg:text-8xl drop-shadow-lg">
                  {rankTheme.emoji}
                </span>
              </div>
              
              {/* Pulse effect */}
              <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${rankTheme.coinGradient} ${
                isPressed ? 'animate-ping' : ''
              }`} />
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-6 text-white/80">
          <div className="text-center bg-white/10 rounded-xl p-3 backdrop-blur-sm">
            <div className="text-xl sm:text-2xl font-bold text-yellow-400">+{coinsPerTap}</div>
            <div className="text-xs sm:text-sm">per tap</div>
          </div>
          
          <div className="text-center bg-white/10 rounded-xl p-3 backdrop-blur-sm">
            <div className="text-xl sm:text-2xl font-bold text-green-400">{formatNumber(coinsPerSecond)}</div>
            <div className="text-xs sm:text-sm">per second</div>
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