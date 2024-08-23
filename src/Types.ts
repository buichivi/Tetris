export const COL = 10;
export const ROW = 20;
export const CELL_SIZE = 24;
export const DEFAULT_CELL_COLOR = '#00000088';

export type Tetromino = {
  shape: number[][];
  color: string;
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
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
    ],
    color: '#CCFFFF',
  },
  L: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    color: '#00AAFF',
  },
  J: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
    color: '#FF8225',
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
    color: '#FEFBD8',
  },
  T: {
    shape: [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0],
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
