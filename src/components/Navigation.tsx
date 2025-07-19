import React from 'react';
import { GameState } from '../types/game';

interface NavigationProps {
  currentPage: GameState['currentPage'];
  onPageChange: (page: GameState['currentPage']) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'tap' as const, label: 'Tap & Earn', emoji: '😎' },
    { id: 'minigames' as const, label: 'Mini Games', emoji: '🎮' },
    { id: 'tasks' as const, label: 'Tasks', emoji: '📋' },
    { id: 'rank' as const, label: 'Rank', emoji: '🏆' },
    { id: 'war' as const, label: 'War', emoji: '⚔️' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/30 backdrop-blur-lg border-t border-white/20 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all duration-200 ${
                currentPage === item.id
                  ? 'bg-white/20 text-white scale-105'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;