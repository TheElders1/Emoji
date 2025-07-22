import React, { useState, useEffect } from 'react';
import { RotateCcw, Star, RotateCw, FlipHorizontal, X } from 'lucide-react';

interface GridPiece {
  id: number;
  emoji: string;
  rotation: number;
  flipped: boolean;
  x: number;
  y: number;
}

interface EmojiMirrorFlipProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const EmojiMirrorFlip: React.FC<EmojiMirrorFlipProps> = ({ onComplete, onClose }) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [playerGrid, setPlayerGrid] = useState<GridPiece[]>([]);
  const [targetGrid, setTargetGrid] = useState<GridPiece[]>([]);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);

  const levels = [
    { size: 2, emojis: ['🔴', '🔵'], difficulty: 'Easy' },
    { size: 3, emojis: ['🔴', '🔵', '🟡'], difficulty: 'Medium' },
    { size: 3, emojis: ['🔴', '🔵', '🟡', '🟢'], difficulty: 'Hard' }
  ];

  useEffect(() => {
    initializeLevel();
  }, [currentLevel]);

  useEffect(() => {
    if (timeLeft > 0 && !gameComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameComplete(true);
    }
  }, [timeLeft, gameComplete]);

  const initializeLevel = () => {
    const level = levels[currentLevel];
    const size = level.size;
    const pieces: GridPiece[] = [];
    
    // Create target grid
    for (let i = 0; i < size * size; i++) {
      const emoji = level.emojis[Math.floor(Math.random() * level.emojis.length)];
      pieces.push({
        id: i,
        emoji,
        rotation: Math.floor(Math.random() * 4) * 90,
        flipped: Math.random() > 0.5,
        x: i % size,
        y: Math.floor(i / size)
      });
    }
    
    setTargetGrid([...pieces]);
    
    // Create scrambled player grid
    const scrambledPieces = pieces.map(piece => ({
      ...piece,
      rotation: Math.floor(Math.random() * 4) * 90,
      flipped: Math.random() > 0.5
    }));
    
    setPlayerGrid(scrambledPieces);
    setSelectedPiece(null);
  };

  const rotatePiece = (pieceId: number) => {
    setPlayerGrid(prev => prev.map(piece => 
      piece.id === pieceId 
        ? { ...piece, rotation: (piece.rotation + 90) % 360 }
        : piece
    ));
  };

  const flipPiece = (pieceId: number) => {
    setPlayerGrid(prev => prev.map(piece => 
      piece.id === pieceId 
        ? { ...piece, flipped: !piece.flipped }
        : piece
    ));
  };

  const checkSolution = () => {
    const isCorrect = playerGrid.every(playerPiece => {
      const targetPiece = targetGrid.find(t => t.id === playerPiece.id);
      return targetPiece && 
             playerPiece.rotation === targetPiece.rotation &&
             playerPiece.flipped === targetPiece.flipped;
    });

    if (isCorrect) {
      const points = 300 + timeLeft * 5;
      setScore(score + points);
      
      if (currentLevel < levels.length - 1) {
        setCurrentLevel(currentLevel + 1);
        setTimeLeft(120);
      } else {
        setGameComplete(true);
      }
    }
  };

  const resetGame = () => {
    setCurrentLevel(0);
    setScore(0);
    setGameComplete(false);
    setTimeLeft(120);
    initializeLevel();
  };

  if (gameComplete) {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-3xl p-8 border border-purple-500/30 max-w-md w-full mx-4 text-center">
          <div className="text-6xl mb-4">🪞</div>
          <h2 className="text-3xl font-bold text-white mb-4">Mirror Mastered!</h2>
          <div className="text-4xl font-bold text-yellow-400 mb-6">{score} Points</div>
          <div className="flex gap-3">
            <button
              onClick={resetGame}
              className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
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

  const currentLevelData = levels[currentLevel];
  const gridSize = currentLevelData.size;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-3xl p-6 border border-purple-500/30 w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🪞</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Emoji Mirror Flip</h1>
              <p className="text-purple-300">Rotate and flip to match the target</p>
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
            <div className="text-white/60">⏱️ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${
            currentLevelData.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
            currentLevelData.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {currentLevelData.difficulty}
          </span>
        </div>

        {/* Game Area */}
        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-8 w-full max-w-4xl">
            {/* Target Grid */}
            <div className="bg-black/30 rounded-2xl p-6">
              <h3 className="text-white text-center mb-4">Target Pattern</h3>
              <div 
                className="grid gap-2 mx-auto"
                style={{ 
                  gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                  maxWidth: `${gridSize * 60}px`
                }}
              >
                {targetGrid.map((piece) => (
                  <div
                    key={piece.id}
                    className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-2xl"
                    style={{
                      transform: `rotate(${piece.rotation}deg) ${piece.flipped ? 'scaleX(-1)' : ''}`
                    }}
                  >
                    {piece.emoji}
                  </div>
                ))}
              </div>
            </div>

            {/* Player Grid */}
            <div className="bg-black/30 rounded-2xl p-6">
              <h3 className="text-white text-center mb-4">Your Pattern</h3>
              <div 
                className="grid gap-2 mx-auto mb-4"
                style={{ 
                  gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                  maxWidth: `${gridSize * 60}px`
                }}
              >
                {playerGrid.map((piece) => (
                  <button
                    key={piece.id}
                    onClick={() => setSelectedPiece(piece.id)}
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-all ${
                      selectedPiece === piece.id
                        ? 'bg-purple-500/30 border-2 border-purple-400'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                    style={{
                      transform: `rotate(${piece.rotation}deg) ${piece.flipped ? 'scaleX(-1)' : ''}`
                    }}
                  >
                    {piece.emoji}
                  </button>
                ))}
              </div>

              {/* Controls */}
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => selectedPiece !== null && rotatePiece(selectedPiece)}
                  disabled={selectedPiece === null}
                  className="bg-purple-500 hover:bg-purple-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <RotateCw className="w-4 h-4" />
                  Rotate
                </button>
                <button
                  onClick={() => selectedPiece !== null && flipPiece(selectedPiece)}
                  disabled={selectedPiece === null}
                  className="bg-pink-500 hover:bg-pink-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <FlipHorizontal className="w-4 h-4" />
                  Flip
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Check Solution Button */}
        <div className="text-center">
          <button
            onClick={checkSolution}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl transition-colors"
          >
            Check Solution
          </button>
        </div>

        {/* Progress */}
        <div className="text-center text-white/60 mt-4">
          Level {currentLevel + 1} of {levels.length}
        </div>
      </div>
    </div>
  );
};

export default EmojiMirrorFlip;