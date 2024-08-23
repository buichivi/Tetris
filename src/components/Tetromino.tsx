import { CELL_SIZE, DEFAULT_CELL_COLOR, Player } from '../Types';
import CellItem from './Cell';

type Props = {
  player: Player;
};

const TetrominoBlock: React.FC<Props> = ({ player }) => {
  const { position, tetromino } = player;

  return (
    <div
      className="absolute z-10"
      style={{
        top: position.y * CELL_SIZE,
        left: position.x * CELL_SIZE,
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
                  color: isVisible ? tetromino.color : DEFAULT_CELL_COLOR,
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

export default TetrominoBlock;
