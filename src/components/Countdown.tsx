import { useEffect, useState } from 'react';
import gameAudio, { SoundName } from '../types/Audio';
import tinycolor from 'tinycolor2';

const Countdown = () => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown >= 0) {
      const soundEffects = ['go', 'countdown_1', 'countdown_2', 'countdown_3'];
      gameAudio.playSFX((soundEffects[countdown] as SoundName) || '');
      const id = setTimeout(() => setCountdown(countdown - 1), 1100);
      return () => clearTimeout(id);
    }
  }, [countdown]);

  if (countdown < 0) return null;

  const displayText = countdown > 0 ? countdown : 'Go!';
  const shadowColor = tinycolor('#fde047').darken(30).toString();

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
      <div key={countdown} className="relative">
        <span className="animation-countdown font-semibold text-5xl text-yellow-300">{displayText}</span>
        <span
          className="absolute top-1/2 left-1/2 -z-[1] -translate-x-1/2 -translate-y-1/2 animation-countdown-shadow font-semibold text-7xl"
          style={{ color: shadowColor }}
        >
          {displayText}
        </span>
      </div>
    </div>
  );
};

export default Countdown;
