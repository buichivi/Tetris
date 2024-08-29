import React, { useState } from 'react';
import gameAudio, { bgMusicList } from '../types/Audio';

type Props = {
  isOpen: boolean;
  toggleOpen: (isOpen: boolean) => void;
};

const SettingsDialog: React.FC<Props> = ({ isOpen, toggleOpen }) => {
  const [bgmVolume, setBgmVolume] = useState(gameAudio.bgMusicVolume);
  const [sfxVolume, setSfxVolume] = useState(gameAudio.sfxVolume);
  const [selectedBGM, setSelectedBGM] = useState('');

  const handleBGMChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBgMusic = event.target.value;
    setSelectedBGM(selectedBgMusic);
    gameAudio.setBgMusic(selectedBgMusic);
  };

  const handleVolumeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setVolume: React.Dispatch<React.SetStateAction<number>>,
    setAudioVolume: (volume: number) => void
  ) => {
    const volume = Number(event.target.value);
    setVolume(volume);
    setAudioVolume(volume);
  };

  return (
    <>
      <input
        type="checkbox"
        name="setting-dialog"
        checked={isOpen}
        onChange={(e) => toggleOpen(e.target.checked)}
        className="hidden [&:checked+div]:opacity-100 [&:checked+div]:pointer-events-auto [&:checked+div>.settings-content]:translate-y-0"
      />
      <div className="fixed inset-0 flex items-center justify-center opacity-0 pointer-events-none transition-all">
        <div className="absolute inset-0 -z-[1] bg-black/75" onClick={() => toggleOpen(false)} />
        <div className="bg-gray-800 -translate-y-full border-2 p-6 w-96 settings-content transition-all">
          <h3 className="text-2xl font-bold mb-4 text-white text-center">Settings</h3>
          <div className="mb-4">
            <label className="block text-white mb-2">Background Music</label>
            <select
              value={selectedBGM}
              onChange={handleBGMChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            >
              {bgMusicList.map((bgMusic, index) => (
                <option value={bgMusic.name} key={index}>
                  {bgMusic.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">BGM Volume</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={bgmVolume}
              onChange={(e) => handleVolumeChange(e, setBgmVolume, gameAudio.setBgMusicVolume)}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">SFX Volume</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={sfxVolume}
              onChange={(e) => handleVolumeChange(e, setSfxVolume, gameAudio.setSFXVolume)}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsDialog;
