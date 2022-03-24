import React, { useContext } from 'react';

import { colToLeft, rowToTop } from '../shared/card-functions';

import Slider from './Slider';

import GameStateContext from '../contexts/GameStateContext';

const left = colToLeft(9, 3) + 30;
const top = rowToTop(3) - 16;

const PlaySpeedSlider = () => {
  const { playSpeedPercentage, setPlaySpeedPercentage } = useContext(GameStateContext);

  return (
    <Slider
      value={playSpeedPercentage}
      setValue={setPlaySpeedPercentage}
      left={left}
      top={top}
      label="Play Speed"
    />
  );
};

export default PlaySpeedSlider;
