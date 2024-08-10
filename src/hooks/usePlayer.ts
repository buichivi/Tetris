import { useState } from 'react';
import { COL, Player, randomTetromino, ROW, Tetromino } from '../helpers/Types';
import { Cell } from './useTetris';

const initPlayer: Tetromino = randomTetromino();
enum Key {
    UP = 'ArrowUp',
    DOWN = 'ArrowDown',
    LEFT = 'ArrowLeft',
    RIGHT = 'ArrowRight',
    SPACE = 'Space',
}

export const usePlayer = () => {
    const [player, setPlayer] = useState<Player>({
        position: { x: 4, y: 0 },
        tetrimino: initPlayer,
    });

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

    const isCollison = (board: Cell[][]): boolean => {
        const shape_y_l = player.tetrimino.shape.length;
        if (player.position.y + shape_y_l === ROW) {
            return true;
        }
        if (
            player.position.x + (player.tetrimino.shape[0].length - 1) <=
            COL - 1
        ) {
            for (
                let i = player.position.x;
                i <= player.position.x + (player.tetrimino.shape[0].length - 1);
                i++
            ) {
                for (let j = 0; j < shape_y_l; j++) {
                    console.log(player.position.y + j + 1, i);

                    if (
                        player.tetrimino.shape[j][i - player.position.x] ===
                            1 &&
                        board[player.position.y + j + 1][i].type ===
                            'tetrimino-block'
                    ) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    const isEnoughSpace = (): boolean => {
        return true;
    };

    const handleRotateTetromino = (e: KeyboardEvent): void => {
        switch (e.code) {
            case Key.UP:
                break;
            case Key.DOWN:
                drop();
                break;
            case Key.LEFT:
                setPlayer((player) => ({
                    ...player,
                    position: {
                        ...player.position,
                        x: player.position.x == 0 ? 0 : player.position.x - 1,
                    },
                }));
                // Handle if collison with cell type tetromino-block
                break;
            case Key.RIGHT:
                setPlayer((player) => {
                    return {
                        ...player,
                        position: {
                            ...player.position,
                            x:
                                player.position.x +
                                    (player.tetrimino.shape[0].length - 1) ==
                                COL - 1
                                    ? player.position.x
                                    : player.position.x + 1,
                        },
                    };
                });
                break;
            case Key.SPACE:
                //
                break;
            default:
                break;
        }
    };

    return { player, drop, isCollison, createNewPlayer, handleRotateTetromino };
};
