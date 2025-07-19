import React, { useState, useEffect } from 'react';
import { RotateCcw, Star, Trophy, Zap } from 'lucide-react';

interface BingoCell {
  emoji: string;
  marked: boolean;
}

interface EmojiBingoProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const EmojiBingo: React.FC<EmojiBingoProps> = ({ onComplete, onClose }) => {
  const [bingoCard, setBingoCard] = useState<BingoCell[][]>([]);
  const [calledEmojis, setCalledEmojis] = useState<string[]>([]);
  const [currentCall, setCurrentCall] = useState<string>('');
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [completedLines, setCompletedLines] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [autoCall, setAutoCall] = useState(true);

  const allEmojis = [
    '🎮', '🎯', '🎪', '🎨', '🎭', '🎲', '🎸', '🎺', '🎻', '🎤',
    '🎧', '🎬', '🎭', '🎪', '🎨', '🎯', '🎮', '🎲', '🎸', '🎺',
    '🌟', '⭐', '✨', '💫', '🌙', '☀️', '🌈', '🔥', '💎', '👑',
    '🏆', '🥇', '🥈', '🥉', '🎖️', '🏅', '🎗️', '🎀', '🎁', '🎉',
    '🎊', '🎈', '🎂', '🍰', '🧁', '🍭', '🍬', '🍫', '🍩', '🍪'
  ];

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !gameComplete && autoCall) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        if (timeLeft % 3 === 0) { // Call new emoji every 3 seconds
          callNextEmoji();
        }
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameComplete(true);
    }
  }, [timeLeft, gameComplete, autoCall]);

  const initializeGame = () => {
    // Create 5x5 bingo card with random emojis
    const shuffled = [...allEmojis].sort(() => Math.random() - 0.5);
    const card: BingoCell[][] = [];
    
    for (let i = 0; i < 5; i++) {
      const row: BingoCell[] = [];
      for (let j = 0; j < 5; j++) {
        row.push({
          emoji: shuffled[i * 5 + j],
          marked: i === 2 && j === 2 // Center is free space
        });
      }
      card.push(row);
    }
    
    setBingoCard(card);
    setCalledEmojis([]);
    setCurrentCall('');
    setScore(0);
    setGameComplete(false);
    setCompletedLines(0);
    setTimeLeft(180);
  };

  const callNextEmoji = () => {
    const availableEmojis = allEmojis.filter(emoji => !calledEmojis.includes(emoji));
    if (availableEmojis.length === 0) return;
    
    const nextEmoji = availableEmojis[Math.floor(Math.random() * availableEmojis.length)];
    setCurrentCall(nextEmoji);
    setCalledEmojis(prev => [...prev, nextEmoji]);
  };

  const markCell = (row: number, col: number) => {
    if (gameComplete) return;
    
    const cell = bingoCard[row][col];
    if (cell.marked || !calledEmojis.includes(cell.emoji)) return;
    
    const newCard = [...bingoCard];
    newCard[row][col] = { ...cell, marked: true };
    setBingoCard(newCard);
    
    // Check for completed lines
    checkForBingo(newCard);
  };

  const checkForBingo = (card: BingoCell[][]) => {
    let newCompletedLines = 0;
    
    // Check rows
    for (let i = 0; i < 5; i++) {
      if (card[i].every(cell => cell.marked)) {
        newCompletedLines++;
      }
    }
    
    // Check columns
    for (let j = 0; j < 5; j++) {
      if (card.every(row => row[j].marked)) {
        newCompletedLines++;
      }
    }
    
    // Check diagonals
    if (card.every((row, i) => row[i].marked)) {
      newCompletedLines++;
    }
    if (card.every((row, i) => row[4 - i].marked)) {
      newCompletedLines++;
    }
    
    if (newCompletedLines > completedLines) {
      const linesCompleted = newCompletedLines - completedLines;
      setScore(score + linesCompleted * 500);
      setCompletedLines(newCompletedLines);
      
      if (newCompletedLines >= 5) { // Full card
        setGameComplete(true);
        setScore(score + 2000); // Bonus for full card
      }
    }
  };

  if (gameComplete) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold text-white mb-4">
            {completedLines >= 5 ? 'FULL HOUSE!' : 'Time\'s Up!'}
          </h2>
          <div className="text-4xl font-bold text-yellow-400 mb-4">{score} Points</div>
          <div className="space-y-2 text-white/60 mb-6">
            <p>Lines Completed: {completedLines}</p>
            <p>Emojis Called: {calledEmojis.length}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={initializeGame}
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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-4xl w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Emoji Bingo</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bingo Card */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-5 gap-2">
                {bingoCard.map((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    <button
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() => markCell(rowIndex, colIndex)}
                      className={`aspect-square rounded-lg border-2 text-2xl transition-all duration-200 ${
                        cell.marked
                          ? 'bg-green-500/30 border-green-500 text-green-400'
                          : calledEmojis.includes(cell.emoji)
                          ? 'bg-yellow-500/20 border-yellow-500 hover:bg-yellow-500/30'
                          : 'bg-white/10 border-white/20 hover:bg-white/20'
                      } ${rowIndex === 2 && colIndex === 2 ? 'bg-purple-500/30 border-purple-500' : ''}`}
                    >
                      {rowIndex === 2 && colIndex === 2 ? '⭐' : cell.emoji}
                    </button>
                  ))
                )}
              </div>
            </div>
            
            <div className="text-center text-white/60 text-sm">
              Click emojis when they're called! ⭐ is a free space.
            </div>
          </div>

          {/* Game Info */}
          <div className="space-y-4">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 font-bold">{score}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-green-400" />
                  <span className="text-white">{completedLines}</span>
                </div>
              </div>
              
              <div className="text-center mb-4">
                <div className="text-white/60 text-sm mb-1">Time Left</div>
                <div className="text-2xl font-bold text-white">
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </div>
              </div>

              <div className="w-full bg-white/20 rounded-full h-2 mb-4">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(timeLeft / 180) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-center mb-4">
                <div className="text-white/60 text-sm mb-2">Current Call</div>
                <div className="text-6xl mb-2">{currentCall || '🎲'}</div>
                <button
                  onClick={callNextEmoji}
                  disabled={autoCall}
                  className="bg-purple-500 hover:bg-purple-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm"
                >
                  <Zap className="w-4 h-4 inline mr-1" />
                  Call Next
                </button>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-white/60 text-sm mb-2">Called Emojis ({calledEmojis.length})</div>
              <div className="grid grid-cols-5 gap-1 max-h-32 overflow-y-auto">
                {calledEmojis.map((emoji, index) => (
                  <div key={index} className="text-lg text-center p-1 bg-white/10 rounded">
                    {emoji}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-white/60 text-sm mb-2">How to Play</div>
              <ul className="text-xs text-white/60 space-y-1">
                <li>• Mark emojis when called</li>
                <li>• Complete rows, columns, or diagonals</li>
                <li>• Center star is free</li>
                <li>• Full house = bonus points!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmojiBingo;