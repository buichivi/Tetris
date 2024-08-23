import { useState } from 'react';

const useGameOver = () => {
  const [isGameOver, setIsGameOver] = useState(true);

  const resetGameOver = () => {
    setIsGameOver(!isGameOver);
  };

  return { isGameOver, resetGameOver };
};

export default useGameOver;
