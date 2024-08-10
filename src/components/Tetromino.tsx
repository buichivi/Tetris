import { CELL_SIZE, DEFAULT_CELL_COLOR, Tetromino } from '../helpers/Types';
import CellItem from './Cell';

type Props = {
    position: { x: number; y: number };
    tetromino: Tetromino;
};

const TetrominoBlock = ({ position, tetromino }: Props) => {
    return (
        <div
            className="absolute"
            style={{
                top: position.y * CELL_SIZE,
                left: position.x * CELL_SIZE,
            }}
        >
            {tetromino.shape.map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className="flex shrink-0">
                        {row.map((_, cellIndex) => {
                            const haveColor =
                                tetromino.shape[rowIndex][cellIndex] === 1;
                            return (
                                <CellItem
                                    key={cellIndex}
                                    cell={{
                                        x: cellIndex,
                                        y: rowIndex,
                                        color: haveColor
                                            ? tetromino.color
                                            : DEFAULT_CELL_COLOR,
                                        type: haveColor
                                            ? 'tetrimino-block'
                                            : 'cell',
                                    }}
                                    className={`${!haveColor && 'opacity-0'}`}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default TetrominoBlock;
