import React, { useContext } from 'react';

import GameStateContext from '../contexts/GameStateContext';

import Pile from './Pile';

const Piles = () => {
  const { deck } = useContext(GameStateContext);

  // here are all the piles to show
  const pilesToShow = [];

  // for now we just form the dealing pile with the deck
  pilesToShow.push(<Pile key="deal_pile" cards={deck} faceUp col={0} row={4} />);

  return pilesToShow;
};

export default Piles;
