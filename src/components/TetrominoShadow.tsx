import { CELL_SIZE, DEFAULT_CELL_COLOR, Player, Position } from "../types/Types";
import CellItem from "./Cell";

type Props = {
  player: Player;
  shadowPosition: Position;
};

const TetrominoShadow: React.FC<Props> = ({ player, shadowPosition }) => {
  return (
    <div
      className="absolute z-0"
      style={{
        left: shadowPosition.x * CELL_SIZE,
        top: shadowPosition.y * CELL_SIZE,
      }}
    >
      {player.tetromino.shape.map((row, rowIndex) => (
        <div key={rowIndex} className="flex shrink-0">
          {row.map((cell, cellIndex) => {
            const isVisible = cell === 1;
            return (
              <CellItem
                key={cellIndex}
                cell={{
                  x: cellIndex,
                  y: rowIndex,
                  color: isVisible ? "#77777729" : DEFAULT_CELL_COLOR,
                  type: isVisible ? "tetromino-block" : "cell",
                }}
                className={isVisible ? "" : "opacity-0"}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default TetrominoShadow;
