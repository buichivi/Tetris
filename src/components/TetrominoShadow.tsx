import { CELL_SIZE, DEFAULT_CELL_COLOR, Player, Position } from '../types/Types';
import CellItem from './Cell';

type Props = {
  player: Player;
  shadowPosition: Position;
};

const TetrominoShadow: React.FC<Props> = ({ player, shadowPosition }) => {
  const { tetromino } = player;
  const shadowColor = '#77777729';

  return (
    <div
      className="absolute z-0"
      style={{
        left: shadowPosition.x * CELL_SIZE,
        top: shadowPosition.y * CELL_SIZE,
      }}
    >
      {tetromino.shape.map((row, rowIndex) => (
        <div key={rowIndex} className="flex shrink-0">
          {row.map((cell, cellIndex) => (
            <CellItem
              key={cellIndex}
              cell={{
                x: cellIndex,
                y: rowIndex,
                color: cell ? shadowColor : DEFAULT_CELL_COLOR,
                type: cell ? 'tetromino-block' : 'cell',
              }}
              className={cell ? '' : 'opacity-0'}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TetrominoShadow;
