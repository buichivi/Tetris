import { CELL_SIZE } from '../Types';
import { Cell } from '../hooks/useTetris';
import tinycolor from 'tinycolor2';
type Props = {
  cell: Cell;
  className?: string;
};

const CellItem = ({ cell, className = '' }: Props) => {
  return (
    <div
      data-type={cell.type}
      className={`shrink-0  ${className}`}
      style={{
        backgroundColor: cell.color,
        width: CELL_SIZE,
        height: CELL_SIZE,
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
        ></div>
      )}
    </div>
  );
};

export default CellItem;
