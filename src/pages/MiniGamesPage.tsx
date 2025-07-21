import React, { useState } from 'react';
import { Gamepad2, Star, Trophy, Brain, Zap } from 'lucide-react';
import EmojiCipher from '../components/minigames/EmojiCipher';
import EmojiEquationSolver from '../components/minigames/EmojiEquationSolver';
import EmojiLogicGrid from '../components/minigames/EmojiLogicGrid';

interface MiniGamesPageProps {
  onEarnCoins: (amount: number) => void;
}

const MiniGamesPage: React.FC<MiniGamesPageProps> = ({ onEarnCoins }) => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const games = [
    {
      id: 1,
      title: 'Emoji Cipher',
      description: 'Decode secret messages using emoji alphabet',
      icon: '🔐',
      difficulty: 'Hard',
      reward: 200,
      component: 'EmojiCipher'
    },
    {
      id: 2,
      title: 'Emoji Equation Solver',
      description: 'Solve mathematical puzzles with emoji variables',
      icon: '🧩',
      difficulty: 'Hard',
      reward: 300,
      component: 'EmojiEquationSolver'
    },
    {
      id: 3,
      title: 'Emoji Logic Grid',
      description: 'Use deductive reasoning to solve logic puzzles',
      icon: '🎯',
      difficulty: 'Hard',
      reward: 400,
      component: 'EmojiLogicGrid'
    },
    {
      id: 4,
      title: 'Emoji Sequence Puzzle',
      description: 'Find hidden patterns in emoji sequences',
      icon: '🧠',
      difficulty: 'Hard',
      reward: 250,
      component: null
    },
    {
      id: 5,
      title: 'Emoji Mirror Flip',
      description: 'Rotate and flip emojis to match patterns',
      icon: '🪞',
      difficulty: 'Hard',
      reward: 220,
      component: null
    },
    {
      id: 6,
      title: 'Emoji Chat Decryption',
      description: 'Decode emoji conversations and idioms',
      icon: '💬',
      difficulty: 'Hard',
      reward: 280,
      component: null
    },
    {
      id: 7,
      title: 'Timed Emoji Memory',
      description: 'Rebuild emoji grids from memory under pressure',
      icon: '⌛',
      difficulty: 'Hard',
      reward: 320,
      component: null
    },
    {
      id: 8,
      title: 'Emoji Pattern Lock',
      description: 'Remember emoji sequences with color coding',
      icon: '🔄',
      difficulty: 'Hard',
      reward: 260,
      component: null
    },
    {
      id: 9,
      title: 'Emoji Spot-the-Imposter',
      description: 'Find the different emoji among similar ones',
      icon: '🔍',
      difficulty: 'Hard',
      reward: 180,
      component: null
    },
    {
      id: 10,
      title: 'Emoji Anagram Challenge',
      description: 'Rearrange emojis to form meaningful phrases',
      icon: '🔠',
      difficulty: 'Hard',
      reward: 240,
      component: null
    },
    {
      id: 11,
      title: 'Emoji Master Code',
      description: 'Crack the emoji code using logical elimination',
      icon: '🔐',
      difficulty: 'Hard',
      reward: 350,
      component: null
    },
    {
      id: 12,
      title: 'Emoji Algebra Maze',
      description: 'Navigate paths while solving mathematical equations',
      icon: '🧮',
      difficulty: 'Hard',
      reward: 380,
      component: null
    },
    {
      id: 13,
      title: 'Emoji Detective',
      description: 'Solve crime scenes using emoji evidence',
      icon: '🕵️',
      difficulty: 'Hard',
      reward: 420,
      component: null
    },
    {
      id: 14,
      title: 'Emoji Tetris (No Rotate)',
      description: 'Play Tetris with emojis but no rotation allowed',
      icon: '📦',
      difficulty: 'Hard',
      reward: 300,
      component: null
    },
    {
      id: 15,
      title: 'Emoji Sequence Hack',
      description: 'Find missing emojis in complex sequences',
      icon: '🎲',
      difficulty: 'Hard',
      reward: 290,
      component: null
    },
    {
      id: 16,
      title: 'Frozen Emoji Tiles',
      description: 'Slide frozen tiles with limited moves',
      icon: '🧊',
      difficulty: 'Hard',
      reward: 270,
      component: null
    },
    {
      id: 17,
      title: 'Emoji Reverse Recall',
      description: 'Remember and tap emojis in reverse order',
      icon: '🔂',
      difficulty: 'Hard',
      reward: 230,
      component: null
    },
    {
      id: 18,
      title: 'Emoji Language Translation',
      description: 'Translate emoji poetry to full sentences',
      icon: '🎓',
      difficulty: 'Hard',
      reward: 360,
      component: null
    },
    {
      id: 19,
      title: 'Emoji Escape Room',
      description: 'Solve layered puzzles to escape emoji rooms',
      icon: '🔥',
      difficulty: 'Hard',
      reward: 450,
      component: null
    },
    {
      id: 20,
      title: 'Emoji Word Trap',
      description: 'Guess phrases while avoiding trap letters',
      icon: '🚫',
      difficulty: 'Hard',
      reward: 340,
      component: null
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    return 'text-red-400 bg-red-400/20';
  };

  const handleGameSelect = (game: any) => {
    if (game.component) {
      setActiveGame(game.component);
    } else {
      // Show coming soon modal for unimplemented games
      alert(`${game.title} is coming soon! This advanced puzzle game is currently in development.`);
    }
  };

  const handleGameComplete = (score: number) => {
    onEarnCoins(score);
    setActiveGame(null);
  };

  const handleGameClose = () => {
    setActiveGame(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <div className="flex items-center gap-3 mb-6">
          <Brain className="w-8 h-8 text-purple-400" />
          <div>
            <h1 className="text-3xl font-bold text-white">Hard Emoji Puzzles</h1>
            <p className="text-white/60">Challenge your mind with these brain-bending emoji games!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-white/10 rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-200 cursor-pointer group transform hover:scale-105"
              onClick={() => handleGameSelect(game)}
            >
              <div className="text-center mb-3">
                <div className="text-4xl mb-2">{game.icon}</div>
                <h3 className="font-bold text-white group-hover:text-yellow-400 transition-colors text-sm">
                  {game.title}
                </h3>
              </div>
              
              <p className="text-xs text-white/60 mb-3 text-center line-clamp-2">
                {game.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(game.difficulty)}`}>
                  {game.difficulty}
                </span>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-3 h-3" />
                  <span className="text-xs font-bold">{game.reward}</span>
                </div>
              </div>
              
              {!game.component && (
                <div className="mt-2 text-center">
                  <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                    Coming Soon
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Game Stats */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-400" />
          Puzzle Challenge Stats
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-red-400">20</div>
            <div className="text-xs text-white/60">Total Puzzles</div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-yellow-400">3</div>
            <div className="text-xs text-white/60">Available Now</div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-400">Hard</div>
            <div className="text-xs text-white/60">Difficulty</div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-purple-400">450</div>
            <div className="text-xs text-white/60">Max Reward</div>
          </div>
        </div>
      </div>

      {/* Active Game Components */}
      {activeGame === 'EmojiCipher' && (
        <EmojiCipher onComplete={handleGameComplete} onClose={handleGameClose} />
      )}
      {activeGame === 'EmojiEquationSolver' && (
        <EmojiEquationSolver onComplete={handleGameComplete} onClose={handleGameClose} />
      )}
      {activeGame === 'EmojiLogicGrid' && (
        <EmojiLogicGrid onComplete={handleGameComplete} onClose={handleGameClose} />
      )}
    </div>
  );
};

export default MiniGamesPage;