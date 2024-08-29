import { useEffect, useState } from "react";
import { Cell, COL, DEFAULT_CELL_COLOR, Player, ROW } from "../types/Types";
import gameAudio from "../types/Audio";

const createInitialBoard = (): Cell[][] => {
  return Array(ROW)
    .fill(null)
    .map((_, i) =>
      Array(COL)
        .fill(null)
        .map((_, j) => ({
          x: j,
          y: i,
          color: DEFAULT_CELL_COLOR,
          type: "cell",
        }))
    );
};

const useTetris = () => {
  const [board, setBoard] = useState<Cell[][]>(createInitialBoard());
  const [lines, setLines] = useState(0);
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(0);
  const [isRemovingLines, setRemovingLines] = useState(0);

  useEffect(() => {
    setPoints(lines * 100);
    setLevel(Math.floor(points / 1000) + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines]);

  const handleCollision = (player: Player): void => {
    const { shape, color } = player.tetromino;
    const { x: posX, y: posY } = player.position;

    gameAudio.playSFX("hit");

    setBoard((prevBoard) =>
      prevBoard.map((row, y) =>
        row.map((cell, x) => {
          const shapeY = y - posY;
          const shapeX = x - posX;
          if (
            shapeY >= 0 &&
            shapeY < shape.length &&
            shapeX >= 0 &&
            shapeX < shape[0].length &&
            shape[shapeY][shapeX] === 1
          ) {
            return { ...cell, color, type: "tetromino-block" };
          }
          return cell;
        })
      )
    );
    removeCompletedLines();
  };

  const removeCompletedLines = (): void => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.filter((row) => !row.every((cell) => cell.type === "tetromino-block"));
      const removedLines = ROW - newBoard.length;
      setLines((prev) => (prev += removedLines));
      if (removedLines > 0) {
        if (removedLines === 1) {
          gameAudio.playSFX("combo_1");
        } else if (removedLines === 2) {
          gameAudio.playSFX("combo_2");
        } else if (removedLines === 3) {
          gameAudio.playSFX("combo_3");
        } else if (removedLines === 4) {
          gameAudio.playSFX("combo_4");
        }
        setRemovingLines(removedLines);
        setTimeout(() => {
          setRemovingLines(0);
        }, 150);
      }
      const newRows = Array(removedLines)
        .fill(null)
        .map(() =>
          Array(COL)
            .fill(null)
            .map(() => ({
              x: 0,
              y: 0,
              color: DEFAULT_CELL_COLOR,
              type: "cell" as const,
            }))
        );

      return [...newRows, ...newBoard].map((row, y) => row.map((cell, x) => ({ ...cell, x, y })));
    });
  };

  return {
    points,
    level,
    board,
    lines,
    handleCollision,
    removeCompletedLines,
    isRemovingLines,
  };
};

export default useTetris;
