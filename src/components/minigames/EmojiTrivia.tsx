import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, Star, Brain } from 'lucide-react';

interface TriviaQuestion {
  question: string;
  correctEmoji: string;
  wrongEmojis: string[];
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface EmojiTriviaProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const EmojiTrivia: React.FC<EmojiTriviaProps> = ({ onComplete, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [options, setOptions] = useState<string[]>([]);

  const questions: TriviaQuestion[] = [
    {
      question: "Which emoji represents the largest mammal on Earth?",
      correctEmoji: "🐋",
      wrongEmojis: ["🐘", "🦏", "🐻"],
      category: "Animals",
      difficulty: "Easy"
    },
    {
      question: "What emoji represents the fastest land animal?",
      correctEmoji: "🐆",
      wrongEmojis: ["🐎", "🦌", "🐕"],
      category: "Animals",
      difficulty: "Medium"
    },
    {
      question: "Which emoji represents the planet closest to the Sun?",
      correctEmoji: "☿️",
      wrongEmojis: ["🌍", "🪐", "🌙"],
      category: "Space",
      difficulty: "Hard"
    },
    {
      question: "What emoji represents the most consumed beverage in the world after water?",
      correctEmoji: "☕",
      wrongEmojis: ["🥤", "🍺", "🧃"],
      category: "Food & Drink",
      difficulty: "Easy"
    },
    {
      question: "Which emoji represents the tallest mountain on Earth?",
      correctEmoji: "🏔️",
      wrongEmojis: ["🌋", "🏕️", "🗻"],
      category: "Geography",
      difficulty: "Medium"
    },
    {
      question: "What emoji represents the currency of Japan?",
      correctEmoji: "💴",
      wrongEmojis: ["💵", "💶", "💷"],
      category: "Culture",
      difficulty: "Hard"
    },
    {
      question: "Which emoji represents the organ that pumps blood?",
      correctEmoji: "❤️",
      wrongEmojis: ["🧠", "🫁", "🦴"],
      category: "Science",
      difficulty: "Easy"
    },
    {
      question: "What emoji represents the sport played at Wimbledon?",
      correctEmoji: "🎾",
      wrongEmojis: ["⚽", "🏀", "🏐"],
      category: "Sports",
      difficulty: "Medium"
    },
    {
      question: "Which emoji represents the ancient wonder of the world in Egypt?",
      correctEmoji: "🔺",
      wrongEmojis: ["🏛️", "🗿", "🏰"],
      category: "History",
      difficulty: "Hard"
    },
    {
      question: "What emoji represents the instrument with 88 keys?",
      correctEmoji: "🎹",
      wrongEmojis: ["🎸", "🎺", "🥁"],
      category: "Music",
      difficulty: "Medium"
    }
  ];

  useEffect(() => {
    generateOptions();
  }, [currentQuestion]);

  useEffect(() => {
    if (timeLeft > 0 && !showResult && !gameComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer('');
    }
  }, [timeLeft, showResult, gameComplete]);

  const generateOptions = () => {
    const current = questions[currentQuestion];
    const allOptions = [current.correctEmoji, ...current.wrongEmojis].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === questions[currentQuestion].correctEmoji) {
      const basePoints = questions[currentQuestion].difficulty === 'Easy' ? 100 : 
                        questions[currentQuestion].difficulty === 'Medium' ? 150 : 200;
      const timeBonus = timeLeft * 5;
      const points = basePoints + timeBonus;
      setScore(score + points);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(20);
      } else {
        setGameComplete(true);
      }
    }, 2000);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameComplete(false);
    setTimeLeft(20);
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
          <div className="text-6xl mb-4">🧠</div>
          <h2 className="text-2xl font-bold text-white mb-4">Trivia Complete!</h2>
          <div className="text-4xl font-bold text-yellow-400 mb-4">{score} Points</div>
          <p className="text-white/60 mb-6">
            You answered {questions.length} trivia questions!
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

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-lg w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Emoji Trivia</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/60">Question {currentQuestion + 1}/{questions.length}</span>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold">{score}</span>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Brain className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-purple-400">{currentQuestionData.category}</span>
            </div>
            <div className="text-white mb-3 text-left">{currentQuestionData.question}</div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(currentQuestionData.difficulty)}`}>
              {currentQuestionData.difficulty}
            </span>
            <div className="text-white/60">⏱️ {timeLeft}s</div>
          </div>

          <div className="w-full bg-white/20 rounded-full h-2 mb-6">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(timeLeft / 20) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && handleAnswer(option)}
              disabled={showResult}
              className={`p-6 rounded-lg border transition-all duration-200 ${
                showResult
                  ? option === currentQuestionData.correctEmoji
                    ? 'bg-green-500/20 border-green-500 text-green-400'
                    : option === selectedAnswer
                    ? 'bg-red-500/20 border-red-500 text-red-400'
                    : 'bg-white/5 border-white/10 text-white/60'
                  : 'bg-white/10 border-white/20 hover:bg-white/20 text-white hover:scale-105'
              }`}
            >
              <div className="text-5xl mb-2">{option}</div>
              {showResult && option === currentQuestionData.correctEmoji && (
                <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
              )}
              {showResult && option === selectedAnswer && option !== currentQuestionData.correctEmoji && (
                <XCircle className="w-5 h-5 text-red-400 mx-auto" />
              )}
            </button>
          ))}
        </div>

        <div className="mt-4 text-center text-white/60 text-sm">
          Choose the emoji that best answers the question!
        </div>
      </div>
    </div>
  );
};

export default EmojiTrivia;