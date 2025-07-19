import React, { useState, useEffect } from 'react';
import { RotateCcw, Star, Trophy } from 'lucide-react';

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface EmojiMemoryGameProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const EmojiMemoryGame: React.FC<EmojiMemoryGameProps> = ({ onComplete, onClose }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);

  const emojis = ['🎮', '🎯', '🎪', '🎨', '🎭', '🎪', '🎲', '🎸', '🎺', '🎻', '🎤', '🎧'];

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !gameComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameComplete(true);
    }
  }, [timeLeft, gameComplete]);

  useEffect(() => {
    if (matches === 12) {
      const bonusPoints = Math.max(0, timeLeft * 10);
      const moveBonus = Math.max(0, (50 - moves) * 20);
      const finalScore = score + bonusPoints + moveBonus;
      setScore(finalScore);
      setGameComplete(true);
    }
  }, [matches]);

  const initializeGame = () => {
    const gameEmojis = emojis.slice(0, 12);
    const duplicatedEmojis = [...gameEmojis, ...gameEmojis];
    const shuffledEmojis = duplicatedEmojis.sort(() => Math.random() - 0.5);
    
    const initialCards = shuffledEmojis.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false
    }));
    
    setCards(initialCards);
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
    setScore(0);
    setGameComplete(false);
    setTimeLeft(120);
  };

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2 || gameComplete) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);
    
    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isMatched: true }
              : c
          ));
          setMatches(matches + 1);
          setScore(score + 100);
          setFlippedCards([]);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isFlipped: false }
              : c
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  if (gameComplete) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🧠</div>
          <h2 className="text-2xl font-bold text-white mb-4">
            {matches === 12 ? 'Perfect Memory!' : 'Time\'s Up!'}
          </h2>
          <div className="text-4xl font-bold text-yellow-400 mb-4">{score} Points</div>
          <div className="space-y-2 text-white/60 mb-6">
            <p>Matches: {matches}/12</p>
            <p>Moves: {moves}</p>
            <p>Time: {120 - timeLeft}s</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={initializeGame}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Play Again
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
          <h2 className="text-2xl font-bold text-white">Emoji Memory Game</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold">{score}</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-green-400" />
              <span className="text-white">{matches}/12</span>
            </div>
            <div className="text-white/60">Moves: {moves}</div>
          </div>
          <div className="text-white/60">⏱️ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>
        </div>

        <div className="w-full bg-white/20 rounded-full h-2 mb-6">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${(timeLeft / 120) * 100}%` }}
          />
        </div>

        <div className="grid grid-cols-6 gap-3">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square rounded-lg border-2 transition-all duration-300 transform ${
                card.isMatched
                  ? 'bg-green-500/20 border-green-500 scale-95'
                  : card.isFlipped
                  ? 'bg-blue-500/20 border-blue-500'
                  : 'bg-white/10 border-white/20 hover:bg-white/20 hover:scale-105'
              }`}
            >
              <div className="text-2xl">
                {card.isFlipped || card.isMatched ? card.emoji : '❓'}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 text-center text-white/60 text-sm">
          Find all matching pairs of emojis!
        </div>
      </div>
    </div>
  );
};

export default EmojiMemoryGame;