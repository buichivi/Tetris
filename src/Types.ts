export const COL = 10;
export const ROW = 20;
export const CELL_SIZE = 24;
export const DEFAULT_CELL_COLOR = '#00000088';
export const DEFAULT_PLAYER_POSITION = { x: 4, y: 0 };

export type Tetromino = {
  shape: number[][];
  color: string;
};

export type Position = {
  x: number;
  y: number;
};

type TetrominoShape = 'O' | 'I' | 'L' | 'J' | 'S' | 'Z' | 'T';

export const TETROMINOS: Record<TetrominoShape, Tetromino> = {
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: '#FFFF00',
  },
  I: {
    shape: [
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: '#5AB2FF',
  },
  L: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    color: '#00ffff',
  },
  J: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
    color: '#D1E9F6',
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: '#A2CA71',
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: '#FF8343',
  },
  T: {
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
    color: '#7C00FE',
  },
};

export const randomTetromino = (): Tetromino => {
  const tetrominos = Object.keys(TETROMINOS) as TetrominoShape[];
  const randomIndex = Math.floor(Math.random() * tetrominos.length);
  console.log(tetrominos[randomIndex]);
  return TETROMINOS[tetrominos[randomIndex]];
};

export type Player = {
  position: { x: number; y: number };
  tetromino: Tetromino;
};
