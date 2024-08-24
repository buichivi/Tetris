import { useState } from 'react';
import {
  Cell,
  COL,
  DEFAULT_PLAYER_POSITION,
  Player,
  Position,
  randomTetrominos,
  ROW,
  Tetromino,
} from '../Types';

enum Key {
  UP = 'ArrowUp',
  DOWN = 'ArrowDown',
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight',
  SPACE = 'Space',
  SHIFTLEFT = 'ShiftLeft',
  SHIFTRIGHT = 'ShiftRight',
}

const initPlayer = (): Player => {
  const tetrominos: Tetromino[] = randomTetrominos();
  return {
    position: DEFAULT_PLAYER_POSITION,
    tetromino: tetrominos.shift() as Tetromino,
    nextTetrominos: tetrominos,
    holdTetromino: null,
  };
};

export const usePlayer = () => {
  const [player, setPlayer] = useState<Player>(initPlayer);
  const [frames] = useState(48);
  const [isFastDroping, setIsFastDroping] = useState(false);
  const [isHoldingKey, setIsHoldingKey] = useState(false);
  const [startHoldingKey, setStartHoldingKey] = useState(0);
  // const [holdTetromino, setHoldTetromino] = useState(null);

  const calcDropTime = (level: number): number => {
    return (frames - level * 5) / 60;
  };

  const drop = (): void => {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      position: { ...prevPlayer.position, y: prevPlayer.position.y + 1 },
    }));
  };

  const createNewPlayer = (): void => {
    setPlayer((prevPlayer) => {
      const tetrominos = prevPlayer.nextTetrominos;
      const newPlayer: Player = {
        position: DEFAULT_PLAYER_POSITION,
        tetromino: tetrominos.shift() as Tetromino,
        nextTetrominos: [],
        holdTetromino: prevPlayer.holdTetromino,
      };
      if (tetrominos.length <= 5) {
        newPlayer.nextTetrominos = [...tetrominos, ...randomTetrominos()];
      } else newPlayer.nextTetrominos = tetrominos;
      return newPlayer;
    });
  };

  const isColliding = (board: Cell[][]): boolean => {
    return isCollision(
      board,
      { ...player.position, y: player.position.y + 1 },
      player.tetromino.shape
    );
  };

  const rotate = (board: Cell[][]): void => {
    const newTetromino = rotateTetromino(player.tetromino, board);
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      tetromino: newTetromino,
    }));
  };

  const fastDrop = (
    board: Cell[][],
    handleCollision: (player: Player) => void
  ): void => {
    const { shape } = player.tetromino;
    let newY = player.position.y;

    while (!isCollision(board, { ...player.position, y: newY + 1 }, shape)) {
      newY++;
    }
    const newPlayer = { ...player, position: { ...player.position, y: newY } };
    setPlayer(newPlayer);
    handleCollision(newPlayer);
    createNewPlayer();
    setIsFastDroping(true);
    setTimeout(() => {
      setIsFastDroping(false);
    }, 150);
  };

  const rotateAndMoveTetromino = (
    e: React.KeyboardEvent,
    board: Cell[][],
    handleCollision: (player: Player) => void
  ): void => {
    switch (e.code) {
      case Key.UP:
        rotate(board);
        break;
      case Key.DOWN:
        if (!isColliding(board)) drop();
        break;
      case Key.LEFT:
        moveHorizontally(-1, board);
        break;
      case Key.RIGHT:
        moveHorizontally(1, board);
        break;
      case Key.SPACE:
        fastDrop(board, handleCollision);
        break;
      case Key.SHIFTLEFT:
      case Key.SHIFTRIGHT:
        if (!player.holdTetromino) holdingTetromino();
        else switchingTetromino();
        break;
    }
    if (e.code === Key.LEFT || e.code === Key.RIGHT) {
      if (startHoldingKey == 0) setStartHoldingKey(() => new Date().getTime());
      else {
        const now = new Date().getTime();
        if (now - startHoldingKey >= 150) setIsHoldingKey(true);
      }
    }
  };

  const onReleaseKey = (e: React.KeyboardEvent) => {
    if (e.code === Key.LEFT || e.code === Key.RIGHT) {
      setIsHoldingKey(false);
      setStartHoldingKey(0);
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

  const rotateTetromino = (
    tetromino: Tetromino,
    board: Cell[][]
  ): Tetromino => {
    const { x, y } = player.position;
    const newShape = tetromino.shape[0].map((_, colIndex) =>
      tetromino.shape.map((row) => row[colIndex]).reverse()
    );
    const newX = Math.max(0, Math.min(x, COL - newShape[0].length));

    // Check for collisions before applying rotation
    for (let row = 0; row < newShape.length; row++) {
      for (let col = 0; col < newShape[0].length; col++) {
        const posY = Math.min(y + row, ROW - 1);
        const posX = Math.min(newX + col, COL - 1);
        if (
          newShape[row][col] === 1 &&
          (posY >= ROW ||
            posX < 0 ||
            posX >= COL ||
            (board[posY] && board[posY][posX].type === 'tetromino-block'))
        ) {
          // Collision detected, return the original shape without rotating
          return tetromino;
        }
      }
    }

    // No collision, update player position and return new shape
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      position: { ...prevPlayer.position, x: newX },
    }));

    return { ...tetromino, shape: newShape };
  };

  const isCollision = (
    board: Cell[][],
    position: Position,
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

  const isCreateNewPlayer = (board: Cell[][]): boolean => {
    if (
      isValidMove(
        player.position.x,
        DEFAULT_PLAYER_POSITION.y,
        player.tetromino.shape,
        board
      )
    )
      return true;
    return false;
  };

  const getShadowPlayerPosition = (board: Cell[][]): Position => {
    const { x, y } = player.position;
    const { shape } = player.tetromino;

    let i = y;
    while (isValidMove(x, i + 1, shape, board)) {
      i++;
    }
    return { x, y: i };
  };

  const holdingTetromino = (): void => {
    setPlayer((prevPlayer) => {
      const tetrominos = prevPlayer.nextTetrominos;
      const holdTetromino = prevPlayer.tetromino;
      const tetromino = tetrominos.shift() as Tetromino;
      const newPlayer: Player = {
        position: prevPlayer.position,
        tetromino,
        holdTetromino,
        nextTetrominos: [],
      };
      if (tetrominos.length <= 5) {
        newPlayer.nextTetrominos = [...tetrominos, ...randomTetrominos()];
      } else newPlayer.nextTetrominos = tetrominos;
      return newPlayer;
    });
  };

  const switchingTetromino = () => {
    setPlayer((prevPlayer) => {
      const holdTetromino = prevPlayer.holdTetromino as Tetromino;
      const tetromino = prevPlayer.tetromino;
      return {
        ...prevPlayer,
        tetromino: holdTetromino,
        holdTetromino: tetromino,
      };
    });
  };

  return {
    player,
    drop,
    isColliding,
    createNewPlayer,
    rotateAndMoveTetromino,
    isCreateNewPlayer,
    getShadowPlayerPosition,
    calcDropTime,
    isFastDroping,
    onReleaseKey,
    isHoldingKey,
  };
};
