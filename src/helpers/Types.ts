export const COL: number = 10;
export const ROW: number = 20;
export const CELL_SIZE = 24;
export const DEFAULT_CELL_COLOR = 'rgba(0, 0, 0, 0.533)';

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
        color: 'rgb(255, 255, 0)',
    },
    I: {
        shape: [[1, 1, 1, 1]],
        color: 'rgb(0, 238, 255)',
    },
    L: {
        shape: [
            [1, 0],
            [1, 0],
            [1, 1],
        ],
        color: 'rgb(0, 170, 255)',
    },
    J: {
        shape: [
            [0, 1],
            [0, 1],
            [1, 1],
        ],
        color: 'rgb(255, 130, 37)',
    },
    S: {
        shape: [
            [0, 1, 1],
            [1, 1, 0],
        ],
        color: 'rgb(162, 202, 113)',
    },
    Z: {
        shape: [
            [1, 1, 0],
            [0, 1, 1],
        ],
        color: 'rgb(254, 251, 216)',
    },
    T: {
        shape: [
            [1, 1, 1],
            [0, 1, 0],
        ],
        color: 'rgb(124, 0, 254)',
    },
};

export const randomTetromino = (): Tetromino => {
    const tetrominos = 'IOLJSZT';
    const randomIndex = Math.floor(Math.random() * tetrominos.length);
    console.log(tetrominos[randomIndex]);
    return TETROMINOS[tetrominos[randomIndex] as TetrominoShape];
};

export type Player = {
    position: { x: number; y: number };
    tetrimino: Tetromino;
};
