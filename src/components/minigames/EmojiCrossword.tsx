import React, { useState, useEffect } from 'react';
import { CheckCircle, RotateCcw, Star, Grid3X3 } from 'lucide-react';

interface CrosswordClue {
  id: number;
  emoji: string;
  answer: string;
  clue: string;
  direction: 'across' | 'down';
  startRow: number;
  startCol: number;
  solved: boolean;
}

interface EmojiCrosswordProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const EmojiCrossword: React.FC<EmojiCrosswordProps> = ({ onComplete, onClose }) => {
  const [clues] = useState<CrosswordClue[]>([
    { id: 1, emoji: '🌞', answer: 'SUN', clue: 'Bright star in our sky', direction: 'across', startRow: 0, startCol: 0, solved: false },
    { id: 2, emoji: '🐱', answer: 'CAT', clue: 'Feline pet', direction: 'down', startRow: 0, startCol: 2, solved: false },
    { id: 3, emoji: '🏠', answer: 'HOME', clue: 'Where you live', direction: 'across', startRow: 2, startCol: 0, solved: false },
    { id: 4, emoji: '🌊', answer: 'SEA', clue: 'Large body of water', direction: 'down', startRow: 1, startCol: 1, solved: false },
    { id: 5, emoji: '🎵', answer: 'MUSIC', clue: 'Sounds in harmony', direction: 'across', startRow: 4, startCol: 0, solved: false }
  ]);

  const [grid, setGrid] = useState<string[][]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    initializeGrid();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !gameComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameComplete(true);
    }
  }, [timeLeft, gameComplete]);

  const initializeGrid = () => {
    const newGrid = Array(6).fill(null).map(() => Array(6).fill(''));
    setGrid(newGrid);
  };

  const handleAnswerSubmit = (clueId: number, answer: string) => {
    const clue = clues.find(c => c.id === clueId);
    if (!clue) return;

    setUserAnswers(prev => ({ ...prev, [clueId]: answer }));

    if (answer.toUpperCase() === clue.answer) {
      const points = clue.answer.length * 50;
      setScore(score + points);
      
      // Check if all clues are solved
      const allSolved = clues.every(c => 
        c.id === clueId || userAnswers[c.id]?.toUpperCase() === c.answer
      );
      
      if (allSolved) {
        setGameComplete(true);
      }
    }
  };

  const resetGame = () => {
    setUserAnswers({});
    setScore(0);
    setGameComplete(false);
    setTimeLeft(300);
    initializeGrid();
  };

  if (gameComplete) {
    const solvedCount = clues.filter(clue => 
      userAnswers[clue.id]?.toUpperCase() === clue.answer
    ).length;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-md w-full text-center">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-white mb-4">Crossword Complete!</h2>
          <div className="text-4xl font-bold text-yellow-400 mb-4">{score} Points</div>
          <p className="text-white/60 mb-6">
            You solved {solvedCount}/{clues.length} clues!
          </p>
          <div className="flex gap-3">
            <button
              onClick={resetGame}
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
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-4xl w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Emoji Crossword</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Crossword Grid */}
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Grid3X3 className="w-5 h-5 text-blue-400" />
                <span className="text-blue-400">Crossword Grid</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 font-bold">{score}</span>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-1 mb-4">
              {Array(36).fill(null).map((_, index) => {
                const row = Math.floor(index / 6);
                const col = index % 6;
                const isActive = clues.some(clue => {
                  if (clue.direction === 'across') {
                    return row === clue.startRow && col >= clue.startCol && col < clue.startCol + clue.answer.length;
                  } else {
                    return col === clue.startCol && row >= clue.startRow && row < clue.startRow + clue.answer.length;
                  }
                });

                return (
                  <div
                    key={index}
                    className={`w-8 h-8 border ${
                      isActive ? 'bg-white/20 border-white/40' : 'bg-white/5 border-white/10'
                    } flex items-center justify-center text-xs`}
                  >
                    {isActive && (
                      <span className="text-white/60">{row},{col}</span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-center text-white/60">
              ⏱️ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
          </div>

          {/* Clues */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Clues</h3>
            {clues.map((clue) => {
              const isCorrect = userAnswers[clue.id]?.toUpperCase() === clue.answer;
              return (
                <div
                  key={clue.id}
                  className={`p-3 rounded-lg border ${
                    isCorrect ? 'bg-green-500/20 border-green-500' : 'bg-white/10 border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{clue.emoji}</span>
                    <div className="flex-1">
                      <div className="text-white font-bold">
                        {clue.id}. {clue.clue} ({clue.direction})
                      </div>
                      <div className="text-white/60 text-sm">
                        {clue.answer.length} letters
                      </div>
                    </div>
                    {isCorrect && <CheckCircle className="w-5 h-5 text-green-400" />}
                  </div>
                  
                  <input
                    type="text"
                    value={userAnswers[clue.id] || ''}
                    onChange={(e) => setUserAnswers(prev => ({ ...prev, [clue.id]: e.target.value }))}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAnswerSubmit(clue.id, e.currentTarget.value);
                      }
                    }}
                    placeholder={`Enter ${clue.answer.length} letter word`}
                    className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white placeholder-white/40"
                    disabled={isCorrect}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmojiCrossword;