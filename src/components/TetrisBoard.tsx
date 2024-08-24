import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CellItem from './Cell';
import useTetris from '../hooks/useTetris';
import TetrominoBlock from './Tetromino';
import { usePlayer } from '../hooks/usePlayer';
import useInterval from '../hooks/useInterval';
import TetrominoShadow from './TetrominoShadow';
import { CELL_SIZE, COL, RemoveMessages, ROW } from '../Types';

type Props = {
  isGameOver: boolean;
  resetGameOver: () => void;
};

const TetrisBoard: React.FC<Props> = ({ isGameOver, resetGameOver }) => {
  const { points, isRemovingLines, level, board, handleCollision } =
    useTetris();
  const {
    player,
    createNewPlayer,
    drop,
    isColliding,
    rotateAndMoveTetromino,
    isCreateNewPlayer,
    getShadowPlayerPosition,
    calcDropTime,
    isFastDroping,
    isHoldingKey,
    onReleaseKey,
  } = usePlayer();
  const [isCollision, setIsCollision] = useState(false);
  const [removingLines, setRemovingLines] = useState(0);

  useInterval(() => {
    if (!isGameOver) {
      drop();
      if (isColliding(board)) {
        handleCollision(player);
        setIsCollision(true);
        setTimeout(() => {
          setIsCollision(false);
        }, 150);
        createNewPlayer();
        if (!isCreateNewPlayer(board)) resetGameOver();
      }
    }
  }, calcDropTime(level) * 1000);

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

  useEffect(() => {
    if (isRemovingLines) {
      setRemovingLines(isRemovingLines);
      setTimeout(() => {
        setRemovingLines(0);
      }, 3000);
    }
  }, [isRemovingLines]);

  return (
    <div
      className={`max-w-1/2 min-w-[500px] min-h-[400px] text-white flex items-start justify-center relative ${
        isFastDroping || isCollision
          ? isRemovingLines
            ? 'translate-y-3'
            : 'translate-y-1'
          : 'translate-y-0'
      } ${
        isHoldingKey
          ? player.position.x <= 0
            ? '-translate-x-2'
            : player.position.x + player.tetromino.shape[0].length >= COL
            ? 'translate-x-2'
            : 'translate-x-0'
          : 'translate-x-0'
      } transition-all ease-out duration-150`}
    >
      <div
        className="w-fit relative flex flex-col"
        style={{ height: ROW * CELL_SIZE }}
      >
        <span
          className={`absolute top-40 right-0 text-3xl ${
            removingLines &&
            '[animation:appearingMessage_ease-out_3s_alternate]'
          } uppercase`}
        >
          {RemoveMessages[removingLines]}
        </span>
        <h2 className="text-left pl-1 bg-white text-black font-semibold uppercase tracking-wider">
          Hold
        </h2>
        <div className="border-2 bg-[#0000008e] size-24 overflow-hidden border-r-0 px-2 py-3 relative before:content-[''] before:rotate-45 before:-translate-x-7 before:translate-y-7 before:absolute before:z-10 before:bottom-0 before:left-0 before:size-10 before:bg-transparent before:border-t-2 before:border-t-white [clip-path:polygon(0_0,100%_0,100%_100%,13.3%_100%,0_86.6%)]">
          <div className="w-24 h-16 relative flex flex-col">
            {player.holdTetromino && (
              <TetrominoBlock
                player={{
                  position: { x: 0, y: 0 },
                  tetromino: {
                    ...player.holdTetromino,
                    shape: player.holdTetromino.shape.filter((row) =>
                      row.some((cell) => cell === 1)
                    ),
                  },
                }}
                isPreviewBlock={true}
                className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col justify-end flex-1 items-end pr-2">
          <div className="*:block text-right">
            <span className="uppercase tracking-widest font-semibold">
              Level
            </span>
            <span className="text-4xl">{level}</span>
          </div>
          <div className="*:block text-right">
            <span className="uppercase tracking-widest font-semibold">
              Points
            </span>
            <span className="text-4xl">{points}</span>
          </div>
        </div>
      </div>
      <div className="max-w-1/2 w-fit h-full overflow-hidden flex flex-col justify-end bg-[#0008]">
        <div className="w-fit h-fit shrink-0 border-2 border-t-0 relative flex flex-col overflow-hidden">
          {memoizedBoard}
          <TetrominoBlock player={player} />
          <TetrominoShadow player={player} shadowPosition={shadowPosition} />
        </div>
      </div>
      <div className="flex flex-col h-full">
        <h2 className="pl-1 bg-white text-black font-semibold uppercase tracking-wider">
          Next
        </h2>
        <div className="border-2 bg-[#0000008e] border-l-0 overflow-hidden px-2 py-3 relative before:content-[''] before:translate-x-7 before:translate-y-7 before:rotate-45 before:absolute before:z-10 before:bottom-0 before:right-0 before:size-10 before:bg-black before:border-l-2 before:border-l-white [clip-path:polygon(0_0,100%_0,100%_96.3%,88.5%_100%,0_100%,0%_50%)]">
          {player.nextTetrominos.slice(0, 5).map((tetromino, index) => {
            return (
              <div className="w-24 h-16 relative flex flex-col" key={index}>
                <TetrominoBlock
                  player={{
                    position: { x: 0, y: 0 },
                    tetromino: {
                      ...tetromino,
                      shape: tetromino.shape.filter((row) =>
                        row.some((cell) => cell === 1)
                      ),
                    },
                  }}
                  isPreviewBlock={true}
                  className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
            );
          })}
        </div>
      </div>
      <input
        type="text"
        className="absolute top-0 left-0 opacity-0 cursor-default max-w-[50vw] min-w-[500px] min-h-[400px]"
        style={{ height: ROW * CELL_SIZE }}
        autoFocus
        onKeyDown={handleChangeTetromino}
        onKeyUp={onReleaseKey}
      />
    </div>
  );
};

export default TetrisBoard;
