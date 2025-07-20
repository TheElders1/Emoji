import React, { useState, useEffect } from 'react';
import { CheckCircle, RotateCcw, Star, Users, Timer } from 'lucide-react';

interface MimicryPrompt {
  emoji: string;
  emotion: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: number;
}

interface EmojiMimicryProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const EmojiMimicry: React.FC<EmojiMimicryProps> = ({ onComplete, onClose }) => {
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPerforming, setIsPerforming] = useState(false);

  const prompts: MimicryPrompt[] = [
    {
      emoji: '😊',
      emotion: 'Happy',
      description: 'Show pure joy and happiness',
      difficulty: 'Easy',
      duration: 30
    },
    {
      emoji: '😢',
      emotion: 'Sad',
      description: 'Express deep sadness',
      difficulty: 'Easy',
      duration: 30
    },
    {
      emoji: '😡',
      emotion: 'Angry',
      description: 'Show intense anger',
      difficulty: 'Easy',
      duration: 30
    },
    {
      emoji: '😱',
      emotion: 'Shocked',
      description: 'Express complete surprise and shock',
      difficulty: 'Medium',
      duration: 25
    },
    {
      emoji: '🤔',
      emotion: 'Thinking',
      description: 'Show deep contemplation and thinking',
      difficulty: 'Medium',
      duration: 25
    },
    {
      emoji: '😴',
      emotion: 'Sleepy',
      description: 'Act extremely tired and sleepy',
      difficulty: 'Medium',
      duration: 25
    },
    {
      emoji: '🤪',
      emotion: 'Crazy',
      description: 'Act completely wild and crazy',
      difficulty: 'Hard',
      duration: 20
    },
    {
      emoji: '🥺',
      emotion: 'Pleading',
      description: 'Show puppy dog eyes and pleading',
      difficulty: 'Hard',
      duration: 20
    },
    {
      emoji: '😎',
      emotion: 'Cool',
      description: 'Act super cool and confident',
      difficulty: 'Hard',
      duration: 20
    },
    {
      emoji: '🤯',
      emotion: 'Mind Blown',
      description: 'Show your mind being completely blown',
      difficulty: 'Hard',
      duration: 20
    }
  ];

  useEffect(() => {
    if (timeLeft > 0 && !showResult && !gameComplete && isPerforming) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult && isPerforming) {
      handleComplete();
    }
  }, [timeLeft, showResult, gameComplete, isPerforming]);

  const startPerformance = () => {
    setIsPerforming(true);
    setTimeLeft(prompts[currentPrompt].duration);
  };

  const handleComplete = () => {
    setShowResult(true);
    setIsPerforming(false);
    
    const currentPromptData = prompts[currentPrompt];
    const basePoints = currentPromptData.difficulty === 'Easy' ? 100 : 
                      currentPromptData.difficulty === 'Medium' ? 150 : 200;
    const timeBonus = timeLeft * 5;
    const points = basePoints + timeBonus;
    setScore(score + points);

    setTimeout(() => {
      if (currentPrompt < prompts.length - 1) {
        setCurrentPrompt(currentPrompt + 1);
        setShowResult(false);
        setTimeLeft(prompts[currentPrompt + 1].duration);
        setIsPerforming(false);
      } else {
        setGameComplete(true);
      }
    }, 2500);
  };

  const resetGame = () => {
    setCurrentPrompt(0);
    setScore(0);
    setShowResult(false);
    setGameComplete(false);
    setTimeLeft(prompts[0].duration);
    setIsPerforming(false);
  };

  if (gameComplete) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎭</div>
          <h2 className="text-2xl font-bold text-white mb-4">Mimicry Complete!</h2>
          <div className="text-4xl font-bold text-yellow-400 mb-4">{score} Points</div>
          <p className="text-white/60 mb-6">
            You performed {prompts.length} emoji expressions!
          </p>
          <div className="flex gap-3">
            <button
              onClick={resetGame}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Perform Again
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
          <h2 className="text-2xl font-bold text-white">Emoji Mimicry</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/60">Expression {currentPrompt + 1}/{prompts.length}</span>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold">{score}</span>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-6 mb-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="w-6 h-6 text-blue-400" />
              <span className="text-blue-400">Performance</span>
            </div>
            <div className="text-8xl mb-4">{currentPromptData.emoji}</div>
            <div className="text-2xl font-bold text-white mb-2">{currentPromptData.emotion}</div>
            <div className="text-white/60 mb-4">{currentPromptData.description}</div>
            
            {isPerforming && (
              <div className="text-white/60">⏱️ {timeLeft}s remaining</div>
            )}
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
              {currentPromptData.duration}s
            </div>
          </div>

          {isPerforming && (
            <div className="w-full bg-white/20 rounded-full h-2 mb-6">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${(timeLeft / currentPromptData.duration) * 100}%` }}
              />
            </div>
          )}
        </div>

        {!showResult && !isPerforming && (
          <button
            onClick={startPerformance}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors mb-4"
          >
            Start Performance
          </button>
        )}

        {isPerforming && (
          <button
            onClick={handleComplete}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Performance Complete!
          </button>
        )}

        {showResult && (
          <div className="text-center">
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-4">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-green-400 font-bold mb-2">Great performance!</div>
              <div className="text-white/60 text-sm">
                +{(currentPromptData.difficulty === 'Easy' ? 100 : currentPromptData.difficulty === 'Medium' ? 150 : 200) + timeLeft * 5} points
              </div>
            </div>
          </div>
        )}

        <div className="text-center text-white/60 text-xs">
          Express the emotion with your face and body language!
        </div>
      </div>
    </div>
  );
};

export default EmojiMimicry;