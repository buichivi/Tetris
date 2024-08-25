import { ReactElement } from 'react';
import useGameOver from '../hooks/useGameOver';
import TetrisBoard from './TetrisBoard';
import { Sounds } from '../Types';
const Game = (): ReactElement => {
  const { isGameOver, resetGameOver } = useGameOver();
  return (
    <div className="">
      {isGameOver ? (
        <div className="w-[30vw] border-2 min-h-[50vh] flex-col bg-[#00000060] flex items-center justify-around">
          <img
            src="src/assets/images/tetris-logo-removebg-preview.png"
            alt=""
            className="max-w-[80%] w-[250px]"
          />
          <button
            className="px-4 py-2 bg-purple-500 rounded-md hover:opacity-80"
            onClick={() => {
              Sounds.hit.currentTime = 0;
              Sounds.hit.play();
              resetGameOver();
            }}
            onMouseEnter={() => {
              Sounds.hit.currentTime = 0;
              Sounds.hit.play();
            }}
            onMouseLeave={() => {
              Sounds.hit.pause();
              Sounds.hit.currentTime = 0;
            }}
          >
            Play game
          </button>
        </div>
      ) : (
        <TetrisBoard isGameOver={isGameOver} resetGameOver={resetGameOver} />
      )}
    </div>
  );
};

export default Game;
