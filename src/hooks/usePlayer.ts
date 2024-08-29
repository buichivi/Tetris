import { useEffect, useState } from 'react';
import { Cell, COL, DEFAULT_PLAYER_POSITION, Player, Position, randomTetrominos, ROW, Tetromino } from '../types/Types';
import gameAudio from '../types/Audio';

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
  const [player, setPlayer] = useState<Player | null>(null);
  const [frames] = useState(60);
  const [isFastDroping, setIsFastDroping] = useState(false);
  const [isHoldingKey, setIsHoldingKey] = useState(false);
  const [startHoldingKey, setStartHoldingKey] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => setPlayer(initPlayer()), 4000);
    return () => clearTimeout(id);
  }, []);

  const calcDropTime = (level: number): number => (frames - level * 5) / 60;

  const drop = (): void => {
    setPlayer((prevPlayer) => {
      if (!prevPlayer) return null;
      return {
        ...prevPlayer,
        position: { ...prevPlayer.position, y: prevPlayer.position.y + 1 },
      };
    });
  };

  const createNewPlayer = (): void => {
    setPlayer((prevPlayer) => {
      if (!prevPlayer) return null;
      const tetrominos = prevPlayer.nextTetrominos;
      const newPlayer: Player = {
        position: DEFAULT_PLAYER_POSITION,
        tetromino: tetrominos.shift() as Tetromino,
        nextTetrominos: tetrominos.length <= 5 ? [...tetrominos, ...randomTetrominos()] : tetrominos,
        holdTetromino: prevPlayer.holdTetromino,
      };
      return newPlayer;
    });
  };

  const isColliding = (board: Cell[][]): boolean => {
    if (!player) return false;
    return isCollision(board, { ...player.position, y: player.position.y + 1 }, player.tetromino.shape);
  };

  const rotate = (board: Cell[][]): void => {
    if (!player) return;
    const newTetromino = rotateTetromino(player.tetromino, board);
    setPlayer((prevPlayer) => (prevPlayer ? { ...prevPlayer, tetromino: newTetromino } : null));
  };

  const fastDrop = (board: Cell[][], handleCollision: (player: Player) => void): void => {
    if (!player) return;
    let newY = player.position.y;
    while (!isCollision(board, { ...player.position, y: newY + 1 }, player.tetromino.shape)) {
      newY++;
    }
    const newPlayer = { ...player, position: { ...player.position, y: newY } };
    setPlayer(newPlayer);
    handleCollision(newPlayer);
    createNewPlayer();
    setIsFastDroping(true);
    setTimeout(() => setIsFastDroping(false), 150);
  };

  const rotateAndMoveTetromino = (
    e: React.KeyboardEvent,
    board: Cell[][],
    handleCollision: (player: Player) => void
  ): void => {
    if (!player) return;
    switch (e.code) {
      case Key.UP:
        gameAudio.playSFX('rotate');
        rotate(board);
        break;
      case Key.DOWN:
        gameAudio.playSFX('move');
        if (!isColliding(board)) drop();
        break;
      case Key.LEFT:
        moveHorizontally(-1, board);
        break;
      case Key.RIGHT:
        moveHorizontally(1, board);
        break;
      case Key.SPACE:
        gameAudio.playSFX('harddrop');
        fastDrop(board, handleCollision);
        break;
      case Key.SHIFTLEFT:
      case Key.SHIFTRIGHT:
        gameAudio.playSFX('hold');
        player.holdTetromino ? switchingTetromino() : holdingTetromino();
        break;
    }
    if (e.code === Key.LEFT || e.code === Key.RIGHT) {
      if (startHoldingKey === 0) setStartHoldingKey(Date.now());
      else {
        const now = Date.now();
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
    gameAudio.playSFX('move');
    setPlayer((prevPlayer) => {
      if (!prevPlayer) return null;
      const newX = prevPlayer.position.x + direction;
      return isValidMove(newX, prevPlayer.position.y, prevPlayer.tetromino.shape, board)
        ? { ...prevPlayer, position: { ...prevPlayer.position, x: newX } }
        : prevPlayer;
    });
  };

  const isValidMove = (x: number, y: number, shape: number[][], board: Cell[][]): boolean => {
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col] === 1) {
          const newX = x + col;
          const newY = y + row;
          if (newX < 0 || newX >= COL || newY >= ROW || (board[newY] && board[newY][newX].type === 'tetromino-block')) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const rotateTetromino = (tetromino: Tetromino, board: Cell[][]): Tetromino => {
    if (!player) return tetromino;
    const { x, y } = player.position;
    const newShape = tetromino.shape[0].map((_, colIndex) => tetromino.shape.map((row) => row[colIndex]).reverse());
    const newX = Math.max(0, Math.min(x, COL - newShape[0].length));

    for (let row = 0; row < newShape.length; row++) {
      for (let col = 0; col < newShape[0].length; col++) {
        const posY = Math.min(y + row, ROW - 1);
        const posX = Math.min(newX + col, COL - 1);
        if (
          newShape[row][col] === 1 &&
          (posY >= ROW || posX < 0 || posX >= COL || (board[posY] && board[posY][posX].type === 'tetromino-block'))
        ) {
          return tetromino;
        }
      }
    }

    setPlayer((prevPlayer) => (prevPlayer ? { ...prevPlayer, position: { ...prevPlayer.position, x: newX } } : null));
    return { ...tetromino, shape: newShape };
  };

  const isCollision = (board: Cell[][], position: Position, shape: number[][]): boolean => {
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          const newY = y + position.y;
          const newX = x + position.x;
          if (newY >= ROW || newX < 0 || newX >= COL || (board[newY] && board[newY][newX].type === 'tetromino-block')) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const isCreateNewPlayer = (board: Cell[][]): boolean =>
    player ? isValidMove(player.position.x, DEFAULT_PLAYER_POSITION.y, player.tetromino.shape, board) : false;

  const getShadowPlayerPosition = (board: Cell[][]): Position => {
    if (!player) return { x: 0, y: 0 };
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
      if (!prevPlayer) return null;
      const tetrominos = prevPlayer.nextTetrominos;
      const holdTetromino = prevPlayer.tetromino;
      const tetromino = tetrominos.shift() as Tetromino;
      return {
        ...prevPlayer,
        tetromino,
        holdTetromino,
        nextTetrominos: tetrominos.length <= 5 ? [...tetrominos, ...randomTetrominos()] : tetrominos,
      };
    });
  };

  const switchingTetromino = () => {
    setPlayer((prevPlayer) => {
      if (!prevPlayer) return null;
      const holdTetromino = prevPlayer.holdTetromino as Tetromino;
      return {
        ...prevPlayer,
        position: { ...prevPlayer.position, x: DEFAULT_PLAYER_POSITION.x },
        tetromino: holdTetromino,
        holdTetromino: prevPlayer.tetromino,
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
