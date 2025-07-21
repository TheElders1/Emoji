import React, { useState, useEffect } from 'react';
import { X, Star, Clock, Grid3X3 } from 'lucide-react';

interface EmojiLogicGridProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const EmojiLogicGrid: React.FC<EmojiLogicGridProps> = ({ onComplete, onClose }) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: string]: string}>({});
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [gameComplete, setGameComplete] = useState(false);

  const logicPuzzles = [
    {
      clues: [
        'The 🧑‍🚀 eats 🍕 in the 🚀',
        'The 👨‍⚕️ drinks ☕ in the 🏥',
        'The 👨‍🍳 eats 🍝 in the 🍴'
      ],
      questions: [
        { question: 'Who eats pizza?', answer: '🧑‍🚀', options: ['🧑‍🚀', '👨‍⚕️', '👨‍🍳'] },
        { question: 'Where does the chef work?', answer: '🍴', options: ['🚀', '🏥', '🍴'] }
      ],
      difficulty: 'Easy'
    },
    {
      clues: [
        'The person in 🔴 house owns a 🐕',
        'The person in 🔵 house drinks 🥛',
        'The 🐱 owner lives next to the 🐕 owner',
        'The ☕ drinker lives in the middle house'
      ],
      questions: [
        { question: 'What does the red house owner have?', answer: '🐕', options: ['🐕', '🐱', '🐦'] },
        { question: 'What does the blue house owner drink?', answer: '🥛', options: ['☕', '🥛', '🧃'] }
      ],
      difficulty: 'Hard'
    }
  ];

  useEffect(() => {
    if (timeLeft > 0 && !gameComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameComplete(true);
    }
  }, [timeLeft, gameComplete]);

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleSubmit = () => {
    const currentPuzzle = logicPuzzles[currentLevel];
    let correctAnswers = 0;
    
    currentPuzzle.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.answer) {
        correctAnswers++;
      }
    });

    if (correctAnswers === currentPuzzle.questions.length) {
      const points = 400 + timeLeft * 2;
      setScore(score + points);
      
      if (currentLevel < logicPuzzles.length - 1) {
        setCurrentLevel(currentLevel + 1);
        setSelectedAnswers({});
        setTimeLeft(300);
      } else {
        setGameComplete(true);
      }
    }
  };

  if (gameComplete) {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-gradient-to-br from-green-900 to-blue-900 rounded-3xl p-8 border border-green-500/30 max-w-md w-full mx-4 text-center">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-3xl font-bold text-white mb-4">Logic Mastered!</h2>
          <div className="text-4xl font-bold text-yellow-400 mb-6">{score} Points</div>
          <button
            onClick={() => onComplete(score)}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 rounded-xl transition-all duration-200 transform hover:scale-105"
          >
            Claim Reward
          </button>
        </div>
      </div>
    );
  }

  const currentPuzzle = logicPuzzles[currentLevel];

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-green-900 to-blue-900 rounded-3xl p-6 border border-green-500/30 w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <Grid3X3 className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Emoji Logic Grid</h1>
              <p className="text-green-300">Solve using deductive reasoning</p>
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
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-400" />
              <span className="text-white">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${
            currentPuzzle.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {currentPuzzle.difficulty}
          </span>
        </div>

        {/* Logic Puzzle */}
        <div className="flex-1 overflow-y-auto">
          <div className="bg-black/30 rounded-2xl p-6 mb-6">
            <h3 className="text-xl text-white mb-4">Clues:</h3>
            <div className="space-y-3 mb-6">
              {currentPuzzle.clues.map((clue, index) => (
                <div key={index} className="bg-green-500/10 border border-green-500/30 rounded-xl p-3">
                  <p className="text-green-300 text-lg">{clue}</p>
                </div>
              ))}
            </div>

            <h3 className="text-xl text-white mb-4">Questions:</h3>
            <div className="space-y-4">
              {currentPuzzle.questions.map((question, qIndex) => (
                <div key={qIndex} className="bg-black/20 rounded-xl p-4">
                  <p className="text-white mb-3 text-lg">{question.question}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {question.options.map((option, oIndex) => (
                      <button
                        key={oIndex}
                        onClick={() => handleAnswerSelect(qIndex, option)}
                        className={`p-3 rounded-lg border transition-all ${
                          selectedAnswers[qIndex] === option
                            ? 'bg-green-500/30 border-green-500 text-green-300'
                            : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                        }`}
                      >
                        <span className="text-2xl">{option}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={Object.keys(selectedAnswers).length !== currentPuzzle.questions.length}
            className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors"
          >
            Submit Solution
          </button>
        </div>

        {/* Progress */}
        <div className="text-center text-white/60 mt-4">
          Puzzle {currentLevel + 1} of {logicPuzzles.length}
        </div>
      </div>
    </div>
  );
};

export default EmojiLogicGrid;