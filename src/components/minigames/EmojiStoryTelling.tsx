import React, { useState, useEffect } from 'react';
import { CheckCircle, RotateCcw, Star, BookOpen, Sparkles } from 'lucide-react';

interface StoryPrompt {
  emojis: string[];
  theme: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  minWords: number;
}

interface EmojiStoryTellingProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const EmojiStoryTelling: React.FC<EmojiStoryTellingProps> = ({ onComplete, onClose }) => {
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [score, setScore] = useState(0);
  const [userStory, setUserStory] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);

  const prompts: StoryPrompt[] = [
    {
      emojis: ['🌟', '🏰', '👸'],
      theme: 'Fairy Tale',
      difficulty: 'Easy',
      minWords: 30
    },
    {
      emojis: ['🚀', '👽', '🌌'],
      theme: 'Space Adventure',
      difficulty: 'Easy',
      minWords: 30
    },
    {
      emojis: ['🐉', '⚔️', '🏔️'],
      theme: 'Epic Quest',
      difficulty: 'Medium',
      minWords: 50
    },
    {
      emojis: ['🔍', '🕵️', '🏛️'],
      theme: 'Mystery',
      difficulty: 'Medium',
      minWords: 50
    },
    {
      emojis: ['🌊', '🏴‍☠️', '💰'],
      theme: 'Pirate Adventure',
      difficulty: 'Medium',
      minWords: 50
    },
    {
      emojis: ['🎭', '🎪', '🎨'],
      theme: 'Artistic Journey',
      difficulty: 'Hard',
      minWords: 70
    },
    {
      emojis: ['⏰', '🌀', '🔮'],
      theme: 'Time Travel',
      difficulty: 'Hard',
      minWords: 70
    },
    {
      emojis: ['🌱', '🦋', '🌈'],
      theme: 'Transformation',
      difficulty: 'Hard',
      minWords: 70
    },
    {
      emojis: ['🎵', '💫', '🎪'],
      theme: 'Magical Performance',
      difficulty: 'Hard',
      minWords: 70
    },
    {
      emojis: ['🗝️', '📚', '🔥'],
      theme: 'Ancient Secret',
      difficulty: 'Hard',
      minWords: 70
    }
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
    
    const wordCount = userStory.trim().split(/\s+/).length;
    const currentPromptData = prompts[currentPrompt];
    
    let points = 0;
    if (wordCount >= currentPromptData.minWords) {
      const basePoints = currentPromptData.difficulty === 'Easy' ? 150 : 
                        currentPromptData.difficulty === 'Medium' ? 200 : 250;
      const wordBonus = Math.min(wordCount - currentPromptData.minWords, 50) * 2;
      const timeBonus = timeLeft * 1;
      const creativityBonus = userStory.includes('!') || userStory.includes('?') ? 25 : 0;
      points = basePoints + wordBonus + timeBonus + creativityBonus;
    } else {
      points = Math.max(25, wordCount * 2);
    }
    
    setScore(score + points);

    setTimeout(() => {
      if (currentPrompt < prompts.length - 1) {
        setCurrentPrompt(currentPrompt + 1);
        setUserStory('');
        setShowResult(false);
        setTimeLeft(120);
      } else {
        setGameComplete(true);
      }
    }, 3000);
  };

  const resetGame = () => {
    setCurrentPrompt(0);
    setScore(0);
    setUserStory('');
    setShowResult(false);
    setGameComplete(false);
    setTimeLeft(120);
  };

  const wordCount = userStory.trim().split(/\s+/).filter(word => word.length > 0).length;

  if (gameComplete) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-md w-full text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-white mb-4">Storytelling Complete!</h2>
          <div className="text-4xl font-bold text-yellow-400 mb-4">{score} Points</div>
          <p className="text-white/60 mb-6">
            You created {prompts.length} amazing stories!
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
          <h2 className="text-2xl font-bold text-white">Emoji Storytelling</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/60">Story {currentPrompt + 1}/{prompts.length}</span>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold">{score}</span>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-6 mb-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-purple-400" />
              <span className="text-purple-400">{currentPromptData.theme}</span>
            </div>
            <div className="flex items-center justify-center gap-4 text-4xl mb-4">
              {currentPromptData.emojis.map((emoji, index) => (
                <span key={index}>{emoji}</span>
              ))}
            </div>
            <div className="text-white mb-2">Create a story using these emojis!</div>
            <div className="text-sm text-white/60">Minimum {currentPromptData.minWords} words</div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs px-2 py-1 rounded-full ${
              currentPromptData.difficulty === 'Easy' ? 'bg-green-400/20 text-green-400' :
              currentPromptData.difficulty === 'Medium' ? 'bg-yellow-400/20 text-yellow-400' :
              'bg-red-400/20 text-red-400'
            }`}>
              {currentPromptData.difficulty}
            </span>
            <div className="flex items-center gap-4">
              <div className="text-white/60">Words: {wordCount}/{currentPromptData.minWords}</div>
              <div className="text-white/60">⏱️ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>
            </div>
          </div>

          <div className="w-full bg-white/20 rounded-full h-2 mb-6">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(timeLeft / 120) * 100}%` }}
            />
          </div>
        </div>

        <div className="mb-6">
          <textarea
            value={userStory}
            onChange={(e) => setUserStory(e.target.value)}
            placeholder="Once upon a time... (Write your creative story here using the emoji prompts above)"
            className="w-full h-40 bg-white/10 border border-white/20 rounded-lg p-4 text-white placeholder-white/40 resize-none"
            disabled={showResult}
          />
        </div>

        {!showResult && (
          <button
            onClick={handleSubmit}
            disabled={wordCount < 5}
            className="w-full bg-purple-500 hover:bg-purple-600 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Submit Story
          </button>
        )}

        {showResult && (
          <div className="text-center">
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-4">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-green-400 font-bold mb-2">Amazing creativity!</div>
              <div className="text-white/60 text-sm">
                {wordCount >= currentPromptData.minWords 
                  ? `Perfect! +${Math.max(25, (currentPromptData.difficulty === 'Easy' ? 150 : currentPromptData.difficulty === 'Medium' ? 200 : 250) + Math.min(wordCount - currentPromptData.minWords, 50) * 2 + timeLeft * 1 + (userStory.includes('!') || userStory.includes('?') ? 25 : 0))} points`
                  : `Good effort! +${Math.max(25, wordCount * 2)} points`
                }
              </div>
            </div>
          </div>
        )}

        <div className="text-center text-white/60 text-xs">
          Be creative! Include all emojis in your story for bonus points.
        </div>
      </div>
    </div>
  );
};

export default EmojiStoryTelling;