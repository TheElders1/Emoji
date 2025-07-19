import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, Star, Film, Music, Book } from 'lucide-react';

interface QuizQuestion {
  emojis: string;
  answer: string;
  options: string[];
  category: 'movie' | 'song' | 'book';
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface EmojiQuizProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const EmojiQuiz: React.FC<EmojiQuizProps> = ({ onComplete, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25);

  const questions: QuizQuestion[] = [
    {
      emojis: "🦁👑🌍",
      answer: "The Lion King",
      options: ["The Lion King", "Madagascar", "Jungle Book", "Tarzan"],
      category: "movie",
      difficulty: "Easy"
    },
    {
      emojis: "🕷️👨🏠",
      answer: "Spider-Man",
      options: ["Batman", "Spider-Man", "Superman", "Iron Man"],
      category: "movie",
      difficulty: "Easy"
    },
    {
      emojis: "❄️👸🏰",
      answer: "Frozen",
      options: ["Frozen", "Snow White", "Cinderella", "Elsa"],
      category: "movie",
      difficulty: "Easy"
    },
    {
      emojis: "🚢💎❤️🌊",
      answer: "Titanic",
      options: ["Titanic", "Pearl Harbor", "The Notebook", "Casablanca"],
      category: "movie",
      difficulty: "Medium"
    },
    {
      emojis: "🎵💔😢",
      answer: "Someone Like You",
      options: ["Someone Like You", "Hello", "Rolling in the Deep", "Set Fire to the Rain"],
      category: "song",
      difficulty: "Medium"
    },
    {
      emojis: "🌈🦄✨",
      answer: "Unicorn",
      options: ["Fantasy", "Magic", "Unicorn", "Rainbow"],
      category: "song",
      difficulty: "Hard"
    },
    {
      emojis: "🧙‍♂️⚡🏰📚",
      answer: "Harry Potter",
      options: ["Lord of the Rings", "Harry Potter", "Chronicles of Narnia", "Game of Thrones"],
      category: "book",
      difficulty: "Easy"
    },
    {
      emojis: "🐰🕳️🎩☕",
      answer: "Alice in Wonderland",
      options: ["Alice in Wonderland", "Peter Rabbit", "Winnie the Pooh", "Charlie and the Chocolate Factory"],
      category: "book",
      difficulty: "Medium"
    },
    {
      emojis: "🌊🐋👨‍🦳",
      answer: "Moby Dick",
      options: ["Moby Dick", "Life of Pi", "The Old Man and the Sea", "20,000 Leagues Under the Sea"],
      category: "book",
      difficulty: "Hard"
    },
    {
      emojis: "🎭👻🏰🌹",
      answer: "The Phantom of the Opera",
      options: ["The Phantom of the Opera", "Beauty and the Beast", "Romeo and Juliet", "Hamlet"],
      category: "movie",
      difficulty: "Hard"
    }
  ];

  useEffect(() => {
    if (timeLeft > 0 && !showResult && !gameComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer('');
    }
  }, [timeLeft, showResult, gameComplete]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === questions[currentQuestion].answer) {
      const points = timeLeft > 18 ? 120 : timeLeft > 10 ? 90 : 60;
      setScore(score + points);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(25);
      } else {
        setGameComplete(true);
      }
    }, 2000);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameComplete(false);
    setTimeLeft(25);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'movie': return <Film className="w-4 h-4" />;
      case 'song': return <Music className="w-4 h-4" />;
      case 'book': return <Book className="w-4 h-4" />;
      default: return null;
    }
  };

  if (gameComplete) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎬</div>
          <h2 className="text-2xl font-bold text-white mb-4">Quiz Complete!</h2>
          <div className="text-4xl font-bold text-yellow-400 mb-4">{score} Points</div>
          <p className="text-white/60 mb-6">
            You answered {questions.length} emoji quiz questions!
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

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-lg w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Emoji Quiz</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/60">Question {currentQuestion + 1}/{questions.length}</span>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold">{score}</span>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4 mb-4">
            <div className="text-5xl mb-3">{currentQuestionData.emojis}</div>
            <div className="text-sm text-white/60">Guess the {currentQuestionData.category}!</div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {getCategoryIcon(currentQuestionData.category)}
              <span className="text-sm text-white/60 capitalize">{currentQuestionData.category}</span>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              currentQuestionData.difficulty === 'Easy' ? 'bg-green-400/20 text-green-400' :
              currentQuestionData.difficulty === 'Medium' ? 'bg-yellow-400/20 text-yellow-400' :
              'bg-red-400/20 text-red-400'
            }`}>
              {currentQuestionData.difficulty}
            </span>
            <div className="text-white/60">⏱️ {timeLeft}s</div>
          </div>

          <div className="w-full bg-white/20 rounded-full h-2 mb-6">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(timeLeft / 25) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          {currentQuestionData.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && handleAnswer(option)}
              disabled={showResult}
              className={`w-full p-3 rounded-lg border transition-all duration-200 text-left ${
                showResult
                  ? option === currentQuestionData.answer
                    ? 'bg-green-500/20 border-green-500 text-green-400'
                    : option === selectedAnswer
                    ? 'bg-red-500/20 border-red-500 text-red-400'
                    : 'bg-white/5 border-white/10 text-white/60'
                  : 'bg-white/10 border-white/20 hover:bg-white/20 text-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResult && option === currentQuestionData.answer && (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                )}
                {showResult && option === selectedAnswer && option !== currentQuestionData.answer && (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmojiQuiz;