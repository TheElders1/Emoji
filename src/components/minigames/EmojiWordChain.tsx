import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, Star, Link, Zap } from 'lucide-react';

interface WordChainRound {
  startEmoji: string;
  startWord: string;
  validChains: string[][];
  category: string;
}

interface EmojiWordChainProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const EmojiWordChain: React.FC<EmojiWordChainProps> = ({ onComplete, onClose }) => {
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [userChain, setUserChain] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90);
  const [chainLength, setChainLength] = useState(0);

  const rounds: WordChainRound[] = [
    {
      startEmoji: '🌞',
      startWord: 'Sun',
      validChains: [
        ['Sun', 'Sunny', 'Yellow', 'Lemon', 'Sour'],
        ['Sun', 'Solar', 'System', 'Space', 'Stars'],
        ['Sun', 'Summer', 'Beach', 'Sand', 'Castle']
      ],
      category: 'Nature'
    },
    {
      startEmoji: '🍎',
      startWord: 'Apple',
      validChains: [
        ['Apple', 'Red', 'Rose', 'Flower', 'Garden'],
        ['Apple', 'Fruit', 'Healthy', 'Diet', 'Exercise'],
        ['Apple', 'Tree', 'Forest', 'Animals', 'Wild']
      ],
      category: 'Food'
    },
    {
      startEmoji: '🏠',
      startWord: 'House',
      validChains: [
        ['House', 'Home', 'Family', 'Love', 'Heart'],
        ['House', 'Building', 'Construction', 'Work', 'Job'],
        ['House', 'Roof', 'Rain', 'Weather', 'Storm']
      ],
      category: 'Places'
    },
    {
      startEmoji: '🎵',
      startWord: 'Music',
      validChains: [
        ['Music', 'Song', 'Singer', 'Voice', 'Sound'],
        ['Music', 'Dance', 'Party', 'Fun', 'Friends'],
        ['Music', 'Guitar', 'Strings', 'Vibration', 'Wave']
      ],
      category: 'Arts'
    },
    {
      startEmoji: '🚗',
      startWord: 'Car',
      validChains: [
        ['Car', 'Drive', 'Road', 'Journey', 'Adventure'],
        ['Car', 'Speed', 'Fast', 'Racing', 'Competition'],
        ['Car', 'Wheels', 'Round', 'Circle', 'Shape']
      ],
      category: 'Transport'
    }
  ];

  useEffect(() => {
    if (timeLeft > 0 && !showResult && !gameComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleSubmit();
    }
  }, [timeLeft, showResult, gameComplete]);

  const addToChain = () => {
    if (currentInput.trim()) {
      const newChain = [...userChain, currentInput.trim()];
      setUserChain(newChain);
      setCurrentInput('');
      setChainLength(newChain.length);
    }
  };

  const removeFromChain = (index: number) => {
    const newChain = userChain.filter((_, i) => i !== index);
    setUserChain(newChain);
    setChainLength(newChain.length);
  };

  const handleSubmit = () => {
    setShowResult(true);
    
    const currentRoundData = rounds[currentRound];
    let points = 0;
    
    // Base points for chain length
    points += userChain.length * 20;
    
    // Bonus for logical connections (simplified check)
    let connectionBonus = 0;
    for (let i = 0; i < userChain.length - 1; i++) {
      // Simple connection check - if words share letters or are related
      const word1 = userChain[i].toLowerCase();
      const word2 = userChain[i + 1].toLowerCase();
      if (word1.length > 2 && word2.length > 2) {
        connectionBonus += 10;
      }
    }
    
    points += connectionBonus;
    
    // Time bonus
    const timeBonus = timeLeft * 1;
    points += timeBonus;
    
    // Length bonus
    if (userChain.length >= 5) points += 50;
    if (userChain.length >= 8) points += 100;
    
    setScore(score + points);

    setTimeout(() => {
      if (currentRound < rounds.length - 1) {
        setCurrentRound(currentRound + 1);
        setUserChain([]);
        setCurrentInput('');
        setShowResult(false);
        setTimeLeft(90);
        setChainLength(0);
      } else {
        setGameComplete(true);
      }
    }, 3000);
  };

  const resetGame = () => {
    setCurrentRound(0);
    setScore(0);
    setUserChain([]);
    setCurrentInput('');
    setShowResult(false);
    setGameComplete(false);
    setTimeLeft(90);
    setChainLength(0);
  };

  if (gameComplete) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-md w-full text-center">
          <div className="text-6xl mb-4">⛓️</div>
          <h2 className="text-2xl font-bold text-white mb-4">Word Chain Complete!</h2>
          <div className="text-4xl font-bold text-yellow-400 mb-4">{score} Points</div>
          <p className="text-white/60 mb-6">
            You created {rounds.length} word chains!
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

  const currentRoundData = rounds[currentRound];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-2xl w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Emoji Word Chain</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/60">Round {currentRound + 1}/{rounds.length}</span>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold">{score}</span>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-6 mb-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Link className="w-6 h-6 text-green-400" />
              <span className="text-green-400">{currentRoundData.category}</span>
            </div>
            <div className="text-4xl mb-3">{currentRoundData.startEmoji}</div>
            <div className="text-2xl font-bold text-white mb-2">Start with: {currentRoundData.startWord}</div>
            <div className="text-sm text-white/60">Create a chain of related words!</div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-400" />
              <span className="text-orange-400">Chain: {chainLength}</span>
            </div>
            <div className="text-white/60">⏱️ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>
          </div>

          <div className="w-full bg-white/20 rounded-full h-2 mb-6">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(timeLeft / 90) * 100}%` }}
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="bg-white/10 rounded-lg p-4 mb-4 min-h-[120px]">
            <div className="text-white/60 text-sm mb-2">Your Word Chain:</div>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-500/20 px-3 py-1 rounded-full text-blue-400 border border-blue-500/30">
                {currentRoundData.startWord}
              </span>
              {userChain.map((word, index) => (
                <button
                  key={index}
                  onClick={() => removeFromChain(index)}
                  className="bg-green-500/20 px-3 py-1 rounded-full text-green-400 border border-green-500/30 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                >
                  {word} ×
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addToChain()}
              placeholder="Enter next word in chain..."
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40"
              disabled={showResult}
            />
            <button
              onClick={addToChain}
              disabled={!currentInput.trim() || showResult}
              className="bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        {!showResult && (
          <button
            onClick={handleSubmit}
            disabled={userChain.length < 2}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors"
          >
            Submit Chain (Min 2 words)
          </button>
        )}

        {showResult && (
          <div className="text-center">
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-4">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-green-400 font-bold mb-2">Great word chain!</div>
              <div className="text-white/60 text-sm">
                Chain length: {userChain.length} words
                <br />
                +{userChain.length * 20 + (userChain.length - 1) * 10 + timeLeft * 1 + (userChain.length >= 5 ? 50 : 0) + (userChain.length >= 8 ? 100 : 0)} points
              </div>
            </div>
          </div>
        )}

        <div className="text-center text-white/60 text-xs">
          Create a chain where each word relates to the previous one!
        </div>
      </div>
    </div>
  );
};

export default EmojiWordChain;