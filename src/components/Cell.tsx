import { CELL_SIZE } from '../helpers/Types';
import { Cell } from '../hooks/useTetris';

type Props = {
    cell: Cell;
};

const CellItem = ({ cell }: Props) => {
    return (
        <div
            className={`shrink-0 border`}
            style={{
                backgroundColor: cell.color,
                width: CELL_SIZE,
                height: CELL_SIZE,
            }}
        ></div>
    );
};

export default CellItem;
