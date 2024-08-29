import React, { useState } from 'react';
import gameAudio, { bgMusicList } from '../types/Audio';

type Props = {
  isOpen: boolean;
  toggleOpen(isOpen: boolean): void;
};

const SettingsDialog: React.FC<Props> = ({ isOpen, toggleOpen }) => {
  const [bgmVolume, setBgmVolume] = useState(gameAudio.bgMusicVolume);
  const [sfxVolume, setSfxVolume] = useState(gameAudio.sfxVolume);
  const [selectedBGM, setSelectedBGM] = useState('');

  const handleBGMChange = (event: React.ChangeEvent<HTMLSelectElement>) => {};

  const handleBGMVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

  const handleSFXVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <React.Fragment>
      <input
        type="checkbox"
        name="setting-dialog"
        checked={isOpen}
        onChange={(e) => toggleOpen(e.currentTarget.checked)}
        className="hidden [&:checked+div]:opacity-100 [&:checked+div]:pointer-events-auto [&:checked+div>.settings-content]:translate-y-0"
      />
      <div className="fixed top-0 left-0 size-full flex items-center justify-center opacity-0 pointer-events-none transition-all">
        <div className="absolute size-full top-0 left-0 -z-[1] bg-[#000000bb]" onClick={() => toggleOpen(false)}></div>
        <div className="bg-gray-800 -translate-y-full p-6 w-96 settings-content transition-all">
          <h3 className="text-2xl font-bold mb-4 text-white text-center">Settings</h3>
          <div className="mb-4">
            <label className="block text-white mb-2">Background Music</label>
            <select
              value={selectedBGM}
              onChange={handleBGMChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            >
              {bgMusicList.map((bgMusic, index) => {
                return (
                  <option value={bgMusic.name} key={index}>
                    {bgMusic.name}
                  </option>
                );
              })}
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
              onChange={handleBGMVolumeChange}
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
              onChange={handleSFXVolumeChange}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SettingsDialog;
