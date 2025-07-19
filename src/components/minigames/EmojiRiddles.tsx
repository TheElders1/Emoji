import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, Star, Lightbulb } from 'lucide-react';

interface Riddle {
  emojis: string;
  question: string;
  answer: string;
  options: string[];
  hint: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface EmojiRiddlesProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const EmojiRiddles: React.FC<EmojiRiddlesProps> = ({ onComplete, onClose }) => {
  const [currentRiddle, setCurrentRiddle] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(35);
  const [showHint, setShowHint] = useState(false);

  const riddles: Riddle[] = [
    {
      emojis: "🌙💤😴",
      question: "I come when the sun goes down, bringing rest to all around. What am I?",
      answer: "Night",
      options: ["Night", "Sleep", "Dream", "Bed"],
      hint: "It's the opposite of day",
      difficulty: "Easy"
    },
    {
      emojis: "🔥💧❄️",
      question: "I can be hot, cold, or frozen. I'm essential for life. What am I?",
      answer: "Water",
      options: ["Water", "Ice", "Steam", "Fire"],
      hint: "You drink me every day",
      difficulty: "Easy"
    },
    {
      emojis: "📚🎓🧠",
      question: "I grow stronger the more you use me, but I'm not a muscle. What am I?",
      answer: "Knowledge",
      options: ["Knowledge", "Memory", "Brain", "Wisdom"],
      hint: "You gain me through learning",
      difficulty: "Medium"
    },
    {
      emojis: "🌱🌳🍎",
      question: "I start small and grow tall, giving shade and fruit to all. What am I?",
      answer: "Tree",
      options: ["Tree", "Plant", "Garden", "Forest"],
      hint: "Birds make nests in me",
      difficulty: "Easy"
    },
    {
      emojis: "⏰🔄♾️",
      question: "I never stop moving, yet I have no legs. I measure everything but weigh nothing. What am I?",
      answer: "Time",
      options: ["Time", "Clock", "Watch", "Hour"],
      hint: "You can't save me or waste me",
      difficulty: "Medium"
    },
    {
      emojis: "🌈☔🌞",
      question: "I appear after storms, with colors so bright. I'm a bridge in the sky, a beautiful sight. What am I?",
      answer: "Rainbow",
      options: ["Rainbow", "Sunshine", "Cloud", "Sky"],
      hint: "I have seven colors",
      difficulty: "Easy"
    },
    {
      emojis: "🔍👁️🕵️",
      question: "I see everything but have no eyes. I know all secrets but tell no lies. What am I?",
      answer: "Truth",
      options: ["Truth", "Detective", "Mirror", "Camera"],
      hint: "I'm the opposite of a lie",
      difficulty: "Hard"
    },
    {
      emojis: "🎭😊😢",
      question: "I can make you laugh or make you cry, I'm not real but I don't lie. What am I?",
      answer: "Story",
      options: ["Story", "Movie", "Actor", "Emotion"],
      hint: "Books are full of me",
      difficulty: "Medium"
    },
    {
      emojis: "🗝️🚪🔒",
      question: "I open doors but I'm not a key. I solve problems but I'm not free. What am I?",
      answer: "Solution",
      options: ["Solution", "Answer", "Key", "Password"],
      hint: "I'm what you find when you solve a problem",
      difficulty: "Hard"
    },
    {
      emojis: "🌍🚀🌌",
      question: "I'm bigger than Earth but smaller than the universe. I hold many worlds. What am I?",
      answer: "Galaxy",
      options: ["Galaxy", "Solar System", "Universe", "Space"],
      hint: "The Milky Way is one of me",
      difficulty: "Hard"
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
    
    if (answer === riddles[currentRiddle].answer) {
      let points = timeLeft > 25 ? 150 : timeLeft > 15 ? 120 : 80;
      if (showHint) points = Math.floor(points * 0.7); // Reduce points if hint was used
      setScore(score + points);
    }

    setTimeout(() => {
      if (currentRiddle < riddles.length - 1) {
        setCurrentRiddle(currentRiddle + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(35);
        setShowHint(false);
      } else {
        setGameComplete(true);
      }
    }, 2500);
  };

  const resetGame = () => {
    setCurrentRiddle(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameComplete(false);
    setTimeLeft(35);
    setShowHint(false);
  };

  if (gameComplete) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🧩</div>
          <h2 className="text-2xl font-bold text-white mb-4">Riddles Complete!</h2>
          <div className="text-4xl font-bold text-yellow-400 mb-4">{score} Points</div>
          <p className="text-white/60 mb-6">
            You solved {riddles.length} emoji riddles!
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

  const currentRiddleData = riddles[currentRiddle];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-lg w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Emoji Riddles</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/60">Riddle {currentRiddle + 1}/{riddles.length}</span>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold">{score}</span>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4 mb-4">
            <div className="text-4xl mb-3">{currentRiddleData.emojis}</div>
            <div className="text-white mb-3 text-left">{currentRiddleData.question}</div>
            {showHint && (
              <div className="text-yellow-400 text-sm bg-yellow-400/10 rounded p-2">
                💡 Hint: {currentRiddleData.hint}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs px-2 py-1 rounded-full ${
              currentRiddleData.difficulty === 'Easy' ? 'bg-green-400/20 text-green-400' :
              currentRiddleData.difficulty === 'Medium' ? 'bg-yellow-400/20 text-yellow-400' :
              'bg-red-400/20 text-red-400'
            }`}>
              {currentRiddleData.difficulty}
            </span>
            <button
              onClick={() => setShowHint(true)}
              disabled={showHint || showResult}
              className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 disabled:opacity-50 text-sm"
            >
              <Lightbulb className="w-4 h-4" />
              Hint
            </button>
            <div className="text-white/60">⏱️ {timeLeft}s</div>
          </div>

          <div className="w-full bg-white/20 rounded-full h-2 mb-6">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(timeLeft / 35) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          {currentRiddleData.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && handleAnswer(option)}
              disabled={showResult}
              className={`w-full p-3 rounded-lg border transition-all duration-200 text-left ${
                showResult
                  ? option === currentRiddleData.answer
                    ? 'bg-green-500/20 border-green-500 text-green-400'
                    : option === selectedAnswer
                    ? 'bg-red-500/20 border-red-500 text-red-400'
                    : 'bg-white/5 border-white/10 text-white/60'
                  : 'bg-white/10 border-white/20 hover:bg-white/20 text-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResult && option === currentRiddleData.answer && (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                )}
                {showResult && option === selectedAnswer && option !== currentRiddleData.answer && (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmojiRiddles;