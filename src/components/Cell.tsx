import { CELL_SIZE } from '../Types';
import { Cell } from '../hooks/useTetris';

type Props = {
  cell: Cell;
  className?: string;
};

const CellItem = ({ cell, className = '' }: Props) => {
  return (
    <div
      data-type={cell.type}
      className={`shrink-0 border-r border-b ${
        cell.type !== 'tetromino-block' ? `border-gray-500` : `border-gray-200`
      }  ${className} flex items-center justify-center drop-shadow-md`}
      style={{
        backgroundColor: cell.color,
        width: CELL_SIZE,
        height: CELL_SIZE,
      }}
    >
      {cell.type === 'tetromino-block' && (
        <div
          className="shrink-0 border border-gray-200 shadow-xl"
          style={{
            width: CELL_SIZE * 0.7,
            height: CELL_SIZE * 0.7,
            backgroundColor: cell.color,
          }}
        ></div>
      )}
    </div>
  );
};

export default CellItem;
