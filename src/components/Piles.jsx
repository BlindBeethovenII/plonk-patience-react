import React, { useContext } from 'react';

import {
  PILE_ID_DEAL_PILE,
  PILE_ID_PLONK_PILE,
  PILE_ID_SORT_PILE_1,
  PILE_ID_SORT_PILE_2,
  PILE_ID_SORT_PILE_3,
  PILE_ID_SORT_PILE_4,
  PILE_ID_SORT_PILE_5,
  PILE_ID_SORT_PILE_6,
  PILE_ID_SORT_PILE_7,
  PILE_ID_SORT_PILE_8,
  PILE_ID_SORT_PILE_9,
  PILE_ID_SORT_PILE_10,
  PILE_ID_SORT_PILE_11,
  PILE_ID_SORT_PILE_12,
  PILE_ID_SORT_PILE_13,
} from '../shared/constants';

import Pile from './Pile';
import PileFlash from './PileFlash';

import GameStateContext from '../contexts/GameStateContext';

const Piles = () => {
  const {
    dealPile,
    plonkPile,
    sortPile1,
    sortPile2,
    sortPile3,
    sortPile4,
    sortPile5,
    sortPile6,
    sortPile7,
    sortPile8,
    sortPile9,
    sortPile10,
    sortPile11,
    sortPile12,
    sortPile13,
    pileFlashes,
  } = useContext(GameStateContext);

  // here are all the piles to show
  const pilesToShow = [];

  // add in the deal pile
  pilesToShow.push(<Pile key="deal_pile" pileId={PILE_ID_DEAL_PILE} cards={dealPile} />);

  // and the plonk pile
  pilesToShow.push(<Pile key="plonk_pile" pileId={PILE_ID_PLONK_PILE} cards={plonkPile} />);

  // and the sort piles
  pilesToShow.push(<Pile key="sort_pile_1" pileId={PILE_ID_SORT_PILE_1} cards={sortPile1} />);
  pilesToShow.push(<Pile key="sort_pile_2" pileId={PILE_ID_SORT_PILE_2} cards={sortPile2} />);
  pilesToShow.push(<Pile key="sort_pile_3" pileId={PILE_ID_SORT_PILE_3} cards={sortPile3} />);
  pilesToShow.push(<Pile key="sort_pile_4" pileId={PILE_ID_SORT_PILE_4} cards={sortPile4} />);
  pilesToShow.push(<Pile key="sort_pile_5" pileId={PILE_ID_SORT_PILE_5} cards={sortPile5} />);
  pilesToShow.push(<Pile key="sort_pile_6" pileId={PILE_ID_SORT_PILE_6} cards={sortPile6} />);
  pilesToShow.push(<Pile key="sort_pile_7" pileId={PILE_ID_SORT_PILE_7} cards={sortPile7} />);
  pilesToShow.push(<Pile key="sort_pile_8" pileId={PILE_ID_SORT_PILE_8} cards={sortPile8} />);
  pilesToShow.push(<Pile key="sort_pile_9" pileId={PILE_ID_SORT_PILE_9} cards={sortPile9} />);
  pilesToShow.push(<Pile key="sort_pile_10" pileId={PILE_ID_SORT_PILE_10} cards={sortPile10} />);
  pilesToShow.push(<Pile key="sort_pile_11" pileId={PILE_ID_SORT_PILE_11} cards={sortPile11} />);
  pilesToShow.push(<Pile key="sort_pile_12" pileId={PILE_ID_SORT_PILE_12} cards={sortPile12} />);
  pilesToShow.push(<Pile key="sort_pile_13" pileId={PILE_ID_SORT_PILE_13} cards={sortPile13} />);

  // and the flashing piles
  pileFlashes.forEach(({ pileId, icon }) => {
    pilesToShow.push(<PileFlash key={`pileflash_${pileId}`} pileId={pileId} icon={icon} />);
  });

  return pilesToShow;
};

export default Piles;
