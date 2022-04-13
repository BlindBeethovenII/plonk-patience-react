import React, { useContext } from 'react';

import { colToLeft, rowToTop } from '../shared/card-functions';

import Slider from './Slider';

import GameStateContext from '../contexts/GameStateContext';

const left = colToLeft(9, 3) + 30;
const top = rowToTop(3) - 36;

const PlaySpeedSlider = () => {
  const { playSpeedPercentage, setPlaySpeedPercentage } = useContext(GameStateContext);

  return (
    <Slider
      id="play_speed_slider"
      value={playSpeedPercentage}
      setValue={setPlaySpeedPercentage}
      left={left}
      top={top}
      label="Play Speed"
    />
  );
};

export default PlaySpeedSlider;
