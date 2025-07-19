import React, { useState } from 'react';
import { Gamepad2, Star, Trophy, Brain, Zap } from 'lucide-react';

const MiniGamesPage: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<number | null>(null);

  const games = [
    {
      id: 1,
      title: 'Guess the Emoji Story',
      description: 'Decode emoji stories and scenarios',
      icon: '📖',
      difficulty: 'Easy',
      reward: 50
    },
    {
      id: 2,
      title: 'Emoji Quiz',
      description: 'Guess movies, songs, and books from emojis',
      icon: '🎬',
      difficulty: 'Medium',
      reward: 100
    },
    {
      id: 3,
      title: 'Emoji Memory Game',
      description: 'Match pairs of emojis in this classic memory game',
      icon: '🧠',
      difficulty: 'Easy',
      reward: 75
    },
    {
      id: 4,
      title: 'Emoji Riddles',
      description: 'Solve challenging riddles represented through emojis',
      icon: '🔍',
      difficulty: 'Hard',
      reward: 150
    },
    {
      id: 5,
      title: 'Emoji Association',
      description: 'Connect related emojis in this quick-thinking game',
      icon: '🔗',
      difficulty: 'Medium',
      reward: 100
    },
    {
      id: 6,
      title: 'Emoji Pattern Recognition',
      description: 'Identify patterns in emoji sequences',
      icon: '🧩',
      difficulty: 'Hard',
      reward: 200
    },
    {
      id: 7,
      title: 'Emoji Trivia',
      description: 'Answer trivia questions with emoji answers',
      icon: '❓',
      difficulty: 'Medium',
      reward: 125
    },
    {
      id: 8,
      title: 'Emoji Bingo',
      description: 'Mark off emojis as they are called out',
      icon: '🎯',
      difficulty: 'Easy',
      reward: 60
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'Hard': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <div className="flex items-center gap-3 mb-6">
          <Gamepad2 className="w-8 h-8 text-purple-400" />
          <div>
            <h1 className="text-3xl font-bold text-white">Mini Games</h1>
            <p className="text-white/60">Play emoji games and earn rewards!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-white/10 rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-200 cursor-pointer group"
              onClick={() => setSelectedGame(game.id)}
            >
              <div className="text-center mb-3">
                <div className="text-4xl mb-2">{game.icon}</div>
                <h3 className="font-bold text-white group-hover:text-yellow-400 transition-colors">
                  {game.title}
                </h3>
              </div>
              
              <p className="text-sm text-white/60 mb-3 text-center">
                {game.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(game.difficulty)}`}>
                  {game.difficulty}
                </span>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-4 h-4" />
                  <span className="text-sm font-bold">{game.reward}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coming Soon Games */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-400" />
          Coming Soon
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Emoji Pictionary', icon: '🎨' },
            { name: 'Emoji Charades', icon: '🎭' },
            { name: 'Emoji Storytelling', icon: '📚' },
            { name: 'Emoji Word Chain', icon: '⛓️' },
            { name: 'Emoji Scavenger Hunt', icon: '🔍' },
            { name: 'Emoji Crossword', icon: '📝' },
            { name: 'Emoji Creativity Challenge', icon: '🎨' },
            { name: 'Emoji Mimicry', icon: '🎪' }
          ].map((game, index) => (
            <div
              key={index}
              className="bg-white/5 rounded-lg p-3 text-center border border-white/10 opacity-60"
            >
              <div className="text-2xl mb-1">{game.icon}</div>
              <div className="text-xs text-white/60">{game.name}</div>
            </div>
          ))}
        </div>
      </div>

      {selectedGame && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-md w-full">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">
              Game Coming Soon! 🚀
            </h3>
            <p className="text-white/60 text-center mb-6">
              This mini-game is currently in development. Stay tuned for updates!
            </p>
            <button
              onClick={() => setSelectedGame(null)}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniGamesPage;