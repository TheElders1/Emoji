import React, { useState, useEffect } from 'react';
import { CheckCircle, RotateCcw, Star, Users, Timer } from 'lucide-react';

interface CharadesPrompt {
  word: string;
  emoji: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  hints: string[];
}

interface EmojiCharadesProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const EmojiCharades: React.FC<EmojiCharadesProps> = ({ onComplete, onClose }) => {
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45);
  const [currentHint, setCurrentHint] = useState(0);
  const [showHints, setShowHints] = useState(false);

  const prompts: CharadesPrompt[] = [
    {
      word: 'Dancing',
      emoji: '💃',
      difficulty: 'Easy',
      category: 'Actions',
      hints: ['Move your body', 'To music', 'Rhythmic movement']
    },
    {
      word: 'Sleeping',
      emoji: '😴',
      difficulty: 'Easy',
      category: 'Actions',
      hints: ['Close your eyes', 'Rest time', 'Zzz...']
    },
    {
      word: 'Cooking',
      emoji: '👨‍🍳',
      difficulty: 'Easy',
      category: 'Activities',
      hints: ['In the kitchen', 'Making food', 'Chef activity']
    },
    {
      word: 'Flying',
      emoji: '✈️',
      difficulty: 'Medium',
      category: 'Actions',
      hints: ['In the air', 'Like a bird', 'Travel method']
    },
    {
      word: 'Swimming',
      emoji: '🏊',
      difficulty: 'Medium',
      category: 'Sports',
      hints: ['In water', 'Olympic sport', 'Pool activity']
    },
    {
      word: 'Singing',
      emoji: '🎤',
      difficulty: 'Medium',
      category: 'Music',
      hints: ['Using voice', 'Making music', 'Karaoke activity']
    },
    {
      word: 'Meditating',
      emoji: '🧘',
      difficulty: 'Hard',
      category: 'Wellness',
      hints: ['Inner peace', 'Mindfulness', 'Sitting quietly']
    },
    {
      word: 'Juggling',
      emoji: '🤹',
      difficulty: 'Hard',
      category: 'Skills',
      hints: ['Multiple objects', 'Circus skill', 'Hand coordination']
    },
    {
      word: 'Skateboarding',
      emoji: '🛹',
      difficulty: 'Hard',
      category: 'Sports',
      hints: ['On wheels', 'Street sport', 'Balance required']
    },
    {
      word: 'Gardening',
      emoji: '🌱',
      difficulty: 'Medium',
      category: 'Activities',
      hints: ['With plants', 'Outdoor activity', 'Growing things']
    }
  ];

  useEffect(() => {
    if (timeLeft > 0 && !showResult && !gameComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeUp();
    }
  }, [timeLeft, showResult, gameComplete]);

  const handleSuccess = () => {
    setShowResult(true);
    
    const basePoints = prompts[currentPrompt].difficulty === 'Easy' ? 100 : 
                      prompts[currentPrompt].difficulty === 'Medium' ? 150 : 200;
    const timeBonus = timeLeft * 3;
    const hintPenalty = showHints ? 30 : 0;
    const points = Math.max(50, basePoints + timeBonus - hintPenalty);
    setScore(score + points);

    setTimeout(() => {
      if (currentPrompt < prompts.length - 1) {
        setCurrentPrompt(currentPrompt + 1);
        setShowResult(false);
        setTimeLeft(45);
        setCurrentHint(0);
        setShowHints(false);
      } else {
        setGameComplete(true);
      }
    }, 2500);
  };

  const handleTimeUp = () => {
    setShowResult(true);
    
    setTimeout(() => {
      if (currentPrompt < prompts.length - 1) {
        setCurrentPrompt(currentPrompt + 1);
        setShowResult(false);
        setTimeLeft(45);
        setCurrentHint(0);
        setShowHints(false);
      } else {
        setGameComplete(true);
      }
    }, 2500);
  };

  const showNextHint = () => {
    if (currentHint < prompts[currentPrompt].hints.length - 1) {
      setCurrentHint(currentHint + 1);
      setShowHints(true);
    }
  };

  const resetGame = () => {
    setCurrentPrompt(0);
    setScore(0);
    setShowResult(false);
    setGameComplete(false);
    setTimeLeft(45);
    setCurrentHint(0);
    setShowHints(false);
  };

  if (gameComplete) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎭</div>
          <h2 className="text-2xl font-bold text-white mb-4">Charades Complete!</h2>
          <div className="text-4xl font-bold text-yellow-400 mb-4">{score} Points</div>
          <p className="text-white/60 mb-6">
            You acted out {prompts.length} emoji charades!
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

  const currentPromptData = prompts[currentPrompt];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-lg w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Emoji Charades</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/60">Round {currentPrompt + 1}/{prompts.length}</span>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold">{score}</span>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-6 mb-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="w-6 h-6 text-blue-400" />
              <span className="text-blue-400">{currentPromptData.category}</span>
            </div>
            <div className="text-6xl mb-4">{currentPromptData.emoji}</div>
            <div className="text-2xl font-bold text-white mb-2">Act out: {currentPromptData.word}</div>
            <div className="text-sm text-white/60">Pretend someone is guessing what you're acting!</div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs px-2 py-1 rounded-full ${
              currentPromptData.difficulty === 'Easy' ? 'bg-green-400/20 text-green-400' :
              currentPromptData.difficulty === 'Medium' ? 'bg-yellow-400/20 text-yellow-400' :
              'bg-red-400/20 text-red-400'
            }`}>
              {currentPromptData.difficulty}
            </span>
            <div className="flex items-center gap-2 text-white/60">
              <Timer className="w-4 h-4" />
              {timeLeft}s
            </div>
          </div>

          <div className="w-full bg-white/20 rounded-full h-2 mb-6">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(timeLeft / 45) * 100}%` }}
            />
          </div>

          {showHints && (
            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 mb-4">
              <div className="text-yellow-400 text-sm font-bold mb-1">Hint {currentHint + 1}:</div>
              <div className="text-white">{currentPromptData.hints[currentHint]}</div>
            </div>
          )}
        </div>

        {!showResult && (
          <div className="space-y-3">
            <button
              onClick={handleSuccess}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              They Guessed It!
            </button>
            
            <button
              onClick={showNextHint}
              disabled={currentHint >= currentPromptData.hints.length - 1}
              className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-white font-bold py-2 rounded-lg transition-colors"
            >
              Need a Hint? (-30 points)
            </button>
            
            <button
              onClick={handleTimeUp}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition-colors"
            >
              Skip This One
            </button>
          </div>
        )}

        {showResult && (
          <div className="text-center">
            <div className={`${score > 0 ? 'bg-green-500/20 border-green-500/30' : 'bg-red-500/20 border-red-500/30'} rounded-lg p-4`}>
              <div className={`${score > 0 ? 'text-green-400' : 'text-red-400'} font-bold mb-2`}>
                {timeLeft > 0 ? 'Great acting!' : 'Time\'s up!'}
              </div>
              <div className="text-white/60 text-sm">
                {timeLeft > 0 ? `+${Math.max(50, (prompts[currentPrompt].difficulty === 'Easy' ? 100 : prompts[currentPrompt].difficulty === 'Medium' ? 150 : 200) + timeLeft * 3 - (showHints ? 30 : 0))} points` : 'Better luck next time!'}
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 text-center text-white/60 text-xs">
          Act out the word without speaking! Use gestures and body language.
        </div>
      </div>
    </div>
  );
};

export default EmojiCharades;