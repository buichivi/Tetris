import React, { useEffect, useState } from 'react';
import gameAudio from '../types/Audio';
import tinycolor from 'tinycolor2';

const Countdown = () => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown >= 0) {
      switch (countdown) {
        case 3:
          gameAudio.playSFX('countdown_3');
          break;
        case 2:
          gameAudio.playSFX('countdown_2');
          break;
        case 1:
          gameAudio.playSFX('countdown_1');
          break;
        case 0:
          gameAudio.playSFX('go');
          break;
        default:
          break;
      }
      const id = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1100);
      return () => clearTimeout(id);
    }
  }, [countdown]);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
      {countdown >= 0 && (
        <div key={countdown} className="relative">
          <span className="animation_countdown font-semibold text-5xl text-yellow-300">
            {countdown > 0 ? countdown : 'Go'}
          </span>
          <span
            className="absolute top-1/2 left-1/2 -z-[1] -translate-x-1/2 -translate-y-1/2 animation_countdown_shadow font-semibold text-7xl"
            style={{ color: tinycolor('#fde047').darken(30).toString() }}
          >
            {countdown > 0 ? countdown : 'Go'}
          </span>
        </div>
      )}
    </div>
  );
};

export default Countdown;
