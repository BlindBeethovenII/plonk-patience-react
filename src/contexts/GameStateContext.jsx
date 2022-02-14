import React, { useState, useMemo } from 'react';

import PropTypes from 'prop-types';

import { createShuffledDeck } from '../shared/card-functions';

const GameStateContext = React.createContext({});

export const GameStateContextProvider = ({ children }) => {
  // the main menu open state bool and functions
  const [mainMenuOpen, setMainMenuOpen] = useState(true); // the game starts with the main menu open
  const openMainMenu = () => setMainMenuOpen(true);
  const closeMainMenu = () => setMainMenuOpen(false);

  // the deal pile starts as a shuffled array of cards - two packs worth
  const [dealPile, setDealPile] = useState(createShuffledDeck());

  // the plonk pile starts empty
  const [plonkPile, setPlonkPile] = useState([]);

  // reset the cards to the starting position
  const resetCards = () => {
    setDealPile(createShuffledDeck());
    setPlonkPile([]);
  };

  // expose our state and state functions via the context
  // we are encouraged to do this via a useMemo now
  const context = useMemo(() => ({
    // the main menu open
    mainMenuOpen,
    openMainMenu,
    closeMainMenu,

    // the piles
    dealPile,
    plonkPile,

    // functions over the cards
    resetCards,
  }), []);

  return <GameStateContext.Provider value={context}>{children}</GameStateContext.Provider>;
};

GameStateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameStateContext;
