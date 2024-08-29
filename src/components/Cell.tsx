import { Cell, CELL_SIZE } from '../types/Types';
import tinycolor from 'tinycolor2';

type Props = {
  cell: Cell;
  className?: string;
  isPreviewBlock?: boolean;
};

const CellItem: React.FC<Props> = ({ cell, className = '', isPreviewBlock = false }) => {
  const cellSize = isPreviewBlock ? Math.floor(CELL_SIZE * 0.8) : CELL_SIZE;

  return (
    <div
      data-type={cell.type}
      className={`shrink-0 ${className}`}
      style={{
        backgroundColor: cell.color,
        width: cellSize,
        height: cellSize,
      }}
    >
      {cell.type === 'tetromino-block' && (
        <div
          className="size-full border-4"
          style={{
            backgroundColor: cell.color,
            borderTopColor: tinycolor(cell.color).lighten(10).toString(),
            borderLeftColor: tinycolor(cell.color).darken(10).toString(),
            borderRightColor: tinycolor(cell.color).darken(10).toString(),
            borderBottomColor: tinycolor(cell.color).darken(20).toString(),
          }}
        />
      )}
    </div>
  );
};

export default CellItem;
