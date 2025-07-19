import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, Star, Brain, Zap } from 'lucide-react';

interface Pattern {
  sequence: string[];
  missing: number;
  options: string[];
  answer: string;
  type: 'arithmetic' | 'alphabetical' | 'thematic' | 'color' | 'size';
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface EmojiPatternRecognitionProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const EmojiPatternRecognition: React.FC<EmojiPatternRecognitionProps> = ({ onComplete, onClose }) => {
  const [currentPattern, setCurrentPattern] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [streak, setStreak] = useState(0);

  const patterns: Pattern[] = [
    {
      sequence: ['🌑', '🌒', '🌓', '🌔', '?'],
      missing: 4,
      options: ['🌕', '🌖', '🌗', '🌘'],
      answer: '🌕',
      type: 'thematic',
      difficulty: 'Easy'
    },
    {
      sequence: ['🔴', '🟠', '🟡', '🟢', '?'],
      missing: 4,
      options: ['🔵', '🟣', '⚫', '⚪'],
      answer: '🔵',
      type: 'color',
      difficulty: 'Easy'
    },
    {
      sequence: ['1️⃣', '2️⃣', '3️⃣', '?', '5️⃣'],
      missing: 3,
      options: ['4️⃣', '6️⃣', '0️⃣', '7️⃣'],
      answer: '4️⃣',
      type: 'arithmetic',
      difficulty: 'Easy'
    },
    {
      sequence: ['🐣', '🐤', '🐥', '?'],
      missing: 3,
      options: ['🐔', '🐓', '🥚', '🪶'],
      answer: '🐔',
      type: 'thematic',
      difficulty: 'Medium'
    },
    {
      sequence: ['🌱', '🌿', '🌳', '?'],
      missing: 3,
      options: ['🍂', '🌲', '🌴', '🎋'],
      answer: '🍂',
      type: 'thematic',
      difficulty: 'Medium'
    },
    {
      sequence: ['🥉', '🥈', '🥇', '?'],
      missing: 3,
      options: ['🏆', '🎖️', '🏅', '👑'],
      answer: '🏆',
      type: 'thematic',
      difficulty: 'Medium'
    },
    {
      sequence: ['🌍', '🌎', '🌏', '?', '🌑'],
      missing: 3,
      options: ['🌕', '🌖', '🌗', '🌘'],
      answer: '🌕',
      type: 'thematic',
      difficulty: 'Hard'
    },
    {
      sequence: ['⚡', '🔥', '💧', '🌍', '?'],
      missing: 4,
      options: ['🌪️', '❄️', '☀️', '🌙'],
      answer: '🌪️',
      type: 'thematic',
      difficulty: 'Hard'
    },
    {
      sequence: ['🔢', '🔤', '🔠', '?'],
      missing: 3,
      options: ['🔡', '📝', '✏️', '📊'],
      answer: '🔡',
      type: 'thematic',
      difficulty: 'Hard'
    },
    {
      sequence: ['🎯', '🎪', '🎨', '🎭', '?'],
      missing: 4,
      options: ['🎮', '🎲', '🎸', '🎤'],
      answer: '🎮',
      type: 'alphabetical',
      difficulty: 'Hard'
    }
  ];

  useEffect(() => {
    if (timeLeft > 0 && !showResult && !gameComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer('');
    }
  }, [timeLeft, showResult, gameComplete]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === patterns[currentPattern].answer) {
      const basePoints = patterns[currentPattern].difficulty === 'Easy' ? 120 : 
                        patterns[currentPattern].difficulty === 'Medium' ? 180 : 250;
      const timeBonus = timeLeft * 8;
      const streakBonus = streak * 50;
      const points = basePoints + timeBonus + streakBonus;
      setScore(score + points);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (currentPattern < patterns.length - 1) {
        setCurrentPattern(currentPattern + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(30);
      } else {
        setGameComplete(true);
      }
    }, 2500);
  };

  const resetGame = () => {
    setCurrentPattern(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameComplete(false);
    setTimeLeft(30);
    setStreak(0);
  };

  const getPatternTypeColor = (type: string) => {
    switch (type) {
      case 'arithmetic': return 'text-blue-400';
      case 'alphabetical': return 'text-green-400';
      case 'thematic': return 'text-purple-400';
      case 'color': return 'text-yellow-400';
      case 'size': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-400/20 text-green-400';
      case 'Medium': return 'bg-yellow-400/20 text-yellow-400';
      case 'Hard': return 'bg-red-400/20 text-red-400';
      default: return 'bg-gray-400/20 text-gray-400';
    }
  };

  if (gameComplete) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🧩</div>
          <h2 className="text-2xl font-bold text-white mb-4">Pattern Master!</h2>
          <div className="text-4xl font-bold text-yellow-400 mb-4">{score} Points</div>
          <p className="text-white/60 mb-6">
            You completed {patterns.length} pattern challenges!
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

  const currentPatternData = patterns[currentPattern];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-lg w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Pattern Recognition</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/60">Pattern {currentPattern + 1}/{patterns.length}</span>
            <div className="flex items-center gap-4">
              {streak > 0 && (
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-orange-400" />
                  <span className="text-orange-400 font-bold">{streak}x</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 font-bold">{score}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-6 mb-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              {currentPatternData.sequence.map((emoji, index) => (
                <div
                  key={index}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
                    index === currentPatternData.missing
                      ? 'bg-yellow-500/20 border-2 border-yellow-500 border-dashed'
                      : 'bg-white/10'
                  }`}
                >
                  {emoji}
                </div>
              ))}
            </div>
            <div className="text-white/60 text-sm">What comes next in this pattern?</div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-400" />
              <span className={`text-sm capitalize ${getPatternTypeColor(currentPatternData.type)}`}>
                {currentPatternData.type}
              </span>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(currentPatternData.difficulty)}`}>
              {currentPatternData.difficulty}
            </span>
            <div className="text-white/60">⏱️ {timeLeft}s</div>
          </div>

          <div className="w-full bg-white/20 rounded-full h-2 mb-6">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(timeLeft / 30) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {currentPatternData.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && handleAnswer(option)}
              disabled={showResult}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                showResult
                  ? option === currentPatternData.answer
                    ? 'bg-green-500/20 border-green-500 text-green-400'
                    : option === selectedAnswer
                    ? 'bg-red-500/20 border-red-500 text-red-400'
                    : 'bg-white/5 border-white/10 text-white/60'
                  : 'bg-white/10 border-white/20 hover:bg-white/20 text-white hover:scale-105'
              }`}
            >
              <div className="text-3xl mb-2">{option}</div>
              {showResult && option === currentPatternData.answer && (
                <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
              )}
              {showResult && option === selectedAnswer && option !== currentPatternData.answer && (
                <XCircle className="w-5 h-5 text-red-400 mx-auto" />
              )}
            </button>
          ))}
        </div>

        <div className="mt-4 text-center text-white/60 text-sm">
          Identify the pattern and choose the missing emoji!
        </div>
      </div>
    </div>
  );
};

export default EmojiPatternRecognition;