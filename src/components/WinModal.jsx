import React, { useContext } from 'react';

import Modal from 'styled-react-modal';

import styled from 'styled-components';

import GameStateContext from '../contexts/GameStateContext';

const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
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
      <span>Congratulation on the Win! You are a first class Plonker!</span>
      <Button onClick={toggleModal}>Continue</Button>
    </StyledModal>
  );
};

export default WinModal;
