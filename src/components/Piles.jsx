import React, { useContext } from 'react';

import GameStateContext from '../contexts/GameStateContext';

import {
  PILE_ID_DEAL_PILE,
  PILE_ID_PLONK_PILE,
  PILE_ID_PLAY_PILE_1,
  PILE_ID_PLAY_PILE_2,
  PILE_ID_PLAY_PILE_3,
} from '../shared/constants';

import Pile from './Pile';

const Piles = () => {
  const {
    dealPile,
    plonkPile,
    playPile1,
    playPile2,
    playPile3,
  } = useContext(GameStateContext);

  // here are all the piles to show
  const pilesToShow = [];

  // add in the deal pile
  pilesToShow.push(<Pile key="deal_pile" pileId={PILE_ID_DEAL_PILE} cards={dealPile} faceUp col={0} row={4} />);

  // and the plonk pile
  pilesToShow.push(<Pile key="plonk_pile" pileId={PILE_ID_PLONK_PILE} cards={plonkPile} faceUp={false} col={4} row={4} />);

  // and the play piles
  pilesToShow.push(<Pile key="play_pile_1" pileId={PILE_ID_PLAY_PILE_1} cards={playPile1} faceUp col={1} row={0} />);
  pilesToShow.push(<Pile key="play_pile_2" pileId={PILE_ID_PLAY_PILE_2} cards={playPile2} faceUp col={2} row={0} />);
  pilesToShow.push(<Pile key="play_pile_3" pileId={PILE_ID_PLAY_PILE_3} cards={playPile3} faceUp col={3} row={0} />);

  return pilesToShow;
};

export default Piles;
