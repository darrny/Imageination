import { useState, useEffect } from "react";

const DotGame = () => {
  const [score, setScore] = useState(0);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [highScore, setHighScore] = useState(0);

  const moveDot = () => {
    setPosition({
      x: Math.random() * 90 + 5,
      y: Math.random() * 90 + 5
    });
    const newScore = score + 1;
    setScore(newScore);
    if (newScore > highScore) {
      setHighScore(newScore);
      localStorage.setItem('dotGameHighScore', newScore.toString());
    }
  };

  useEffect(() => {
    const savedHighScore = localStorage.getItem('dotGameHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
    moveTarget();
  }, []);

  const moveTarget = () => {
    setPosition({
      x: Math.random() * 90 + 5,
      y: Math.random() * 90 + 5
    });
  };

  return (
    <div className="w-full max-w-md mx-auto mt-4 bg-green-100 p-4 rounded-lg">
      <div className="flex justify-between mb-2 text-green-700">
        <span>Score: {score}</span>
        <span>High Score: {highScore}</span>
      </div>
      <div className="relative w-full h-48 bg-white rounded-lg overflow-hidden">
        <div
          className="absolute w-6 h-6 bg-green-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 hover:bg-green-600 transition-colors cursor-pointer"
          style={{ 
            left: `${position.x}%`, 
            top: `${position.y}%`,
          }}
          onClick={moveDot}
          onMouseEnter={moveDot}
        />
      </div>
      <p className="text-center mt-2 text-sm text-green-700">Hover or click the dot to catch it!</p>
    </div>
  );
};

export default DotGame;