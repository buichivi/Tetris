type SoundName =
  | 'move'
  | 'hit'
  | 'rotate'
  | 'harddrop'
  | 'hold'
  | 'combo_1'
  | 'combo_2'
  | 'combo_3'
  | 'combo_4'
  | 'countdown_3'
  | 'countdown_2'
  | 'countdown_1'
  | 'go';

const Sounds: Record<SoundName, HTMLAudioElement> = {
  move: new Audio('src/assets/sfx/move.wav'),
  hit: new Audio('src/assets/sfx/hit.wav'),
  rotate: new Audio('src/assets/sfx/rotate.wav'),
  harddrop: new Audio('src/assets/sfx/harddrop.wav'),
  hold: new Audio('src/assets/sfx/hold.wav'),
  combo_1: new Audio('src/assets/sfx/combo_1_power.wav'),
  combo_2: new Audio('src/assets/sfx/combo_2_power.wav'),
  combo_3: new Audio('src/assets/sfx/combo_3_power.wav'),
  combo_4: new Audio('src/assets/sfx/combo_4_power.wav'),
  countdown_3: new Audio('src/assets/sfx/countdown3.ogg'),
  countdown_2: new Audio('src/assets/sfx/countdown2.ogg'),
  countdown_1: new Audio('src/assets/sfx/countdown1.ogg'),
  go: new Audio('src/assets/sfx/go.ogg'),
};

type BackgroundMusic = {
  name: string;
  src: string;
};

export const bgMusicList: BackgroundMusic[] = [
  { name: 'I have no enemies', src: 'src/assets/musics/You have no enemies.mp3' },
  { name: 'Tetris', src: 'src/assets/musics/Tetris.mp3' },
];

interface AudioManager {
  sfxVolume: number;
  bgMusicVolume: number;
  bgMusic: HTMLAudioElement;
  playSFX(sfxName: SoundName): void;
  playBgMusic(): void;
  stopBgMusic(): void;
  resetTimeBgMusic(): void;
  setSFXVolume(vol: number): void;
  setBgMusicVolume(vol: number): void;
  setBgMusic(bgMusicName: string): void;
}

class GameAudio implements AudioManager {
  private static instance: GameAudio;
  private _sfxVolume = 0.5;
  private _bgMusicVolume = 0.5;
  private _bgMusic = new Audio(bgMusicList[0].src);

  private constructor() {}

  public static getInstance(): GameAudio {
    if (!GameAudio.instance) {
      GameAudio.instance = new GameAudio();
    }
    return GameAudio.instance;
  }

  get sfxVolume(): number {
    return this._sfxVolume;
  }

  get bgMusicVolume(): number {
    return this._bgMusicVolume;
  }

  get bgMusic(): HTMLAudioElement {
    return this._bgMusic;
  }

  playSFX(sfxName: SoundName): void {
    Sounds[sfxName].currentTime = 0;
    Sounds[sfxName].playbackRate = 1.5;
    Sounds[sfxName].volume = this._sfxVolume;
    Sounds[sfxName].play();
  }

  setSFXVolume(vol: number): void {
    this._sfxVolume = Math.max(0, Math.min(vol, 1));
  }

  setBgMusic(bgMusicName: string): void {
    const bgMusicFound = bgMusicList.find((bgMusic) => bgMusic.name === bgMusicName);
    if (!bgMusicFound) {
      alert(`Background music "${bgMusicName}" not found`);
      return;
    }
    this._bgMusic.src = bgMusicFound.src;
    this._bgMusic.currentTime = 0;
  }

  playBgMusic(): void {
    this._bgMusic.volume = this._bgMusicVolume;
    this._bgMusic.play();
  }

  stopBgMusic(): void {
    this._bgMusic.pause();
  }

  resetTimeBgMusic(): void {
    this._bgMusic.currentTime = 0;
  }

  setBgMusicVolume(vol: number): void {
    this._bgMusicVolume = Math.max(0, Math.min(vol, 1));
    this._bgMusic.volume = this._bgMusicVolume;
  }
}

const gameAudio = GameAudio.getInstance();
export default gameAudio;
