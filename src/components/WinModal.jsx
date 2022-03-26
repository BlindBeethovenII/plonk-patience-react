import React, { useContext } from 'react';

import Modal from 'styled-react-modal';

import styled from 'styled-components';

import GameStateContext from '../contexts/GameStateContext';

const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: grid;
  align-items: center;
  justify-content: center;
  background-color: rgb(85,107,47);
  border: 4px solid #761d38;
  border-radius: 2px;
`;

const Text = styled.h2`
  background: rgb(85,107,47);
  color: white;
  font-size: 1.2em;
`;

const Button = styled.button`
  background: #ff1d38; 
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #761d38;
  border-radius: 3px;
`;

const WinModal = () => {
  const { showWin, setShowWin } = useContext(GameStateContext);

  const toggleModal = () => {
    setShowWin(false);
  };

  return (
    <StyledModal
      isOpen={showWin}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <Text>Congratulation on the Win!</Text>
      <Text>You are a first class Plonker!</Text>
      <Button onClick={toggleModal}>Continue</Button>
    </StyledModal>
  );
};

export default WinModal;
