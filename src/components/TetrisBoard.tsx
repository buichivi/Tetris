import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import CellItem from './Cell';
import useTetris from '../hooks/useTetris';
import TetrominoBlock from './Tetromino';
import { usePlayer } from '../hooks/usePlayer';
import useInterval from '../hooks/useInterval';
import TetrominoShadow from './TetrominoShadow';

const TetrisBoard = (): ReactElement => {
  const { board, lines, handleCollision, removeCompletedLines } = useTetris();
  const { player, createNewPlayer, drop, isColliding, rotateAndMoveTetromino } =
    usePlayer();
  const [isPlaying, setIsPlaying] = useState(false);

  useInterval(() => {
    if (isPlaying) {
      drop();
    }
  }, 1000);

  useEffect(() => {
    if (isColliding(board)) {
      createNewPlayer();
      handleCollision(player);
      removeCompletedLines();
    }
  }, [
    player,
    board,
    createNewPlayer,
    handleCollision,
    isColliding,
    removeCompletedLines,
  ]);

  const handleChangeTetromino = useCallback(
    (e: KeyboardEvent) => isPlaying && rotateAndMoveTetromino(e, board),
    [isPlaying, board, rotateAndMoveTetromino]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleChangeTetromino);
    return () => window.removeEventListener('keydown', handleChangeTetromino);
  }, [handleChangeTetromino]);

  const pauseGame = () => {
    setIsPlaying(!isPlaying);
  };

  const memoizedBoard = useMemo(
    () =>
      board.map((row, rowIndex) => (
        <div key={rowIndex} className="flex shrink-0">
          {row.map((cell, colIndex) => (
            <CellItem key={colIndex} cell={cell} />
          ))}
        </div>
      )),
    [board]
  );

  return (
    <div className="max-w-1/2 min-w-[500px] min-h-[400px] text-white h-4/5 bg-[#0008] flex items-center justify-center relative">
      <div>
        Hold, stats
        <div>Lines {lines}</div>
      </div>
      <div className="w-1/2 h-full overflow-hidden flex flex-col justify-end">
        <div className="w-fit h-fit shrink-0 border-l border-t border-gray-500  relative flex flex-col overflow-hidden">
          {memoizedBoard}
          <TetrominoBlock player={player} />
          <TetrominoShadow player={player} board={board} />
        </div>
      </div>
      <div>
        <button
          onClick={pauseGame}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
};

export default TetrisBoard;
