import { useEffect, useState } from 'react';
import { CELL_SIZE, DEFAULT_CELL_COLOR, Player } from '../Types';
import CellItem from './Cell';
import { Cell } from '../hooks/useTetris';
import { usePlayer } from '../hooks/usePlayer';

type Props = {
  player: Player;
  board: Cell[][];
};

const TetrominoShadow: React.FC<Props> = ({ player, board }) => {
  const { position, tetromino } = player;
  const [shadowTop, setShadowTop] = useState(position.y);
  const { isValidMove } = usePlayer();

  useEffect(() => {
    let i = position.y;
    while (isValidMove(position.x, i + 1, tetromino.shape, board)) {
      i++;
    }
    setShadowTop(i);
  }, [position, board, tetromino, isValidMove]);

  return (
    <div
      className="absolute"
      style={{
        left: position.x * CELL_SIZE,
        top: shadowTop * CELL_SIZE,
      }}
    >
      {tetromino.shape.map((row, rowIndex) => (
        <div key={rowIndex} className="flex shrink-0">
          {row.map((cell, cellIndex) => {
            const isVisible = cell === 1;
            return (
              <CellItem
                key={cellIndex}
                cell={{
                  x: cellIndex,
                  y: rowIndex,
                  color: isVisible ? '#000' : DEFAULT_CELL_COLOR,
                  type: isVisible ? 'tetromino-block' : 'cell',
                }}
                className={isVisible ? '' : 'opacity-0'}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default TetrominoShadow;
