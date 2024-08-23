import { useState } from 'react';
import { COL, Player, randomTetromino, ROW, Tetromino } from '../Types';
import { Cell } from './useTetris';

enum Key {
  UP = 'ArrowUp',
  DOWN = 'ArrowDown',
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight',
  SPACE = 'Space',
}

const createPlayer = (): Player => {
  const position = { x: 4, y: 0 };
  const tetromino = randomTetromino();
  let fakeRowTop: number = 0;
  for (let i = 0; i < tetromino.shape.length; i++) {
    if (tetromino.shape[i].every((cell) => cell === 0)) fakeRowTop++;
    else break;
  }
  return {
    position: { ...position, y: position.y - fakeRowTop },
    tetromino,
  };
};

export const usePlayer = () => {
  const [player, setPlayer] = useState<Player>(createPlayer);

  const drop = (): void => {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      position: { ...prevPlayer.position, y: prevPlayer.position.y + 1 },
    }));
  };

  const createNewPlayer = (): void => {
    setPlayer(() => createPlayer());
  };

  const isCreateNewPlayer = (board: Cell[][]): boolean => {
    // for (let i = 0; i < )
  };

  const isColliding = (board: Cell[][]): boolean => {
    return isCollision(
      board,
      { ...player.position, y: player.position.y + 1 },
      player.tetromino.shape
    );
  };

  const rotate = (): void => {
    const newTetromino = rotateTetromino(player.tetromino);
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      tetromino: newTetromino,
    }));
  };

  const hardDrop = (board: Cell[][]): void => {
    const { shape } = player.tetromino;
    let newY = player.position.y;

    while (!isCollision(board, { ...player.position, y: newY + 1 }, shape)) {
      newY++;
    }
    setPlayer((prev) => ({ ...prev, position: { ...prev.position, y: newY } }));
  };

  const rotateAndMoveTetromino = (e: KeyboardEvent, board: Cell[][]): void => {
    switch (e.code) {
      case Key.UP:
        rotate();
        break;
      case Key.DOWN:
        if (player.position.y < ROW) drop();
        break;
      case Key.LEFT:
        moveHorizontally(-1, board);
        break;
      case Key.RIGHT:
        moveHorizontally(1, board);
        break;
      case Key.SPACE:
        hardDrop(board);
        break;
    }
  };

  const moveHorizontally = (direction: 1 | -1, board: Cell[][]): void => {
    setPlayer((prevPlayer) => {
      const newX = prevPlayer.position.x + direction;
      if (
        isValidMove(
          newX,
          prevPlayer.position.y,
          prevPlayer.tetromino.shape,
          board
        )
      ) {
        return {
          ...prevPlayer,
          position: { ...prevPlayer.position, x: newX },
        };
      }
      return prevPlayer;
    });
  };

  const isValidMove = (
    x: number,
    y: number,
    shape: number[][],
    board: Cell[][]
  ): boolean => {
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col] === 1) {
          const newX = x + col;
          const newY = y + row;
          if (
            newX < 0 ||
            newX >= COL ||
            newY >= ROW ||
            (board[newY] && board[newY][newX].type === 'tetromino-block')
          ) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const rotateTetromino = (tetromino: Tetromino): Tetromino => {
    const newShape = tetromino.shape[0].map((_, colIndex) =>
      tetromino.shape.map((row) => row[colIndex]).reverse()
    );

    const newX = Math.max(
      0,
      Math.min(player.position.x, COL - newShape[0].length)
    );

    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      position: { ...prevPlayer.position, x: newX },
    }));

    return { ...tetromino, shape: newShape };
  };

  const isCollision = (
    board: Cell[][],
    position: { x: number; y: number },
    shape: number[][]
  ): boolean => {
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          const newY = y + position.y;
          const newX = x + position.x;
          if (
            newY >= ROW ||
            newX < 0 ||
            newX >= COL ||
            (board[newY] && board[newY][newX].type === 'tetromino-block')
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  return {
    player,
    drop,
    isValidMove,
    isColliding,
    createNewPlayer,
    rotateAndMoveTetromino,
  };
};
