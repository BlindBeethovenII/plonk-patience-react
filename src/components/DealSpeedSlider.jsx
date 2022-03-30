import React, { useContext } from 'react';

import { colToLeft, rowToTop } from '../shared/card-functions';

import Slider from './Slider';

import GameStateContext from '../contexts/GameStateContext';

const left = colToLeft(9, 2) + 30;
const top = rowToTop(2) - 30;

const DealSpeedSlider = () => {
  const { dealSpeedPercentage, setDealSpeedPercentage } = useContext(GameStateContext);

  return (
    <Slider
      value={dealSpeedPercentage}
      setValue={setDealSpeedPercentage}
      left={left}
      top={top}
      label="Deal Speed"
    />
  );
};

export default DealSpeedSlider;
