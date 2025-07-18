import React, { useState, useEffect } from 'react';
import { Coins } from 'lucide-react';

interface CoinTapperProps {
  coins: number;
  coinsPerTap: number;
  onTap: () => void;
}

interface FloatingCoin {
  id: number;
  x: number;
  y: number;
  value: number;
}

const CoinTapper: React.FC<CoinTapperProps> = ({ coins, coinsPerTap, onTap }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [floatingCoins, setFloatingCoins] = useState<FloatingCoin[]>([]);
  const [tapCount, setTapCount] = useState(0);

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
      value: coinsPerTap
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
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 text-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-3xl" />
      
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
            +{coin.value}
          </div>
        </div>
      ))}
      
      <div className="relative z-20">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          {formatNumber(coins)} $EMOJI
        </h2>
        <p className="text-white/60 mb-8">Tap to earn coins!</p>
        
        <div className="flex justify-center mb-8">
          <button
            onClick={handleTap}
            className={`relative w-64 h-64 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-2xl transform transition-all duration-150 hover:scale-105 active:scale-95 ${
              isPressed ? 'scale-95 shadow-lg' : 'shadow-2xl'
            }`}
            style={{
              filter: 'drop-shadow(0 0 20px rgba(255, 193, 7, 0.5))'
            }}
          >
            <div className="absolute inset-4 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center">
              <Coins className="w-20 h-20 text-white drop-shadow-lg" />
            </div>
            
            {/* Pulse effect */}
            <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 ${
              isPressed ? 'animate-ping' : ''
            }`} />
          </button>
        </div>
        
        <div className="flex items-center justify-center gap-4 text-white/80">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">+{coinsPerTap}</div>
            <div className="text-sm">per tap</div>
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