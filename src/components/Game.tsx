import { ReactElement } from 'react';
import useGameOver from '../hooks/useGameOver';
import TetrisBoard from './TetrisBoard';
const Game = (): ReactElement => {
  const { isGameOver, resetGameOver } = useGameOver();
  return (
    <div>
      {isGameOver ? (
        <button
          className="px-4 py-2 bg-purple-500 rounded-md hover:opacity-80"
          onClick={() => resetGameOver()}
        >
          Play game
        </button>
      ) : (
        <TetrisBoard isGameOver={isGameOver} resetGameOver={resetGameOver} />
      )}
    </div>
  );
};

export default Game;
