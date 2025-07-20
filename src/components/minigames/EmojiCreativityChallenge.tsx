import React, { useState, useEffect } from 'react';
import { CheckCircle, RotateCcw, Star, Palette, Sparkles } from 'lucide-react';

interface CreativityPrompt {
  theme: string;
  requiredEmojis: string[];
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface EmojiCreativityChallengeProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const EmojiCreativityChallenge: React.FC<EmojiCreativityChallengeProps> = ({ onComplete, onClose }) => {
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [score, setScore] = useState(0);
  const [userCreation, setUserCreation] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);

  const prompts: CreativityPrompt[] = [
    {
      theme: 'Dream Vacation',
      requiredEmojis: ['✈️', '🏖️', '🌴'],
      description: 'Create a story about your dream vacation using these emojis',
      difficulty: 'Easy'
    },
    {
      theme: 'Space Adventure',
      requiredEmojis: ['🚀', '👽', '🌌', '⭐'],
      description: 'Design an epic space adventure with these elements',
      difficulty: 'Medium'
    },
    {
      theme: 'Magical Forest',
      requiredEmojis: ['🧚‍♀️', '🌳', '🦄', '✨', '🍄'],
      description: 'Create a magical forest scene with all these emojis',
      difficulty: 'Hard'
    },
    {
      theme: 'Future City',
      requiredEmojis: ['🏙️', '🤖', '🚁', '💡'],
      description: 'Imagine a futuristic city using these elements',
      difficulty: 'Medium'
    },
    {
      theme: 'Underwater World',
      requiredEmojis: ['🐠', '🐙', '🏰', '💎', '🌊'],
      description: 'Create an underwater kingdom with these emojis',
      difficulty: 'Hard'
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
    
    const currentPromptData = prompts[currentPrompt];
    let points = 0;
    
    // Check if all required emojis are used
    const usedRequiredEmojis = currentPromptData.requiredEmojis.filter(emoji => 
      userCreation.includes(emoji)
    );
    
    // Base points for using required emojis
    points += usedRequiredEmojis.length * 50;
    
    // Bonus for using all required emojis
    if (usedRequiredEmojis.length === currentPromptData.requiredEmojis.length) {
      points += 100;
    }
    
    // Creativity bonus based on length and variety
    const emojiCount = (userCreation.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu) || []).length;
    points += Math.min(emojiCount * 10, 200);
    
    // Time bonus
    const timeBonus = timeLeft * 2;
    points += timeBonus;
    
    // Difficulty multiplier
    const multiplier = currentPromptData.difficulty === 'Easy' ? 1 : 
                      currentPromptData.difficulty === 'Medium' ? 1.2 : 1.5;
    points = Math.floor(points * multiplier);
    
    setScore(score + points);

    setTimeout(() => {
      if (currentPrompt < prompts.length - 1) {
        setCurrentPrompt(currentPrompt + 1);
        setUserCreation('');
        setShowResult(false);
        setTimeLeft(180);
      } else {
        setGameComplete(true);
      }
    }, 3000);
  };

  const resetGame = () => {
    setCurrentPrompt(0);
    setScore(0);
    setUserCreation('');
    setShowResult(false);
    setGameComplete(false);
    setTimeLeft(180);
  };

  if (gameComplete) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎨</div>
          <h2 className="text-2xl font-bold text-white mb-4">Creativity Complete!</h2>
          <div className="text-4xl font-bold text-yellow-400 mb-4">{score} Points</div>
          <p className="text-white/60 mb-6">
            You completed {prompts.length} creative challenges!
          </p>
          <div className="flex gap-3">
            <button
              onClick={resetGame}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Create Again
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
          <h2 className="text-2xl font-bold text-white">Emoji Creativity Challenge</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/60">Challenge {currentPrompt + 1}/{prompts.length}</span>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold">{score}</span>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-6 mb-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Palette className="w-6 h-6 text-purple-400" />
              <span className="text-purple-400">{currentPromptData.theme}</span>
            </div>
            
            <div className="text-white mb-4">{currentPromptData.description}</div>
            
            <div className="mb-4">
              <div className="text-white/60 text-sm mb-2">Required Emojis:</div>
              <div className="flex items-center justify-center gap-2">
                {currentPromptData.requiredEmojis.map((emoji, index) => (
                  <span key={index} className="text-3xl">{emoji}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs px-2 py-1 rounded-full ${
              currentPromptData.difficulty === 'Easy' ? 'bg-green-400/20 text-green-400' :
              currentPromptData.difficulty === 'Medium' ? 'bg-yellow-400/20 text-yellow-400' :
              'bg-red-400/20 text-red-400'
            }`}>
              {currentPromptData.difficulty}
            </span>
            <div className="text-white/60">⏱️ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>
          </div>

          <div className="w-full bg-white/20 rounded-full h-2 mb-6">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(timeLeft / 180) * 100}%` }}
            />
          </div>
        </div>

        <div className="mb-6">
          <textarea
            value={userCreation}
            onChange={(e) => setUserCreation(e.target.value)}
            placeholder="Create your emoji masterpiece here! Use the required emojis and add your own creative touch..."
            className="w-full h-40 bg-white/10 border border-white/20 rounded-lg p-4 text-white placeholder-white/40 resize-none text-lg"
            disabled={showResult}
          />
        </div>

        {!showResult && (
          <button
            onClick={handleSubmit}
            disabled={userCreation.length < 10}
            className="w-full bg-purple-500 hover:bg-purple-600 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Submit Creation
          </button>
        )}

        {showResult && (
          <div className="text-center">
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-4">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-green-400 font-bold mb-2">Amazing creativity!</div>
              <div className="text-white/60 text-sm">
                Required emojis used: {currentPromptData.requiredEmojis.filter(emoji => userCreation.includes(emoji)).length}/{currentPromptData.requiredEmojis.length}
              </div>
            </div>
          </div>
        )}

        <div className="text-center text-white/60 text-xs">
          Use all required emojis for bonus points! Be creative and tell a story.
        </div>
      </div>
    </div>
  );
};

export default EmojiCreativityChallenge;