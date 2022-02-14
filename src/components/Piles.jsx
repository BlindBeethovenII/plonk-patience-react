import React, { useContext } from 'react';

import GameStateContext from '../contexts/GameStateContext';

import Pile from './Pile';

const Piles = () => {
  const { dealPile, plonkPile } = useContext(GameStateContext);

  // here are all the piles to show
  const pilesToShow = [];

  // add in the deal pile
  pilesToShow.push(<Pile key="deal_pile" cards={dealPile} faceUp col={0} row={4} />);

  // and the plonk pile
  pilesToShow.push(<Pile key="plonk_pile" cards={plonkPile} faceDown col={4} row={4} />);

  return pilesToShow;
};

export default Piles;
