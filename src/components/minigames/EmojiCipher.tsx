import React, { useState, useEffect } from 'react';
import { X, Star, Clock, Lightbulb } from 'lucide-react';

interface EmojiCipherProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const EmojiCipher: React.FC<EmojiCipherProps> = ({ onComplete, onClose }) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [showHint, setShowHint] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const cipherLevels = [
    {
      cipher: '🦁🍎🌙🐘',
      answer: 'LOVE',
      hint: '🦁=L, 🍎=A, 🌙=O, 🐘=V, 🥚=E',
      difficulty: 'Easy'
    },
    {
      cipher: '🌟🍎🌙🐘 🥚🌙🦁🐘🌙',
      answer: 'SAVE WORLD',
      hint: 'Each emoji represents a letter',
      difficulty: 'Medium'
    },
    {
      cipher: '🔥🍎🌙🐘 🌟🥚🌙🦁🐘🌙',
      answer: 'GAME WORLD',
      hint: 'Pattern shifts by position',
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
    const currentCipher = cipherLevels[currentLevel];
    if (userAnswer.toUpperCase() === currentCipher.answer) {
      const points = 200 + timeLeft * 2;
      setScore(score + points);
      
      if (currentLevel < cipherLevels.length - 1) {
        setCurrentLevel(currentLevel + 1);
        setUserAnswer('');
        setShowHint(false);
        setTimeLeft(120);
      } else {
        setGameComplete(true);
      }
    }
  };

  if (gameComplete) {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-3xl p-8 border border-purple-500/30 max-w-md w-full mx-4 text-center">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-3xl font-bold text-white mb-4">Cipher Decoded!</h2>
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

  const currentCipher = cipherLevels[currentLevel];

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-3xl p-6 border border-purple-500/30 w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🔐</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Emoji Cipher</h1>
              <p className="text-purple-300">Decode the secret message</p>
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
            currentCipher.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
            currentCipher.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {currentCipher.difficulty}
          </span>
        </div>

        {/* Cipher Display */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="bg-black/30 rounded-2xl p-8 mb-6 w-full max-w-2xl">
            <div className="text-center mb-6">
              <h3 className="text-xl text-white mb-4">Decode this message:</h3>
              <div className="text-4xl md:text-6xl font-mono tracking-wider text-yellow-400 mb-4">
                {currentCipher.cipher}
              </div>
            </div>
            
            {showHint && (
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 font-bold">Hint:</span>
                </div>
                <p className="text-white">{currentCipher.hint}</p>
              </div>
            )}

            <div className="space-y-4">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter decoded message..."
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-center text-xl placeholder-white/40 focus:outline-none focus:border-purple-400"
              />
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowHint(true)}
                  disabled={showHint}
                  className="flex-1 bg-yellow-500/20 hover:bg-yellow-500/30 disabled:opacity-50 text-yellow-400 font-bold py-3 rounded-xl transition-colors"
                >
                  Show Hint
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!userAnswer.trim()}
                  className="flex-1 bg-purple-500 hover:bg-purple-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="text-center text-white/60">
          Level {currentLevel + 1} of {cipherLevels.length}
        </div>
      </div>
    </div>
  );
};

export default EmojiCipher;