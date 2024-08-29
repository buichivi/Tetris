import { ReactElement, useEffect } from 'react';
import useGameOver from '../hooks/useGameOver';
import TetrisBoard from './TetrisBoard';
import gameAudio from '../types/Audio';
import tinycolor from 'tinycolor2';
import SettingsDialog from './SettingsDialog';
import useSettings from '../hooks/useSettings';

const Game = (): ReactElement => {
  const { isGameOver, resetGameOver } = useGameOver();
  const { isOpen, toggleOpen } = useSettings();

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.code == 'Escape') {
        console.log('Close Setting');
        toggleOpen(false);
      }
    };
    window.addEventListener('keydown', close);
    () => window.removeEventListener('keydown', close);
  }, [toggleOpen]);

  useEffect(() => {
    let timerId: number | undefined;
    if (isGameOver) {
      gameAudio.stopBgMusic();
    } else {
      timerId = setTimeout(() => {
        gameAudio.playBgMusic();
      }, 4000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [isGameOver]);

  return (
    <div className="">
      {isGameOver ? (
        <div className="w-[30vw] min-h-[50vh] flex-col flex items-center justify-around">
          <img src="src/assets/images/tetris-logo-removebg-preview.png" alt="" className="max-w-[80%] w-[250px]" />
          <button
            className="px-4 w-32 py-2 bg-blue-500 border-8 hover:opacity-80"
            style={{
              borderTopColor: tinycolor('#3b82f6').lighten(10).toString(),
              borderLeftColor: tinycolor('#3b82f6').darken(10).toString(),
              borderRightColor: tinycolor('#3b82f6').darken(10).toString(),
              borderBottomColor: tinycolor('#3b82f6').darken(20).toString(),
            }}
            onClick={() => {
              gameAudio.playSFX('hit');
              resetGameOver();
            }}
          >
            Play game
          </button>
          <button
            className="px-4 w-32 py-2 bg-gray-500 border-8 hover:opacity-80"
            style={{
              borderTopColor: tinycolor('#6b7280').lighten(10).toString(),
              borderLeftColor: tinycolor('#6b7280').darken(10).toString(),
              borderRightColor: tinycolor('#6b7280').darken(10).toString(),
              borderBottomColor: tinycolor('#6b7280').darken(20).toString(),
            }}
            onClick={() => toggleOpen(true)}
          >
            Settings
          </button>
        </div>
      ) : (
        <TetrisBoard isGameOver={isGameOver} resetGameOver={resetGameOver} />
      )}
      <SettingsDialog isOpen={isOpen} toggleOpen={toggleOpen} />
    </div>
  );
};

export default Game;
