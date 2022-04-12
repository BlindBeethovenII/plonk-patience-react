import React, { useContext } from 'react';

import {
  PILE_ID_DEAL_PILE,
  PILE_ID_PLONK_PILE,
} from '../shared/constants';

import Pile from './Pile';
import PileFlash from './PileFlash';

import GameStateContext from '../contexts/GameStateContext';

const Piles = () => {
  const {
    dealPile,
    plonkPile,
    pileFlashes,
  } = useContext(GameStateContext);

  // here are all the piles to show
  const pilesToShow = [];

  // add in the deal pile
  pilesToShow.push(<Pile key="deal_pile" pileId={PILE_ID_DEAL_PILE} cards={dealPile} />);

  // and the plonk pile
  pilesToShow.push(<Pile key="plonk_pile" pileId={PILE_ID_PLONK_PILE} cards={plonkPile} />);

  // and the flashing piles
  pileFlashes.forEach(({ pileId, icon }) => {
    pilesToShow.push(<PileFlash key={`pileflash_${pileId}`} pileId={pileId} icon={icon} />);
  });

  return pilesToShow;
};

export default Piles;
