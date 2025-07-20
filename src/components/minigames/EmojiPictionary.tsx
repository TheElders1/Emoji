import React, { useState, useEffect } from 'react';
import { CheckCircle, RotateCcw, Star, Palette, Clock } from 'lucide-react';

interface DrawingPrompt {
  word: string;
  emoji: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
}

interface EmojiPictionaryProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const EmojiPictionary: React.FC<EmojiPictionaryProps> = ({ onComplete, onClose }) => {
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [score, setScore] = useState(0);
  const [userDrawing, setUserDrawing] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isDrawing, setIsDrawing] = useState(false);

  const prompts: DrawingPrompt[] = [
    { word: 'Sun', emoji: '☀️', difficulty: 'Easy', category: 'Nature' },
    { word: 'House', emoji: '🏠', difficulty: 'Easy', category: 'Objects' },
    { word: 'Cat', emoji: '🐱', difficulty: 'Easy', category: 'Animals' },
    { word: 'Pizza', emoji: '🍕', difficulty: 'Easy', category: 'Food' },
    { word: 'Car', emoji: '🚗', difficulty: 'Easy', category: 'Transport' },
    { word: 'Rainbow', emoji: '🌈', difficulty: 'Medium', category: 'Nature' },
    { word: 'Guitar', emoji: '🎸', difficulty: 'Medium', category: 'Music' },
    { word: 'Butterfly', emoji: '🦋', difficulty: 'Medium', category: 'Animals' },
    { word: 'Rocket', emoji: '🚀', difficulty: 'Hard', category: 'Space' },
    { word: 'Dragon', emoji: '🐉', difficulty: 'Hard', category: 'Fantasy' }
  ];

  useEffect(() => {
    if (timeLeft > 0 && !showResult && !gameComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleSubmit();
    }
  }, [timeLeft, showResult, gameComplete]);

  const handleSubmit = () => {
    setShowResult(true);
    
    // Simple scoring based on time and effort
    const timeBonus = timeLeft * 2;
    const drawingBonus = userDrawing.length > 10 ? 100 : 50;
    const points = drawingBonus + timeBonus;
    setScore(score + points);

    setTimeout(() => {
      if (currentPrompt < prompts.length - 1) {
        setCurrentPrompt(currentPrompt + 1);
        setUserDrawing('');
        setShowResult(false);
        setTimeLeft(60);
        setIsDrawing(false);
      } else {
        setGameComplete(true);
      }
    }, 3000);
  };

  const resetGame = () => {
    setCurrentPrompt(0);
    setScore(0);
    setUserDrawing('');
    setShowResult(false);
    setGameComplete(false);
    setTimeLeft(60);
    setIsDrawing(false);
  };

  if (gameComplete) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎨</div>
          <h2 className="text-2xl font-bold text-white mb-4">Pictionary Complete!</h2>
          <div className="text-4xl font-bold text-yellow-400 mb-4">{score} Points</div>
          <p className="text-white/60 mb-6">
            You completed {prompts.length} drawing challenges!
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
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-2xl w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Emoji Pictionary</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/60">Drawing {currentPrompt + 1}/{prompts.length}</span>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold">{score}</span>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-6 mb-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Palette className="w-6 h-6 text-purple-400" />
              <span className="text-purple-400">{currentPromptData.category}</span>
            </div>
            <div className="text-4xl mb-3">{currentPromptData.emoji}</div>
            <div className="text-2xl font-bold text-white mb-2">Draw: {currentPromptData.word}</div>
            <div className="text-sm text-white/60">Use emojis to represent this word!</div>
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
              <Clock className="w-4 h-4" />
              {timeLeft}s
            </div>
          </div>

          <div className="w-full bg-white/20 rounded-full h-2 mb-6">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(timeLeft / 60) * 100}%` }}
            />
          </div>
        </div>

        <div className="mb-6">
          <textarea
            value={userDrawing}
            onChange={(e) => setUserDrawing(e.target.value)}
            placeholder="Use emojis to draw/represent the word above! Example: 🌞☀️🔥 for sun"
            className="w-full h-32 bg-white/10 border border-white/20 rounded-lg p-4 text-white placeholder-white/40 resize-none text-2xl text-center"
            disabled={showResult}
          />
        </div>

        {!showResult && (
          <button
            onClick={handleSubmit}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-lg transition-colors"
          >
            Submit Drawing
          </button>
        )}

        {showResult && (
          <div className="text-center">
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-4">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-green-400 font-bold">Great creativity!</div>
              <div className="text-white/60 text-sm">+{timeLeft * 2 + (userDrawing.length > 10 ? 100 : 50)} points</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmojiPictionary;