import React, { useContext } from 'react';

import { Modal } from 'react-responsive-modal';
import styled from 'styled-components';

import GameStateContext from '../contexts/GameStateContext';

const Title = styled.h2`
  background: white;
  color: #761d38;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #761d38;
  border-radius: 3px;
  text-align: center;
`;

const Button = styled.button`
  background: #761d38;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #761d38;
  border-radius: 3px;
`;

const MainMenuModal = () => {
  const {
    mainMenuOpen,
    closeMainMenu,
    resetDeck,
  } = useContext(GameStateContext);

  const startGame = () => {
    closeMainMenu();
    resetDeck();
  };

  return (
    <Modal
      open={mainMenuOpen}
      center
      showCloseIcon={false}
    >
      <Title>Main Menu</Title>
      <Button onClick={startGame}>Start Game</Button>
    </Modal>
  );
};

export default MainMenuModal;
