import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, Star, Zap } from 'lucide-react';

interface Association {
  emoji: string;
  correctAnswers: string[];
  wrongAnswers: string[];
  category: string;
}

interface EmojiAssociationProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const EmojiAssociation: React.FC<EmojiAssociationProps> = ({ onComplete, onClose }) => {
  const [currentAssociation, setCurrentAssociation] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [streak, setStreak] = useState(0);
  const [options, setOptions] = useState<string[]>([]);

  const associations: Association[] = [
    {
      emoji: "🌞",
      correctAnswers: ["🌻", "🏖️", "☀️", "🌅"],
      wrongAnswers: ["🌙", "❄️", "🌧️", "⭐"],
      category: "Weather & Nature"
    },
    {
      emoji: "🍕",
      correctAnswers: ["🧀", "🍅", "🌶️", "🥓"],
      wrongAnswers: ["🍎", "🥕", "🥬", "🍌"],
      category: "Food"
    },
    {
      emoji: "🏠",
      correctAnswers: ["🚪", "🪟", "🛏️", "🏡"],
      wrongAnswers: ["🚗", "✈️", "🚢", "🚲"],
      category: "Home"
    },
    {
      emoji: "🎵",
      correctAnswers: ["🎸", "🎤", "🎹", "🥁"],
      wrongAnswers: ["📚", "✏️", "🖼️", "🎨"],
      category: "Music"
    },
    {
      emoji: "🌊",
      correctAnswers: ["🏄", "🐠", "⛵", "🏖️"],
      wrongAnswers: ["🏔️", "🌵", "🔥", "❄️"],
      category: "Ocean"
    },
    {
      emoji: "🎂",
      correctAnswers: ["🎉", "🎈", "🎁", "🕯️"],
      wrongAnswers: ["📚", "💼", "🔧", "🧹"],
      category: "Celebration"
    },
    {
      emoji: "🚗",
      correctAnswers: ["⛽", "🛣️", "🚦", "🅿️"],
      wrongAnswers: ["🌊", "🌳", "🏠", "📚"],
      category: "Transportation"
    },
    {
      emoji: "📚",
      correctAnswers: ["✏️", "📝", "🎓", "🤓"],
      wrongAnswers: ["🍕", "⚽", "🎮", "🎵"],
      category: "Education"
    },
    {
      emoji: "⚽",
      correctAnswers: ["🥅", "👟", "🏟️", "🏆"],
      wrongAnswers: ["🍎", "📚", "🎵", "🏠"],
      category: "Sports"
    },
    {
      emoji: "🌙",
      correctAnswers: ["⭐", "🌌", "😴", "🦉"],
      wrongAnswers: ["🌞", "🌻", "🏖️", "☀️"],
      category: "Night"
    }
  ];

  useEffect(() => {
    generateOptions();
  }, [currentAssociation]);

  useEffect(() => {
    if (timeLeft > 0 && !showResult && !gameComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer('');
    }
  }, [timeLeft, showResult, gameComplete]);

  const generateOptions = () => {
    const current = associations[currentAssociation];
    const correctOption = current.correctAnswers[Math.floor(Math.random() * current.correctAnswers.length)];
    const wrongOptions = current.wrongAnswers.slice(0, 3);
    const allOptions = [correctOption, ...wrongOptions].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const current = associations[currentAssociation];
    const isCorrect = current.correctAnswers.includes(answer);
    
    if (isCorrect) {
      const basePoints = 80;
      const timeBonus = timeLeft * 5;
      const streakBonus = streak * 20;
      const points = basePoints + timeBonus + streakBonus;
      setScore(score + points);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (currentAssociation < associations.length - 1) {
        setCurrentAssociation(currentAssociation + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(15);
      } else {
        setGameComplete(true);
      }
    }, 1500);
  };

  const resetGame = () => {
    setCurrentAssociation(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameComplete(false);
    setTimeLeft(15);
    setStreak(0);
  };

  if (gameComplete) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🔗</div>
          <h2 className="text-2xl font-bold text-white mb-4">Association Complete!</h2>
          <div className="text-4xl font-bold text-yellow-400 mb-4">{score} Points</div>
          <p className="text-white/60 mb-6">
            You completed {associations.length} emoji associations!
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

  const currentAssociationData = associations[currentAssociation];
  const correctAnswer = currentAssociationData.correctAnswers.find(answer => options.includes(answer));

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-lg w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Emoji Association</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/60">Round {currentAssociation + 1}/{associations.length}</span>
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
            <div className="text-6xl mb-3">{currentAssociationData.emoji}</div>
            <div className="text-white/60 mb-2">Which emoji is related to this one?</div>
            <div className="text-sm text-purple-400">{currentAssociationData.category}</div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="text-white/60">⏱️ {timeLeft}s</div>
            <div className="text-white/60">Quick thinking!</div>
          </div>

          <div className="w-full bg-white/20 rounded-full h-2 mb-6">
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(timeLeft / 15) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && handleAnswer(option)}
              disabled={showResult}
              className={`p-6 rounded-lg border transition-all duration-200 ${
                showResult
                  ? option === correctAnswer
                    ? 'bg-green-500/20 border-green-500 text-green-400'
                    : option === selectedAnswer
                    ? 'bg-red-500/20 border-red-500 text-red-400'
                    : 'bg-white/5 border-white/10 text-white/60'
                  : 'bg-white/10 border-white/20 hover:bg-white/20 text-white hover:scale-105'
              }`}
            >
              <div className="text-4xl mb-2">{option}</div>
              {showResult && option === correctAnswer && (
                <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
              )}
              {showResult && option === selectedAnswer && option !== correctAnswer && (
                <XCircle className="w-5 h-5 text-red-400 mx-auto" />
              )}
            </button>
          ))}
        </div>

        <div className="mt-4 text-center text-white/60 text-sm">
          Find the emoji that relates to the given one!
        </div>
      </div>
    </div>
  );
};

export default EmojiAssociation;