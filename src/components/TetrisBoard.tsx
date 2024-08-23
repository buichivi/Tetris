import React, { useCallback, useMemo } from 'react';
import CellItem from './Cell';
import useTetris from '../hooks/useTetris';
import TetrominoBlock from './Tetromino';
import { usePlayer } from '../hooks/usePlayer';
import useInterval from '../hooks/useInterval';
import TetrominoShadow from './TetrominoShadow';

type Props = {
  isGameOver: boolean;
  resetGameOver: () => void;
};

const TetrisBoard: React.FC<Props> = ({ isGameOver, resetGameOver }) => {
  const { points, level, board, lines, handleCollision } = useTetris();
  const {
    player,
    createNewPlayer,
    drop,
    isColliding,
    rotateAndMoveTetromino,
    isCreateNewPlayer,
    getShadowPlayerPosition,
  } = usePlayer();

  useInterval(() => {
    if (!isGameOver) {
      drop();
      if (isColliding(board)) {
        handleCollision(player);
        createNewPlayer();
        if (!isCreateNewPlayer(board)) resetGameOver();
      }
    }
  }, 1500);

  const handleChangeTetromino = useCallback(
    (e: React.KeyboardEvent) =>
      !isGameOver && rotateAndMoveTetromino(e, board, handleCollision),
    [isGameOver, board, rotateAndMoveTetromino, handleCollision]
  );

  const shadowPosition: { x: number; y: number } = useMemo(() => {
    return getShadowPlayerPosition(board);
  }, [board, getShadowPlayerPosition]);

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
        <div className="w-fit h-fit shrink-0 border relative flex flex-col overflow-hidden">
          {memoizedBoard}
          <TetrominoBlock player={player} />
          <TetrominoShadow player={player} shadowPosition={shadowPosition} />
        </div>
      </div>
      <div>
        <div className="flex flex-col justify-start">
          <div>Level: {level}</div>
          <div></div>
          <div>Points: {points}</div>
        </div>
      </div>
      <input
        type="text"
        className="opacity-0 absolute"
        autoFocus
        onKeyDown={handleChangeTetromino}
      />
    </div>
  );
};

export default TetrisBoard;
