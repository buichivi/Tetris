import { ReactElement, useCallback, useEffect, useState } from 'react';
import CellItem from './Cell';
import useTetris from '../hooks/useTetris';
import TetrominoBlock from './Tetromino';
import { usePlayer } from '../hooks/usePlayer';
import useInterval from '../hooks/useInterval';

const TetrisBoard = (): ReactElement => {
  const { board, handleCollison, removeCompletedLines } = useTetris();
  const { player, createNewPlayer, drop, isColliding, rotateAndMoveTetromino } = usePlayer();
  const [isPlaying, setIsPlaying] = useState(false);

  useInterval(() => {
    if (isPlaying) drop();
    console.log(player.position);
  }, 1000);

  useEffect(() => {
    if (isColliding(board)) {
      createNewPlayer();
      handleCollison(player);
      removeCompletedLines();
    }
  }, [player, board, createNewPlayer, handleCollison, isColliding, removeCompletedLines]);

  const handleChangeTetromino = useCallback(
    (e: KeyboardEvent) => rotateAndMoveTetromino(e, board),
    [board, rotateAndMoveTetromino]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleChangeTetromino);
    return () => window.removeEventListener('keydown', handleChangeTetromino);
  }, [handleChangeTetromino]);

  const pauseGame = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="max-w-1/2 min-w-[500px] min-h-[400px] text-white h-4/5 bg-[#0008] flex items-center justify-center relative">
      <div>Hold, stats</div>
      <div className="w-1/2 h-full overflow-hidden flex flex-col justify-end">
        <div className="w-fit h-fit shrink-0 border-l border-t relative flex flex-col overflow-hidden">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="flex shrink-0">
              {row.map((cell, colIndex) => (
                <CellItem key={colIndex} cell={cell} />
              ))}
            </div>
          ))}
          <TetrominoBlock position={player.position} tetromino={player.tetromino} />
        </div>
      </div>
      <div>
        <button onClick={pauseGame} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
};

export default TetrisBoard;
