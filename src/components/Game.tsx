import React, { ReactElement, useEffect } from 'react';
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
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        toggleOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscapeKey);
    return () => window.removeEventListener('keydown', handleEscapeKey);
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
    return () => clearTimeout(timerId);
  }, [isGameOver]);

  const buttonStyle = (baseColor: string) => ({
    borderTopColor: tinycolor(baseColor).lighten(10).toString(),
    borderLeftColor: tinycolor(baseColor).darken(10).toString(),
    borderRightColor: tinycolor(baseColor).darken(10).toString(),
    borderBottomColor: tinycolor(baseColor).darken(20).toString(),
  });

  const renderGameOverScreen = () => (
    <div className="w-[30vw] min-h-[50vh] flex-col flex items-center justify-around">
      <img
        src="src/assets/images/tetris-logo-removebg-preview.png"
        alt="Tetris Logo"
        className="max-w-[80%] w-[250px]"
      />
      <button
        className="px-4 w-44 py-2 bg-blue-500 border-8 hover:opacity-80 flex items-center justify-center"
        style={buttonStyle('#3b82f6')}
        onClick={() => {
          gameAudio.playSFX('hit');
          resetGameOver();
        }}
      >
        🎮 Play game
      </button>
      <button
        className="px-4 w-44 py-2 bg-gray-500 border-8 hover:opacity-80 flex items-center justify-center"
        style={buttonStyle('#6b7280')}
        onClick={() => toggleOpen(true)}
      >
        ⚙️ Settings
      </button>
    </div>
  );

  const renderGameScreen = () => (
    <React.Fragment>
      <TetrisBoard isGameOver={isGameOver} resetGameOver={resetGameOver} />
      <button className="p-2 fixed top-10 left-10 border-2 round" onClick={() => toggleOpen(true)}>
        ⚙️
      </button>
    </React.Fragment>
  );

  return (
    <div className="relative">
      {isGameOver ? renderGameOverScreen() : renderGameScreen()}
      <SettingsDialog isOpen={isOpen} toggleOpen={toggleOpen} />
    </div>
  );
};

export default Game;
