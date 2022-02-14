import React, { useState, useMemo } from 'react';

import PropTypes from 'prop-types';

import { createShuffledDeck } from '../shared/card-functions';

const GameStateContext = React.createContext({});

export const GameStateContextProvider = ({ children }) => {
  // the main menu open state bool and functions
  const [mainMenuOpen, setMainMenuOpen] = useState(true); // the game starts with the main menu open
  const openMainMenu = () => setMainMenuOpen(true);
  const closeMainMenu = () => setMainMenuOpen(false);

  // the deck is a shuffled array of cards
  const [deck, setDeck] = useState(createShuffledDeck());

  // reset the deck to a random shuffle
  const resetDeck = () => {
    setDeck(createShuffledDeck());
  };

  // expose our state and state functions via the context
  // we are encouraged to do this via a useMemo now
  const context = useMemo(() => ({
    // the main menu open
    mainMenuOpen,
    openMainMenu,
    closeMainMenu,

    // the deck with its current card index
    deck,
    resetDeck,
  }), []);

  return <GameStateContext.Provider value={context}>{children}</GameStateContext.Provider>;
};

GameStateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameStateContext;
