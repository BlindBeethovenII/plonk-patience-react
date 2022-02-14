import React, { useState, useMemo } from 'react';

import PropTypes from 'prop-types';

import { createShuffledDeck } from '../shared/card-functions';

const GameStateContext = React.createContext({});

export const GameStateContextProvider = ({ children }) => {
  // the deal pile starts as a shuffled array of cards - two packs worth
  const [dealPile, setDealPile] = useState(createShuffledDeck());

  // the plonk pile starts empty
  const [plonkPile, setPlonkPile] = useState([]);

  // reset the cards to the starting position
  const resetCards = () => {
    setDealPile(createShuffledDeck());
    setPlonkPile([]);
  };

  // deal the cards
  const dealCards = () => {
    // this only makes sense if we have some cards to deal
    if (dealPile?.length) {
      // create new objects for context rendering
      const newDealPile = [...dealPile];
      const newPlonkPile = [...plonkPile];
      newPlonkPile.unshift(newDealPile.shift());
      setDealPile(newDealPile);
      setPlonkPile(newPlonkPile);
    }
  };

  // expose our state and state functions via the context
  // we are encouraged to do this via a useMemo now
  const context = useMemo(() => ({
    // the piles
    dealPile,
    plonkPile,

    // card functions
    resetCards,
    dealCards,
  }), [dealPile, plonkPile]);

  return <GameStateContext.Provider value={context}>{children}</GameStateContext.Provider>;
};

GameStateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameStateContext;
