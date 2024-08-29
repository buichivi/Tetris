import { useMemo } from "react";
import { CELL_SIZE, DEFAULT_CELL_COLOR, Position, Tetromino } from "../types/Types";
import CellItem from "./Cell";

type Props = {
  player: { position: Position; tetromino: Tetromino };
  className?: string;
  isPreviewBlock?: boolean;
};

const TetrominoBlock: React.FC<Props> = ({ player, className = "", isPreviewBlock = false }) => {
  const { position, tetromino } = player;
  const style = useMemo(() => {
    return isPreviewBlock
      ? {}
      : {
          top: position.y * CELL_SIZE,
          left: position.x * CELL_SIZE,
        };
  }, [position, isPreviewBlock]);

  return (
    <div className={`absolute z-10 ${className}`} style={style}>
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
                  type: isVisible ? "tetromino-block" : "cell",
                }}
                className={isVisible ? "" : "opacity-0"}
                isPreviewBlock={isPreviewBlock}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default TetrominoBlock;
