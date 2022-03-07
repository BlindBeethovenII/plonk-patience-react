import React, { useContext } from 'react';

import GameStateContext from '../contexts/GameStateContext';

import {
  PILE_ID_DEAL_PILE,
  PILE_ID_PLONK_PILE,
  PILE_ID_PLAY_PILE_1,
  PILE_ID_PLAY_PILE_2,
  PILE_ID_PLAY_PILE_3,
  PILE_ID_PLAY_PILE_4,
  PILE_ID_PLAY_PILE_5,
  PILE_ID_PLAY_PILE_6,
  PILE_ID_PLAY_PILE_7,
  PILE_ID_PLAY_PILE_8,
  PILE_ID_PLAY_PILE_9,
  PILE_ID_PLAY_PILE_10,
  PILE_ID_PLAY_PILE_11,
  PILE_ID_PLAY_PILE_12,
} from '../shared/constants';

import Pile from './Pile';

const Piles = () => {
  const {
    dealPile,
    plonkPile,
    playPile1,
    playPile2,
    playPile3,
    playPile4,
    playPile5,
    playPile6,
    playPile7,
    playPile8,
    playPile9,
    playPile10,
    playPile11,
    playPile12,
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
  pilesToShow.push(<Pile key="play_pile_4" pileId={PILE_ID_PLAY_PILE_4} cards={playPile4} faceUp col={1} row={1} />);
  pilesToShow.push(<Pile key="play_pile_5" pileId={PILE_ID_PLAY_PILE_5} cards={playPile5} faceUp col={2} row={1} />);
  pilesToShow.push(<Pile key="play_pile_6" pileId={PILE_ID_PLAY_PILE_6} cards={playPile6} faceUp col={3} row={1} />);
  pilesToShow.push(<Pile key="play_pile_7" pileId={PILE_ID_PLAY_PILE_7} cards={playPile7} faceUp col={1} row={2} />);
  pilesToShow.push(<Pile key="play_pile_8" pileId={PILE_ID_PLAY_PILE_8} cards={playPile8} faceUp col={2} row={2} />);
  pilesToShow.push(<Pile key="play_pile_9" pileId={PILE_ID_PLAY_PILE_9} cards={playPile9} faceUp col={3} row={2} />);
  pilesToShow.push(<Pile key="play_pile_10" pileId={PILE_ID_PLAY_PILE_10} cards={playPile10} faceUp col={1} row={3} />);
  pilesToShow.push(<Pile key="play_pile_11" pileId={PILE_ID_PLAY_PILE_11} cards={playPile11} faceUp col={2} row={3} />);
  pilesToShow.push(<Pile key="play_pile_12" pileId={PILE_ID_PLAY_PILE_12} cards={playPile12} faceUp col={3} row={3} />);

  return pilesToShow;
};

export default Piles;
