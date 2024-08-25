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

export const randomTetrominos = (): Tetromino[] => {
  const tetrominos = Object.keys(TETROMINOS) as TetrominoShape[];
  return tetrominos
    .sort(() => Math.random() - 0.5)
    .map((tetro) => TETROMINOS[tetro]);
};
export const randomTetromino = (): Tetromino => {
  const tetrominos = Object.keys(TETROMINOS) as TetrominoShape[];
  const randomIndex = Math.floor(Math.random() * tetrominos.length);
  return TETROMINOS[tetrominos[randomIndex]];
};

export type Player = {
  position: { x: number; y: number };
  tetromino: Tetromino;
  nextTetrominos: Tetromino[];
  holdTetromino: Tetromino | null;
};

export type Cell = {
  x: number;
  y: number;
  color: string;
  type: 'cell' | 'tetromino-block';
};

export const RemoveMessages = ['', 'Single', 'Double', 'Triple', 'Quad'];

type SoundName =
  | 'move'
  | 'hit'
  | 'rotate'
  | 'harddrop'
  | 'hold'
  | 'combo_1'
  | 'combo_2'
  | 'combo_3'
  | 'combo_4';
export const Sounds: Record<SoundName, HTMLAudioElement> = {
  move: new Audio('src/assets/sounds/move.wav'),
  hit: new Audio('src/assets/sounds/hit.wav'),
  rotate: new Audio('src/assets/sounds/rotate.wav'),
  combo_1: new Audio('src/assets/sounds/combo_1_power.wav'),
  combo_2: new Audio('src/assets/sounds/combo_2_power.wav'),
  combo_3: new Audio('src/assets/sounds/combo_3_power.wav'),
  combo_4: new Audio('src/assets/sounds/combo_4_power.wav'),
  harddrop: new Audio('src/assets/sounds/harddrop.wav'),
  hold: new Audio('src/assets/sounds/hold.wav'),
};

export class SFX {
  constructor() {}

  move = () => {
    Sounds.move.currentTime = 0;
    Sounds.move.play();
  };

  hit = () => {
    Sounds.hit.currentTime = 0;
    Sounds.hit.play();
  };
  rotate = () => {
    Sounds.rotate.currentTime = 0;
    Sounds.rotate.play();
  };
  combo_1 = () => {
    Sounds.combo_1.currentTime = 0;
    Sounds.combo_1.play();
  };
  combo_2 = () => {
    Sounds.combo_2.currentTime = 0;
    Sounds.combo_2.play();
  };
  combo_3 = () => {
    Sounds.combo_3.currentTime = 0;
    Sounds.combo_3.play();
  };
  combo_4 = () => {
    Sounds.combo_4.currentTime = 0;
    Sounds.combo_4.play();
  };
  harddrop = () => {
    Sounds.harddrop.currentTime = 0;
    Sounds.harddrop.play();
  };
  hold = () => {
    Sounds.hold.currentTime = 0;
    Sounds.hold.play();
  };
}
