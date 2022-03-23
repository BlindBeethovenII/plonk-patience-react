import React, { useContext } from 'react';

import { colToLeft, rowToTop } from '../shared/card-functions';

import Slider from './Slider';

import GameStateContext from '../contexts/GameStateContext';

const left = colToLeft(9, 2) + 30;
const top = rowToTop(2) - 16;

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
