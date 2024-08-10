import { useState } from 'react';
import { COL, DEFAULT_CELL_COLOR, Player, ROW } from '../helpers/Types';

export type Cell = {
    x: number;
    y: number;
    color: string;
    type: 'cell' | 'tetrimino-block';
};

const initBoard: Cell[][] = [];
for (let i = 0; i < ROW; i++) {
    const rowCells: Cell[] = [];
    for (let j = 0; j < COL; j++) {
        const cell: Cell = {
            x: i,
            y: j,
            color: DEFAULT_CELL_COLOR,
            type: 'cell',
        };
        rowCells.push(cell);
    }
    initBoard.push(rowCells);
}

const useTetris = () => {
    const [board, setBoard] = useState<Cell[][]>(initBoard);

    const handleCollison = (player: Player): void => {
        const shape_x_l = player.tetrimino.shape[0].length;
        const shape_y_l = player.tetrimino.shape.length;

        setBoard((board) => {
            return board.map((row, rowIndex) => {
                return row.map((cell, cellIndex) => {
                    const pos_y = rowIndex - player.position.y;
                    const pos_x = cellIndex - player.position.x;
                    if (
                        pos_x >= 0 &&
                        pos_y >= 0 &&
                        pos_x <= shape_x_l - 1 &&
                        pos_y <= shape_y_l - 1
                    ) {
                        if (player.tetrimino.shape[pos_y][pos_x] === 1)
                            return {
                                ...cell,
                                color: player.tetrimino.color,
                                type: 'tetrimino-block',
                            };
                    }

                    return cell;
                });
            });
        });
    };

    return { board, handleCollison };
};

export default useTetris;
