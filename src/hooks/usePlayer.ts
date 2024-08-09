import { useEffect, useState } from 'react';
import {
    DEFAULT_CELL_COLOR,
    Player,
    randomTetromino,
    ROW,
    Tetromino,
} from '../helpers/Types';
import useTetris from './useTetris';

const initPlayer: Tetromino = randomTetromino();

export const usePlayer = () => {
    const [player, setPlayer] = useState<Player>({
        position: { x: 4, y: 0 },
        tetrimino: initPlayer,
    });
    const { board } = useTetris();

    const drop = (): void => {
        setPlayer((player) => ({
            ...player,
            position: {
                ...player.position,
                y: player.position.y + 1,
            },
        }));
    };

    const createNewPlayer = (): void => {
        setPlayer({
            position: { x: 4, y: 0 },
            tetrimino: randomTetromino(),
        });
    };

    const isCollison = (): boolean => {
        const shape_x_l = player.tetrimino.shape[0].length;
        const shape_y_l = player.tetrimino.shape.length;
        if (player.position.y + shape_y_l === ROW) {
            return true;
        }

        for (
            let i = player.position.x;
            i <=
            player.position.x +
                player.tetrimino.shape[shape_y_l - 1].length -
                1;
            i++
        ) {
            if (player.position.y + shape_y_l <= ROW - 2) {
                console.log(player.position.y + shape_y_l + 1, i);
                console.log(
                    board[player.position.y + shape_y_l + 1][i].color ===
                        DEFAULT_CELL_COLOR
                );
                if (
                    board[player.position.y + shape_y_l + 1][i].color !==
                    DEFAULT_CELL_COLOR
                ) {
                    return true;
                }
            }
        }
        return false;
    };

    return { player, drop, isCollison, createNewPlayer };
};
