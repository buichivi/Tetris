import { Cell, CELL_SIZE } from '../Types';
import tinycolor from 'tinycolor2';
type Props = {
  cell: Cell;
  className?: string;
  isPreviewBlock?: boolean;
};

const CellItem = ({ cell, className = '', isPreviewBlock = false }: Props) => {
  return (
    <div
      data-type={cell.type}
      className={`shrink-0  ${className}`}
      style={{
        backgroundColor: cell.color,
        width: isPreviewBlock ? Math.floor(CELL_SIZE * 0.8) : CELL_SIZE,
        height: isPreviewBlock ? Math.floor(CELL_SIZE * 0.8) : CELL_SIZE,
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
