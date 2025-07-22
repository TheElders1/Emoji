import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, Star, MessageCircle, X } from 'lucide-react';

interface ChatMessage {
  emojis: string;
  answer: string;
  options: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  context: string;
}

interface EmojiChatDecryptionProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const EmojiChatDecryption: React.FC<EmojiChatDecryptionProps> = ({ onComplete, onClose }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const messages: ChatMessage[] = [
    {
      emojis: "🧊💡",
      answer: "Cool idea",
      options: ["Cool idea", "Cold light", "Ice cream", "Frozen brain"],
      difficulty: "Easy",
      context: "Friend suggesting something"
    },
    {
      emojis: "🔥📱",
      answer: "Hot phone",
      options: ["Hot phone", "Fire call", "Burning message", "Emergency contact"],
      difficulty: "Easy",
      context: "Phone overheating"
    },
    {
      emojis: "🌧️☔🏠",
      answer: "Stay home, it's raining",
      options: ["Stay home, it's raining", "Umbrella house", "Wet building", "Rain shelter"],
      difficulty: "Medium",
      context: "Weather advice"
    },
    {
      emojis: "🎯💯🔥",
      answer: "On point, perfect, fire",
      options: ["On point, perfect, fire", "Target hundred flame", "Aim perfect burn", "Goal complete hot"],
      difficulty: "Medium",
      context: "Complimenting someone"
    },
    {
      emojis: "🐝🍯💰",
      answer: "Busy making money",
      options: ["Busy making money", "Bee honey gold", "Sweet business", "Working hard"],
      difficulty: "Hard",
      context: "Describing work life"
    },
    {
      emojis: "🌊🏄‍♂️🤙",
      answer: "Surfing, hang loose",
      options: ["Surfing, hang loose", "Wave rider call", "Ocean sport phone", "Water activity"],
      difficulty: "Hard",
      context: "Beach lifestyle"
    },
    {
      emojis: "🎭🎪🤡",
      answer: "What a circus, clown show",
      options: ["What a circus, clown show", "Theater carnival funny", "Drama performance joke", "Acting circus comedy"],
      difficulty: "Hard",
      context: "Describing chaotic situation"
    },
    {
      emojis: "🚀🌙⭐",
      answer: "Shoot for the stars",
      options: ["Shoot for the stars", "Rocket moon star", "Space travel night", "Launch lunar bright"],
      difficulty: "Medium",
      context: "Motivational message"
    },
    {
      emojis: "🍎📚🎓",
      answer: "Study hard, graduate",
      options: ["Study hard, graduate", "Apple book hat", "Fruit reading education", "Food knowledge school"],
      difficulty: "Medium",
      context: "Education advice"
    },
    {
      emojis: "💔😢🍫",
      answer: "Heartbroken, need chocolate",
      options: ["Heartbroken, need chocolate", "Broken sad sweet", "Love cry candy", "Pain tears dessert"],
      difficulty: "Hard",
      context: "Relationship troubles"
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
    
    if (answer === messages[currentMessage].answer) {
      const basePoints = messages[currentMessage].difficulty === 'Easy' ? 100 : 
                        messages[currentMessage].difficulty === 'Medium' ? 150 : 200;
      const timeBonus = timeLeft * 5;
      const points = basePoints + timeBonus;
      setScore(score + points);
    }

    setTimeout(() => {
      if (currentMessage < messages.length - 1) {
        setCurrentMessage(currentMessage + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(30);
      } else {
        setGameComplete(true);
      }
    }, 2500);
  };

  const resetGame = () => {
    setCurrentMessage(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameComplete(false);
    setTimeLeft(30);
  };

  if (gameComplete) {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-gradient-to-br from-green-900 to-teal-900 rounded-3xl p-8 border border-green-500/30 max-w-md w-full mx-4 text-center">
          <div className="text-6xl mb-4">💬</div>
          <h2 className="text-3xl font-bold text-white mb-4">Chat Decrypted!</h2>
          <div className="text-4xl font-bold text-yellow-400 mb-6">{score} Points</div>
          <div className="flex gap-3">
            <button
              onClick={resetGame}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
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

  const currentMessageData = messages[currentMessage];

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-green-900 to-teal-900 rounded-3xl p-6 border border-green-500/30 w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Emoji Chat Decryption</h1>
              <p className="text-green-300">Decode emoji conversations and idioms</p>
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
            currentMessageData.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
            currentMessageData.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {currentMessageData.difficulty}
          </span>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="bg-black/30 rounded-2xl p-8 w-full max-w-2xl">
            <div className="text-center mb-8">
              <h3 className="text-xl text-white mb-4">Decode this message:</h3>
              <div className="bg-green-500/10 rounded-2xl p-6 mb-4">
                <div className="text-5xl mb-4">{currentMessageData.emojis}</div>
                <div className="text-sm text-green-300 italic">Context: {currentMessageData.context}</div>
              </div>
            </div>

            <div className="space-y-3">
              {currentMessageData.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswer(option)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl border transition-all duration-200 text-left ${
                    showResult
                      ? option === currentMessageData.answer
                        ? 'bg-green-500/20 border-green-500 text-green-400'
                        : option === selectedAnswer
                        ? 'bg-red-500/20 border-red-500 text-red-400'
                        : 'bg-white/5 border-white/10 text-white/60'
                      : 'bg-white/10 border-white/20 hover:bg-white/20 text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResult && option === currentMessageData.answer && (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                    {showResult && option === selectedAnswer && option !== currentMessageData.answer && (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="text-center text-white/60">
          Message {currentMessage + 1} of {messages.length}
        </div>
      </div>
    </div>
  );
};

export default EmojiChatDecryption;