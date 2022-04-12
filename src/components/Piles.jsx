import React, { useContext } from 'react';

import PileFlash from './PileFlash';

import GameStateContext from '../contexts/GameStateContext';

const Piles = () => {
  const {
    pileFlashes,
  } = useContext(GameStateContext);

  // here are all the piles to show
  const pilesToShow = [];

  // add the flashing piles
  pileFlashes.forEach(({ pileId, icon }) => {
    pilesToShow.push(<PileFlash key={`pileflash_${pileId}`} pileId={pileId} icon={icon} />);
  });

  return pilesToShow;
};

export default Piles;
