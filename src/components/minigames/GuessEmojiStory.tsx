import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, Star } from 'lucide-react';

interface Story {
  emojis: string;
  answer: string;
  options: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface GuessEmojiStoryProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const GuessEmojiStory: React.FC<GuessEmojiStoryProps> = ({ onComplete, onClose }) => {
  const [currentStory, setCurrentStory] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const stories: Story[] = [
    {
      emojis: "🌅🏃‍♂️💪🥵💦",
      answer: "Morning jog workout",
      options: ["Morning jog workout", "Running from danger", "Hot summer day", "Gym training"],
      difficulty: "Easy"
    },
    {
      emojis: "👨‍🍳🍝🔥😋👨‍👩‍👧‍👦",
      answer: "Dad cooking pasta for family",
      options: ["Restaurant dinner", "Dad cooking pasta for family", "Cooking competition", "Italian vacation"],
      difficulty: "Easy"
    },
    {
      emojis: "🎓📚😴☕🌙",
      answer: "Late night studying for exams",
      options: ["Reading bedtime stories", "Late night studying for exams", "Library closing time", "Coffee shop visit"],
      difficulty: "Medium"
    },
    {
      emojis: "✈️🏝️🏖️🍹😎",
      answer: "Tropical vacation getaway",
      options: ["Business trip", "Tropical vacation getaway", "Moving to new country", "Airport layover"],
      difficulty: "Easy"
    },
    {
      emojis: "💍👰🤵💒🎉",
      answer: "Wedding ceremony celebration",
      options: ["Anniversary party", "Wedding ceremony celebration", "Engagement party", "Church service"],
      difficulty: "Easy"
    },
    {
      emojis: "🚗⛽💸😱🚶‍♂️",
      answer: "Car ran out of gas, walking home",
      options: ["Expensive gas prices", "Car ran out of gas, walking home", "Car accident", "Selling the car"],
      difficulty: "Medium"
    },
    {
      emojis: "🎂🎈🎁🕯️👶",
      answer: "Baby's first birthday party",
      options: ["Adult birthday party", "Baby's first birthday party", "Baby shower", "Anniversary celebration"],
      difficulty: "Medium"
    },
    {
      emojis: "🌧️☂️🏠📺🍿",
      answer: "Rainy day movie marathon at home",
      options: ["Outdoor movie night", "Rainy day movie marathon at home", "Cinema date", "TV repair day"],
      difficulty: "Easy"
    },
    {
      emojis: "🎸🎤🎵👥🌟",
      answer: "Band performing on stage",
      options: ["Karaoke night", "Band performing on stage", "Music lesson", "Recording studio"],
      difficulty: "Medium"
    },
    {
      emojis: "🏥👩‍⚕️💉😰🤕",
      answer: "Getting vaccination at hospital",
      options: ["Emergency room visit", "Getting vaccination at hospital", "Blood donation", "Medical checkup"],
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
    
    if (answer === stories[currentStory].answer) {
      const points = timeLeft > 20 ? 100 : timeLeft > 10 ? 75 : 50;
      setScore(score + points);
    }

    setTimeout(() => {
      if (currentStory < stories.length - 1) {
        setCurrentStory(currentStory + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(30);
      } else {
        setGameComplete(true);
      }
    }, 2000);
  };

  const resetGame = () => {
    setCurrentStory(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameComplete(false);
    setTimeLeft(30);
  };

  if (gameComplete) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-white mb-4">Game Complete!</h2>
          <div className="text-4xl font-bold text-yellow-400 mb-4">{score} Points</div>
          <p className="text-white/60 mb-6">
            You completed {stories.length} emoji stories!
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

  const currentStoryData = stories[currentStory];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-lg w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Guess the Emoji Story</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/60">Story {currentStory + 1}/{stories.length}</span>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold">{score}</span>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4 mb-4">
            <div className="text-4xl mb-2">{currentStoryData.emojis}</div>
            <div className="text-sm text-white/60">What's happening in this story?</div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs px-2 py-1 rounded-full ${
              currentStoryData.difficulty === 'Easy' ? 'bg-green-400/20 text-green-400' :
              currentStoryData.difficulty === 'Medium' ? 'bg-yellow-400/20 text-yellow-400' :
              'bg-red-400/20 text-red-400'
            }`}>
              {currentStoryData.difficulty}
            </span>
            <div className="text-white/60">⏱️ {timeLeft}s</div>
          </div>

          <div className="w-full bg-white/20 rounded-full h-2 mb-6">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(timeLeft / 30) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          {currentStoryData.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && handleAnswer(option)}
              disabled={showResult}
              className={`w-full p-3 rounded-lg border transition-all duration-200 text-left ${
                showResult
                  ? option === currentStoryData.answer
                    ? 'bg-green-500/20 border-green-500 text-green-400'
                    : option === selectedAnswer
                    ? 'bg-red-500/20 border-red-500 text-red-400'
                    : 'bg-white/5 border-white/10 text-white/60'
                  : 'bg-white/10 border-white/20 hover:bg-white/20 text-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResult && option === currentStoryData.answer && (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                )}
                {showResult && option === selectedAnswer && option !== currentStoryData.answer && (
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

export default GuessEmojiStory;