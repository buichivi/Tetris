import { useState } from 'react';
import { COL, DEFAULT_CELL_COLOR, Player, ROW } from '../helpers/Types';

export type Cell = {
  x: number;
  y: number;
  color: string;
  type: 'cell' | 'tetromino-block';
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
    const shape_x_l = player.tetromino.shape[0].length;
    const shape_y_l = player.tetromino.shape.length;

    setBoard((board) => {
      return board.map((row, rowIndex) => {
        return row.map((cell, cellIndex) => {
          const pos_y = rowIndex - player.position.y;
          const pos_x = cellIndex - player.position.x;
          if (pos_x >= 0 && pos_y >= 0 && pos_x <= shape_x_l - 1 && pos_y <= shape_y_l - 1) {
            if (player.tetromino.shape[pos_y][pos_x] === 1)
              return {
                ...cell,
                color: player.tetromino.color,
                type: 'tetromino-block',
              };
          }

          return cell;
        });
      });
    });
  };

  const removeCompletedLines = (): void => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.filter((row) => !row.every((cell) => cell.type === 'tetromino-block'));
      const removedLines = ROW - newBoard.length;

      const newRows = Array(removedLines)
        .fill(null)
        .map(() =>
          Array(COL)
            .fill(null)
            .map(() => ({
              y: 0,
              color: DEFAULT_CELL_COLOR,
              type: 'cell' as const,
            }))
        );

      return [...newRows, ...newBoard].map((row, rowIndex) =>
        row.map((cell, cellIndex) => ({
          ...cell,
          x: cellIndex,
          y: rowIndex,
        }))
      );
    });
  };

  return { board, handleCollison, removeCompletedLines };
};

export default useTetris;
