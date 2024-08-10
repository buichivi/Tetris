import { ReactElement, useEffect, useState } from 'react';
import CellItem from './Cell';
import useTetris from '../hooks/useTetris';
import TetrominoBlock from './Tetromino';
import { usePlayer } from '../hooks/usePlayer';
import useInterval from '../hooks/useInterval';

const TetrisBoard = (): ReactElement => {
    const { board, handleCollison } = useTetris();
    const { player, createNewPlayer, drop, isCollison, handleRotateTetromino } =
        usePlayer();

    useInterval(() => {
        drop();
    }, 1000);

    useEffect(() => {
        if (isCollison(board)) {
            createNewPlayer();
            handleCollison(player);
        }
    }, [player]);

    useEffect(() => {
        window.addEventListener('keydown', handleRotateTetromino);
        return () => {
            window.removeEventListener('keydown', handleRotateTetromino);
        };
    }, []);

    return (
        <div className="max-w-1/2 min-w-[500px] min-h-[400px] text-white  h-4/5 bg-[#0008] flex items-center justify-center">
            <div>Hold, stats</div>
            <div className="w-1/2 h-full overflow-hidden flex flex-col justify-end">
                <div
                    className={`w-fit h-fit shrink-0 border relative flex flex-col`}
                >
                    {board.map((row, rowIndex) => {
                        return (
                            <div key={rowIndex} className="flex shrink-0">
                                {row.map((cell, colIndex) => {
                                    return (
                                        <CellItem key={colIndex} cell={cell} />
                                    );
                                })}
                            </div>
                        );
                    })}
                    <TetrominoBlock
                        position={player.position}
                        tetromino={player.tetrimino}
                    />
                </div>
            </div>
            <div>Next, points</div>
        </div>
    );
};

export default TetrisBoard;
