import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, Star, Brain, X } from 'lucide-react';

interface SequencePattern {
  sequence: string[];
  answer: string;
  options: string[];
  type: 'arithmetic' | 'alphabetical' | 'thematic' | 'color';
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface EmojiSequencePuzzleProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const EmojiSequencePuzzle: React.FC<EmojiSequencePuzzleProps> = ({ onComplete, onClose }) => {
  const [currentPattern, setCurrentPattern] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25);

  const patterns: SequencePattern[] = [
    {
      sequence: ['🌑', '🌒', '🌓', '🌔', '?'],
      answer: '🌕',
      options: ['🌕', '🌖', '🌗', '🌘'],
      type: 'thematic',
      difficulty: 'Easy'
    },
    {
      sequence: ['1️⃣', '2️⃣', '3️⃣', '?', '5️⃣'],
      answer: '4️⃣',
      options: ['4️⃣', '6️⃣', '0️⃣', '7️⃣'],
      type: 'arithmetic',
      difficulty: 'Easy'
    },
    {
      sequence: ['🔴', '🟠', '🟡', '🟢', '?'],
      answer: '🔵',
      options: ['🔵', '🟣', '⚫', '⚪'],
      type: 'color',
      difficulty: 'Medium'
    },
    {
      sequence: ['🐣', '🐤', '🐥', '?'],
      answer: '🐔',
      options: ['🐔', '🐓', '🥚', '🪶'],
      type: 'thematic',
      difficulty: 'Hard'
    },
    {
      sequence: ['🌱', '🌿', '🌳', '?'],
      answer: '🍂',
      options: ['🍂', '🌲', '🌴', '🎋'],
      type: 'thematic',
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
      const points = timeLeft > 18 ? 150 : timeLeft > 10 ? 120 : 80;
      setScore(score + points);
    }

    setTimeout(() => {
      if (currentPattern < patterns.length - 1) {
        setCurrentPattern(currentPattern + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(25);
      } else {
        setGameComplete(true);
      }
    }, 2000);
  };

  const resetGame = () => {
    setCurrentPattern(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameComplete(false);
    setTimeLeft(25);
  };

  if (gameComplete) {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-3xl p-8 border border-blue-500/30 max-w-md w-full mx-4 text-center">
          <div className="text-6xl mb-4">🧩</div>
          <h2 className="text-3xl font-bold text-white mb-4">Sequence Mastered!</h2>
          <div className="text-4xl font-bold text-yellow-400 mb-6">{score} Points</div>
          <div className="flex gap-3">
            <button
              onClick={resetGame}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Play Again
            </button>
            <button
              onClick={() => onComplete(score)}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 rounded-xl transition-all duration-200 transform hover:scale-105"
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
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-3xl p-6 border border-blue-500/30 w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Emoji Sequence Puzzle</h1>
              <p className="text-blue-300">Find the pattern and complete the sequence</p>
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
            <div className="text-white/60">⏱️ {timeLeft}s</div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${
            currentPatternData.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
            currentPatternData.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {currentPatternData.difficulty}
          </span>
        </div>

        {/* Sequence Display */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="bg-black/30 rounded-2xl p-8 w-full max-w-2xl">
            <div className="text-center mb-8">
              <h3 className="text-xl text-white mb-6">Complete the sequence:</h3>
              <div className="flex items-center justify-center gap-4 mb-8">
                {currentPatternData.sequence.map((emoji, index) => (
                  <div
                    key={index}
                    className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl ${
                      emoji === '?'
                        ? 'bg-yellow-500/20 border-2 border-yellow-500 border-dashed'
                        : 'bg-white/10'
                    }`}
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {currentPatternData.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswer(option)}
                  disabled={showResult}
                  className={`p-4 rounded-xl border transition-all duration-200 ${
                    showResult
                      ? option === currentPatternData.answer
                        ? 'bg-green-500/20 border-green-500 text-green-400'
                        : option === selectedAnswer
                        ? 'bg-red-500/20 border-red-500 text-red-400'
                        : 'bg-white/5 border-white/10 text-white/60'
                      : 'bg-white/10 border-white/20 hover:bg-white/20 text-white hover:scale-105'
                  }`}
                >
                  <div className="text-4xl mb-2">{option}</div>
                  {showResult && option === currentPatternData.answer && (
                    <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                  )}
                  {showResult && option === selectedAnswer && option !== currentPatternData.answer && (
                    <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="text-center text-white/60">
          Pattern {currentPattern + 1} of {patterns.length}
        </div>
      </div>
    </div>
  );
};

export default EmojiSequencePuzzle;