import React, { useState, useEffect } from 'react';
import { X, Star, Clock, Calculator } from 'lucide-react';

interface EmojiEquationSolverProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const EmojiEquationSolver: React.FC<EmojiEquationSolverProps> = ({ onComplete, onClose }) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180);
  const [gameComplete, setGameComplete] = useState(false);

  const equations = [
    {
      equations: ['🍌 + 🍌 = 8', '🍎 + 🍎 = 6', '🍌 - 🍎 = ?'],
      answer: '1',
      solution: '🍌 = 4, 🍎 = 3, so 4 - 3 = 1',
      difficulty: 'Easy'
    },
    {
      equations: ['🐶 + 🐱 = 12', '🐶 - 🐱 = 4', '🐶 × 🐱 = ?'],
      answer: '32',
      solution: '🐶 = 8, 🐱 = 4, so 8 × 4 = 32',
      difficulty: 'Medium'
    },
    {
      equations: ['🌟 + 🌙 + ⭐ = 15', '🌟 × 🌙 = 20', '🌙 - ⭐ = 1', '🌟 + ⭐ = ?'],
      answer: '9',
      solution: '🌟 = 5, 🌙 = 4, ⭐ = 3, so 5 + 3 = 8',
      difficulty: 'Hard'
    }
  ];

  useEffect(() => {
    if (timeLeft > 0 && !gameComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameComplete(true);
    }
  }, [timeLeft, gameComplete]);

  const handleSubmit = () => {
    const currentEquation = equations[currentLevel];
    if (userAnswer === currentEquation.answer) {
      const points = 300 + timeLeft * 3;
      setScore(score + points);
      
      if (currentLevel < equations.length - 1) {
        setCurrentLevel(currentLevel + 1);
        setUserAnswer('');
        setTimeLeft(180);
      } else {
        setGameComplete(true);
      }
    }
  };

  if (gameComplete) {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-3xl p-8 border border-blue-500/30 max-w-md w-full mx-4 text-center">
          <div className="text-6xl mb-4">🧩</div>
          <h2 className="text-3xl font-bold text-white mb-4">Equations Solved!</h2>
          <div className="text-4xl font-bold text-yellow-400 mb-6">{score} Points</div>
          <button
            onClick={() => onComplete(score)}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 rounded-xl transition-all duration-200 transform hover:scale-105"
          >
            Claim Reward
          </button>
        </div>
      </div>
    );
  }

  const currentEquation = equations[currentLevel];

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-3xl p-6 border border-blue-500/30 w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Calculator className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Emoji Equation Solver</h1>
              <p className="text-blue-300">Solve for the unknown values</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-red-500/20 hover:bg-red-500/30 rounded-xl flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-red-400" />
          </button>
        </div>

        {/* Game Stats */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold">{score}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <span className="text-white">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${
            currentEquation.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
            currentEquation.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {currentEquation.difficulty}
          </span>
        </div>

        {/* Equation Display */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="bg-black/30 rounded-2xl p-8 w-full max-w-2xl">
            <div className="text-center mb-8">
              <h3 className="text-xl text-white mb-6">Solve the equations:</h3>
              <div className="space-y-4 mb-8">
                {currentEquation.equations.map((eq, index) => (
                  <div key={index} className="text-2xl md:text-3xl font-mono text-blue-300 bg-black/20 rounded-xl p-4">
                    {eq}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer..."
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-center text-xl placeholder-white/40 focus:outline-none focus:border-blue-400"
              />
              
              <button
                onClick={handleSubmit}
                disabled={!userAnswer.trim()}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors"
              >
                Submit Answer
              </button>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="text-center text-white/60">
          Equation {currentLevel + 1} of {equations.length}
        </div>
      </div>
    </div>
  );
};

export default EmojiEquationSolver;